import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameEngine } from "@/game/engine";
import { AVAILABLE_PERKS, GAME_LOCATIONS, INITIAL_WEAPONS, OUTBREAK_FINAL_WAVES, OUTBREAK_ORDER, OUTBREAK_WAVES_PER_MAP, locationIndexById } from "@/game/constants";
import { soundEngine } from "@/audio/soundEngine";
import { loadArt } from "@/game/art";
import { loadSave } from "@/game/save";
import { HUD } from "@/components/game/HUD";
import { StartScreen } from "@/components/game/StartScreen";
import { UpgradeShopModal } from "@/components/game/UpgradeShopModal";
import { GameOverModal } from "@/components/game/GameOverModal";
import { LoreNoteModal } from "@/components/game/LoreNoteModal";
import { MobileControls } from "@/components/game/MobileControls";
import type { ActivePowerup, EngineSnapshot, GameMode, LoreNote, Perk, PlayerStats, Weapon } from "@/types/game";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <GameApp />;
}

function GameApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const carryRef = useRef<EngineSnapshot | null>(null);
  const outbreakStepRef = useRef(0);
  const modeRef = useRef<GameMode>("survival");

  const [screen, setScreen] = useState<"title" | "playing" | "game_over">("title");
  const [isWorkbenchOpen, setIsWorkbenchOpen] = useState(false);
  const [activeLoreNote, setActiveLoreNote] = useState<LoreNote | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<GameMode>("survival");
  const [outbreakStep, setOutbreakStep] = useState(0);
  const [won, setWon] = useState(false);
  const [killer, setKiller] = useState("shambler");
  const [radio, setRadio] = useState<{ call: string; body: string } | null>(null);
  const [foundNotes, setFoundNotes] = useState<string[]>([]);

  const [selectedLocationIdx, setSelectedLocationIdx] = useState(0);
  const [weapons, setWeapons] = useState<Weapon[]>(INITIAL_WEAPONS);
  const [perks, setPerks] = useState<Perk[]>(AVAILABLE_PERKS);

  const [hudStats, setHudStats] = useState({
    health: 100,
    maxHealth: 100,
    stamina: 100,
    weapon: INITIAL_WEAPONS[0],
    molotovs: 3,
    score: 0,
    scrap: 150,
    combo: 1,
    wave: 1,
    waveTimer: 0,
    zombiesRemaining: 0,
    isReloading: false,
    reloadProgress: 0,
    activePowerups: [] as ActivePowerup[],
    nearWorkbench: false,
    extractActive: false,
    interactHint: "",
    lanternLit: false,
    hasLantern: false,
    sneaking: false,
    bellReady: false,
    bellHold: 0,
    holesOpen: 0,
    holesTotal: 0,
    bloodRush: false,
    lastStandReady: true,
    dodgeReady: true,
    fog: false,
    weaponIndex: 0,
    loadout: [] as { id: string; name: string; unlocked: boolean; mag: number; reserve: number }[],
    switchBanner: 0,
    helpVisible: true,
  });

  const [gameOverData, setGameOverData] = useState<{ stats: PlayerStats; score: number; wave: number }>({
    stats: {
      kills: 0,
      headshots: 0,
      shotsFired: 0,
      shotsHit: 0,
      damageDealt: 0,
      damageTaken: 0,
      scrapCollected: 0,
      wavesCompleted: 0,
      survivalTime: 0,
      notesFound: 0,
    },
    score: 0,
    wave: 1,
  });

  const updateCanvasDimensions = useCallback(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  useEffect(() => {
    void loadArt();
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    const onVis = () => {
      if (document.visibilityState === "visible") soundEngine.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [updateCanvasDimensions]);

  useEffect(() => {
    if (!radio) return;
    const t = window.setTimeout(() => setRadio(null), 7200);
    return () => window.clearTimeout(t);
  }, [radio]);

  const applySaveUnlocks = (engine: GameEngine) => {
    const save = loadSave();
    for (const w of engine.weapons) {
      if (save.unlockedWeapons.includes(w.id)) w.unlocked = true;
    }
  };

  const handleStartGame = (locationIndex: number, difficultyMultiplier: number, nextMode: GameMode = "survival") => {
    soundEngine.init();
    modeRef.current = nextMode;
    outbreakStepRef.current = 0;
    setMode(nextMode);
    setWon(false);
    setRadio(null);
    setFoundNotes([]);
    carryRef.current = null;
    const idx = nextMode === "outbreak" ? locationIndexById(OUTBREAK_ORDER[0]) : locationIndex;
    setOutbreakStep(0);
    setSelectedLocationIdx(idx);
    bootEngine(idx, difficultyMultiplier, nextMode, 0, null);
  };

  const bootEngine = (
    locationIndex: number,
    difficultyMultiplier: number,
    nextMode: GameMode,
    step: number,
    carry: EngineSnapshot | null,
  ) => {
    if (!canvasRef.current) return;
    updateCanvasDimensions();
    engineRef.current?.destroy();

    const engine = new GameEngine(
      canvasRef.current,
      {
        onWaveComplete: () => {
          if (engineRef.current) {
            setWeapons([...engineRef.current.weapons]);
            setPerks([...engineRef.current.perks]);
          }
        },
        onGameOver: (stats: PlayerStats, finalScore: number, deathKiller: string) => {
          setKiller(deathKiller);
          setWon(false);
          setGameOverData({
            stats,
            score: finalScore,
            wave: engineRef.current ? engineRef.current.wave : 1,
          });
          setScreen("game_over");
        },
        onStatsUpdate: (stats: typeof hudStats) => setHudStats(stats),
        onLoreNoteFound: (note: LoreNote) => {
          setActiveLoreNote(note);
          setFoundNotes((n) => Array.from(new Set([...n, note.id])));
          engineRef.current?.setPaused(true);
        },
        onRadio: (call: string, body: string) => setRadio({ call, body }),
        onExtractReady: () => {
          setRadio({ call: "WJPS Petersburg", body: "Truck's lit. Get off this ground before the next horn." });
        },
        onExtract: () => advanceOutbreak(),
        onWorkbenchPrompt: () => {
          setIsWorkbenchOpen(true);
          engineRef.current?.setPaused(true);
        },
      },
      locationIndex,
    );

    applySaveUnlocks(engine);
    if (carry) engine.importSnapshot(carry);
    if (nextMode === "outbreak") {
      const last = step >= OUTBREAK_ORDER.length - 1;
      engine.outbreakWaves = last ? OUTBREAK_FINAL_WAVES : OUTBREAK_WAVES_PER_MAP;
    } else {
      engine.outbreakWaves = 0;
    }

    engineRef.current = engine;
    setWeapons([...engine.weapons]);
    setPerks([...engine.perks]);
    setScreen("playing");
    setIsWorkbenchOpen(false);
    engine.start(difficultyMultiplier);
  };

  const advanceOutbreak = () => {
    const engine = engineRef.current;
    if (!engine || modeRef.current !== "outbreak") return;
    const snap = engine.exportSnapshot();
    carryRef.current = snap;
    const next = outbreakStepRef.current + 1;
    outbreakStepRef.current = next;
    setOutbreakStep(next);
    if (next >= OUTBREAK_ORDER.length) {
      setWon(true);
      setGameOverData({ stats: snap.stats, score: snap.score, wave: engine.wave });
      setScreen("game_over");
      engine.destroy();
      engineRef.current = null;
      return;
    }
    const idx = locationIndexById(OUTBREAK_ORDER[next]);
    setSelectedLocationIdx(idx);
    bootEngine(idx, engine.difficultyMultiplier, "outbreak", next, snap);
  };

  const handleToggleMute = () => setIsMuted(soundEngine.toggleMute());

  const handleToggleWorkbench = () => {
    if (screen !== "playing") return;
    setIsWorkbenchOpen((prev) => {
      const next = !prev;
      engineRef.current?.setPaused(next);
      return next;
    });
  };

  const handleCloseLoreNote = () => {
    setActiveLoreNote(null);
    if (engineRef.current && !isWorkbenchOpen) engineRef.current.setPaused(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeLoreNote) {
        if (e.code === "Escape" || e.code === "Space" || e.code === "KeyE") {
          e.preventDefault();
          handleCloseLoreNote();
        }
        return;
      }
      if (e.code === "Tab") {
        e.preventDefault();
        handleToggleWorkbench();
      } else if (e.code === "KeyM") {
        handleToggleMute();
      } else if (e.code === "Escape" && isWorkbenchOpen) {
        handleToggleWorkbench();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screen, isWorkbenchOpen, activeLoreNote]);

  const handleUnlockWeapon = (index: number) => {
    const engine = engineRef.current;
    if (!engine) return;
    const wep = engine.weapons[index];
    if (engine.scrap >= wep.cost && !wep.unlocked) {
      engine.scrap -= wep.cost;
      wep.unlocked = true;
      engine.selectWeapon(index);
      setWeapons([...engine.weapons]);
    }
  };

  const handleEquipWeapon = (index: number) => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.selectWeapon(index);
    setWeapons([...engine.weapons]);
  };

  const handleUpgradeWeapon = (index: number) => {
    const engine = engineRef.current;
    if (!engine) return;
    const wep = engine.weapons[index];
    const cost = Math.round(wep.damage * 4.5 * wep.upgradeLevel);
    if (engine.scrap >= cost) {
      engine.scrap -= cost;
      wep.upgradeLevel++;
      wep.damage = Math.round(wep.damage * 1.2);
      wep.magazineSize = Math.round(wep.magazineSize * 1.15);
      wep.currentMag = wep.magazineSize;
      engine.selectWeapon(index);
      setWeapons([...engine.weapons]);
    }
  };

  const handleUpgradePerk = (perkId: string) => {
    const engine = engineRef.current;
    if (!engine) return;
    const perk = engine.perks.find((p: Perk) => p.id === perkId);
    if (!perk) return;
    const cost = perk.cost * (perk.level + 1);
    if (engine.scrap >= cost && perk.level < perk.maxLevel) {
      engine.scrap -= cost;
      perk.level++;
      if (perk.id === "grit") {
        engine.player.maxHealth += 25;
        engine.player.health = Math.min(engine.player.maxHealth, engine.player.health + 25);
      }
      setPerks([...engine.perks]);
    }
  };

  const handleBuyAmmoRefill = () => {
    const engine = engineRef.current;
    if (!engine || engine.scrap < 80) return;
    engine.scrap -= 80;
    for (const w of engine.weapons) {
      if (w.unlocked) {
        w.reserveAmmo = w.maxReserveAmmo;
        w.currentMag = w.magazineSize;
      }
    }
    setWeapons([...engine.weapons]);
  };

  const handleBuyMolotov = () => {
    const engine = engineRef.current;
    if (!engine || engine.scrap < 60) return;
    if (engine.player.molotovs < engine.player.maxMolotovs) {
      engine.scrap -= 60;
      engine.player.molotovs++;
    }
  };

  const loc = GAME_LOCATIONS[selectedLocationIdx];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bg select-none">
      <canvas id="game-canvas" ref={canvasRef} className="block h-full w-full cursor-crosshair" />

      {screen === "title" && (
        <StartScreen onStartGame={handleStartGame} isMuted={isMuted} onToggleMute={handleToggleMute} />
      )}

      {screen === "playing" && (
        <>
          <HUD
            health={hudStats.health}
            maxHealth={hudStats.maxHealth}
            stamina={hudStats.stamina}
            weapon={hudStats.weapon}
            molotovs={hudStats.molotovs}
            score={hudStats.score}
            scrap={hudStats.scrap}
            combo={hudStats.combo}
            wave={hudStats.wave}
            waveTimer={hudStats.waveTimer}
            zombiesRemaining={hudStats.zombiesRemaining}
            isReloading={hudStats.isReloading}
            reloadProgress={hudStats.reloadProgress}
            isMuted={isMuted}
            activePowerups={hudStats.activePowerups}
            onToggleMute={handleToggleMute}
            onOpenWorkbench={handleToggleWorkbench}
            onSkipWaveTimer={() => engineRef.current?.skipWaveBreak()}
            locationName={loc?.name || "Pike County"}
            township={loc?.township || ""}
            radioCall={radio?.call}
            radioBody={radio?.body}
            extractActive={hudStats.extractActive}
            interactHint={hudStats.interactHint}
            lanternLit={hudStats.lanternLit}
            hasLantern={hudStats.hasLantern}
            sneaking={hudStats.sneaking}
            bellReady={hudStats.bellReady}
            bellHold={hudStats.bellHold}
            holesOpen={hudStats.holesOpen}
            holesTotal={hudStats.holesTotal}
            bloodRush={hudStats.bloodRush}
            lastStandReady={hudStats.lastStandReady}
            dodgeReady={hudStats.dodgeReady}
            fog={hudStats.fog}
            weaponIndex={hudStats.weaponIndex}
            loadout={hudStats.loadout}
            switchBanner={hudStats.switchBanner}
            helpVisible={hudStats.helpVisible !== false}
            onSelectWeapon={(i) => engineRef.current?.selectWeapon(i)}
            modeLabel={mode === "outbreak" ? `Outbreak ${outbreakStep + 1}/${OUTBREAK_ORDER.length}` : "Survival"}
          />
          <MobileControls
            onMoveChange={(vec) => {
              if (engineRef.current) engineRef.current.virtualJoystickMove = vec;
            }}
            onAimChange={(vec) => {
              if (engineRef.current) engineRef.current.virtualJoystickAim = vec;
            }}
            onReload={() => engineRef.current?.reloadCurrentWeapon()}
            onThrowMolotov={() => engineRef.current?.throwMolotov()}
            onPrevWeapon={() => engineRef.current?.prevWeapon()}
            onNextWeapon={() => engineRef.current?.nextWeapon()}
            onInteract={() => engineRef.current?.interactLoreNote()}
            onInteractHold={(held) => {
              if (engineRef.current) engineRef.current.holdInteract = held;
            }}
            onSneakToggle={(on) => {
              if (engineRef.current) engineRef.current.forceSneak = on;
            }}
            onDodge={() => engineRef.current?.tryDodge()}
            onBash={() => engineRef.current?.tryBash()}
          />
        </>
      )}

      {isWorkbenchOpen && screen === "playing" && (
        <UpgradeShopModal
          weapons={weapons}
          perks={perks}
          scrap={hudStats.scrap}
          molotovs={hudStats.molotovs}
          maxMolotovs={5}
          onClose={handleToggleWorkbench}
          onUnlockWeapon={handleUnlockWeapon}
          onUpgradeWeapon={handleUpgradeWeapon}
          onEquipWeapon={handleEquipWeapon}
          equippedId={hudStats.weapon?.id}
          onUpgradePerk={handleUpgradePerk}
          onBuyAmmoRefill={handleBuyAmmoRefill}
          onBuyMolotov={handleBuyMolotov}
        />
      )}

      {activeLoreNote && screen === "playing" && <LoreNoteModal note={activeLoreNote} onClose={handleCloseLoreNote} />}

      {screen === "game_over" && (
        <GameOverModal
          stats={gameOverData.stats}
          score={gameOverData.score}
          wave={gameOverData.wave}
          locationName={loc?.name || "Pike County"}
          killer={killer}
          mode={mode}
          won={won}
          unlocked={weapons.filter((w) => w.unlocked).map((w) => w.id)}
          notes={foundNotes}
          mapId={loc?.id || ""}
          onRestart={() => handleStartGame(selectedLocationIdx, engineRef.current?.difficultyMultiplier ?? 1, mode)}
          onHome={() => {
            engineRef.current?.destroy();
            engineRef.current = null;
            setScreen("title");
          }}
        />
      )}
    </main>
  );
}
