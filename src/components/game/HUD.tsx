import { Weapon, ActivePowerup } from "@/types/game";
import {
  Volume2,
  VolumeX,
  Flame,
  Wrench,
  Zap,
  Skull,
  Infinity as InfinityIcon,
  Radio,
  Lamp,
  Bell,
} from "lucide-react";

interface HUDProps {
  health: number;
  maxHealth: number;
  stamina: number;
  weapon: Weapon;
  molotovs: number;
  score: number;
  scrap: number;
  combo: number;
  wave: number;
  waveTimer: number;
  zombiesRemaining: number;
  isReloading: boolean;
  reloadProgress: number;
  isMuted: boolean;
  activePowerups?: ActivePowerup[];
  onToggleMute: () => void;
  onOpenWorkbench: () => void;
  onSkipWaveTimer: () => void;
  locationName: string;
  township: string;
  radioCall?: string;
  radioBody?: string;
  extractActive?: boolean;
  interactHint?: string;
  modeLabel: string;
  lanternLit?: boolean;
  hasLantern?: boolean;
  sneaking?: boolean;
  bellReady?: boolean;
  bellHold?: number;
  holesOpen?: number;
  holesTotal?: number;
  bloodRush?: boolean;
  lastStandReady?: boolean;
  dodgeReady?: boolean;
  fog?: boolean;
  weaponIndex?: number;
  loadout?: { id: string; name: string; unlocked: boolean; mag: number; reserve: number }[];
  switchBanner?: number;
  helpVisible?: boolean;
  onSelectWeapon?: (index: number) => void;
}

