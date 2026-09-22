// @ts-nocheck
import {
  Weapon,
  Zombie,
  Bullet,
  Particle,
  BloodDecal,
  Drop,
  FirePuddle,
  AcidSpit,
  GameLocation,
  PlayerStats,
  Perk,
  ExplosiveBarrel,
  ActivePowerup,
  PowerupType,
  LoreNote,
  Barricade,
  Floater,
  EngineSnapshot,
  CellarHole,
  NoisePulse,
} from "../types/game";
import { INITIAL_WEAPONS, AVAILABLE_PERKS, GAME_LOCATIONS, BOARD_COST } from "./constants";
import { soundEngine } from "../audio/soundEngine";
import { renderEnvironment } from "./mapRenderer";
import { DynamicLighting } from "./lighting";
import { radioFor } from "./radio";
import { drawSprite, drawWildLabel, loadArt, ZOMBIE_LABELS } from "./art";
import { FlowField } from "./flowfield";

declare global {
  interface Window {
    __controlsTest?: any;
  }
}

export interface GameEngineCallbacks {
  onWaveComplete: (wave: number) => void;
  onGameOver: (stats: PlayerStats, score: number, killer: string) => void;
  onLoreNoteFound?: (note: LoreNote) => void;
  onRadio?: (call: string, body: string) => void;
  onExtractReady?: () => void;
  onExtract?: () => void;
  onWorkbenchPrompt?: (near: boolean) => void;
  onStatsUpdate: (stats: any) => void;
}

