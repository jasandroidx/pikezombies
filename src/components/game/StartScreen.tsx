import { useState } from "react";
import { GAME_LOCATIONS, OUTBREAK_ORDER } from "@/game/constants";
import { loadSave } from "@/game/save";
import { Play, Volume2, VolumeX, HelpCircle, BookOpen, Skull, Bell, Zap, Shield } from "lucide-react";

interface StartScreenProps {
  onStartGame: (locationIndex: number, difficulty: number, mode: "survival" | "outbreak") => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function StartScreen({ onStartGame, isMuted, onToggleMute }: StartScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const save = loadSave();

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bg/95 p-5 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(194,59,34,0.12),_transparent_55%)]" />
      <div className="vignette-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Pike County, Indiana · Quarantine 1983
          </span>
        </div>
        <div className="flex items-center gap-2">
          {save.highScore > 0 && (
            <div className="rounded border border-border bg-surface px-3 py-1 font-mono text-xs text-accent">
              Record {save.highScore.toLocaleString()} · Wave {save.bestWave}
            </div>
          )}
          <button
            type="button"
            className="rounded border border-border bg-surface p-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            onClick={() => setShowJournal((v) => !v)}
            title="County journal"
            aria-label="County journal"
          >
            <BookOpen className="h-4 w-4 text-accent" />
          </button>
          <button
            type="button"
            className="rounded border border-border bg-surface p-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            onClick={() => setShowHelp((v) => !v)}
            title="Controls and help"
            aria-label="Controls and help"
          >
            <HelpCircle className="h-4 w-4 text-fg" />
          </button>
          <button
            type="button"
            className="rounded border border-border bg-surface p-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            onClick={onToggleMute}
            title={isMuted ? "Unmute audio" : "Mute audio"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-primary" /> : <Volume2 className="h-4 w-4 text-accent" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto my-4 w-full max-w-5xl text-center md:my-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">Patoka River · Yellow Banks Trace</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-[0.12em] text-fg md:text-6xl">PIKE COUNTY</h1>
        <div className="wild-title mx-auto mt-1 mb-3 w-fit font-drip text-4xl md:text-7xl">Zombies</div>
        <p className="mx-auto mt-3 hidden max-w-xl font-lore text-sm leading-relaxed text-muted md:block">
          The mines exhaled. The springs went to iron. Fog on the Patoka, and the dead walking the traces Lincoln used.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded border border-border bg-surface/90 p-4">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">County map</div>
          <CountyMap selected={GAME_LOCATIONS[selectedLocation]?.id} cleared={save.mapsCleared} onPick={(id) => {
            const i = GAME_LOCATIONS.findIndex((l) => l.id === id);
            if (i >= 0) setSelectedLocation(i);
          }} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded border border-border bg-surface/90 p-4 text-left">
            <div className="font-heading text-xl text-fg">{GAME_LOCATIONS[selectedLocation].name}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
              {GAME_LOCATIONS[selectedLocation].township}
            </div>
            <p className="mt-2 font-lore text-sm leading-relaxed text-muted">
              {GAME_LOCATIONS[selectedLocation].description}
            </p>
          </div>

          <div className="flex gap-2">
            {[
              { n: 0.85, label: "Ridge" },
              { n: 1, label: "County" },
              { n: 1.35, label: "Highwall" },
            ].map((d) => (
              <button
                key={d.label}
                type="button"
                onClick={() => setDifficulty(d.n)}
                className={`flex-1 rounded border px-2 py-2 font-mono text-[11px] uppercase tracking-widest ${
                  difficulty === d.n ? "border-accent bg-surface-2 text-accent" : "border-border bg-surface text-muted"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <button
            id="start-outbreak"
            type="button"
            onClick={() => onStartGame(0, difficulty, "outbreak")}
            className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-3 font-heading text-lg font-bold uppercase tracking-widest text-fg"
          >
            <Skull className="h-5 w-5" />
            Outbreak night
          </button>
          <button
            id="start-survival"
            type="button"
            onClick={() => onStartGame(selectedLocation, difficulty, "survival")}
            className="flex items-center justify-center gap-2 rounded border border-accent bg-surface-2 px-4 py-3 font-heading text-lg font-bold uppercase tracking-widest text-accent"
          >
            <Play className="h-5 w-5" />
            Survival · this place
          </button>
          {save.outbreakBeaten && (
            <p className="font-mono text-[11px] text-accent">Dawn has already come once. Hold it again.</p>
          )}

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { icon: Zap, title: "Roll", body: "Space. I-frames. Costs wind." },
              { icon: Shield, title: "Bash", body: "F or right-click. Stun them." },
              { icon: Skull, title: "Blood rush", body: "Four kills. They go slow." },
              { icon: Bell, title: "Last stand", body: "Die once. Get back up." },
            ].map((item) => (
              <div key={item.title} className="rounded border border-border bg-surface px-2 py-2 text-left">
                <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                  <item.icon className="h-3 w-3" />
                  {item.title}
                </div>
                <p className="mt-1 font-lore text-[11px] leading-snug text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showHelp && (
        <div className="relative z-20 mx-auto mt-4 max-w-xl rounded border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
          WASD move · mouse aim and fire · 1 magnum · 2 pump · 3–6 bought guns · mousewheel swap · Space roll · F bash · Q mash · R reload · Ctrl quiet step · E lantern, boards, notes, shed, truck, bell · Tab workbench · M mute.
          Outbreak: White Oak Springs → McCord's Ford → Stendal Backbone → Petersburg Square → Winslow Still-yard. You start with the .357. The 12-gauge is already in the truck — press 2. Unlock the rest at the shed.
        </div>
      )}

      {showJournal && (
        <div className="relative z-20 mx-auto mt-4 max-w-xl rounded border border-border bg-surface p-4">
          <div className="font-heading text-lg text-fg">County journal</div>
          {save.journal.length === 0 ? (
            <p className="mt-2 font-lore text-sm text-muted">No notes recovered. Walk the traces.</p>
          ) : (
            <ul className="mt-2 space-y-1 font-mono text-xs text-accent">
              {save.journal.map((id) => (
                <li key={id}>{id.replace(/_/g, " ")}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function CountyMap({
  selected,
  cleared,
  onPick,
}: {
  selected: string;
  cleared: string[];
  onPick: (id: string) => void;
}) {
  const nodes: { id: string; x: number; y: number; label: string }[] = [
    { id: "white_oak_springs", x: 52, y: 28, label: "White Oak" },
    { id: "petersburg_square", x: 48, y: 48, label: "Petersburg" },
    { id: "mccords_ford", x: 28, y: 62, label: "McCord's Ford" },
    { id: "winslow_still", x: 32, y: 78, label: "Winslow" },
    { id: "stendal_backbone", x: 62, y: 80, label: "Stendal" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-44 w-full md:h-80">
      <rect width="100" height="100" fill="#0c0b09" />
      <path d="M8 40 C 22 48, 40 55, 70 58 C 82 60, 90 72, 94 88" fill="none" stroke="#3a3228" strokeWidth="2" />
      <text x="70" y="54" fill="#8a8175" fontSize="3.2" fontFamily="IBM Plex Mono">
        Patoka
      </text>
      {nodes.map((n, i) => {
        const prev = nodes[Math.max(0, i - 1)];
        const inOrder = OUTBREAK_ORDER.indexOf(n.id as (typeof OUTBREAK_ORDER)[number]);
        return (
          <g key={n.id}>
            {inOrder > 0 && (
              <line
                x1={nodes.find((x) => x.id === OUTBREAK_ORDER[inOrder - 1])?.x}
                y1={nodes.find((x) => x.id === OUTBREAK_ORDER[inOrder - 1])?.y}
                x2={n.x}
                y2={n.y}
                stroke="#3a3228"
                strokeWidth="0.6"
                strokeDasharray="1.5 1"
              />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={selected === n.id ? 3.6 : 2.4}
              fill={cleared.includes(n.id) ? "#d4a017" : selected === n.id ? "#c23b22" : "#8a8175"}
              className="cursor-pointer"
              onClick={() => onPick(n.id)}
            />
            <text
              x={n.x + 4}
              y={n.y + 1.2}
              fill={selected === n.id ? "#e8e0d4" : "#8a8175"}
              fontSize="3.4"
              fontFamily="Oswald"
              className="cursor-pointer"
              onClick={() => onPick(n.id)}
            >
              {n.label}
            </text>
            <title>{prev.label}</title>
          </g>
        );
      })}
    </svg>
  );
}
