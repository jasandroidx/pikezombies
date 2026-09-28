import { useRef, useState, useEffect } from "react";
import { RotateCcw, Flame, ChevronLeft, ChevronRight, FileText, Footprints, ChevronsRight, Hammer } from "lucide-react";

interface MobileControlsProps {
  onMoveChange: (vec: { x: number; y: number }) => void;
  onAimChange: (vec: { x: number; y: number }) => void;
  onReload: () => void;
  onThrowMolotov: () => void;
  onPrevWeapon: () => void;
  onNextWeapon: () => void;
  onInteract?: () => void;
  onInteractHold?: (held: boolean) => void;
  onSneakToggle?: (on: boolean) => void;
  onDodge?: () => void;
  onBash?: () => void;
}

export function MobileControls({
  onMoveChange,
  onAimChange,
  onReload,
  onThrowMolotov,
  onPrevWeapon,
  onNextWeapon,
  onInteract,
  onInteractHold,
  onSneakToggle,
  onDodge,
  onBash,
}: MobileControlsProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [sneaking, setSneaking] = useState(false);
  const moveStickRef = useRef<HTMLDivElement>(null);
  const aimStickRef = useRef<HTMLDivElement>(null);
  const [movePos, setMovePos] = useState({ x: 0, y: 0 });
  const [aimPos, setAimPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (!isTouchDevice) return null;

  const handleStickTouch = (
    e: React.TouchEvent,
    stickRef: React.RefObject<HTMLDivElement | null>,
    setPos: (pos: { x: number; y: number }) => void,
    onChange: (vec: { x: number; y: number }) => void,
  ) => {
    if (!stickRef.current) return;
    const rect = stickRef.current.getBoundingClientRect();
    const touch = e.targetTouches[0];
    if (!touch) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    const maxDist = rect.width / 2;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxDist);
    const nx = (Math.cos(angle) * clampedDist) / maxDist;
    const ny = (Math.sin(angle) * clampedDist) / maxDist;
    setPos({ x: Math.cos(angle) * clampedDist, y: Math.sin(angle) * clampedDist });
    onChange({ x: nx, y: ny });
  };

  const handleStickEnd = (
    setPos: (pos: { x: number; y: number }) => void,
    onChange: (vec: { x: number; y: number }) => void,
  ) => {
    setPos({ x: 0, y: 0 });
    onChange({ x: 0, y: 0 });
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-end justify-between p-6 select-none">
      <div
        ref={moveStickRef}
        onTouchMove={(e) => handleStickTouch(e, moveStickRef, setMovePos, onMoveChange)}
        onTouchStart={(e) => handleStickTouch(e, moveStickRef, setMovePos, onMoveChange)}
        onTouchEnd={() => handleStickEnd(setMovePos, onMoveChange)}
        className="pointer-events-auto relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-border bg-surface/70"
      >
        <div
          className="h-12 w-12 rounded-full border border-accent bg-accent/80"
          style={{ transform: `translate(${movePos.x}px, ${movePos.y}px)` }}
        />
        <span className="absolute bottom-2 font-mono text-[9px] uppercase text-muted">Move</span>
      </div>

      <div className="pointer-events-auto mb-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPrevWeapon}
          className="rounded-full border border-border bg-surface/80 p-3 text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          title="Previous weapon"
          aria-label="Previous weapon"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {onSneakToggle && (
          <button
            type="button"
            onClick={() => {
              const next = !sneaking;
              setSneaking(next);
              onSneakToggle(next);
            }}
            className={`rounded-full border p-3 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${sneaking ? "border-accent bg-surface-2 text-accent" : "border-border bg-surface/80 text-fg"}`}
            title="Quiet step"
            aria-label="Quiet step"
          >
            <Footprints className="h-5 w-5" />
          </button>
        )}
        {onDodge && (
          <button
            type="button"
            onClick={onDodge}
            className="rounded-full border border-accent bg-surface-2 p-3.5 text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            title="Roll"
            aria-label="Roll"
          >
            <ChevronsRight className="h-5 w-5" />
          </button>
        )}
        {onBash && (
          <button
            type="button"
            onClick={onBash}
            className="rounded-full border border-border bg-surface/80 p-3.5 text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            title="Bash"
            aria-label="Bash"
          >
            <Hammer className="h-5 w-5" />
          </button>
        )}
        {onInteract && (
          <button
            type="button"
            onClick={onInteract}
            onTouchStart={() => onInteractHold?.(true)}
            onTouchEnd={() => onInteractHold?.(false)}
            onMouseDown={() => onInteractHold?.(true)}
            onMouseUp={() => onInteractHold?.(false)}
            className="rounded-full border border-accent bg-surface-2 p-3.5 text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            title="Interact"
            aria-label="Interact"
          >
            <FileText className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          onClick={onThrowMolotov}
          className="rounded-full border border-primary bg-surface-2 p-3.5 text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          title="Throw molotov"
          aria-label="Throw molotov"
        >
          <Flame className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={onReload}
          className="rounded-full border border-border bg-surface/80 p-3.5 text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          title="Reload weapon"
          aria-label="Reload weapon"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNextWeapon}
          className="rounded-full border border-border bg-surface/80 p-3 text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          title="Next weapon"
          aria-label="Next weapon"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={aimStickRef}
        onTouchMove={(e) => handleStickTouch(e, aimStickRef, setAimPos, onAimChange)}
        onTouchStart={(e) => handleStickTouch(e, aimStickRef, setAimPos, onAimChange)}
        onTouchEnd={() => handleStickEnd(setAimPos, onAimChange)}
        className="pointer-events-auto relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/60 bg-surface/70"
      >
        <div
          className="h-12 w-12 rounded-full border border-primary bg-primary/80"
          style={{ transform: `translate(${aimPos.x}px, ${aimPos.y}px)` }}
        />
        <span className="absolute bottom-2 font-mono text-[9px] uppercase text-primary">Aim / Fire</span>
      </div>
    </div>
  );
}
