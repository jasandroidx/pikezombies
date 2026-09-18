import { LoreNote } from "@/types/game";
import { FileText, X, MapPin, Calendar, User, BookOpen } from "lucide-react";

interface LoreNoteModalProps {
  note: LoreNote;
  onClose: () => void;
}

export function LoreNoteModal({ note, onClose }: LoreNoteModalProps) {
  return (
    <div id="lore-note-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4" onClick={onClose}>
      <div className="relative w-full max-w-xl overflow-hidden rounded border border-border bg-surface p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded border border-accent/40 bg-surface-2 p-2.5 text-accent">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent">
                <BookOpen className="h-3.5 w-3.5" />
                Recovered paper
              </div>
              <h2 className="font-heading text-xl font-bold tracking-wide text-fg md:text-2xl">{note.title}</h2>
            </div>
          </div>
          <button
            id="close-lore-modal-btn"
            type="button"
            onClick={onClose}
            className="rounded border border-border bg-bg p-2 text-muted hover:text-fg"
            title="Close Note (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-4 rounded border border-border bg-bg px-3.5 py-2 font-mono text-[11px] text-muted">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-accent" />
            <span>
              {note.author}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span>{note.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span className="uppercase">{note.locationId.replace(/_/g, " ")}</span>
          </div>
        </div>

        <div className="custom-scrollbar max-h-72 space-y-3 overflow-y-auto pr-2">
          {note.content.map((paragraph, idx) => (
            <p key={idx} className="border-l-2 border-accent/50 bg-bg p-3 font-lore text-sm leading-relaxed text-fg italic md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
          <span className="font-mono uppercase tracking-widest text-accent">+250 · +50 scrap</span>
          <button
            id="dismiss-lore-modal-btn"
            type="button"
            onClick={onClose}
            className="rounded border border-accent bg-accent px-4 py-2 font-heading font-bold uppercase tracking-wider text-bg"
          >
            Fold it away
          </button>
        </div>
      </div>
    </div>
  );
}
