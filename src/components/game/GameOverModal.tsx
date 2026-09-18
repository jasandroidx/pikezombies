import { useEffect, useMemo } from "react";
import { PlayerStats } from "@/types/game";
import { deathLine } from "@/game/radio";
import { loadSave, recordRun } from "@/game/save";
import { Skull, RotateCcw, Home } from "lucide-react";

interface GameOverModalProps {
  stats: PlayerStats;
  score: number;
  wave: number;
  locationName: string;
  killer: string;
  mode: "survival" | "outbreak";
  won?: boolean;
  unlocked: string[];
  notes: string[];
  mapId: string;
  onRestart: () => void;
  onHome: () => void;
}

export function GameOverModal({
  stats,
  score,
  wave,
  locationName,
  killer,
  mode,
  won,
  unlocked,
  notes,
  mapId,
  onRestart,
  onHome,
}: GameOverModalProps) {
  useEffect(() => {
    recordRun({
      score,
      wave,
      unlocked,
      notes,
      mapId,
      outbreakWon: Boolean(won && mode === "outbreak"),
    });
  }, [score, wave, unlocked, notes, mapId, won, mode]);

  const save = loadSave();
  const isRecord = score >= save.highScore;
  const line = useMemo(() => (won ? "The bell rang at dawn. Pike County still has a name." : deathLine(locationName, killer)), [won, locationName, killer]);
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;
  const minutes = Math.floor(stats.survivalTime / 60);
  const seconds = stats.survivalTime % 60;

  const title = won
    ? "Dawn over the Patoka"
    : wave >= 12
      ? "Folk legend"
      : wave >= 8
        ? "Ridge warden"
        : wave >= 4
          ? "Hollow defender"
          : "Coal-dust martyr";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4">
      <div className="flex w-full max-w-xl flex-col overflow-hidden rounded border border-border bg-surface shadow-2xl">
        <div className="border-b border-border bg-danger/30 p-6 text-center">
          <div className="mb-3 inline-flex rounded-full border border-primary/60 bg-danger/40 p-3">
            <Skull className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-drip wild-title text-4xl md:text-6xl">
            {won ? "HELD" : "OVERRUN"}
          </h2>
          <p className="mt-1 font-heading uppercase tracking-widest text-accent">{title}</p>
          <p className="mt-3 font-lore text-sm leading-relaxed text-muted">{line}</p>
        </div>

        <div className="border-b border-border bg-bg p-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Final score</div>
          <div className="font-heading text-5xl font-bold text-fg">{score.toLocaleString()}</div>
          {isRecord && <div className="mt-1 font-mono text-xs uppercase text-accent">County record</div>}
          <div className="mt-1 font-mono text-xs text-muted">
            {locationName} · Wave {wave} · {mode}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border text-center font-mono text-xs">
          <Stat label="Kills" value={stats.kills} />
          <Stat label="Headshots" value={stats.headshots} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Time" value={`${minutes}:${seconds.toString().padStart(2, "0")}`} />
          <Stat label="Notes" value={stats.notesFound} />
          <Stat label="Scrap" value={stats.scrapCollected} />
        </div>

        <div className="flex gap-2 p-4">
          <button
            id="restart-run"
            type="button"
            onClick={onRestart}
            className="flex flex-1 items-center justify-center gap-2 rounded border border-accent bg-surface-2 py-3 font-heading uppercase tracking-widest text-accent"
          >
            <RotateCcw className="h-4 w-4" />
            Run it back
          </button>
          <button
            id="home-btn"
            type="button"
            onClick={onHome}
            className="flex flex-1 items-center justify-center gap-2 rounded border border-border bg-surface py-3 font-heading uppercase tracking-widest text-fg"
          >
            <Home className="h-4 w-4" />
            County map
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface px-3 py-3">
      <div className="text-[10px] uppercase tracking-widest text-muted">{label}</div>
      <div className="text-lg text-fg">{value}</div>
    </div>
  );
}
