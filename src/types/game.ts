export type WeaponType =
  | "revolver"
  | "shotgun"
  | "lever_rifle"
  | "carbine"
  | "crossbow"
  | "chainsaw"
  | "molotov";

export interface Weapon {
  id: WeaponType;
  name: string;
  category: string;
  description: string;
  damage: number;
  fireRate: number;
  pellets: number;
  spread: number;
  range: number;
  bulletSpeed: number;
  magazineSize: number;
  currentMag: number;
  reserveAmmo: number;
  maxReserveAmmo: number;
  reloadTime: number;
  pierce: number;
  soundType: "magnum" | "shotgun" | "rifle" | "carbine" | "crossbow" | "chainsaw" | "molotov";
  unlocked: boolean;
  cost: number;
  upgradeLevel: number;
}

export type ZombieType = "shambler" | "sprinter" | "miner_brute" | "bloater_spitter" | "behemoth" | "crawler";
export type ZombieAI = "wander" | "investigate" | "chase" | "attack";

export interface Zombie {
  id: string;
  type: ZombieType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  maxHealth: number;
  health: number;
  damage: number;
  attackCooldown: number;
  lastAttackTime: number;
  radius: number;
  color: string;
  hasHelmet?: boolean;
  isBurning?: number;
  burnTick?: number;
  animationFrame: number;
  scoreValue: number;
  scrapValue: number;
  spitCooldown?: number;
  ai: ZombieAI;
  hearX: number;
  hearY: number;
  wanderAngle: number;
  hitFlash: number;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  damage: number;
  pierce: number;
  rangeRemaining: number;
  weaponType: WeaponType;
  isMolotov?: boolean;
  isCrossbowBolt?: boolean;
  radius: number;
  color: string;
}

export interface AcidSpit {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  damage: number;
  remainingDistance: number;
}

export interface FirePuddle {
  id: string;
  x: number;
  y: number;
  radius: number;
  duration: number;
  createdTime: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type: "blood" | "smoke" | "spark" | "fire" | "shell" | "wood_splinter";
}

export interface BloodDecal {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  rotation: number;
}

export type PowerupType = "nuke" | "insta_kill" | "double_points" | "infinite_ammo" | "speed_boost";

export interface Drop {
  id: string;
  type: "ammo_universal" | "moonshine_med" | "scrap" | "molotov_pickup" | PowerupType;
  x: number;
  y: number;
  amount: number;
  duration: number;
}

export interface ActivePowerup {
  type: PowerupType;
  durationRemaining: number;
  totalDuration: number;
}

export interface ExplosiveBarrel {
  id: string;
  x: number;
  y: number;
  radius: number;
  health: number;
  maxHealth: number;
  isExploding?: boolean;
}

export interface Barricade {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  type: "wood_fence" | "sandbags" | "coal_cart";
}

export interface CellarHole {
  id: string;
  x: number;
  y: number;
  radius: number;
  boarded: boolean;
  boardHealth: number;
  maxBoardHealth: number;
  kind: "cellar" | "pit";
}

export interface NoisePulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

export type ObstacleType =
  | "cabin"
  | "pickup_truck"
  | "tree"
  | "rock"
  | "mine_entrance"
  | "crate"
  | "courthouse"
  | "highwall"
  | "still"
  | "barn"
  | "cruiser"
  | "workbench"
  | "spring"
  | "ford";

export interface MapObstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  color?: string;
  label?: string;
}

export interface StaticLight {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

export interface PlayerStats {
  kills: number;
  headshots: number;
  shotsFired: number;
  shotsHit: number;
  damageDealt: number;
  damageTaken: number;
  scrapCollected: number;
  wavesCompleted: number;
  survivalTime: number;
  notesFound: number;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  icon: string;
}

export interface LoreNote {
  id: string;
  locationId: string;
  title: string;
  author: string;
  date: string;
  content: string[];
  x: number;
  y: number;
  radius: number;
  collected?: boolean;
}

export interface GameLocation {
  id: string;
  name: string;
  countyZone: string;
  township: string;
  description: string;
  mapWidth: number;
  mapHeight: number;
  ambientLight: number;
  weather: "fog" | "rain" | "night_clear" | "mist";
  fogDensity: number;
  ground: string;
  trail: string;
  obstacles: MapObstacle[];
  barrels?: { x: number; y: number }[];
  loreNotes?: LoreNote[];
  lights?: StaticLight[];
  workbench: { x: number; y: number };
  extract: { x: number; y: number; radius: number };
  spawn?: { x: number; y: number };
  barricades?: { x: number; y: number; width: number; height: number; type: Barricade["type"] }[];
  holes?: { x: number; y: number; kind: CellarHole["kind"] }[];
  lantern?: { x: number; y: number };
  bell?: { x: number; y: number };
}

export interface Floater {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
  vy: number;
}

export interface EngineSnapshot {
  weapons: Weapon[];
  perks: Perk[];
  scrap: number;
  score: number;
  health: number;
  maxHealth: number;
  molotovs: number;
  stats: PlayerStats;
  combo: number;
  lanternWentOut: boolean;
}

export type GameMode = "survival" | "outbreak";