export function HUD({
  health,
  maxHealth,
  stamina,
  weapon,
  molotovs,
  score,
  scrap,
  combo,
  wave,
  waveTimer,
  zombiesRemaining,
  isReloading,
  reloadProgress,
  isMuted,
  activePowerups = [],
  onToggleMute,
  onOpenWorkbench,
  onSkipWaveTimer,
  locationName,
  township,
  radioCall,
  radioBody,
  extractActive,
  interactHint: _interactHint,
  modeLabel,
  lanternLit,
  hasLantern,
  sneaking,
  bellReady,
  bellHold = 0,
  holesOpen = 0,
  holesTotal = 0,
  bloodRush = false,
  lastStandReady = true,
  dodgeReady = true,
  fog = false,
  weaponIndex = 0,
  loadout = [],
  switchBanner = 0,
  helpVisible = true,
  onSelectWeapon,
}: HUDProps) {
  const hpPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isCritical = hpPercent < 25;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 md:p-5 select-none">
      {isCritical && (
        <div className="pointer-events-none absolute inset-0 border-8 border-primary/40 bg-danger/20 animate-pulse" />
      )}

      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="rounded border border-border bg-surface/90 px-3 py-2 shadow-2xl backdrop-blur-md">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {township}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold tracking-wider text-fg md:text-3xl">
                WAVE {wave || 1}
              </span>
              {extractActive ? (
                <span className="animate-pulse font-mono text-xs text-accent">EXTRACT OPEN</span>
              ) : bellReady ? (
                <span className="inline-flex animate-pulse items-center gap-1 font-mono text-xs text-accent">
                  <Bell className="h-3 w-3" /> RING THE BELL
                </span>
              ) : waveTimer > 0 ? (
                <span className="font-mono text-xs text-accent">ON THE TRACE · {waveTimer}s</span>
              ) : (
                <span className="font-wild infected-count text-lg tracking-wide md:text-2xl">
                  {zombiesRemaining} INFECTED
                </span>
              )}
            </div>
            <div className="font-mono text-[11px] text-muted">
              {modeLabel} · {locationName}
            </div>
            {bellReady && (
              <div className="mt-1 h-1 overflow-hidden rounded bg-surface-2">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.min(100, bellHold * 100)}%` }}
                />
              </div>
            )}
            {hasLantern && (
              <div
                className={`mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${lanternLit ? "text-accent" : "text-primary"}`}
              >
                <Lamp className="h-3 w-3" />
                {lanternLit ? "East window lit" : "Lantern out"}
              </div>
            )}
            {holesTotal > 0 && (
              <div
                className={`mt-1 font-mono text-[10px] uppercase tracking-widest ${holesOpen > 0 ? "text-primary" : "text-accent"}`}
              >
                {holesOpen > 0
                  ? `${holesOpen} ${holesOpen === 1 ? "hole" : "holes"} coughing`
                  : "Holes boarded"}
              </div>
            )}
            {bloodRush && (
              <div className="mt-1 animate-pulse font-mono text-[10px] uppercase tracking-widest text-primary">
                Blood rush
              </div>
            )}
            {fog && (
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                Fog in the bottoms
              </div>
            )}
          </div>

          {waveTimer > 0 && !extractActive && !bellReady && (
            <button
              type="button"
              className="pointer-events-auto w-fit rounded border border-border bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg"
              onClick={onSkipWaveTimer}
            >
              Skip break
            </button>
          )}
        </div>

        <div className="flex items-start gap-2">
          <div className="rounded border border-border bg-surface/90 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Score</div>
            <div className="font-heading text-xl font-bold text-fg">{score.toLocaleString()}</div>
            <div className="font-mono text-[11px] text-accent">Scrap {scrap}</div>
            {combo > 1 && (
              <div className="font-mono text-[11px] text-primary">×{combo.toFixed(2)} combo</div>
            )}
          </div>
          <button
            type="button"
            aria-label="Open workbench"
            className="pointer-events-auto rounded border border-border bg-surface p-2 text-fg hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent outline-none"
            onClick={onOpenWorkbench}
            title="Workbench"
          >
            <Wrench className="h-4 w-4 text-accent" />
          </button>
          <button
            type="button"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="pointer-events-auto rounded border border-border bg-surface p-2 text-fg hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent outline-none"
            onClick={onToggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-primary" />
            ) : (
              <Volume2 className="h-4 w-4 text-accent" />
            )}
          </button>
        </div>
      </div>

      {radioBody && (
        <div className="radio-scan relative mx-auto mt-2 max-w-xl overflow-hidden rounded border border-accent/40 bg-surface/90 px-3 py-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
            <Radio className="h-3.5 w-3.5" />
            {radioCall || "WJPS"}
          </div>
          <p className="mt-0.5 font-lore text-sm leading-snug text-fg">{radioBody}</p>
        </div>
      )}

      {activePowerups.length > 0 && (
        <div className="mt-2 flex justify-center gap-2">
          {activePowerups.map((p) => (
            <div
              key={p.type}
              className="flex items-center gap-1 rounded border border-accent/50 bg-surface px-2 py-1 font-mono text-[10px] uppercase text-accent"
            >
              {p.type === "nuke" && <Skull className="h-3 w-3" />}
              {p.type === "infinite_ammo" && <InfinityIcon className="h-3 w-3" />}
              {p.type === "insta_kill" && <Zap className="h-3 w-3" />}
              {p.type.replace("_", " ")} {Math.ceil(p.durationRemaining / 1000)}s
            </div>
          ))}
        </div>
      )}

      <div className="flex w-full items-end justify-between gap-3">
        <div className="w-48 rounded border border-border bg-surface/85 px-2.5 py-2">
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
            <span>Vitals</span>
            <span>
              {Math.ceil(health)}/{maxHealth}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-surface-2">
            <div
              className={`h-full ${isCritical ? "bg-primary" : "bg-accent"}`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded bg-surface-2">
            <div className="h-full bg-fg/50" style={{ width: `${stamina}%` }} />
          </div>
          {sneaking && (
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              Quiet step
            </div>
          )}
          <div className="mt-1 flex gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span className={dodgeReady ? "text-accent" : "text-muted"}>
              {dodgeReady ? "Roll ready" : "Roll…"}
            </span>
            <span className={lastStandReady ? "text-fg/70" : "text-primary"}>
              {lastStandReady ? "One stand" : "Stand spent"}
            </span>
          </div>
        </div>

        <div className="min-w-[220px] rounded border border-border bg-surface/90 px-4 py-3 text-center">
          {switchBanner > 0 && (
            <div className="mb-1 font-heading text-sm uppercase tracking-widest text-accent">
              Equipped
            </div>
          )}
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {weapon.category}
          </div>
          <div className="font-heading text-lg font-bold text-fg">{weapon.name}</div>
          <div className="mt-1 font-mono text-sm text-accent">
            {weapon.currentMag} <span className="text-muted">/ {weapon.reserveAmmo}</span>
          </div>
          {isReloading && (
            <div className="mt-2 h-1 overflow-hidden rounded bg-surface-2">
              <div className="h-full bg-accent" style={{ width: `${reloadProgress * 100}%` }} />
            </div>
          )}
          <div className="mt-2 flex items-center justify-center gap-1 font-mono text-[11px] text-primary">
            <Flame className="h-3.5 w-3.5" />
            {molotovs} mash
          </div>
          {loadout.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {loadout.map((w, i) => (
                <button
                  key={w.id}
                  type="button"
                  disabled={!w.unlocked}
                  onClick={() => w.unlocked && onSelectWeapon?.(i)}
                  className={`pointer-events-auto min-w-7 rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                    !w.unlocked
                      ? "cursor-not-allowed border-border text-muted/40"
                      : i === weaponIndex
                        ? "border-accent bg-accent text-bg"
                        : "border-border bg-surface-2 text-fg hover:border-accent"
                  }`}
                  title={w.unlocked ? w.name : "Locked"}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {helpVisible && (
          <div className="hidden w-44 rounded border border-border bg-surface/70 p-2 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted md:block">
            WASD move · mouse aim
            <br />
            click fire · Space roll · F bash
            <br />
            Q mash · 1–6 guns · E interact
            <br />
            Tab shop
          </div>
        )}
      </div>
    </div>
  );
}
