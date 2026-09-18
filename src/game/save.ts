const KEY = "pcz_save_v2";
const SAVE_VERSION = 2;

export interface GameSave {
  version: number;
  highScore: number;
  bestWave: number;
  unlockedWeapons: string[];
  journal: string[];
  mapsCleared: string[];
  outbreakBeaten: boolean;
  lastRadio: string;
}

const defaults: GameSave = {
  version: SAVE_VERSION,
  highScore: 0,
  bestWave: 0,
  unlockedWeapons: ["revolver", "shotgun"],
  journal: [],
  mapsCleared: [],
  outbreakBeaten: false,
  lastRadio: "",
};

function migrate(raw: Partial<GameSave> & { version?: number }): GameSave {
  const s: GameSave = { ...defaults, ...raw, version: raw.version ?? 1 };
  if (s.version < 2) {
    s.unlockedWeapons = s.unlockedWeapons?.length ? s.unlockedWeapons : defaults.unlockedWeapons;
    s.version = 2;
  }
  return { ...defaults, ...s, version: SAVE_VERSION };
}

export function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const legacy = parseInt(localStorage.getItem("pike_county_high_score") || "0", 10);
      if (legacy > 0) return migrate({ highScore: legacy, version: 1 });
      return { ...defaults };
    }
    return migrate(JSON.parse(raw) as Partial<GameSave>);
  } catch {
    return { ...defaults };
  }
}

export function writeSave(patch: Partial<GameSave>) {
  try {
    const next = { ...loadSave(), ...patch, version: SAVE_VERSION };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    return loadSave();
  }
}

export function recordRun(opts: {
  score: number;
  wave: number;
  unlocked: string[];
  notes: string[];
  mapId?: string;
  outbreakWon?: boolean;
}) {
  const cur = loadSave();
  writeSave({
    highScore: Math.max(cur.highScore, opts.score),
    bestWave: Math.max(cur.bestWave, opts.wave),
    unlockedWeapons: Array.from(new Set([...cur.unlockedWeapons, ...opts.unlocked])),
    journal: Array.from(new Set([...cur.journal, ...opts.notes])),
    mapsCleared: opts.mapId ? Array.from(new Set([...cur.mapsCleared, opts.mapId])) : cur.mapsCleared,
    outbreakBeaten: cur.outbreakBeaten || Boolean(opts.outbreakWon),
  });
}