export class GameEngine {
	canvas;
	ctx;
	callbacks;
	isRunning = false;
	isPaused = false;
	currentLocation;
	difficultyMultiplier = 1;
	player = {
		x: 1e3,
		y: 900,
		radius: 18,
		speed: 4.85,
		health: 100,
		maxHealth: 100,
		stamina: 100,
		maxStamina: 100,
		isSprinting: false,
		isSneaking: false,
		angle: 0,
		flashlightRange: 420,
		flashlightAngle: 0,
		molotovs: 3,
		maxMolotovs: 5
	};
	weapons = JSON.parse(JSON.stringify(INITIAL_WEAPONS));
	currentWeaponIndex = 0;
	perks = JSON.parse(JSON.stringify(AVAILABLE_PERKS));
	scrap = 150;
	score = 0;
	isMouseDown = false;
	lastShotTime = 0;
	isReloading = false;
	reloadStartTime = 0;
	muzzleFlashTimer = 0;
	screenShake = 0;
	wave = 1;
	waveState = `break`;
	waveBreakCountdown = 8;
	lastBreakTick = 0;
	zombiesToSpawn = 0;
	lastZombieSpawnTime = 0;
	zombies = [];
	bullets = [];
	acidSpits = [];
	firePuddles = [];
	particles = [];
	bloodDecals = [];
	drops = [];
	explosiveBarrels = [];
	activePowerups = [];
	loreNotes = [];
	barricades = [];
	holes = [];
	extractActive = false;
	outbreakWaves = 0;
	lastKiller = `shambler`;
	nearWorkbench = false;
	interactHint = ``;
	lanternLit = false;
	lanternWentOut = false;
	bellReady = false;
	bellRung = false;
	bellHold = 0;
	holdInteract = false;
	forceSneak = false;
	bellLureUntil = 0;
	lastSprintNoise = 0;
	noisePulses = [];
	camX = 0;
	camY = 0;
	trauma = 0;
	hitstop = 0;
	floaters = [];
	simTime = 0;
	lastMoveSpeed = 0;
	walkPhase = 0;
	moveVX = 0;
	moveVY = 0;
	bodyFacing = 1;
	bodyFacingSmooth = 1;
	sprintBlend = 1;
	recoilKick = 0;
	lastDt = 1 / 60;
	footstepArmed = true;
	dodgeTimer = 0;
	dodgeCd = 0;
	dodgeDirX = 1;
	dodgeDirY = 0;
	bashCd = 0;
	bashSwing = 0;
	invuln = 0;
	bloodRush = 0;
	rushKills = 0;
	rushWindow = 0;
	lastStandUsed = false;
	worldSlow = 0;
	fogUntil = 0;
	eventCd = 14;
	afterimages = [];
	pumpAnim = 0;
	switchBanner = 0;
	flow = new FlowField();
	flowRebuild = 0;
	lighting;
	comboMultiplier = 1;
	lastKillTime = 0;
	stats = {
		kills: 0,
		headshots: 0,
		shotsFired: 0,
		shotsHit: 0,
		damageDealt: 0,
		damageTaken: 0,
		scrapCollected: 0,
		wavesCompleted: 0,
		survivalTime: 0,
		notesFound: 0
	};
	gameStartTime = 0;
	keys = {};
	mousePos = {
		x: 0,
		y: 0
	};
	virtualJoystickMove = {
		x: 0,
		y: 0
	};
	virtualJoystickAim = {
		x: 0,
		y: 0
	};
	animationFrameId = null;
	lastTimestamp = 0;
	constructor(e, t, n = 0) {
		this.canvas = e, this.ctx = e.getContext(`2d`), this.callbacks = t, this.currentLocation = GAME_LOCATIONS[n] || GAME_LOCATIONS[0], this.lighting = new DynamicLighting(), this.placePlayerSafely(), this.camX = this.player.x, this.camY = this.player.y, this.initExplosiveBarrels(), this.initLoreNotes(), this.initBarricades(), this.initHoles(), this.rebuildFlow(true), this.setupListeners(), this.installControlsProbe();
		loadArt();
	}
	initBarricades() {
		let e = this.currentLocation.barricades || [];
		this.barricades = e.map((e, t) => ({
			id: `bar_${t}`,
			x: e.x,
			y: e.y,
			width: e.width,
			height: e.height,
			health: e.type === `coal_cart` ? 220 : e.type === `sandbags` ? 160 : 90,
			maxHealth: e.type === `coal_cart` ? 220 : e.type === `sandbags` ? 160 : 90,
			type: e.type
		}));
	}
	placePlayerSafely() {
		let e = this.currentLocation;
		if (this.player.x = e.spawn?.x ?? e.mapWidth / 2, this.player.y = e.spawn?.y ?? e.mapHeight / 2 + 200, this.checkObstacleCollision(this.player.x, this.player.y, this.player.radius)) for (let t = 40; t <= 420; t += 24) for (let n = 0; n < Math.PI * 2; n += Math.PI / 8) {
			let r = this.player.x + Math.cos(n) * t, i = this.player.y + Math.sin(n) * t;
			if (r > this.player.radius && i > this.player.radius && r < e.mapWidth - this.player.radius && i < e.mapHeight - this.player.radius && !this.checkObstacleCollision(r, i, this.player.radius)) {
				this.player.x = r, this.player.y = i;
				return;
			}
		}
	}
	rebuildFlow(force = false) {
		const loc = this.currentLocation;
		const blocks = [
			...(loc.obstacles || []),
			...this.barricades.filter((b) => b.health > 0).map((b) => ({ x: b.x, y: b.y, width: b.width, height: b.height })),
		];
		this.flow.markBlocked(loc.mapWidth, loc.mapHeight, blocks);
		this.flow.rebuild(this.player.x, this.player.y);
		this.flowRebuild = 0.35;
	}
	exportSnapshot() {
		return {
			weapons: JSON.parse(JSON.stringify(this.weapons)),
			perks: JSON.parse(JSON.stringify(this.perks)),
			scrap: this.scrap,
			score: this.score,
			health: this.player.health,
			maxHealth: this.player.maxHealth,
			molotovs: this.player.molotovs,
			stats: { ...this.stats },
			combo: this.comboMultiplier,
			lanternWentOut: this.lanternWentOut
		};
	}
	importSnapshot(e) {
		this.weapons = JSON.parse(JSON.stringify(e.weapons)), this.perks = JSON.parse(JSON.stringify(e.perks)), this.scrap = e.scrap, this.score = e.score, this.player.health = e.health, this.player.maxHealth = e.maxHealth, this.player.molotovs = e.molotovs, this.stats = { ...e.stats }, this.comboMultiplier = e.combo, this.lanternWentOut = !!e.lanternWentOut;
	}
	installControlsProbe() {
		window.__controlsTest = {
			getYaw: () => this.player.angle,
			getSpeed: () => this.lastMoveSpeed,
			getX: () => this.player.x,
			getY: () => this.player.y,
			setKeys: (e) => {
				this.keys = {};
				for (let t of e) this.keys[t] = true;
			},
			setAim: (x, y) => {
				this.player.angle = Math.atan2(y, x);
				this.player.flashlightAngle = this.player.angle;
				const cx = this.canvas.width / 2;
				const cy = this.canvas.height / 2;
				this.mousePos.x = cx + x * 220;
				this.mousePos.y = cy + y * 220;
			}
		};
		let e = window.__controlsTest;
		e.teleport = (e, t) => {
			this.player.x = e, this.player.y = t, this.camX = e, this.camY = t;
			this.moveVX = 0;
			this.moveVY = 0;
			this.dodgeTimer = 0;
		}, e.getHoles = () => this.holes.map((e) => ({
			id: e.id,
			x: e.x,
			y: e.y,
			boarded: e.boarded,
			kind: e.kind
		})), e.boardNearest = () => {
			let e = this.nearestHole(9999);
			return e && this.boardHole(e), this.holes.filter((e) => e.boarded).length;
		}, e.getLantern = () => ({
			lit: this.lanternLit,
			wentOut: this.lanternWentOut,
			x: this.currentLocation.lantern?.x ?? 0,
			y: this.currentLocation.lantern?.y ?? 0
		}), e.snuffLantern = () => this.snuffLantern(), e.relightLantern = () => this.relightLantern(), e.emitNoise = (e = 480) => (this.alertZombies(this.player.x, this.player.y, e), this.noisePulses.length), e.getNoiseCount = () => this.noisePulses.length, e.armBell = () => {
			this.bellReady = true, this.bellRung = false;
		}, e.ringBell = () => this.ringBell(), e.getBell = () => ({
			ready: this.bellReady,
			rung: this.bellRung,
			hold: this.bellHold,
			lureUntil: this.bellLureUntil,
			extract: this.extractActive
		}), e.interact = () => this.interactLoreNote(), e.pullHorde = () => {
			this.zombies.forEach((z, i) => {
				const a = i / Math.max(1, this.zombies.length) * Math.PI * 2;
				z.x = this.player.x + Math.cos(a) * 110;
				z.y = this.player.y + Math.sin(a) * 90;
				z.ai = "chase";
			});
			return this.zombies.length;
		}, e.dodge = () => this.tryDodge(), e.bash = () => this.tryBash(), e.getKit = () => ({
			dodgeTimer: this.dodgeTimer,
			dodgeCd: this.dodgeCd,
			invuln: this.invuln,
			bloodRush: this.bloodRush,
			lastStandUsed: this.lastStandUsed,
			worldSlow: this.worldSlow,
			stamina: this.player.stamina,
			x: this.player.x,
			y: this.player.y
		}), e.forceLastStand = () => {
			this.lastStandUsed = false;
			this.invuln = 0;
			this.player.health = 8;
			this.damagePlayer(40);
			return {
				health: this.player.health,
				lastStandUsed: this.lastStandUsed,
				invuln: this.invuln
			};
		}, e.spawn = (type, x, y) => {
			this.pushZombie(type || "shambler", x, y);
			return this.zombies.length;
		}, e.setWeapon = (i) => this.selectWeapon(i), e.getWeapon = () => this.weapons[this.currentWeaponIndex].id, e.fire = () => this.fireCurrentWeapon(), e.holdFire = (on) => {
			this.isMouseDown = !!on;
		}, e.aimWorld = (x, y) => {
			this.player.angle = Math.atan2(y - this.player.y, x - this.player.x);
			this.player.flashlightAngle = this.player.angle;
			const cx = this.canvas.width / 2, cy = this.canvas.height / 2;
			this.mousePos.x = cx + Math.cos(this.player.angle) * 220;
			this.mousePos.y = cy + Math.sin(this.player.angle) * 220;
		}, e.getWorld = () => ({
			alive: this.isRunning && this.player.health > 0,
			paused: this.isPaused,
			health: this.player.health,
			stamina: this.player.stamina,
			x: this.player.x,
			y: this.player.y,
			weapon: this.weapons[this.currentWeaponIndex].id,
			mag: this.weapons[this.currentWeaponIndex].currentMag,
			reserve: this.weapons[this.currentWeaponIndex].reserveAmmo,
			scrap: this.scrap,
			score: this.score,
			wave: this.wave,
			waveState: this.waveState,
			break: this.waveBreakCountdown,
			kills: this.stats.kills,
			hint: this.interactHint,
			lantern: this.lanternLit,
			sneaking: this.player.isSneaking,
			bloodRush: this.bloodRush,
			lastStand: this.lastStandUsed,
			invuln: this.invuln,
			zombies: this.zombies.map((z) => ({ x: z.x, y: z.y, type: z.type, hp: z.health, ai: z.ai })),
			holes: this.holes.map((h) => ({ x: h.x, y: h.y, boarded: h.boarded })),
			map: { w: this.currentLocation.mapWidth, h: this.currentLocation.mapHeight, name: this.currentLocation.name },
		}), e.skipBreak = () => this.skipWaveBreak();
	}
	initLoreNotes() {
		this.loreNotes = [], this.currentLocation.loreNotes && this.currentLocation.loreNotes.length > 0 && (this.loreNotes = this.currentLocation.loreNotes.map((e) => ({
			...e,
			collected: false
		})));
	}
	initHoles() {
		let e = this.currentLocation.holes || [];
		this.holes = e.map((e, t) => ({
			id: `hole_${t}`,
			x: e.x,
			y: e.y,
			radius: e.kind === `pit` ? 28 : 22,
			boarded: false,
			boardHealth: 90,
			maxBoardHealth: 90,
			kind: e.kind
		}));
	}
	hasPowerup(e) {
		return this.activePowerups.some((t) => t.type === e && t.durationRemaining > 0);
	}
	activatePowerup(e) {
		if (soundEngine.playPowerup(), e === `nuke`) {
			this.detonateNuke();
			return;
		}
		let t = this.activePowerups.find((t) => t.type === e);
		t ? (t.durationRemaining = 3e4, t.totalDuration = 3e4) : this.activePowerups.push({
			type: e,
			durationRemaining: 3e4,
			totalDuration: 3e4
		}), e === `speed_boost` && (this.player.stamina = this.player.maxStamina);
	}
	detonateNuke() {
		soundEngine.playNuke(), this.screenShake = 14;
		for (let e = 0; e < 60; e++) {
			let e = Math.random() * Math.PI * 2, t = Math.random() * 500;
			this.particles.push({
				x: this.player.x + Math.cos(e) * t,
				y: this.player.y + Math.sin(e) * t,
				vx: (Math.random() - .5) * 12,
				vy: (Math.random() - .5) * 12,
				size: 5 + Math.random() * 8,
				color: Math.random() < .6 ? `#fde047` : `#f97316`,
				alpha: 1,
				life: .8 + Math.random() * .4,
				maxLife: 1.2,
				type: `fire`
			});
		}
		this.zombies.length;
		for (let e = this.zombies.length - 1; e >= 0; e--) {
			let t = this.zombies[e];
			this.score += t.scoreValue, this.scrap += t.scrapValue, this.stats.kills++, this.bloodDecals.push({
				x: t.x,
				y: t.y,
				radius: t.radius * 1.5,
				alpha: .8,
				rotation: Math.random() * Math.PI * 2
			});
		}
		this.zombies = [];
	}
	updatePowerups(e) {
		let t = e * 1e3;
		for (let e = this.activePowerups.length - 1; e >= 0; e--) {
			let n = this.activePowerups[e];
			n.durationRemaining -= t, n.durationRemaining <= 0 && this.activePowerups.splice(e, 1);
		}
	}
	interactLoreNote() {
		if (this.extractActive) {
			let e = this.currentLocation.extract;
			if (Math.hypot(this.player.x - e.x, this.player.y - e.y) <= e.radius + 12) {
				this.callbacks.onExtract?.();
				return;
			}
		}
		let e = this.currentLocation.lantern;
		if (e && Math.hypot(this.player.x - e.x, this.player.y - e.y) < 78) {
			this.lanternLit || this.relightLantern();
			return;
		}
		let t = this.nearestHole(92);
		if (t && !t.boarded) {
			this.boardHole(t);
			return;
		}
		let n = this.currentLocation.workbench;
		if (Math.hypot(this.player.x - n.x, this.player.y - n.y) < 70) {
			this.callbacks.onWorkbenchPrompt?.(true);
			return;
		}
		let r = null, i = 65;
		for (let e of this.loreNotes) {
			if (e.collected) continue;
			let t = Math.hypot(this.player.x - e.x, this.player.y - e.y);
			t < i && (i = t, r = e);
		}
		r && (r.collected = true, soundEngine.playLoreNote(), this.score += 250, this.scrap += 50, this.stats.notesFound += 1, this.callbacks.onLoreNoteFound && this.callbacks.onLoreNoteFound(r));
	}
	initExplosiveBarrels() {
		this.explosiveBarrels = [], this.currentLocation.barrels && this.currentLocation.barrels.length > 0 && (this.explosiveBarrels = this.currentLocation.barrels.map((e, t) => ({
			id: `barrel_${t}_${Date.now()}`,
			x: e.x,
			y: e.y,
			radius: 18,
			health: 45,
			maxHealth: 45
		})));
	}
	setupListeners() {
		window.addEventListener(`keydown`, this.handleKeyDown), window.addEventListener(`keyup`, this.handleKeyUp), this.canvas.addEventListener(`mousemove`, this.handleMouseMove), this.canvas.addEventListener(`mousedown`, this.handleMouseDown), window.addEventListener(`mouseup`, this.handleMouseUp), this.canvas.addEventListener(`contextmenu`, (e) => e.preventDefault()), this.canvas.addEventListener(`wheel`, this.handleWheel, { passive: true });
	}
	destroy() {
		this.stop(), window.removeEventListener(`keydown`, this.handleKeyDown), window.removeEventListener(`keyup`, this.handleKeyUp), this.canvas.removeEventListener(`mousemove`, this.handleMouseMove), this.canvas.removeEventListener(`mousedown`, this.handleMouseDown), window.removeEventListener(`mouseup`, this.handleMouseUp), this.canvas.removeEventListener(`wheel`, this.handleWheel);
	}
	start(e = 1) {
		this.difficultyMultiplier = e, this.isRunning = true, this.isPaused = false, this.gameStartTime = Date.now(), this.lastTimestamp = performance.now(), this.wave = 0, this.waveState = `break`, this.waveBreakCountdown = 8, this.extractActive = false, this.bellReady = false, this.bellRung = false, this.bellHold = 0, this.bellLureUntil = 0, this.lastBreakTick = Date.now(), this.lanternLit = this.currentLocation.lantern ? !this.lanternWentOut : false, this.initHoles(), this.rebuildFlow(true), soundEngine.init(), soundEngine.startAtmosphericMusic(), this.lanternWentOut && !this.currentLocation.lantern && this.callbacks.onRadio?.(`Unknown`, `The lantern went out at the springs. They're thicker on the Trace.`), this.holes.length && this.callbacks.onRadio?.(`WJPS`, `Board those cellars or run the Trace. They come up through the floor if you linger.`), this.loop(performance.now());
	}
	stop() {
		this.isRunning = false, this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), soundEngine.stopAtmosphericMusic();
	}
	setPaused(e) {
		this.isPaused = e, !e && this.isRunning && (this.lastTimestamp = performance.now(), this.loop(performance.now()));
	}
	handleKeyDown = (e) => {
		if (e.code === `Space`) e.preventDefault();
		if (this.keys[e.code] = true, !this.isPaused) {
			if (e.code === `KeyR` && this.reloadCurrentWeapon(), e.code === `KeyE`) {
				let e = this.currentLocation.bell;
				e && this.bellReady && !this.bellRung && Math.hypot(this.player.x - e.x, this.player.y - e.y) < 80 || this.interactLoreNote();
			}
			e.code === `Digit1` && this.selectWeapon(0), e.code === `Digit2` && this.selectWeapon(1), e.code === `Digit3` && this.selectWeapon(2), e.code === `Digit4` && this.selectWeapon(3), e.code === `Digit5` && this.selectWeapon(4), e.code === `Digit6` && this.selectWeapon(5);
			if (e.code === `KeyQ`) this.throwMolotov();
			if (e.code === `Space`) this.tryDodge();
			if (e.code === `KeyF` || e.code === `KeyV`) this.tryBash();
		}
	};
	handleKeyUp = (e) => {
		this.keys[e.code] = false;
	};
	handleMouseMove = (e) => {
		let t = this.canvas.getBoundingClientRect();
		this.mousePos.x = e.clientX - t.left, this.mousePos.y = e.clientY - t.top;
	};
	handleMouseDown = (e) => {
		e.button === 0 ? this.isMouseDown = true : e.button === 2 && (e.preventDefault(), this.tryBash());
	};
	handleMouseUp = () => {
		this.isMouseDown = false;
	};
	handleWheel = (e) => {
		e.deltaY > 0 ? this.nextWeapon() : e.deltaY < 0 && this.prevWeapon();
	};
	selectWeapon(e) {
		if (!this.weapons[e] || !this.weapons[e].unlocked) return false;
		if (this.currentWeaponIndex !== e) {
			this.switchBanner = 1.6;
			this.spawnFloater(this.player.x, this.player.y - 44, this.weapons[e].name, "#d4a017");
			soundEngine.playPickup();
		}
		this.currentWeaponIndex = e;
		this.isReloading = false;
		return true;
	}
	nextWeapon() {
		let e = (this.currentWeaponIndex + 1) % this.weapons.length;
		for (; !this.weapons[e].unlocked && e !== this.currentWeaponIndex;) e = (e + 1) % this.weapons.length;
		this.selectWeapon(e);
	}
	prevWeapon() {
		let e = (this.currentWeaponIndex - 1 + this.weapons.length) % this.weapons.length;
		for (; !this.weapons[e].unlocked && e !== this.currentWeaponIndex;) e = (e - 1 + this.weapons.length) % this.weapons.length;
		this.selectWeapon(e);
	}
	reloadCurrentWeapon() {
		let e = this.weapons[this.currentWeaponIndex];
		if (e.reserveAmmo <= 0 && e.currentMag <= 0) {
			this.autoSwapFromDry();
			return;
		}
		!this.isReloading && e.currentMag < e.magazineSize && e.reserveAmmo > 0 && (this.isReloading = true, this.reloadStartTime = Date.now(), soundEngine.playReload(), e.id === `shotgun` && this.alertZombies(this.player.x, this.player.y, 240));
	}
	autoSwapFromDry() {
		const cur = this.weapons[this.currentWeaponIndex];
		if (cur.currentMag > 0 || cur.reserveAmmo > 0) return false;
		for (let i = 1; i < this.weapons.length; i++) {
			const idx = (this.currentWeaponIndex + i) % this.weapons.length;
			const w = this.weapons[idx];
			if (!w.unlocked) continue;
			if (w.currentMag > 0 || w.reserveAmmo > 0) {
				this.selectWeapon(idx);
				this.spawnFloater(this.player.x, this.player.y - 48, `${cur.name.split(" ").pop()} DRY`, "#e11d2e");
				this.callbacks.onRadio?.("Unknown", `${cur.name} is dry. ${w.name}.`);
				return true;
			}
		}
		this.spawnFloater(this.player.x, this.player.y - 44, "EMPTY", "#e11d2e");
		return false;
	}
	throwMolotov() {
		if (this.player.molotovs <= 0) return;
		this.player.molotovs--;
		let e = {
			id: Math.random().toString(),
			x: this.player.x,
			y: this.player.y,
			vx: Math.cos(this.player.angle) * 11,
			vy: Math.sin(this.player.angle) * 11,
			damage: 150,
			pierce: 1,
			rangeRemaining: 340,
			weaponType: `molotov`,
			isMolotov: true,
			radius: 6,
			color: `#f59e0b`
		};
		this.bullets.push(e), soundEngine.playGunshot(`molotov`), this.alertZombies(this.player.x, this.player.y, 360);
	}
	skipWaveBreak() {
		this.waveState === `break` && !this.extractActive && !this.bellReady && (this.waveBreakCountdown = 0);
	}
	loop = (e) => {
		if (!this.isRunning || this.isPaused) return;
		let t = Math.min((e - this.lastTimestamp) / 1e3, .1);
		this.lastTimestamp = e, this.update(t), this.render(), this.animationFrameId = requestAnimationFrame(this.loop);
	};
	update(e) {
		let t = Date.now();
		if (this.simTime += e, this.hitstop > 0) {
			this.hitstop -= e, this.render();
			return;
		}
		this.trauma = Math.max(0, this.trauma - e * 1.6);
		for (let t = this.floaters.length - 1; t >= 0; t--) {
			let n = this.floaters[t];
			n.y += n.vy * e, n.life -= e, n.life <= 0 && this.floaters.splice(t, 1);
		}
		this.updatePowerups(e), this.updatePlayer(e), this.updateWeapons(t), this.updateBullets(e, t), this.updateAcidSpits(e), this.updateFirePuddles(t), this.updateWaveManager(t), this.updateHordeEvents(e), this.updateZombies(e, t), this.updateDrops(), this.updateParticles(e), t - this.lastKillTime > 4500 && this.comboMultiplier > 1 && (this.comboMultiplier = 1), this.screenShake > 0 && (this.screenShake = Math.max(0, this.screenShake - e * 25)), this.muzzleFlashTimer > 0 && (this.muzzleFlashTimer -= e * 10), this.updateLantern(), this.updateBellHold(e), this.updateNoisePulses(e);
		this.dodgeCd = Math.max(0, this.dodgeCd - e);
		this.bashCd = Math.max(0, this.bashCd - e);
		this.bashSwing = Math.max(0, this.bashSwing - e);
		this.invuln = Math.max(0, this.invuln - e);
		this.bloodRush = Math.max(0, this.bloodRush - e);
		this.worldSlow = Math.max(0, this.worldSlow - e);
		this.fogUntil = Math.max(0, this.fogUntil - e);
		this.pumpAnim = Math.max(0, this.pumpAnim - e * 28);
		this.switchBanner = Math.max(0, this.switchBanner - e);
		this.player.flashlightRange = this.fogUntil > 0 ? 240 : 420;
		this.flowRebuild -= e;
		if (this.flowRebuild <= 0) this.rebuildFlow();
		for (let k = this.afterimages.length - 1; k >= 0; k--) {
			this.afterimages[k].life -= e;
			if (this.afterimages[k].life <= 0) this.afterimages.splice(k, 1);
		}
		let n = this.weapons[this.currentWeaponIndex], r = this.isReloading ? Math.min(1, (t - this.reloadStartTime) / n.reloadTime) : 0, i = this.currentLocation.workbench;
		this.nearWorkbench = Math.hypot(this.player.x - i.x, this.player.y - i.y) < 70;
		let a = this.waveState === `break` && this.loreNotes.find((e) => !e.collected && Math.hypot(this.player.x - e.x, this.player.y - e.y) < 65), o = this.extractActive && Math.hypot(this.player.x - this.currentLocation.extract.x, this.player.y - this.currentLocation.extract.y) <= this.currentLocation.extract.radius + 12, s = this.currentLocation.lantern, c = !!(s && Math.hypot(this.player.x - s.x, this.player.y - s.y) < 78), l = this.nearestHole(92), u = this.currentLocation.bell, d = !!(u && Math.hypot(this.player.x - u.x, this.player.y - u.y) < 80);
		this.interactHint = o ? `Hold [E] — extract` : this.bellReady && !this.bellRung && d ? `Hold [E] — ring the bell` : c && !this.lanternLit ? `Press [E] — relight lantern` : l && !l.boarded ? this.scrap < 25 ? `Need 25 scrap to board` : `Press [E] — board hole (25 scrap)` : a ? `Press [E] to read note` : this.nearWorkbench ? `Press [E] — workbench` : ``, this.callbacks.onStatsUpdate({
			health: this.player.health,
			maxHealth: this.player.maxHealth,
			stamina: this.player.stamina,
			weapon: n,
			molotovs: this.player.molotovs,
			score: this.score,
			scrap: this.scrap,
			combo: this.comboMultiplier,
			wave: this.waveState === `break` ? Math.max(1, this.wave + 1) : Math.max(1, this.wave),
			waveTimer: this.waveState === `break` ? this.waveBreakCountdown : 0,
			zombiesRemaining: this.zombies.length + this.zombiesToSpawn,
			isReloading: this.isReloading,
			reloadProgress: r,
			activePowerups: this.activePowerups,
			nearWorkbench: this.nearWorkbench,
			extractActive: this.extractActive,
			interactHint: this.interactHint,
			lanternLit: this.lanternLit,
			hasLantern: !!this.currentLocation.lantern,
			sneaking: this.player.isSneaking,
			bellReady: this.bellReady && !this.bellRung,
			bellHold: this.bellHold / 2.2,
			holesOpen: this.holes.filter((e) => !e.boarded).length,
			holesTotal: this.holes.length,
			bloodRush: this.bloodRush > 0,
			lastStandReady: !this.lastStandUsed,
			dodgeReady: this.dodgeCd <= 0 && this.player.stamina >= 20,
			fog: this.fogUntil > 0,
			weaponIndex: this.currentWeaponIndex,
			loadout: this.weapons.map((w) => ({
				id: w.id,
				name: w.name,
				unlocked: w.unlocked,
				mag: w.currentMag,
				reserve: w.reserveAmmo
			})),
			switchBanner: this.switchBanner,
			helpVisible: this.stats.shotsFired === 0 && this.simTime < 12
		});
	}
	updatePlayer(e) {
		this.lastDt = e;
		let t = 0, n = 0;
		(this.keys.KeyW || this.keys.ArrowUp) && --n, (this.keys.KeyS || this.keys.ArrowDown) && (n += 1), (this.keys.KeyA || this.keys.ArrowLeft) && --t, (this.keys.KeyD || this.keys.ArrowRight) && (t += 1), (this.virtualJoystickMove.x !== 0 || this.virtualJoystickMove.y !== 0) && (t = this.virtualJoystickMove.x, n = this.virtualJoystickMove.y);
		let r = Math.hypot(t, n);
		r > 0 && (t /= r, n /= r);
		if (this.virtualJoystickAim.x !== 0 || this.virtualJoystickAim.y !== 0) this.player.angle = Math.atan2(this.virtualJoystickAim.y, this.virtualJoystickAim.x);
		else {
			const cx = this.canvas.width / 2, cy = this.canvas.height / 2;
			this.player.angle = Math.atan2(this.mousePos.y - cy, this.mousePos.x - cx);
		}
		this.player.flashlightAngle = this.player.angle;
		const aimX = Math.cos(this.player.angle);
		const aimY = Math.sin(this.player.angle);
		let i = this.hasPowerup(`speed_boost`);
		let a = this.forceSneak || this.keys.ControlLeft || this.keys.ControlRight;
		let o = (this.keys.ShiftLeft || this.keys.ShiftRight) && r > 0 && !a && this.player.stamina > 4;
		this.player.isSneaking = !!a;
		if (o && (this.player.stamina > 5 || i)) {
			this.player.isSprinting = true;
			if (!i) this.player.stamina = Math.max(0, this.player.stamina - e * 26);
		} else {
			this.player.isSprinting = false;
			this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + e * (r > 0 ? 12 : 20));
		}
		const sprintWant = this.player.isSprinting ? 1.55 : 1;
		this.sprintBlend += (sprintWant - this.sprintBlend) * (1 - Math.exp(-(this.player.isSprinting ? 7 : 11) * e));
		let gait = (this.player.isSneaking ? .5 : 1) * this.sprintBlend * (i ? 1.32 : 1);
		if (this.bloodRush > 0) gait *= 1.22;
		if (r > 0) {
			const fwd = t * aimX + n * aimY;
			const side = t * -aimY + n * aimX;
			if (fwd < -.18) gait *= .68;
			else if (Math.abs(side) > Math.abs(fwd) + .12) gait *= .84;
		}
		const c = this.player.speed * gait;
		const accel = this.player.isSneaking ? 9 : r > 0 ? 20 : 10;
		if (r > 0) {
			this.moveVX += (t * c - this.moveVX) * (1 - Math.exp(-accel * e));
			this.moveVY += (n * c - this.moveVY) * (1 - Math.exp(-accel * e));
		} else {
			this.moveVX += (0 - this.moveVX) * (1 - Math.exp(-12 * e));
			this.moveVY += (0 - this.moveVY) * (1 - Math.exp(-12 * e));
			if (Math.hypot(this.moveVX, this.moveVY) < .12) {
				this.moveVX = 0;
				this.moveVY = 0;
			}
		}
		this.lastMoveSpeed = Math.hypot(this.moveVX, this.moveVY);
		if (this.dodgeTimer > 0) {
			this.dodgeTimer = Math.max(0, this.dodgeTimer - e);
			this.moveVX = this.dodgeDirX * 9.6;
			this.moveVY = this.dodgeDirY * 9.6;
			this.lastMoveSpeed = 9.6;
			if (this.simTime * 40 % 1 < .35) this.afterimages.push({
				x: this.player.x,
				y: this.player.y,
				facing: this.bodyFacing,
				life: .18,
				maxLife: .18
			});
		}
		if (this.lastMoveSpeed > .7) {
			if (this.moveVX > .55) this.bodyFacing = 1;
			else if (this.moveVX < -.55) this.bodyFacing = -1;
		} else if (aimX < -.38) this.bodyFacing = -1;
		else if (aimX > .38) this.bodyFacing = 1;
		this.bodyFacingSmooth += (this.bodyFacing - this.bodyFacingSmooth) * (1 - Math.exp(-16 * e));
		const stepRate = this.player.isSneaking ? 6.5 : this.player.isSprinting ? 12.5 : 8.6;
		const prevPhase = this.walkPhase;
		if (this.lastMoveSpeed > .4) {
			this.walkPhase += e * stepRate * Math.min(1.35, this.lastMoveSpeed / Math.max(.2, this.player.speed));
			const s0 = Math.sin(prevPhase);
			const s1 = Math.sin(this.walkPhase);
			if (this.footstepArmed && s0 <= 0 && s1 > 0) {
				this.footstepArmed = false;
				this.emitFootstep();
			}
			if (s1 < -.2) this.footstepArmed = true;
		} else {
			this.walkPhase += e * 1.4;
			this.footstepArmed = true;
		}
		this.recoilKick = Math.max(0, this.recoilKick - e * 16);
		const l = e * 60;
		const u = this.player.x + this.moveVX * l;
		const d = this.player.y + this.moveVY * l;
		const rad = this.player.radius;
		const clampX = (x) => Math.max(rad, Math.min(this.currentLocation.mapWidth - rad, x));
		const clampY = (y) => Math.max(rad, Math.min(this.currentLocation.mapHeight - rad, y));
		if (!this.checkObstacleCollision(u, this.player.y, rad)) this.player.x = clampX(u);
		else {
			const step = Math.max(3.2, Math.abs(this.moveVY) * l + 3);
			for (const sy of [this.player.y - step, this.player.y + step, this.player.y - step * 2, this.player.y + step * 2]) {
				if (!this.checkObstacleCollision(this.player.x, sy, rad * .92) && !this.checkObstacleCollision(u, sy, rad * .92)) {
					this.player.y = clampY(sy);
					if (!this.checkObstacleCollision(u, this.player.y, rad)) this.player.x = clampX(u);
					break;
				}
			}
		}
		if (!this.checkObstacleCollision(this.player.x, d, rad)) this.player.y = clampY(d);
		else {
			const step = Math.max(3.2, Math.abs(this.moveVX) * l + 3);
			for (const sx of [this.player.x - step, this.player.x + step, this.player.x - step * 2, this.player.x + step * 2]) {
				if (!this.checkObstacleCollision(sx, this.player.y, rad * .92) && !this.checkObstacleCollision(sx, d, rad * .92)) {
					this.player.x = clampX(sx);
					if (!this.checkObstacleCollision(this.player.x, d, rad)) this.player.y = clampY(d);
					break;
				}
			}
		}
		if (this.player.isSprinting && r > 0 && this.simTime - this.lastSprintNoise > .48) {
			this.lastSprintNoise = this.simTime;
			this.alertZombies(this.player.x, this.player.y, 160);
		}
	}
	emitFootstep() {
		const dirX = this.lastMoveSpeed > .2 ? this.moveVX / this.lastMoveSpeed : 0;
		const dirY = this.lastMoveSpeed > .2 ? this.moveVY / this.lastMoveSpeed : 0;
		for (let i = 0; i < 3; i++) this.particles.push({
			x: this.player.x - dirX * 6 + (Math.random() - .5) * 8,
			y: this.player.y + 10 - dirY * 4 + (Math.random() - .5) * 4,
			vx: -dirX * .4 + (Math.random() - .5) * .6,
			vy: -.4 - Math.random() * .5,
			size: 1.6 + Math.random() * 2.2,
			color: "rgba(90, 74, 52, 0.55)",
			alpha: .7,
			life: .28 + Math.random() * .16,
			maxLife: .4,
			type: "dust"
		});
	}
	tryDodge() {
		if (this.dodgeCd > 0 || this.dodgeTimer > 0 || this.player.stamina < 20) return false;
		let ix = 0, iy = 0;
		(this.keys.KeyW || this.keys.ArrowUp) && --iy;
		(this.keys.KeyS || this.keys.ArrowDown) && (iy += 1);
		(this.keys.KeyA || this.keys.ArrowLeft) && --ix;
		(this.keys.KeyD || this.keys.ArrowRight) && (ix += 1);
		let dx, dy;
		if (Math.hypot(ix, iy) > .2) {
			dx = ix;
			dy = iy;
		} else if (Math.hypot(this.moveVX, this.moveVY) > .35) {
			dx = this.moveVX;
			dy = this.moveVY;
		} else {
			dx = Math.cos(this.player.angle);
			dy = Math.sin(this.player.angle);
		}
		const m = Math.hypot(dx, dy) || 1;
		this.dodgeDirX = dx / m;
		this.dodgeDirY = dy / m;
		this.dodgeTimer = .22;
		this.dodgeCd = .58;
		this.invuln = Math.max(this.invuln, .24);
		this.player.stamina = Math.max(0, this.player.stamina - 22);
		this.alertZombies(this.player.x, this.player.y, 150);
		this.screenShake = Math.max(this.screenShake, 3.2);
		this.bodyFacing = this.dodgeDirX >= 0 ? 1 : -1;
		soundEngine.playDodge();
		this.spawnFloater(this.player.x, this.player.y - 28, "ROLL", "#d4a017");
		return true;
	}
	tryBash() {
		if (this.bashCd > 0 || this.dodgeTimer > 0) return false;
		this.bashCd = .7;
		this.bashSwing = .2;
		this.recoilKick = Math.max(this.recoilKick, 8);
		this.screenShake = Math.max(this.screenShake, 4);
		this.hitstop = Math.max(this.hitstop, .045);
		this.alertZombies(this.player.x, this.player.y, 110);
		soundEngine.playBash();
		const ax = Math.cos(this.player.angle);
		const ay = Math.sin(this.player.angle);
		let hits = 0;
		for (const z of this.zombies) {
			const dx = z.x - this.player.x;
			const dy = z.y - this.player.y;
			if (Math.hypot(dx, dy) > 78 + z.radius) continue;
			if (dx * ax + dy * ay < 8) continue;
			if (Math.abs(dx * -ay + dy * ax) > 42) continue;
			const force = z.type === "behemoth" ? 10 : z.type === "miner_brute" ? 18 : 38;
			z.x += ax * force;
			z.y += ay * force;
			z.health -= z.type === "behemoth" ? 12 : 24;
			z.hitFlash = .25;
			z.stunUntil = this.simTime + (z.type === "behemoth" ? .35 : .9);
			z.ai = "wander";
			hits++;
			this.stats.damageDealt += 24;
			this.createBloodParticles(z.x, z.y, this.player.angle);
			if (z.health <= 0) this.spawnFloater(z.x, z.y - 16, "BASH", "#e11d2e");
		}
		if (hits === 0) this.spawnFloater(this.player.x + ax * 28, this.player.y + ay * 28, "WHIFF", "#8a7a64");
		return true;
	}
	updateHordeEvents(e) {
		if (this.waveState !== "active" || this.extractActive || this.bellReady || this.wave < 2) return;
		this.eventCd -= e;
		if (this.eventCd > 0) return;
		this.eventCd = 16 + Math.random() * 14;
		const roll = Math.random();
		const open = this.holes.filter((h) => !h.boarded);
		if (roll < .34 && open.length) {
			const hole = open[Math.floor(Math.random() * open.length)];
			for (let i = 0; i < 3; i++) {
				const a = Math.random() * Math.PI * 2;
				this.pushZombie("crawler", hole.x + Math.cos(a) * (hole.radius + 10), hole.y + Math.sin(a) * (hole.radius + 10));
			}
			this.callbacks.onRadio?.("WJPS", "They're coming up through the floor.");
			this.spawnFloater(hole.x, hole.y - 30, "HOLE BURST", "#c23b22");
		} else if (roll < .68) {
			for (let i = 0; i < 2; i++) {
				const edge = Math.floor(Math.random() * 4);
				let x = 60, y = 60;
				if (edge === 0) {
					x = 80 + Math.random() * (this.currentLocation.mapWidth - 160);
					y = 70;
				} else if (edge === 1) {
					x = 80 + Math.random() * (this.currentLocation.mapWidth - 160);
					y = this.currentLocation.mapHeight - 70;
				} else if (edge === 2) {
					x = 70;
					y = 80 + Math.random() * (this.currentLocation.mapHeight - 160);
				} else {
					x = this.currentLocation.mapWidth - 70;
					y = 80 + Math.random() * (this.currentLocation.mapHeight - 160);
				}
				this.pushZombie("sprinter", x, y);
			}
			this.callbacks.onRadio?.("WJPS", "Two on the ridge. They're running.");
		} else {
			this.fogUntil = 9;
			this.callbacks.onRadio?.("WJPS", "Fog in the bottoms. Watch your beam.");
		}
	}
	updateWeapons(e) {
		let t = this.weapons[this.currentWeaponIndex];
		if (this.isReloading) {
			let n = this.getPerkLevel(`quickdraw`) * .2, r = t.reloadTime * (1 - n);
			if (e - this.reloadStartTime >= r) {
				let e = t.magazineSize - t.currentMag, n = Math.min(e, t.reserveAmmo);
				t.currentMag += n, t.reserveAmmo -= n, this.isReloading = false;
			}
			return;
		}
		let n = this.hasPowerup(`infinite_ammo`), r = n ? 1.4 : 1, i = this.isMouseDown || this.virtualJoystickAim.x !== 0 || this.virtualJoystickAim.y !== 0, a = 1e3 / (t.fireRate * (1 + this.getPerkLevel(`quickdraw`) * .18) * r);
		i && e - this.lastShotTime >= a && (t.currentMag > 0 || n ? (this.fireCurrentWeapon(), this.lastShotTime = e) : t.reserveAmmo > 0 ? this.reloadCurrentWeapon() : this.autoSwapFromDry());
	}
	fireCurrentWeapon() {
		let e = this.weapons[this.currentWeaponIndex];
		this.hasPowerup(`infinite_ammo`) || e.currentMag--;
		this.stats.shotsFired++;
		this.muzzleFlashTimer = e.id === `shotgun` ? 1.4 : e.id === `crossbow` ? .35 : 1;
		this.recoilKick = Math.max(this.recoilKick, e.id === `shotgun` ? 12 : e.id === `lever_rifle` ? 9 : e.id === `chainsaw` ? 4 : e.id === `carbine` ? 3.5 : 7);
		if (e.id === `shotgun`) this.pumpAnim = 10;
		soundEngine.playGunshot(e.soundType);
		const hear = this.weaponHearRadius(e.id);
		if (hear > 0) this.alertZombies(this.player.x, this.player.y, hear);
		if (e.id === `shotgun`) this.screenShake = 8;
		else if (e.id === `lever_rifle`) this.screenShake = 5;
		else if (e.id === `revolver`) this.screenShake = 3.5;
		else if (e.id === `carbine`) this.screenShake = 1.6;
		else if (e.id === `chainsaw`) this.screenShake = 2;
		else this.screenShake = 2.5;
		const dmgMul = 1 + this.getPerkLevel(`hollowpoint`) * .2;
		const choke = this.getPerkLevel(`choke`);
		if (e.id === `chainsaw`) {
			this.hitstop = Math.max(this.hitstop, .03);
			const ax = Math.cos(this.player.angle);
			const ay = Math.sin(this.player.angle);
			for (const z of this.zombies) {
				const dx = z.x - this.player.x, dy = z.y - this.player.y;
				if (Math.hypot(dx, dy) > 70 + z.radius) continue;
				if (dx * ax + dy * ay < 6) continue;
				if (Math.abs(dx * -ay + dy * ax) > 38) continue;
				z.health -= e.damage * dmgMul;
				z.hitFlash = .2;
				z.x += ax * 8;
				z.y += ay * 8;
				this.stats.damageDealt += e.damage;
				this.createBloodParticles(z.x, z.y, this.player.angle);
			}
			for (let i = 0; i < 6; i++) this.particles.push({
				x: this.player.x + ax * 28,
				y: this.player.y + ay * 28,
				vx: ax * 2 + (Math.random() - .5) * 3,
				vy: ay * 2 + (Math.random() - .5) * 3,
				size: 2 + Math.random() * 2,
				color: "#fbbf24",
				alpha: .9,
				life: .2,
				maxLife: .25,
				type: "spark"
			});
			if (e.currentMag === 0) this.reloadCurrentWeapon();
			return;
		}
		const spread = e.id === `shotgun` ? Math.max(.16, .34 - choke * .05) : e.spread;
		const count = e.id === `shotgun` ? e.pellets + choke * 2 : e.pellets;
		const origin = e.id === `shotgun` ? 34 : e.id === `lever_rifle` ? 38 : 24;
		for (let n = 0; n < count; n++) {
			const jitter = (Math.random() - .5) * spread;
			const ang = this.player.angle + jitter;
			const spd = e.bulletSpeed * (.92 + Math.random() * .14);
			this.bullets.push({
				id: Math.random().toString(),
				x: this.player.x + Math.cos(this.player.angle) * origin,
				y: this.player.y + Math.sin(this.player.angle) * origin,
				vx: Math.cos(ang) * spd,
				vy: Math.sin(ang) * spd,
				damage: e.damage * dmgMul,
				pierce: e.pierce,
				rangeRemaining: e.id === `shotgun` ? e.range * (.55 + Math.random() * .35) : e.range,
				weaponType: e.id,
				isCrossbowBolt: e.id === `crossbow`,
				radius: e.id === `shotgun` ? 4.4 : e.id === `revolver` ? 4.2 : e.id === `carbine` ? 2.2 : e.id === `crossbow` ? 4 : 3.2,
				color: e.id === `shotgun` ? `#fdba74` : e.id === `revolver` ? `#fbbf24` : e.id === `lever_rifle` ? `#fefce8` : e.id === `carbine` ? `#fde047` : e.id === `crossbow` ? `#e2e8f0` : `#fef08a`
			});
		}
		if (e.id === `shotgun`) {
			const ax = Math.cos(this.player.angle), ay = Math.sin(this.player.angle);
			for (let i = 0; i < 14; i++) {
				const j = (Math.random() - .5) * .7;
				this.particles.push({
					x: this.player.x + ax * 30,
					y: this.player.y + ay * 30,
					vx: Math.cos(this.player.angle + j) * (1.2 + Math.random() * 2.4),
					vy: Math.sin(this.player.angle + j) * (1.2 + Math.random() * 2.4),
					size: 3 + Math.random() * 4,
					color: "rgba(180, 140, 80, 0.7)",
					alpha: .7,
					life: .22 + Math.random() * .18,
					maxLife: .4,
					type: "dust"
				});
			}
		}
		this.particles.push({
			x: this.player.x,
			y: this.player.y,
			vx: Math.cos(this.player.angle - Math.PI / 2) * (2 + Math.random() * 2),
			vy: Math.sin(this.player.angle - Math.PI / 2) * (2 + Math.random() * 2),
			size: e.id === `shotgun` ? 4 : 2.5,
			color: e.id === `shotgun` ? `#a16207` : `#eab308`,
			alpha: 1,
			life: .6,
			maxLife: .6,
			type: `shell`
		});
		if (e.currentMag === 0) this.reloadCurrentWeapon();
	}
	updateBullets(e, t) {
		for (let t = this.bullets.length - 1; t >= 0; t--) {
			let n = this.bullets[t], r = e * 60;
			if (n.x += n.vx * r, n.y += n.vy * r, n.rangeRemaining -= Math.hypot(n.vx, n.vy) * r, this.checkObstacleCollision(n.x, n.y, n.radius, false)) {
				this.createHitSparks(n.x, n.y, `#f59e0b`), this.bullets.splice(t, 1);
				continue;
			}
			let i = false;
			for (let e = this.explosiveBarrels.length - 1; e >= 0; e--) {
				let r = this.explosiveBarrels[e];
				if (Math.hypot(r.x - n.x, r.y - n.y) <= r.radius + n.radius) {
					r.health -= n.damage, this.createHitSparks(n.x, n.y, `#ef4444`), soundEngine.playZombieHit(false), r.health <= 0 && this.detonateExplosiveBarrel(r, e), this.bullets.splice(t, 1), i = true;
					break;
				}
			}
			if (!i) {
				if (n.isMolotov && n.rangeRemaining <= 0) {
					this.detonateMolotov(n.x, n.y), this.bullets.splice(t, 1);
					continue;
				}
				if (n.rangeRemaining <= 0) {
					this.bullets.splice(t, 1);
					continue;
				}
				for (let e = this.zombies.length - 1; e >= 0; e--) {
					let r = this.zombies[e];
					if (Math.hypot(r.x - n.x, r.y - n.y) <= r.radius + n.radius) {
						this.stats.shotsHit++;
						let e = this.checkHeadshot(n, r), i = n.damage;
						this.hasPowerup(`insta_kill`) ? i = 99999 : e ? r.hasHelmet ? (r.hasHelmet = false, this.createHitSparks(r.x, r.y, `#eab308`), soundEngine.playZombieHit(false), i *= .6) : (i *= 2.4, this.stats.headshots++, soundEngine.playZombieHit(true)) : soundEngine.playZombieHit(false), r.health -= i, this.stats.damageDealt += i;
						let a = Math.atan2(n.vy, n.vx), o = n.weaponType === `shotgun` ? 7 : 3;
						if (r.x += Math.cos(a) * o, r.y += Math.sin(a) * o, this.createBloodParticles(n.x, n.y, a), r.hitFlash = .08, this.spawnFloater(r.x, r.y - r.radius, e ? `HEAD` : `${Math.round(i)}`, e ? `#ff4d3a` : `#e11d2e`), i > 80 && (this.hitstop = Math.max(this.hitstop, .04)), n.pierce--, n.pierce <= 0) {
							this.bullets.splice(t, 1);
							break;
						}
					}
				}
			}
		}
	}
	checkHeadshot(e, t) {
		let n = Math.atan2(e.y - t.y, e.x - t.x);
		return Math.abs(this.normalizeAngle(n - t.angle)) < .7;
	}
	normalizeAngle(e) {
		for (; e > Math.PI;) e -= Math.PI * 2;
		for (; e < -Math.PI;) e += Math.PI * 2;
		return e;
	}
	detonateMolotov(e, t) {
		let n = 95 * (1 + this.getPerkLevel(`moonshiner`) * .4), r = 6e3 + this.getPerkLevel(`moonshiner`) * 2500;
		this.firePuddles.push({
			id: Math.random().toString(),
			x: e,
			y: t,
			radius: n,
			duration: r,
			createdTime: Date.now()
		}), this.screenShake = 5, this.trauma = Math.min(1, this.trauma + .25), soundEngine.playBottleShatter(), this.alertZombies(e, t, 380);
		for (let r of this.zombies) Math.hypot(r.x - e, r.y - t) <= n && (r.health -= 120, r.isBurning = 4e3);
	}
	detonateExplosiveBarrel(e, t) {
		this.explosiveBarrels.splice(t, 1), this.screenShake = 10, this.trauma = Math.min(1, this.trauma + .55), soundEngine.playBarrelExplosion(), this.alertZombies(e.x, e.y, 700), this.firePuddles.push({
			id: Math.random().toString(),
			x: e.x,
			y: e.y,
			radius: 105,
			duration: 5e3,
			createdTime: Date.now()
		});
		for (let t = 0; t < 35; t++) {
			let t = Math.random() * Math.PI * 2, n = 2 + Math.random() * 6;
			this.particles.push({
				x: e.x,
				y: e.y,
				vx: Math.cos(t) * n,
				vy: Math.sin(t) * n,
				size: 3 + Math.random() * 5,
				color: Math.random() < .6 ? `#ef4444` : Math.random() < .5 ? `#f97316` : `#78350f`,
				alpha: 1,
				life: .4 + Math.random() * .4,
				maxLife: .8,
				type: `smoke`
			});
		}
		for (let t = this.zombies.length - 1; t >= 0; t--) {
			let n = this.zombies[t], r = Math.hypot(n.x - e.x, n.y - e.y);
			if (r <= 140) {
				let i = 1 - r / 140, a = 350 * (.4 + i * .6);
				n.health -= a, n.isBurning = 4e3;
				let o = Math.atan2(n.y - e.y, n.x - e.x);
				n.x += 18 * i * Math.cos(o), n.y += 18 * i * Math.sin(o), this.stats.damageDealt += a, this.createBloodParticles(n.x, n.y, o), n.health <= 0 && this.killZombie(n, t);
			}
		}
		let n = Math.hypot(this.player.x - e.x, this.player.y - e.y);
		if (n <= 140) {
			let e = 1 - n / 140;
			this.damagePlayer(Math.round(45 * e));
		}
		for (let t = this.explosiveBarrels.length - 1; t >= 0; t--) {
			let n = this.explosiveBarrels[t];
			Math.hypot(n.x - e.x, n.y - e.y) <= 140 && (n.health -= 250, n.health <= 0 && setTimeout(() => {
				let e = this.explosiveBarrels.indexOf(n);
				e !== -1 && this.detonateExplosiveBarrel(n, e);
			}, 120));
		}
	}
	updateFirePuddles(e) {
		for (let t = this.firePuddles.length - 1; t >= 0; t--) {
			let n = this.firePuddles[t];
			if (e - n.createdTime >= n.duration) {
				this.firePuddles.splice(t, 1);
				continue;
			}
			for (let e of this.zombies) Math.hypot(e.x - n.x, e.y - n.y) <= n.radius && (e.health -= .9, e.isBurning = 3e3);
			Math.hypot(this.player.x - n.x, this.player.y - n.y) <= n.radius && this.damagePlayer(.3);
		}
	}
	updateAcidSpits(e) {
		for (let t = this.acidSpits.length - 1; t >= 0; t--) {
			let n = this.acidSpits[t], r = e * 60;
			if (n.x += n.vx * r, n.y += n.vy * r, n.remainingDistance -= Math.hypot(n.vx, n.vy) * r, Math.hypot(this.player.x - n.x, this.player.y - n.y) <= this.player.radius + n.radius) {
				this.damagePlayer(n.damage), this.createHitSparks(n.x, n.y, `#84cc16`), this.acidSpits.splice(t, 1);
				continue;
			}
			(n.remainingDistance <= 0 || this.checkObstacleCollision(n.x, n.y, n.radius)) && (this.createHitSparks(n.x, n.y, `#84cc16`), this.acidSpits.splice(t, 1));
		}
	}
	updateWaveManager(e) {
		if (this.waveState === `break`) {
			if (this.extractActive || this.bellReady) return;
			e - this.lastBreakTick >= 1e3 && (this.lastBreakTick = e, this.waveBreakCountdown--, this.waveBreakCountdown <= 0 && this.startNextWave());
			return;
		}
		if (this.zombiesToSpawn > 0 && e - this.lastZombieSpawnTime > (this.lanternLit ? 750 : 520) && (this.spawnRandomZombie(), this.zombiesToSpawn--, this.lastZombieSpawnTime = e), this.zombiesToSpawn === 0 && this.zombies.length === 0) {
			if (this.waveState = `break`, this.waveBreakCountdown = 10, this.stats.wavesCompleted++, this.scrap += 120 + this.wave * 25, soundEngine.playWaveHorn(), this.callbacks.onWaveComplete(this.wave), this.outbreakWaves > 0 && this.stats.wavesCompleted >= this.outbreakWaves) this.currentLocation.bell && !this.bellRung ? (this.bellReady = true, this.callbacks.onRadio?.(`WJPS Petersburg`, `The square is yours if you can ring it. Get to the tower before they take the steps.`)) : (this.extractActive = true, this.callbacks.onExtractReady?.());
			else {
				let e = radioFor(this.currentLocation.id, this.wave);
				this.callbacks.onRadio?.(e.call, e.body);
			}
		}
	}
	startNextWave() {
		this.wave++, this.waveState = `active`;
		this.eventCd = this.wave === 1 ? 99 : 14 + Math.random() * 8;
		let e = this.wave === 1 ? Math.floor(6 * this.difficultyMultiplier) : Math.floor((10 + this.wave * 4.5) * this.difficultyMultiplier);
		this.lanternWentOut && (e = Math.floor(e * 1.22)), this.zombiesToSpawn = e, soundEngine.playWaveHorn();
		if (this.wave === 1) this.callbacks.onRadio?.("WJPS", "Six on the Trace. Board the cellars when you can.");
	}
	farEdgeSpawn(minDist = 400) {
		const w = this.currentLocation.mapWidth;
		const h = this.currentLocation.mapHeight;
		const px = this.player.x, py = this.player.y;
		const edges = [
			{ x: 60 + Math.random() * (w - 120), y: 60 },
			{ x: 60 + Math.random() * (w - 120), y: h - 60 },
			{ x: 60, y: 60 + Math.random() * (h - 120) },
			{ x: w - 60, y: 60 + Math.random() * (h - 120) }
		];
		edges.sort((a, b) => Math.hypot(a.x - px, a.y - py) - Math.hypot(b.x - px, b.y - py));
		for (const e of edges) {
			if (Math.hypot(e.x - px, e.y - py) >= minDist && !this.checkObstacleCollision(e.x, e.y, 16)) return e;
		}
		return edges[edges.length - 1];
	}
	spawnRandomZombie() {
		const open = this.holes.filter((h) => !h.boarded);
		const nearHole = open.some((h) => Math.hypot(this.player.x - h.x, this.player.y - h.y) < 180);
		const holesLive = nearHole || !this.lanternLit || this.wave >= 2;
		let holeChance = 0;
		if (open.length && holesLive) holeChance = nearHole ? .82 : !this.lanternLit ? .7 : .28;
		let n = 0, r = 0, i = null;
		if (open.length && Math.random() < holeChance) {
			i = open[Math.floor(Math.random() * open.length)];
			const a = Math.random() * Math.PI * 2;
			n = i.x + Math.cos(a) * (i.radius + 8);
			r = i.y + Math.sin(a) * (i.radius + 8);
		} else {
			const edge = this.farEdgeSpawn(this.wave === 1 ? 520 : 380);
			n = edge.x;
			r = edge.y;
		}
		if (Math.hypot(n - this.player.x, r - this.player.y) < 360) {
			const edge = this.farEdgeSpawn(480);
			n = edge.x;
			r = edge.y;
			i = null;
		}
		let a = `shambler`, o = Math.random();
		if (this.wave === 1) a = `shambler`;
		else if (i) a = i.kind === `pit` && o < .45 ? `miner_brute` : `crawler`;
		else if (this.wave >= 5 && this.wave % 5 == 0 && this.zombiesToSpawn === 1) a = `behemoth`;
		else if (this.lanternWentOut && o < .18) a = `crawler`;
		else if (this.wave >= 4 && o < .2) a = `bloater_spitter`;
		else if (this.wave >= 3 && o < .45) a = `miner_brute`;
		else if (this.wave >= 2 && o < .7) a = `sprinter`;
		this.pushZombie(a, n, r);
	}
	pushZombie(e, t, n) {
		let r = 70, i = 1.35, a = 14, o = 17, s = `#475569`, c = false, l = 100, u = 15;
		e === `crawler` ? (r = 32, i = 1.85, a = 8, o = 12, s = `#3f2e22`, l = 80, u = 8) : e === `sprinter` ? (r = 45, i = 2.55, a = 10, o = 15, s = `#991b1b`, l = 140, u = 20) : e === `miner_brute` ? (r = 220, i = .95, a = 25, o = 23, s = `#1e293b`, c = true, l = 250, u = 40) : e === `bloater_spitter` ? (r = 130, i = .85, a = 18, o = 21, s = `#65a30d`, l = 220, u = 35) : e === `behemoth` && (r = 1400 + this.wave * 250, i = 1.35, a = 45, o = 38, s = `#581c87`, l = 1500, u = 250);
		let d = {
			id: Math.random().toString(),
			type: e,
			x: t,
			y: n,
			vx: 0,
			vy: 0,
			angle: 0,
			speed: i * (.9 + Math.random() * .2),
			maxHealth: r,
			health: r,
			damage: a,
			attackCooldown: 900,
			lastAttackTime: 0,
			radius: o,
			color: s,
			hasHelmet: c,
			animationFrame: 0,
			scoreValue: l,
			scrapValue: u,
			spitCooldown: 2500,
			ai: e === `crawler` ? `chase` : `wander`,
			hearX: t,
			hearY: n,
			wanderAngle: Math.random() * Math.PI * 2,
			hitFlash: 0
		};
		this.zombies.push(d), soundEngine.playZombieGroan(e === `crawler` ? `shambler` : e);
	}
	updateZombies(e, t) {
		for (let n = this.zombies.length - 1; n >= 0; n--) {
			let r = this.zombies[n];
			if (r.isBurning && r.isBurning > 0 && (r.isBurning -= e * 1e3, r.health -= e * 35, Math.random() < .3 && this.particles.push({
				x: r.x + (Math.random() - .5) * r.radius,
				y: r.y + (Math.random() - .5) * r.radius,
				vx: (Math.random() - .5) * 1.5,
				vy: -1.5 - Math.random() * 2,
				size: 3,
				color: `#f97316`,
				alpha: .9,
				life: .4,
				maxLife: .4,
				type: `fire`
			})), r.health <= 0) {
				this.killZombie(r, n);
				continue;
			}
			// Optimized distance checks in hot zombie loop using squared distances to avoid Math.hypot overhead
			let i = this.player.x - r.x, a = this.player.y - r.y;
			let distSq = i * i + a * a;
			r.hitFlash > 0 && (r.hitFlash -= e);
			let hearDx = r.hearX - r.x, hearDy = r.hearY - r.y;
			let hearDistSq = hearDx * hearDx + hearDy * hearDy;
			let c = this.simTime < this.bellLureUntil && this.currentLocation.bell, l = r.type === `sprinter` ? 520 : r.type === `behemoth` ? 700 : r.type === `crawler` ? 260 : 340;
			this.player.isSneaking && (l *= .6);
			let attackStateDist = r.radius + this.player.radius + 2;
			let attackStateDistSq = attackStateDist * attackStateDist;
			let hitDist = r.radius + this.player.radius;
			let hitDistSq = hitDist * hitDist;
			let lSq = l * l;
			const lantern = this.currentLocation.lantern;
			if (this.lanternLit && lantern && r.type === `shambler` && r.ai === `wander`) r.wanderAngle = Math.atan2(lantern.y - r.y, lantern.x - r.x) + (Math.random() - .5) * .7;
			c && this.currentLocation.bell ? (r.hearX = this.currentLocation.bell.x, r.hearY = this.currentLocation.bell.y, r.ai = distSq <= attackStateDistSq ? `attack` : `investigate`) : distSq < lSq ? r.ai = distSq <= attackStateDistSq ? `attack` : `chase` : r.ai === `wander` && hearDistSq > 1600 && (r.hearX !== r.x || r.hearY !== r.y) && (r.ai = `investigate`), r.ai === `wander` ? (r.wanderAngle += (Math.random() - .5) * .8 * e, r.angle = r.wanderAngle) : r.ai === `investigate` ? (r.angle = Math.atan2(r.hearY - r.y, r.hearX - r.x), hearDistSq < 784 && (r.ai = `wander`)) : r.angle = Math.atan2(a, i), r.type === `bloater_spitter` && (r.spitCooldown ||= 2500, r.spitCooldown -= e * 1e3, r.spitCooldown <= 0 && distSq < 202500) && (r.spitCooldown = 3200, this.acidSpits.push({
				id: Math.random().toString(),
				x: r.x,
				y: r.y,
				vx: Math.cos(r.angle) * 7,
				vy: Math.sin(r.angle) * 7,
				radius: 7,
				damage: 22,
				remainingDistance: 450
			}), soundEngine.playZombieHit(false));
			let u = r.speed;
			r.type === `behemoth` && r.health < r.maxHealth * .4 && (u *= 1.4), r.ai === `wander` && (u *= .35), r.ai === `investigate` && (u *= .7);
			if (r.stunUntil && this.simTime < r.stunUntil) u = 0;
			else if (this.worldSlow > 0) u *= .4;
			let d = e * 60, f, p;
			if ((r.ai === `chase` || r.ai === `attack`) && u > 0) {
				const flow = this.flow.dir(r.x, r.y);
				if (flow) {
					r.angle = Math.atan2(flow.y, flow.x);
					f = flow.x * u * d;
					p = flow.y * u * d;
				} else {
					f = Math.cos(r.angle) * u * d;
					p = Math.sin(r.angle) * u * d;
				}
			} else {
				f = Math.cos(r.angle) * u * d;
				p = Math.sin(r.angle) * u * d;
			}
			let m = r.x + f, h = r.y + p;
			this.checkObstacleCollision(m, r.y, r.radius) ? (this.smashBarricadeAt(m, r.y, r.damage * .08), this.smashHoleAt(m, r.y, r.damage * .12)) : r.x = m, this.checkObstacleCollision(r.x, h, r.radius) ? (this.smashBarricadeAt(r.x, h, r.damage * .08), this.smashHoleAt(r.x, h, r.damage * .12)) : r.y = h;
			for (let e = 0; e < this.zombies.length; e++) {
				if (n === e) continue;
				let t = this.zombies[e], i = r.x - t.x, a = r.y - t.y;
				let s = r.radius + t.radius;
				let zDistSq = i * i + a * a;
				if (zDistSq < s * s && zDistSq > 0) {
					let o = Math.sqrt(zDistSq);
					let e = (s - o) * .15;
					r.x += i / o * e, r.y += a / o * e;
				}
			}
			distSq <= hitDistSq && this.invuln <= 0 && t - r.lastAttackTime >= r.attackCooldown && (this.lastKiller = r.type, this.damagePlayer(r.damage), r.lastAttackTime = t);
		}
	}
	killZombie(e, t) {
		this.zombies.splice(t, 1), this.stats.kills++, this.lastKillTime = Date.now(), this.comboMultiplier = Math.min(5, this.comboMultiplier + .25);
		if (this.simTime - this.rushWindow > 5) this.rushKills = 0;
		this.rushWindow = this.simTime;
		this.rushKills++;
		if (this.rushKills >= 4 && this.bloodRush <= 0) {
			this.rushKills = 0;
			this.bloodRush = 2.8;
			this.worldSlow = Math.max(this.worldSlow, 2.2);
			this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + 35);
			this.trauma = Math.min(1, this.trauma + .45);
			this.hitstop = Math.max(this.hitstop, .08);
			this.spawnFloater(this.player.x, this.player.y - 40, "BLOOD RUSH", "#e11d2e");
			this.callbacks.onRadio?.("Unknown", "Don't you stop.");
			soundEngine.playPowerup();
		}
		let n = this.hasPowerup(`double_points`) ? 2 : 1, r = Math.round(e.scoreValue * this.comboMultiplier * n);
		this.score += r;
		this.stripTheDead(e);
		let i = this.getPerkLevel(`scavenger`), a = 1 + i * .35, o = Math.round(e.scrapValue * a * n);
		if (this.scrap += o, this.stats.scrapCollected += o, this.spawnFloater(e.x, e.y - e.radius, `+${r}`, `#d4a017`), this.bloodDecals.push({
			x: e.x,
			y: e.y,
			radius: e.radius * (1.2 + Math.random() * .6),
			alpha: .65 + Math.random() * .25,
			rotation: Math.random() * Math.PI * 2
		}), this.bloodDecals.length > 150 && this.bloodDecals.shift(), Math.random() < .04) {
			let t = [
				`nuke`,
				`double_points`,
				`insta_kill`,
				`infinite_ammo`,
				`speed_boost`
			], n = t[Math.floor(Math.random() * t.length)];
			this.drops.push({
				id: Math.random().toString(),
				type: n,
				x: e.x,
				y: e.y,
				amount: 1,
				duration: 3e4
			});
			return;
		}
		let s = .32 + i * .1;
		if (Math.random() < s) {
			let t = Math.random(), n = `ammo_universal`, r = 15;
			t < .35 && this.player.health < this.player.maxHealth ? (n = `moonshine_med`, r = 35) : t < .55 ? (n = `molotov_pickup`, r = 1) : t < .75 && (n = `scrap`, r = 25), this.drops.push({
				id: Math.random().toString(),
				type: n,
				x: e.x,
				y: e.y,
				amount: r,
				duration: 25e3
			});
		}
	}
	damagePlayer(e) {
		if (this.invuln > 0) return;
		let t = e * (1 - this.getPerkLevel(`grit`) * .08);
		this.player.health -= t, this.stats.damageTaken += t, this.screenShake = 7, this.trauma = Math.min(1, this.trauma + .35), soundEngine.playPlayerHurt();
		if (this.player.health <= 0) {
			if (!this.lastStandUsed) {
				this.lastStandUsed = true;
				this.player.health = Math.round(this.player.maxHealth * .5);
				this.invuln = 3.5;
				this.worldSlow = 2.6;
				this.hitstop = .16;
				this.trauma = 1;
				this.player.stamina = this.player.maxStamina;
				for (const z of this.zombies) {
					const dx = z.x - this.player.x, dy = z.y - this.player.y;
					const dist = Math.hypot(dx, dy) || 1;
					if (dist < 200) {
						const push = (200 - dist) / 200 * 70;
						z.x += dx / dist * push;
						z.y += dy / dist * push;
						z.stunUntil = this.simTime + 1.5;
						z.ai = "wander";
					}
				}
				soundEngine.playWaveHorn();
				this.spawnFloater(this.player.x, this.player.y - 36, "LAST STAND", "#e11d2e");
				this.callbacks.onRadio?.("Unknown", "Get up. The county isn't done with you.");
				return;
			}
			this.player.health = 0;
			this.handleGameOver();
		}
	}
	handleGameOver() {
		this.isRunning = false, this.stats.survivalTime = Math.floor((Date.now() - this.gameStartTime) / 1e3), this.callbacks.onGameOver(this.stats, this.score, this.lastKiller);
	}
	updateDrops() {
		for (let e = this.drops.length - 1; e >= 0; e--) {
			let t = this.drops[e];
			if (Math.hypot(this.player.x - t.x, this.player.y - t.y) <= this.player.radius + 18) {
				if (soundEngine.playPickup(), t.type === `ammo_universal`) for (let e of this.weapons) e.unlocked && (e.reserveAmmo = Math.min(e.maxReserveAmmo, e.reserveAmmo + Math.floor(e.magazineSize * 1.5)));
				else t.type === `moonshine_med` ? (this.player.health = Math.min(this.player.maxHealth, this.player.health + t.amount), this.player.stamina = this.player.maxStamina) : t.type === `molotov_pickup` ? this.player.molotovs = Math.min(this.player.maxMolotovs, this.player.molotovs + 1) : t.type === `scrap` ? (this.scrap += t.amount, this.stats.scrapCollected += t.amount) : (t.type === `nuke` || t.type === `insta_kill` || t.type === `double_points` || t.type === `infinite_ammo` || t.type === `speed_boost`) && this.activatePowerup(t.type);
				this.drops.splice(e, 1);
			}
		}
	}
	updateParticles(e) {
		for (let t = this.particles.length - 1; t >= 0; t--) {
			let n = this.particles[t];
			n.x += n.vx * e * 60, n.y += n.vy * e * 60, n.life -= e, n.alpha = Math.max(0, n.life / n.maxLife), n.life <= 0 && this.particles.splice(t, 1);
		}
	}
	createBloodParticles(e, t, n) {
		for (let r = 0; r < 7; r++) {
			let r = n + (Math.random() - .5) * 1.2, i = 2 + Math.random() * 4;
			this.particles.push({
				x: e,
				y: t,
				vx: Math.cos(r) * i,
				vy: Math.sin(r) * i,
				size: 2.5 + Math.random() * 3.5,
				color: Math.random() < .7 ? `#880808` : `#550000`,
				alpha: 1,
				life: .35 + Math.random() * .25,
				maxLife: .5,
				type: `blood`
			});
		}
	}
	createHitSparks(e, t, n) {
		for (let r = 0; r < 6; r++) {
			let r = Math.random() * Math.PI * 2, i = 1.5 + Math.random() * 3.5;
			this.particles.push({
				x: e,
				y: t,
				vx: Math.cos(r) * i,
				vy: Math.sin(r) * i,
				size: 2,
				color: n,
				alpha: 1,
				life: .2 + Math.random() * .15,
				maxLife: .3,
				type: `spark`
			});
		}
	}
	checkObstacleCollision(e, t, n, r = true) {
		for (let r of this.currentLocation.obstacles) if (e + n > r.x && e - n < r.x + r.width && t + n > r.y && t - n < r.y + r.height) return true;
		for (let r of this.barricades) if (!(r.health <= 0) && e + n > r.x && e - n < r.x + r.width && t + n > r.y && t - n < r.y + r.height) return true;
		if (r) {
			for (let r of this.explosiveBarrels) if (Math.hypot(e - r.x, t - r.y) < n + r.radius) return true;
		}
		return false;
	}
	smashBarricadeAt(e, t, n) {
		for (let r of this.barricades) r.health <= 0 || e > r.x - 8 && e < r.x + r.width + 8 && t > r.y - 8 && t < r.y + r.height + 8 && (r.health -= n, r.health <= 0 && (this.spawnFloater(r.x + r.width / 2, r.y, `SMASH`, `#e8e0d4`), this.createHitSparks(e, t, `#b45309`)));
	}
	smashHoleAt(e, t, n) {
		for (let r of this.holes) r.boarded && Math.hypot(r.x - e, r.y - t) <= r.radius + 18 && (r.boardHealth -= n, r.boardHealth <= 0 && (r.boarded = false, r.boardHealth = r.maxBoardHealth, this.spawnFloater(r.x, r.y, `HOLE OPEN`, `#c23b22`), soundEngine.playBoardBreak()));
	}
	nearestHole(e) {
		let t = null, n = e;
		for (let e of this.holes) {
			let r = Math.hypot(this.player.x - e.x, this.player.y - e.y);
			r < n && (n = r, t = e);
		}
		return t;
	}
	boardHole(e) {
		if (!e.boarded) {
			if (this.scrap < 25) {
				this.spawnFloater(e.x, e.y - 20, `NEED SCRAP`, `#c23b22`);
				return;
			}
			this.scrap -= 25, e.boarded = true, e.boardHealth = e.maxBoardHealth, this.score += 40, this.spawnFloater(e.x, e.y - 18, `BOARDED`, `#d4a017`), soundEngine.playBoard();
			for (let t = 0; t < 8; t++) {
				let t = Math.random() * Math.PI * 2;
				this.particles.push({
					x: e.x,
					y: e.y,
					vx: Math.cos(t) * (1 + Math.random() * 2),
					vy: Math.sin(t) * (1 + Math.random() * 2),
					size: 2 + Math.random() * 3,
					color: `#5c4630`,
					alpha: 1,
					life: .4,
					maxLife: .4,
					type: `wood_splinter`
				});
			}
			this.holes.length > 0 && this.holes.every((e) => e.boarded) && this.callbacks.onRadio?.(`Unknown`, `The holes went quiet. Keep the lantern. They'll try the boards.`);
		}
	}
	relightLantern() {
		this.lanternLit = true, soundEngine.playLantern(), this.spawnFloater(this.currentLocation.lantern.x, this.currentLocation.lantern.y - 24, `LIT`, `#d4a017`), this.callbacks.onRadio?.(`Unknown`, `East window's burning again. Hold it.`);
	}
	snuffLantern() {
		this.lanternLit && (this.lanternLit = false, this.lanternWentOut = true, this.trauma = Math.min(1, this.trauma + .35), soundEngine.playSnuff(), this.spawnFloater(this.currentLocation.lantern.x, this.currentLocation.lantern.y - 24, `LANTERN OUT`, `#c23b22`), this.callbacks.onRadio?.(`Unknown`, `The lantern's gone. Cellar holes are coughing. They know the Trace.`));
	}
	updateLantern() {
		let e = this.currentLocation.lantern;
		if (e && this.lanternLit) {
			for (let t of this.zombies) if (Math.hypot(t.x - e.x, t.y - e.y) < 44) {
				this.snuffLantern();
				return;
			}
		}
	}
	updateBellHold(e) {
		let t = this.currentLocation.bell;
		(this.keys.KeyE || this.holdInteract) && this.bellReady && !this.bellRung && t && Math.hypot(this.player.x - t.x, this.player.y - t.y) < 80 ? (this.bellHold += e, this.bellHold >= 2.2 && this.ringBell()) : this.bellHold = Math.max(0, this.bellHold - e * 1.6);
	}
	ringBell() {
		let e = this.currentLocation.bell;
		if (e && !this.bellRung) {
			this.bellRung = true, this.bellReady = false, this.bellHold = 2.2, this.bellLureUntil = this.simTime + 10, this.extractActive = true, this.trauma = Math.min(1, this.trauma + .7), this.screenShake = 12, soundEngine.playBell(), this.alertZombies(e.x, e.y, 2e3);
			for (let t of this.zombies) t.hearX = e.x, t.hearY = e.y, t.ai = `investigate`;
			this.callbacks.onExtractReady?.(), this.callbacks.onRadio?.(`WJPS Petersburg`, `The bell. Truck's lit. Get off this ground.`);
		}
	}
	weaponHearRadius(e) {
		switch (e) {
			case `crossbow`: return 0;
			case `carbine`: return 380;
			case `revolver`: return 480;
			case `shotgun`: return 580;
			case `lever_rifle`: return 740;
			case `chainsaw`: return 300;
			default: return 420;
		}
	}
	updateNoisePulses(e) {
		for (let t = this.noisePulses.length - 1; t >= 0; t--) {
			let n = this.noisePulses[t];
			n.life -= e, n.radius = n.maxRadius * (1 - n.life / n.maxLife), n.life <= 0 && this.noisePulses.splice(t, 1);
		}
	}
	alertZombies(e, t, n) {
		if (!(n <= 0)) {
			this.noisePulses.push({
				x: e,
				y: t,
				radius: 8,
				maxRadius: n,
				life: .7,
				maxLife: .7
			}), this.noisePulses.length > 10 && this.noisePulses.shift();
			for (let r of this.zombies) Math.hypot(r.x - e, r.y - t) <= n && (r.hearX = e, r.hearY = t, r.ai === `wander` && (r.ai = `investigate`));
		}
	}
	spawnFloater(e, t, n, r) {
		this.floaters.push({
			x: e,
			y: t,
			text: n,
			color: r,
			life: .7,
			maxLife: .7,
			vy: -28
		}), this.floaters.length > 40 && this.floaters.shift();
	}
	getPerkLevel(e) {
		let t = this.perks.find((t) => t.id === e);
		return t ? t.level : 0;
	}
	renderHoles(e) {
		for (let t of this.holes) e.save(), e.translate(t.x, t.y), e.fillStyle = `rgba(8, 6, 4, 0.92)`, e.beginPath(), e.ellipse(0, 0, t.radius, t.radius * .72, 0, 0, Math.PI * 2), e.fill(), e.strokeStyle = t.kind === `pit` ? `#3a3228` : `#2a2118`, e.lineWidth = 3, e.stroke(), t.boarded ? (e.fillStyle = `#5c4630`, e.fillRect(-t.radius * .7, -6, t.radius * 1.4, 12), e.strokeStyle = `#3a3228`, e.lineWidth = 1, e.beginPath(), e.moveTo(-t.radius * .5, -6), e.lineTo(-t.radius * .5, 6), e.moveTo(0, -6), e.lineTo(0, 6), e.moveTo(t.radius * .5, -6), e.lineTo(t.radius * .5, 6), e.stroke()) : (e.fillStyle = `rgba(194, 59, 34, 0.55)`, e.beginPath(), e.ellipse(0, 2, t.radius * .55, t.radius * .34, 0, 0, Math.PI * 2), e.fill()), e.restore();
	}
	renderLantern(e) {
		let t = this.currentLocation.lantern;
		t && (e.save(), e.translate(t.x, t.y), e.fillStyle = `#2a2118`, e.fillRect(-6, -4, 12, 16), e.fillStyle = this.lanternLit ? `#d4a017` : `#3a3228`, e.beginPath(), e.arc(0, -8, 7, 0, Math.PI * 2), e.fill(), this.lanternLit && (e.globalAlpha = .35 + Math.sin(this.simTime * 6) * .08, e.fillStyle = `#fde68a`, e.beginPath(), e.arc(0, -8, 22, 0, Math.PI * 2), e.fill()), e.restore());
	}
	renderBell(e) {
		let t = this.currentLocation.bell;
		t && (e.save(), e.translate(t.x, t.y), e.fillStyle = this.bellReady ? `#d4a017` : `#5c5346`, e.beginPath(), e.moveTo(-12, -8), e.lineTo(12, -8), e.lineTo(9, 10), e.lineTo(-9, 10), e.closePath(), e.fill(), e.fillStyle = `#2a2118`, e.fillRect(-3, 10, 6, 8), e.beginPath(), e.arc(0, 18, 3, 0, Math.PI * 2), e.fill(), this.bellReady && !this.bellRung && (e.globalAlpha = .35 + Math.sin(this.simTime * 4) * .15, e.strokeStyle = `#d4a017`, e.lineWidth = 2, e.beginPath(), e.arc(0, 0, 28, 0, Math.PI * 2), e.stroke()), e.restore());
	}
	renderNoisePulses(e) {
		for (let t of this.noisePulses) {
			let n = Math.max(0, t.life / t.maxLife);
			e.save(), e.globalAlpha = n * .72, e.strokeStyle = `#d4a017`, e.lineWidth = 2.4, e.beginPath(), e.arc(t.x, t.y, Math.max(4, t.radius), 0, Math.PI * 2), e.stroke(), e.globalAlpha = n * .28, e.lineWidth = 6, e.beginPath(), e.arc(t.x, t.y, Math.max(4, t.radius * .86), 0, Math.PI * 2), e.stroke(), e.restore();
		}
	}
	renderHoleMarkers(e) {
		for (let t of this.holes) {
			let n = Math.hypot(this.player.x - t.x, this.player.y - t.y);
			e.save(), e.translate(t.x, t.y), t.boarded ? n < 200 && (e.globalAlpha = .85, e.fillStyle = `#d4a017`, e.font = `bold 10px "IBM Plex Mono", monospace`, e.textAlign = `center`, e.fillText(`BOARDED`, 0, -t.radius - 8)) : (e.globalAlpha = .45 + Math.sin(this.simTime * 5) * .18, e.strokeStyle = `#c23b22`, e.lineWidth = 2, e.beginPath(), e.ellipse(0, 0, t.radius + 8, t.radius * .72 + 6, 0, 0, Math.PI * 2), e.stroke(), n < 260 && (e.globalAlpha = .95, e.fillStyle = `#c23b22`, e.font = `bold 11px "IBM Plex Mono", monospace`, e.textAlign = `center`, e.fillText(t.kind === `pit` ? `PIT` : `CELLAR`, 0, -t.radius - 10))), e.restore();
		}
	}
	render() {
		let e = this.ctx, t = this.canvas.width, n = this.canvas.height;
		e.save(), e.clearRect(0, 0, t, n);
		const look = Math.min(90, 28 + this.lastMoveSpeed * 14);
		let r = this.player.x + Math.cos(this.player.angle) * 36 + this.moveVX * look;
		let i = this.player.y + Math.sin(this.player.angle) * 36 + this.moveVY * look;
		let a = 1 - Math.exp(-6.2 * (this.lastDt || 1 / 60));
		this.camX += (r - this.camX) * a, this.camY += (i - this.camY) * a;
		let o = this.trauma * this.trauma * 18 + this.screenShake, s = (Math.random() - .5) * o, c = (Math.random() - .5) * o;
		e.translate(s, c);
		let l = this.camX - t / 2, u = this.camY - n / 2;
		e.save(), e.translate(-l, -u);
		let d = {
			x: l,
			y: u,
			width: t,
			height: n
		};
		renderEnvironment(e, this.currentLocation, d, this.bloodDecals, this.firePuddles, this.drops, this.explosiveBarrels, this.loreNotes, this.barricades, this.extractActive), this.renderHoles(e), this.renderLantern(e), this.renderBell(e), this.renderZombies(e), this.renderPlayer(e), this.renderProjectiles(e), this.renderParticles(e);
		for (let t of this.floaters) {
			e.save();
			e.globalAlpha = Math.max(0, t.life / t.maxLife);
			const wild = t.color === "#e11d2e" || t.text === "HEAD" || /^\d+$/.test(t.text);
			e.font = wild ? t.text === "HEAD" ? `20px Creepster, Nosifer, Impact, cursive` : `16px Creepster, Nosifer, Impact, cursive` : `bold 13px "IBM Plex Mono", monospace`;
			e.textAlign = "center";
			if (wild) {
				e.strokeStyle = "#1a0404";
				e.lineWidth = 3;
				e.strokeText(t.text, t.x, t.y);
			}
			e.fillStyle = t.color;
			e.fillText(t.text, t.x, t.y);
			e.restore();
		}
		e.restore();
		let f = {
			x: t / 2,
			y: n / 2,
			angle: this.player.angle,
			flashlightAngle: this.player.flashlightAngle,
			flashlightRange: this.player.flashlightRange * (1 + this.getPerkLevel(`highbeam`) * .25)
		}, p = this.firePuddles.map((e) => ({
			...e,
			x: e.x - l,
			y: e.y - u
		})), m = (this.currentLocation.lights || []).filter((e) => {
			let t = this.currentLocation.lantern;
			return t && Math.hypot(e.x - t.x, e.y - t.y) < 90 ? this.lanternLit : true;
		}).map((e) => ({
			x: e.x - l,
			y: e.y - u,
			radius: e.radius,
			intensity: e.intensity
		}));
		this.currentLocation.lantern && this.lanternLit && m.push({
			x: this.currentLocation.lantern.x - l,
			y: this.currentLocation.lantern.y - u,
			radius: 170,
			intensity: .95
		});
		for (let e of this.holes) e.boarded || m.push({
			x: e.x - l,
			y: e.y - u,
			radius: e.kind === `pit` ? 70 : 58,
			intensity: .42
		});
		this.lighting.renderLighting(e, t, n, f, this.muzzleFlashTimer, this.currentLocation.ambientLight, p, m);
		if (this.bloodRush > 0 || this.invuln > 1.2 && this.lastStandUsed) {
			e.save();
			e.fillStyle = this.bloodRush > 0 ? "rgba(140, 18, 24, 0.16)" : "rgba(194, 59, 34, 0.18)";
			e.fillRect(0, 0, t, n);
			e.restore();
		}
		if (this.fogUntil > 0) {
			e.save();
			e.fillStyle = `rgba(28, 32, 30, ${.18 + Math.sin(this.simTime) * .04})`;
			e.fillRect(0, 0, t, n);
			e.restore();
		}
		e.save(), e.translate(-l, -u), this.renderNoisePulses(e), this.renderHoleMarkers(e), this.renderLantern(e), this.renderBell(e), this.renderZombieLabels(e);
		for (let t of this.floaters) {
			e.save();
			e.globalAlpha = Math.max(0, t.life / t.maxLife);
			const wild = t.color === "#e11d2e" || t.text === "HEAD" || /^\d+$/.test(t.text);
			e.font = wild ? t.text === "HEAD" ? `20px Creepster, Nosifer, Impact, cursive` : `16px Creepster, Nosifer, Impact, cursive` : `bold 13px "IBM Plex Mono", monospace`;
			e.textAlign = "center";
			if (wild) {
				e.strokeStyle = "#1a0404";
				e.lineWidth = 3;
				e.strokeText(t.text, t.x, t.y);
			}
			e.fillStyle = t.color;
			e.fillText(t.text, t.x, t.y);
			e.restore();
		}
		if (e.restore(), this.interactHint) {
			e.save();
			let r = this.player.x - l, i = this.player.y - u - 70;
			e.fillStyle = `rgba(12, 11, 9, 0.88)`, e.strokeStyle = `#d4a017`, e.lineWidth = 1.5;
			let a = Math.min(320, 24 + this.interactHint.length * 7.2), o = this.bellHold > 0 && this.bellReady ? 42 : 32;
			e.beginPath(), e.roundRect(r - a / 2, i - o / 2, a, o, 6), e.fill(), e.stroke(), e.fillStyle = `#d4a017`, e.font = `bold 12px "IBM Plex Mono", monospace`, e.textAlign = `center`, e.textBaseline = `middle`, e.fillText(this.interactHint, r, this.bellHold > 0 && this.bellReady ? i - 6 : i), this.bellHold > 0 && this.bellReady && (e.fillStyle = `#3a3228`, e.fillRect(r - 70, i + 8, 140, 4), e.fillStyle = `#d4a017`, e.fillRect(r - 70, i + 8, 140 * Math.min(1, this.bellHold / 2.2), 4)), e.restore();
		}
		this.renderCompass(e, t, n);
		this.renderEyeshine(e, l, u);
		e.restore();
	}
	renderPlayer(e) {
		const facing = this.bodyFacingSmooth >= 0 ? 1 : -1;
		const moving = this.lastMoveSpeed > .35;
		const phase = this.walkPhase;
		const bob = moving ? Math.abs(Math.sin(phase)) * 3.4 : Math.sin(this.simTime * 2.05) * 1.05;
		const squash = moving ? 1 + Math.sin(phase * 2) * .045 : 1 + Math.sin(this.simTime * 2.05) * .01;
		const stride = moving ? Math.sin(phase) * 3.2 * facing : 0;
		const lean = moving ? Math.sin(phase) * .07 + this.moveVX * .012 : 0;
		const size = this.player.radius * 3.5;
		this.recoilKick;
		for (const g of this.afterimages) {
			e.save();
			e.globalAlpha = Math.max(0, g.life / g.maxLife) * .38;
			e.translate(g.x, g.y);
			e.scale(g.facing >= 0 ? 1 : -1, 1);
			drawSprite(e, "player", size, 0, false);
			e.restore();
		}
		e.save();
		e.translate(this.player.x, this.player.y);
		e.fillStyle = "rgba(0, 0, 0, 0.42)";
		e.beginPath();
		e.ellipse(stride * .25, 12, this.player.radius * (1.15 + this.lastMoveSpeed * .04), this.player.radius * .4, Math.atan2(this.moveVY, this.moveVX || 1) * .15, 0, Math.PI * 2);
		e.fill();
		e.save();
		e.translate(stride, -bob);
		e.rotate(lean);
		e.scale(facing * squash, 1 / squash);
		if (!drawSprite(e, "player", size, 0, false)) {
			e.fillStyle = "#7c2d12";
			e.beginPath();
			e.arc(0, 0, this.player.radius, 0, Math.PI * 2);
			e.fill();
		}
		e.restore();
		e.save();
		e.strokeStyle = "rgba(90, 24, 18, 0.85)";
		e.lineWidth = 2.2;
		e.beginPath();
		e.ellipse(stride * .2, 2 - bob, this.player.radius * 1.15, this.player.radius * 1.55, lean, 0, Math.PI * 2);
		e.stroke();
		e.restore();
		e.save();
		e.translate(facing * 6, -bob * .35 - 2);
		e.rotate(this.player.angle);
		this.drawHeldWeapon(e);
		e.restore();
		if (this.bashSwing > 0) {
			e.save();
			e.rotate(this.player.angle);
			e.strokeStyle = `rgba(212, 160, 23, ${this.bashSwing / .2})`;
			e.lineWidth = 5;
			e.beginPath();
			e.arc(4, 0, 50, -.85, .85);
			e.stroke();
			e.restore();
		}
		e.restore();
	}
	drawHeldWeapon(e) {
		const id = this.weapons[this.currentWeaponIndex].id;
		const rec = this.recoilKick;
		e.translate(-rec * .55, 0);
		if (id === "revolver") {
			e.fillStyle = "#6b3a18";
			e.beginPath();
			e.moveTo(2, -3);
			e.lineTo(12, -4);
			e.lineTo(12, 8);
			e.lineTo(0, 10);
			e.closePath();
			e.fill();
			e.fillStyle = "#b45309";
			e.beginPath();
			e.arc(14, 0, 6, 0, Math.PI * 2);
			e.fill();
			e.fillStyle = "#292524";
			e.fillRect(18, -2.4, 20, 4.8);
			e.fillStyle = "#78716c";
			e.fillRect(36, -3, 4, 6);
		} else if (id === "shotgun") {
			e.fillStyle = "#5c3a1e";
			e.fillRect(2, -6, 18, 12);
			e.fillStyle = "#44403c";
			e.fillRect(16 + this.pumpAnim * .6, -7, 14, 14);
			e.fillStyle = "#1c1917";
			e.fillRect(22, -4.5, 38, 9);
			e.fillStyle = "#78716c";
			e.fillRect(58, -5.5, 6, 11);
			e.fillStyle = "#a8a29e";
			e.fillRect(22, -6.5, 28, 2);
		} else if (id === "lever_rifle") {
			e.fillStyle = "#7c4a1e";
			e.fillRect(0, -4, 16, 10);
			e.fillStyle = "#1c1917";
			e.fillRect(14, -2.2, 44, 4.4);
			e.strokeStyle = "#a8a29e";
			e.lineWidth = 2;
			e.beginPath();
			e.ellipse(18, 8, 8, 5, 0, 0, Math.PI);
			e.stroke();
			e.fillStyle = "#78716c";
			e.fillRect(56, -3, 5, 6);
		} else if (id === "carbine") {
			e.fillStyle = "#3f3f46";
			e.fillRect(2, -4, 14, 10);
			e.fillStyle = "#18181b";
			e.fillRect(14, -2, 34, 4);
			e.fillStyle = "#27272a";
			e.fillRect(16, 2, 8, 10);
			e.fillStyle = "#52525b";
			e.fillRect(46, -3, 4, 6);
		} else if (id === "crossbow") {
			e.fillStyle = "#5c3a1e";
			e.fillRect(4, -3, 22, 6);
			e.strokeStyle = "#d6d3d1";
			e.lineWidth = 3;
			e.beginPath();
			e.moveTo(20, -16);
			e.quadraticCurveTo(8, 0, 20, 16);
			e.stroke();
			e.strokeStyle = "#e7e5e4";
			e.lineWidth = 1.2;
			e.beginPath();
			e.moveTo(20, -16);
			e.lineTo(26, 0);
			e.lineTo(20, 16);
			e.stroke();
			e.fillStyle = "#e2e8f0";
			e.fillRect(22, -1.5, 18, 3);
		} else if (id === "chainsaw") {
			e.fillStyle = "#eab308";
			e.fillRect(4, -7, 20, 14);
			e.fillStyle = "#3f3f46";
			e.fillRect(22, -4, 32, 8);
			e.strokeStyle = "#a8a29e";
			e.lineWidth = 1.4;
			for (let i = 0; i < 6; i++) {
				const ox = 26 + i * 5 + this.simTime * 40 % 5;
				e.beginPath();
				e.moveTo(ox, -4);
				e.lineTo(ox + 2, 0);
				e.lineTo(ox, 4);
				e.stroke();
			}
		}
		if (this.muzzleFlashTimer > .25 && id !== "crossbow") {
			const flashX = id === "shotgun" ? 64 : id === "lever_rifle" ? 60 : id === "carbine" ? 50 : id === "chainsaw" ? 52 : 40;
			e.fillStyle = id === "shotgun" ? "rgba(253, 186, 116, 0.95)" : "rgba(254, 240, 138, 0.92)";
			e.beginPath();
			if (id === "shotgun") {
				e.moveTo(flashX - 4, 0);
				e.lineTo(flashX + 18, -14);
				e.lineTo(flashX + 10, 0);
				e.lineTo(flashX + 18, 14);
				e.closePath();
			} else e.arc(flashX, 0, 5 + this.muzzleFlashTimer * (id === "revolver" ? 7 : 5), 0, Math.PI * 2);
			e.fill();
		}
	}
	renderZombies(e) {
		const camL = this.camX - this.canvas.width / 2 - 80;
		const camT = this.camY - this.canvas.height / 2 - 80;
		const camR = camL + this.canvas.width + 160;
		const camB = camT + this.canvas.height + 160;
		for (const t of this.zombies) {
			if (t.x < camL || t.x > camR || t.y < camT || t.y > camB) continue;
			const facingLeft = Math.cos(t.angle) < 0;
			const limp = Math.abs(Math.sin(this.simTime * (t.type === "sprinter" ? 10 : 6) + t.x * .08)) * (t.type === "crawler" ? 1.6 : 3.2);
			const size = t.radius * (t.type === "behemoth" ? 3.9 : t.type === "crawler" ? 4.4 : 3.7);
			e.save();
			e.translate(t.x, t.y);
			e.fillStyle = "rgba(0, 0, 0, 0.5)";
			e.beginPath();
			e.ellipse(2, t.radius * .55, t.radius * 1.2, t.radius * .5, 0, 0, Math.PI * 2);
			e.fill();
			e.save();
			e.translate(0, -limp);
			e.scale(facingLeft ? -1 : 1, 1);
			if (!drawSprite(e, t.type, size, t.hitFlash, false)) {
				e.fillStyle = t.hitFlash > 0 ? "#fef3c7" : t.color;
				e.beginPath();
				e.arc(0, 0, t.radius, 0, Math.PI * 2);
				e.fill();
			}
			if (t.isBurning && t.isBurning > 0) {
				e.fillStyle = "rgba(249, 115, 22, 0.35)";
				e.beginPath();
				e.arc(0, 0, t.radius * 1.25, 0, Math.PI * 2);
				e.fill();
			}
			e.restore();
			const glow = 6 + Math.sin(this.simTime * 7 + t.x) * 2;
			e.fillStyle = "rgba(225, 29, 46, 0.45)";
			e.beginPath();
			e.arc(-4, -t.radius * .15 - limp, glow * .35, 0, Math.PI * 2);
			e.arc(4, -t.radius * .15 - limp, glow * .35, 0, Math.PI * 2);
			e.fill();
			if (t.health < t.maxHealth || t.type === "miner_brute" || t.type === "behemoth") {
				const n = t.radius * 2.4;
				const r = Math.max(0, t.health / t.maxHealth);
				e.fillStyle = "rgba(0, 0, 0, 0.75)";
				e.fillRect(-n / 2, -t.radius - 8 - limp, n, 4);
				e.fillStyle = "#e11d2e";
				e.fillRect(-n / 2, -t.radius - 8 - limp, n * r, 4);
			}
			e.restore();
		}
	}
	renderZombieLabels(e) {
		const camL = this.camX - this.canvas.width / 2 - 80;
		const camT = this.camY - this.canvas.height / 2 - 80;
		const camR = camL + this.canvas.width + 160;
		const camB = camT + this.canvas.height + 160;
		const elites = this.zombies.filter((t) => t.x >= camL && t.x <= camR && t.y >= camT && t.y <= camB && (t.type === "sprinter" || t.type === "miner_brute" || t.type === "bloater_spitter" || t.type === "behemoth"));
		if (!elites.length) return;
		elites.sort((a, b) => Math.hypot(a.x - this.player.x, a.y - this.player.y) - Math.hypot(b.x - this.player.x, b.y - this.player.y));
		const t = elites[0];
		const label = ZOMBIE_LABELS[t.type] || "WILD";
		const labelSize = t.type === "behemoth" ? 26 : 18;
		drawWildLabel(e, label, t.x, t.y - t.radius - 20, labelSize, this.simTime);
	}
	renderEyeshine(e, camL, camT) {
		const range = this.player.flashlightRange * 1.55;
		const cone = 0.62;
		for (const z of this.zombies) {
			const dx = z.x - this.player.x, dy = z.y - this.player.y;
			const dist = Math.hypot(dx, dy);
			if (dist < 40 || dist > range) continue;
			const ang = Math.atan2(dy, dx);
			let da = ang - this.player.flashlightAngle;
			while (da > Math.PI) da -= Math.PI * 2;
			while (da < -Math.PI) da += Math.PI * 2;
			const inCone = Math.abs(da) < cone && dist < this.player.flashlightRange;
			if (inCone && dist < 220) continue;
			const sx = z.x - camL, sy = z.y - camT;
			const glow = 3.4 + Math.sin(this.simTime * 8 + z.x) * 1.2;
			e.save();
			e.fillStyle = "rgba(225, 29, 46, 0.92)";
			e.shadowColor = "#e11d2e";
			e.shadowBlur = 12;
			e.beginPath();
			e.arc(sx - 5, sy - 6, glow * 0.42, 0, Math.PI * 2);
			e.arc(sx + 5, sy - 6, glow * 0.42, 0, Math.PI * 2);
			e.fill();
			e.restore();
		}
	}
	renderCompass(e, w, h) {
		const cx = w / 2, cy = 26;
		e.save();
		e.globalAlpha = 0.88;
		e.strokeStyle = "#8a7a64";
		e.lineWidth = 1.2;
		e.beginPath();
		e.arc(cx, cy, 20, 0, Math.PI * 2);
		e.stroke();
		const ticks = [];
		const loc = this.currentLocation;
		if (loc.lantern) ticks.push({ x: loc.lantern.x, y: loc.lantern.y, color: "#d4a017" });
		if (loc.extract) ticks.push({ x: loc.extract.x, y: loc.extract.y, color: "#d4a017" });
		if (loc.bell && this.bellReady) ticks.push({ x: loc.bell.x, y: loc.bell.y, color: "#d4a017" });
		let nearest = null, nd = 1e9;
		for (const z of this.zombies) {
			const d = Math.hypot(z.x - this.player.x, z.y - this.player.y);
			if (d < nd) { nd = d; nearest = z; }
		}
		if (nearest) ticks.push({ x: nearest.x, y: nearest.y, color: "#c23b22" });
		for (const t of ticks) {
			const ang = Math.atan2(t.y - this.player.y, t.x - this.player.x);
			e.fillStyle = t.color;
			e.beginPath();
			e.arc(cx + Math.cos(ang) * 20, cy + Math.sin(ang) * 20, 3.1, 0, Math.PI * 2);
			e.fill();
		}
		e.restore();
	}
	stripTheDead(z) {
		const mag = this.weapons.find((w) => w.id === "revolver");
		const pump = this.weapons.find((w) => w.id === "shotgun");
		if (z.type === "crawler" && pump && Math.random() < 0.62) {
			const n = 4 + Math.floor(Math.random() * 4);
			pump.reserveAmmo = Math.min(pump.maxReserveAmmo, pump.reserveAmmo + n);
			this.spawnFloater(z.x, z.y - z.radius - 10, `+${n} SHELLS`, "#d4a017");
		} else if ((z.type === "shambler" || z.type === "sprinter") && mag && Math.random() < 0.5) {
			const n = 3 + Math.floor(Math.random() * 4);
			mag.reserveAmmo = Math.min(mag.maxReserveAmmo, mag.reserveAmmo + n);
			this.spawnFloater(z.x, z.y - z.radius - 10, `+${n} .357`, "#d4a017");
		} else if (z.type === "miner_brute") {
			this.scrap += 18;
			this.stats.scrapCollected += 18;
			this.spawnFloater(z.x, z.y - z.radius - 10, "+SCRAP", "#d4a017");
		}
	}
	renderProjectiles(e) {
		for (let t of this.bullets) {
			e.save();
			e.translate(t.x, t.y);
			if (t.isMolotov) {
				e.fillStyle = `#f59e0b`;
				e.fillRect(-3, -6, 6, 12);
				e.fillStyle = `#ef4444`;
				e.beginPath();
				e.arc(0, -8, 3, 0, Math.PI * 2);
				e.fill();
			} else if (t.isCrossbowBolt || t.weaponType === "crossbow") {
				const n = Math.atan2(t.vy, t.vx);
				e.rotate(n);
				e.fillStyle = `#cbd5e1`;
				e.fillRect(-10, -1.6, 20, 3.2);
				e.fillStyle = `#f8fafc`;
				e.beginPath();
				e.moveTo(10, 0);
				e.lineTo(4, -4);
				e.lineTo(4, 4);
				e.closePath();
				e.fill();
				e.fillStyle = `#7c2d12`;
				e.fillRect(-10, -3.5, 4, 7);
			} else if (t.weaponType === "shotgun") {
				e.fillStyle = t.color;
				e.beginPath();
				e.arc(0, 0, t.radius, 0, Math.PI * 2);
				e.fill();
				e.globalAlpha = .35;
				e.beginPath();
				e.arc(0, 0, t.radius * 1.8, 0, Math.PI * 2);
				e.fill();
			} else if (t.weaponType === "lever_rifle") {
				const n = Math.atan2(t.vy, t.vx);
				e.rotate(n);
				e.strokeStyle = "rgba(254, 252, 232, 0.85)";
				e.lineWidth = 2;
				e.beginPath();
				e.moveTo(-16, 0);
				e.lineTo(10, 0);
				e.stroke();
				e.fillStyle = t.color;
				e.fillRect(-4, -1.4, 14, 2.8);
			} else if (t.weaponType === "carbine") {
				const n = Math.atan2(t.vy, t.vx);
				e.rotate(n);
				e.fillStyle = t.color;
				e.fillRect(-5, -1, 10, 2);
			} else {
				const n = Math.atan2(t.vy, t.vx);
				e.rotate(n);
				e.fillStyle = t.color;
				e.fillRect(-8, -t.radius / 2, 16, t.radius);
				e.globalAlpha = .4;
				e.fillRect(-14, -1, 10, 2);
			}
			e.restore();
		}
		for (let t of this.acidSpits) e.fillStyle = `#84cc16`, e.beginPath(), e.arc(t.x, t.y, t.radius, 0, Math.PI * 2), e.fill();
	}
	renderParticles(e) {
		for (let t of this.particles) e.save(), e.globalAlpha = t.alpha, e.fillStyle = t.color, e.beginPath(), e.arc(t.x, t.y, t.size, 0, Math.PI * 2), e.fill(), e.restore();
	}
}
