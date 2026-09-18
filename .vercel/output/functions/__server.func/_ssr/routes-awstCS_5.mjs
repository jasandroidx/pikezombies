import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Calendar, C as Flame, D as ChevronRight, E as ChevronsRight, M as Bell, O as ChevronLeft, S as Footprints, T as CircleHelp, _ as MapPin, a as Volume2, b as House, c as Target, d as ShoppingCart, f as Shield, g as Package, h as Play, i as VolumeX, j as BookOpen, k as Check, l as Sun, m as Radio, n as X, o as User, p as RotateCcw, r as Wrench, t as Zap, u as Skull, v as Lamp, w as FileText, x as Hammer, y as Infinity$1 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-awstCS_5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_WEAPONS = [
	{
		id: "revolver",
		name: ".357 Trail Magnum",
		category: "Sidearm",
		description: "Heavy Pike County revolver. One-handed thunder that still stops a shambler cold.",
		damage: 65,
		fireRate: 2.2,
		pellets: 1,
		spread: .04,
		range: 650,
		bulletSpeed: 16,
		magazineSize: 6,
		currentMag: 6,
		reserveAmmo: 48,
		maxReserveAmmo: 72,
		reloadTime: 1600,
		pierce: 1,
		soundType: "magnum",
		unlocked: true,
		cost: 0,
		upgradeLevel: 1
	},
	{
		id: "shotgun",
		name: "12-Ga. Pump",
		category: "Shotgun",
		description: "Barn gun. Turns a hallway of infected into Patoka mud.",
		damage: 26,
		fireRate: 1.05,
		pellets: 8,
		spread: .32,
		range: 420,
		bulletSpeed: 13,
		magazineSize: 6,
		currentMag: 6,
		reserveAmmo: 60,
		maxReserveAmmo: 90,
		reloadTime: 2200,
		pierce: 1,
		soundType: "shotgun",
		unlocked: true,
		cost: 0,
		upgradeLevel: 1
	},
	{
		id: "lever_rifle",
		name: "30-30 Lever Gun",
		category: "Rifle",
		description: "Deer rifle off a Washington Township porch. Drills through two, sometimes three.",
		damage: 140,
		fireRate: 1.4,
		pellets: 1,
		spread: .015,
		range: 900,
		bulletSpeed: 22,
		magazineSize: 5,
		currentMag: 5,
		reserveAmmo: 30,
		maxReserveAmmo: 50,
		reloadTime: 2e3,
		pierce: 3,
		soundType: "rifle",
		unlocked: false,
		cost: 350,
		upgradeLevel: 1
	},
	{
		id: "carbine",
		name: "Guard Carbine",
		category: "Assault",
		description: "Pulled from an Indiana National Guard checkpoint on US-41 after the road went quiet.",
		damage: 42,
		fireRate: 7.5,
		pellets: 1,
		spread: .08,
		range: 750,
		bulletSpeed: 19,
		magazineSize: 30,
		currentMag: 30,
		reserveAmmo: 120,
		maxReserveAmmo: 240,
		reloadTime: 1800,
		pierce: 1,
		soundType: "carbine",
		unlocked: false,
		cost: 650,
		upgradeLevel: 1
	},
	{
		id: "crossbow",
		name: "Silent Hunter",
		category: "Special",
		description: "Broadheads. No report. The horde does not turn unless they see the light.",
		damage: 180,
		fireRate: .9,
		pellets: 1,
		spread: .01,
		range: 850,
		bulletSpeed: 18,
		magazineSize: 1,
		currentMag: 1,
		reserveAmmo: 25,
		maxReserveAmmo: 40,
		reloadTime: 1400,
		pierce: 2,
		soundType: "crossbow",
		unlocked: false,
		cost: 500,
		upgradeLevel: 1
	},
	{
		id: "chainsaw",
		name: "Stihl Yard Saw",
		category: "Melee Heavy",
		description: "Two-stroke from a barn loft. Eats fuel. Eats everything else faster.",
		damage: 35,
		fireRate: 12,
		pellets: 1,
		spread: .5,
		range: 95,
		bulletSpeed: 12,
		magazineSize: 100,
		currentMag: 100,
		reserveAmmo: 200,
		maxReserveAmmo: 300,
		reloadTime: 1200,
		pierce: 99,
		soundType: "chainsaw",
		unlocked: false,
		cost: 800,
		upgradeLevel: 1
	}
];
var AVAILABLE_PERKS = [
	{
		id: "grit",
		name: "Patoka Grit",
		description: "+25 max health and 15% faster recovery.",
		cost: 250,
		level: 0,
		maxLevel: 4,
		icon: "Shield"
	},
	{
		id: "quickdraw",
		name: "Hargrove Trigger",
		description: "+18% fire rate and 20% faster reloads.",
		cost: 300,
		level: 0,
		maxLevel: 3,
		icon: "Zap"
	},
	{
		id: "highbeam",
		name: "High-Beam Maglite",
		description: "Flashlight cone reaches 25% farther.",
		cost: 180,
		level: 0,
		maxLevel: 3,
		icon: "Sun"
	},
	{
		id: "scavenger",
		name: "Hollow Scavenger",
		description: "+35% ammo and scrap from the dead.",
		cost: 220,
		level: 0,
		maxLevel: 3,
		icon: "Package"
	},
	{
		id: "moonshiner",
		name: "190-Proof Mash",
		description: "Molotov pools burn 40% larger and linger longer.",
		cost: 280,
		level: 0,
		maxLevel: 3,
		icon: "Flame"
	},
	{
		id: "hollowpoint",
		name: "Hand-Loaded Lead",
		description: "All kinetic weapons deal +20% damage.",
		cost: 400,
		level: 0,
		maxLevel: 3,
		icon: "Target"
	},
	{
		id: "choke",
		name: "Barn Choke",
		description: "Shotgun patterns tighten and gain extra shot.",
		cost: 260,
		level: 0,
		maxLevel: 3,
		icon: "Target"
	}
];
var GAME_LOCATIONS = [
	{
		id: "white_oak_springs",
		name: "White Oak Springs",
		countyZone: "Washington Township",
		township: "First settlement, 1817",
		description: "Pike County's first white settlement. Cellar holes, a spring that tastes of iron, and a lantern that should have gone out fifty years ago.",
		mapWidth: 2e3,
		mapHeight: 1800,
		ambientLight: .22,
		weather: "mist",
		fogDensity: .42,
		ground: "#1a1d16",
		trail: "#2a241c",
		workbench: {
			x: 980,
			y: 940
		},
		extract: {
			x: 1320,
			y: 980,
			radius: 70
		},
		spawn: {
			x: 1168,
			y: 848
		},
		lantern: {
			x: 1144,
			y: 768
		},
		holes: [
			{
				x: 840,
				y: 1140,
				kind: "cellar"
			},
			{
				x: 1180,
				y: 1140,
				kind: "cellar"
			},
			{
				x: 640,
				y: 720,
				kind: "cellar"
			}
		],
		obstacles: [
			{
				x: 900,
				y: 740,
				width: 220,
				height: 150,
				type: "cabin",
				label: "HARGROVE PLACE"
			},
			{
				x: 1260,
				y: 860,
				width: 130,
				height: 72,
				type: "pickup_truck",
				color: "#5c2a22"
			},
			{
				x: 1040,
				y: 620,
				width: 70,
				height: 54,
				type: "spring",
				label: "WHITE OAK SPRING"
			},
			{
				x: 620,
				y: 580,
				width: 58,
				height: 58,
				type: "tree"
			},
			{
				x: 1480,
				y: 520,
				width: 64,
				height: 64,
				type: "tree"
			},
			{
				x: 480,
				y: 1180,
				width: 70,
				height: 70,
				type: "tree"
			},
			{
				x: 1560,
				y: 1240,
				width: 62,
				height: 62,
				type: "tree"
			},
			{
				x: 1100,
				y: 1280,
				width: 52,
				height: 46,
				type: "rock"
			},
			{
				x: 760,
				y: 1e3,
				width: 46,
				height: 42,
				type: "crate"
			},
			{
				x: 960,
				y: 920,
				width: 56,
				height: 40,
				type: "workbench",
				label: "SHED"
			}
		],
		barrels: [
			{
				x: 860,
				y: 800
			},
			{
				x: 1180,
				y: 790
			},
			{
				x: 1240,
				y: 980
			},
			{
				x: 730,
				y: 980
			},
			{
				x: 1400,
				y: 680
			}
		],
		lights: [
			{
				x: 925,
				y: 760,
				radius: 95,
				intensity: .85
			},
			{
				x: 1070,
				y: 760,
				radius: 90,
				intensity: .8
			},
			{
				x: 1075,
				y: 640,
				radius: 70,
				intensity: .55
			}
		],
		barricades: [{
			x: 840,
			y: 900,
			width: 90,
			height: 18,
			type: "wood_fence"
		}, {
			x: 1140,
			y: 900,
			width: 90,
			height: 18,
			type: "wood_fence"
		}],
		loreNotes: [{
			id: "note_springs_journal",
			locationId: "white_oak_springs",
			title: "Henry Stillwell's Camp Book",
			author: "Henry Stillwell",
			date: "October 12, 1983",
			content: [
				"Lincoln camped here on the road to Vincennes. So did I, a hundred and fifty years later, because the spring never froze.",
				"Three weeks back the water went to iron and sulfur. Doc Vance said typhoid. Typhoid don't make a man's eyes milk over while he still walks.",
				"I boarded the cellar. If you find this: they come out of the holes. Don't go down."
			],
			x: 1020,
			y: 840,
			radius: 26
		}, {
			id: "note_hargrove_deed",
			locationId: "white_oak_springs",
			title: "Water-Stained Township Deed",
			author: "Col. Hargrove's line",
			date: "November 1, 1983",
			content: ["White Oak Springs was the first. Petersburg was the seat. The dead do not care which.", "Lantern in the east window means the Hargrove place is still held. If the lantern's out, burn the cabin and keep walking the Trace."],
			x: 1280,
			y: 900,
			radius: 26
		}]
	},
	{
		id: "mccords_ford",
		name: "McCord's Ford",
		countyZone: "Patoka Township",
		township: "Yellow Banks Trace",
		description: "Where the East and West traces meet the Patoka. Lincoln crossed here in 1830. Tonight the river is full of floaters.",
		mapWidth: 2200,
		mapHeight: 1800,
		ambientLight: .14,
		weather: "fog",
		fogDensity: .5,
		ground: "#161914",
		trail: "#2c261c",
		workbench: {
			x: 1080,
			y: 1120
		},
		extract: {
			x: 1460,
			y: 760,
			radius: 75
		},
		spawn: {
			x: 1100,
			y: 1180
		},
		obstacles: [
			{
				x: 880,
				y: 860,
				width: 280,
				height: 70,
				type: "ford",
				label: "McCORD'S FORD"
			},
			{
				x: 620,
				y: 700,
				width: 160,
				height: 110,
				type: "barn",
				label: "McCORD BARN"
			},
			{
				x: 1400,
				y: 720,
				width: 135,
				height: 72,
				type: "pickup_truck",
				color: "#3e2a1a"
			},
			{
				x: 1060,
				y: 1100,
				width: 56,
				height: 40,
				type: "workbench",
				label: "SHED"
			},
			{
				x: 480,
				y: 500,
				width: 62,
				height: 62,
				type: "tree"
			},
			{
				x: 1680,
				y: 480,
				width: 68,
				height: 68,
				type: "tree"
			},
			{
				x: 420,
				y: 1280,
				width: 70,
				height: 70,
				type: "tree"
			},
			{
				x: 1760,
				y: 1220,
				width: 64,
				height: 64,
				type: "tree"
			},
			{
				x: 1180,
				y: 1280,
				width: 80,
				height: 56,
				type: "rock"
			},
			{
				x: 780,
				y: 1100,
				width: 48,
				height: 42,
				type: "crate"
			},
			{
				x: 1520,
				y: 1040,
				width: 50,
				height: 44,
				type: "crate"
			}
		],
		barrels: [
			{
				x: 820,
				y: 780
			},
			{
				x: 1180,
				y: 820
			},
			{
				x: 1480,
				y: 900
			},
			{
				x: 700,
				y: 1040
			},
			{
				x: 1320,
				y: 1100
			}
		],
		lights: [{
			x: 700,
			y: 740,
			radius: 100,
			intensity: .7
		}, {
			x: 1470,
			y: 750,
			radius: 80,
			intensity: .55
		}],
		barricades: [
			{
				x: 860,
				y: 820,
				width: 110,
				height: 16,
				type: "wood_fence"
			},
			{
				x: 1080,
				y: 820,
				width: 110,
				height: 16,
				type: "wood_fence"
			},
			{
				x: 980,
				y: 1080,
				width: 80,
				height: 16,
				type: "sandbags"
			}
		],
		loreNotes: [{
			id: "note_lincoln_trace",
			locationId: "mccords_ford",
			title: "Pencil on a Feed Sack",
			author: "Unknown",
			date: "Unknown",
			content: [
				"East Trace and West Trace come together here. So did the Lincolns, going north in 1830.",
				"There is no boat. The water is full of floaters that bite if you try to swim.",
				"If you have mash or gasoline, mix it with rags. Fire is the only thing that makes them hesitate."
			],
			x: 1e3,
			y: 900,
			radius: 26
		}, {
			id: "note_horseshoe",
			locationId: "mccords_ford",
			title: "Conservancy Notice",
			author: "Upper Patoka River Conservancy",
			date: "September 8, 1983",
			content: [
				"Horseshoe Bend was straightened in the 1920s. The old channel is still down there under the silt.",
				"Air monitors at the dredge spoil read clean. The crew did not. They stood back up.",
				"Do not wade. Do not drag. Burn what comes out of the cut."
			],
			x: 1440,
			y: 760,
			radius: 26
		}]
	},
	{
		id: "stendal_backbone",
		name: "Stendal Backbone",
		countyZone: "Lockhart Township",
		township: "Strip-mine highwall",
		description: "A sandstone ridge between Cup Creek and the South Patoka. The highwall dropped. Something in the pit learned to climb.",
		mapWidth: 2200,
		mapHeight: 1900,
		ambientLight: .12,
		weather: "night_clear",
		fogDensity: .46,
		ground: "#141816",
		trail: "#2a2c28",
		workbench: {
			x: 1040,
			y: 1240
		},
		extract: {
			x: 1580,
			y: 980,
			radius: 80
		},
		spawn: {
			x: 1040,
			y: 1320
		},
		holes: [
			{
				x: 1100,
				y: 920,
				kind: "pit"
			},
			{
				x: 1260,
				y: 900,
				kind: "pit"
			},
			{
				x: 940,
				y: 910,
				kind: "pit"
			}
		],
		obstacles: [
			{
				x: 860,
				y: 620,
				width: 420,
				height: 90,
				type: "highwall",
				label: "STENDAL HIGHWALL"
			},
			{
				x: 980,
				y: 740,
				width: 240,
				height: 160,
				type: "mine_entrance",
				label: "PIT ACCESS"
			},
			{
				x: 700,
				y: 980,
				width: 110,
				height: 58,
				type: "crate",
				color: "#2c3330"
			},
			{
				x: 1380,
				y: 980,
				width: 120,
				height: 58,
				type: "crate",
				color: "#2c3330"
			},
			{
				x: 860,
				y: 1240,
				width: 140,
				height: 72,
				type: "pickup_truck",
				color: "#4a4036"
			},
			{
				x: 1020,
				y: 1220,
				width: 56,
				height: 40,
				type: "workbench",
				label: "TIPPLE SHED"
			},
			{
				x: 520,
				y: 720,
				width: 64,
				height: 64,
				type: "rock"
			},
			{
				x: 1680,
				y: 740,
				width: 78,
				height: 78,
				type: "rock"
			},
			{
				x: 1180,
				y: 1420,
				width: 58,
				height: 52,
				type: "crate"
			},
			{
				x: 430,
				y: 1400,
				width: 60,
				height: 60,
				type: "tree"
			},
			{
				x: 1760,
				y: 1480,
				width: 62,
				height: 62,
				type: "tree"
			}
		],
		barrels: [
			{
				x: 930,
				y: 760
			},
			{
				x: 1280,
				y: 760
			},
			{
				x: 670,
				y: 940
			},
			{
				x: 1460,
				y: 1060
			},
			{
				x: 820,
				y: 1180
			},
			{
				x: 1100,
				y: 1320
			}
		],
		lights: [{
			x: 1100,
			y: 800,
			radius: 110,
			intensity: .5
		}, {
			x: 1040,
			y: 1100,
			radius: 80,
			intensity: .7
		}],
		barricades: [{
			x: 900,
			y: 920,
			width: 120,
			height: 20,
			type: "coal_cart"
		}, {
			x: 1180,
			y: 920,
			width: 120,
			height: 20,
			type: "coal_cart"
		}],
		loreNotes: [{
			id: "note_mine_incident",
			locationId: "stendal_backbone",
			title: "Sealed Shift Report",
			author: "Foreman Grady McCoy",
			date: "September 19, 1983",
			content: [
				"The highwall let go on the night shift. Not a slide — a breath. The pit exhaled.",
				"Zero methane. The crew went to convulsions anyway. Rescue found them standing.",
				"We locked the bulkhead from the surface. Fifty-two men are down there, and they know the latch."
			],
			x: 1100,
			y: 800,
			radius: 26
		}, {
			id: "note_dragline",
			locationId: "stendal_backbone",
			title: "Peabody Equipment Log",
			author: "Night oiler",
			date: "October 3, 1983",
			content: [
				"Dragline walked itself twenty yards toward Stendal. Cab empty. Lights on.",
				"Helmet lamps in the pit are not ours. They don't bob like a man walking. They hunt.",
				"If the Behemoth comes over the wall, you do not hold the ridge. You run the Trace."
			],
			x: 760,
			y: 1e3,
			radius: 26
		}]
	},
	{
		id: "petersburg_square",
		name: "Petersburg Square",
		countyZone: "Washington Township",
		township: "County seat, 1817",
		description: "Courthouse lawn, abandoned cruisers on Main, sandbags on the steps. The last dry ground in the county if the radio is telling the truth.",
		mapWidth: 2400,
		mapHeight: 1800,
		ambientLight: .2,
		weather: "rain",
		fogDensity: .32,
		ground: "#1a1816",
		trail: "#2e2a26",
		workbench: {
			x: 1180,
			y: 1120
		},
		extract: {
			x: 1740,
			y: 900,
			radius: 80
		},
		spawn: {
			x: 1200,
			y: 1180
		},
		bell: {
			x: 1180,
			y: 938
		},
		obstacles: [
			{
				x: 1040,
				y: 680,
				width: 280,
				height: 200,
				type: "courthouse",
				label: "PIKE CO. COURTHOUSE"
			},
			{
				x: 820,
				y: 860,
				width: 140,
				height: 70,
				type: "cruiser",
				color: "#1e3a5f"
			},
			{
				x: 1400,
				y: 840,
				width: 140,
				height: 70,
				type: "cruiser",
				color: "#1e3a5f"
			},
			{
				x: 1160,
				y: 1100,
				width: 56,
				height: 40,
				type: "workbench",
				label: "ARMORY CAGE"
			},
			{
				x: 520,
				y: 1100,
				width: 64,
				height: 64,
				type: "tree"
			},
			{
				x: 1760,
				y: 1160,
				width: 64,
				height: 64,
				type: "tree"
			},
			{
				x: 1080,
				y: 1280,
				width: 80,
				height: 56,
				type: "rock"
			},
			{
				x: 700,
				y: 600,
				width: 50,
				height: 44,
				type: "crate"
			},
			{
				x: 1640,
				y: 620,
				width: 50,
				height: 44,
				type: "crate"
			},
			{
				x: 1680,
				y: 820,
				width: 130,
				height: 72,
				type: "pickup_truck",
				color: "#3d2a22"
			}
		],
		barrels: [
			{
				x: 800,
				y: 780
			},
			{
				x: 1010,
				y: 820
			},
			{
				x: 1480,
				y: 780
			},
			{
				x: 1120,
				y: 980
			},
			{
				x: 760,
				y: 1080
			},
			{
				x: 1360,
				y: 1120
			}
		],
		lights: [
			{
				x: 1180,
				y: 760,
				radius: 140,
				intensity: .75
			},
			{
				x: 890,
				y: 890,
				radius: 70,
				intensity: .45
			},
			{
				x: 1470,
				y: 870,
				radius: 70,
				intensity: .45
			}
		],
		barricades: [
			{
				x: 1020,
				y: 900,
				width: 130,
				height: 18,
				type: "sandbags"
			},
			{
				x: 1220,
				y: 900,
				width: 130,
				height: 18,
				type: "sandbags"
			},
			{
				x: 900,
				y: 1040,
				width: 90,
				height: 16,
				type: "wood_fence"
			}
		],
		loreNotes: [{
			id: "note_square_orders",
			locationId: "petersburg_square",
			title: "National Guard Standing Orders",
			author: "Capt. R. Sterling, Indiana Guard",
			date: "November 12, 1983",
			content: ["Quarantine holds at the county line. No one from Pike crosses into Dubois. Huntingburg is not a refuge.", "Infection rides saliva and the fog. Keep the searchlight on the square. If the courthouse falls, burn the records and fall back to the Trace."],
			x: 1180,
			y: 720,
			radius: 26
		}, {
			id: "note_sheriff",
			locationId: "petersburg_square",
			title: "Water-Stained Dispatch",
			author: "Deputy C. Miller, Pike Co. Sheriff",
			date: "November 2, 1983",
			content: [
				"Code 99 at the springs. Road blocked by timber trucks that nobody parked.",
				"Shot one three times with issue .38. It kept crawling with half a collarbone.",
				"If the bell rings at dawn, we held. If it doesn't, don't come looking."
			],
			x: 900,
			y: 880,
			radius: 26
		}]
	},
	{
		id: "winslow_still",
		name: "Winslow Still-Yard",
		countyZone: "Patoka Township",
		township: "Old Winslow–Stendal Road",
		description: "Mash barrels, a two-stroke saw, and the last workbench that still has light. Dawn comes over the ridge if you can keep the fire lit.",
		mapWidth: 2100,
		mapHeight: 1800,
		ambientLight: .18,
		weather: "fog",
		fogDensity: .38,
		ground: "#1b1812",
		trail: "#2c2418",
		workbench: {
			x: 1020,
			y: 1040
		},
		extract: {
			x: 1340,
			y: 980,
			radius: 90
		},
		spawn: {
			x: 1100,
			y: 1140
		},
		obstacles: [
			{
				x: 920,
				y: 720,
				width: 200,
				height: 140,
				type: "still",
				label: "SILAS'S STILL"
			},
			{
				x: 640,
				y: 860,
				width: 170,
				height: 120,
				type: "barn",
				label: "FEED BARN"
			},
			{
				x: 1280,
				y: 880,
				width: 130,
				height: 72,
				type: "pickup_truck",
				color: "#682d24"
			},
			{
				x: 1e3,
				y: 1020,
				width: 56,
				height: 40,
				type: "workbench",
				label: "GUNSMITH"
			},
			{
				x: 520,
				y: 560,
				width: 62,
				height: 62,
				type: "tree"
			},
			{
				x: 1580,
				y: 540,
				width: 66,
				height: 66,
				type: "tree"
			},
			{
				x: 460,
				y: 1240,
				width: 70,
				height: 70,
				type: "tree"
			},
			{
				x: 1640,
				y: 1280,
				width: 64,
				height: 64,
				type: "tree"
			},
			{
				x: 1140,
				y: 1260,
				width: 50,
				height: 44,
				type: "crate"
			},
			{
				x: 780,
				y: 1100,
				width: 48,
				height: 42,
				type: "crate"
			}
		],
		barrels: [
			{
				x: 860,
				y: 800
			},
			{
				x: 1180,
				y: 790
			},
			{
				x: 1240,
				y: 980
			},
			{
				x: 730,
				y: 980
			},
			{
				x: 1020,
				y: 1140
			},
			{
				x: 1400,
				y: 680
			}
		],
		lights: [{
			x: 1020,
			y: 780,
			radius: 130,
			intensity: .9
		}, {
			x: 720,
			y: 900,
			radius: 80,
			intensity: .55
		}],
		barricades: [
			{
				x: 860,
				y: 880,
				width: 100,
				height: 16,
				type: "wood_fence"
			},
			{
				x: 1080,
				y: 880,
				width: 100,
				height: 16,
				type: "wood_fence"
			},
			{
				x: 900,
				y: 1080,
				width: 90,
				height: 16,
				type: "sandbags"
			}
		],
		loreNotes: [{
			id: "note_silas",
			locationId: "winslow_still",
			title: "Silas Boyd's Last Journal",
			author: "Silas Boyd, moonshiner",
			date: "October 24, 1983",
			content: [
				"Boyds have been on this township roll since the first entries. I will not leave the still to them.",
				"The well went to sulfur three weeks before the dead clawed the loam.",
				"Don't aim for the chest. Ribs are brittle. The jaw don't stop till the skull splits clean open."
			],
			x: 1020,
			y: 800,
			radius: 26
		}, {
			id: "note_augusta_road",
			locationId: "winslow_still",
			title: "Note on the Stendal Road",
			author: "Unknown survivor",
			date: "Unknown",
			content: [
				"Old Winslow–Stendal Road still follows the Indian trace along the ridge. Augusta is dark.",
				"If you have high-proof mash, you have a weapon. If you have dawn, you have a county.",
				"Ring the bell if you live. Tell them a Boyd held the yard."
			],
			x: 1320,
			y: 900,
			radius: 26
		}]
	}
];
var OUTBREAK_ORDER = [
	"white_oak_springs",
	"mccords_ford",
	"stendal_backbone",
	"petersburg_square",
	"winslow_still"
];
function locationIndexById(id) {
	const i = GAME_LOCATIONS.findIndex((l) => l.id === id);
	return i < 0 ? 0 : i;
}
/**
* Procedural Web Audio Sound Engine for Pike County Zombies
* Synthesizes all weapon gunfire, zombie groans, environmental audio,
* and atmospheric Appalachian dark ambient music with zero external audio assets.
*/
var SoundEngine = class {
	ctx = null;
	masterGain = null;
	sfxGain = null;
	musicGain = null;
	isMuted = false;
	musicPlaying = false;
	musicInterval = null;
	noiseBuffer = null;
	constructor() {}
	init() {
		if (!this.ctx) {
			const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
			this.ctx = new AudioCtxClass();
			this.masterGain = this.ctx.createGain();
			this.masterGain.gain.value = .8;
			this.masterGain.connect(this.ctx.destination);
			this.sfxGain = this.ctx.createGain();
			this.sfxGain.gain.value = .9;
			this.sfxGain.connect(this.masterGain);
			this.musicGain = this.ctx.createGain();
			this.musicGain.gain.value = .35;
			this.musicGain.connect(this.masterGain);
			this.generateNoiseBuffer();
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	resume() {
		this.init();
		if (this.ctx?.state === "suspended") this.ctx.resume();
	}
	generateNoiseBuffer() {
		if (!this.ctx) return;
		const bufferSize = this.ctx.sampleRate * 2;
		this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
		const output = this.noiseBuffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
	}
	toggleMute() {
		this.isMuted = !this.isMuted;
		if (this.masterGain && this.ctx) this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : .8, this.ctx.currentTime);
		return this.isMuted;
	}
	getMuted() {
		return this.isMuted;
	}
	playGunshot(type) {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
		const t = this.ctx.currentTime;
		switch (type) {
			case "shotgun": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(140, t);
				osc.frequency.exponentialRampToValueAtTime(30, t + .25);
				oscGain.gain.setValueAtTime(1, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .35);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .35);
				const noise = this.ctx.createBufferSource();
				noise.buffer = this.noiseBuffer;
				const filter = this.ctx.createBiquadFilter();
				filter.type = "lowpass";
				filter.frequency.setValueAtTime(1800, t);
				filter.frequency.exponentialRampToValueAtTime(300, t + .4);
				const noiseGain = this.ctx.createGain();
				noiseGain.gain.setValueAtTime(.9, t);
				noiseGain.gain.exponentialRampToValueAtTime(.001, t + .45);
				noise.connect(filter);
				filter.connect(noiseGain);
				noiseGain.connect(this.sfxGain);
				noise.start(t);
				noise.stop(t + .45);
				setTimeout(() => {
					this.playClick(.3, 800);
					setTimeout(() => this.playClick(.25, 1200), 80);
				}, 220);
				break;
			}
			case "rifle": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(240, t);
				osc.frequency.exponentialRampToValueAtTime(50, t + .2);
				oscGain.gain.setValueAtTime(.8, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .28);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .28);
				const noise = this.ctx.createBufferSource();
				noise.buffer = this.noiseBuffer;
				const filter = this.ctx.createBiquadFilter();
				filter.type = "bandpass";
				filter.frequency.setValueAtTime(2800, t);
				filter.Q.setValueAtTime(2, t);
				const noiseGain = this.ctx.createGain();
				noiseGain.gain.setValueAtTime(.85, t);
				noiseGain.gain.exponentialRampToValueAtTime(.001, t + .35);
				noise.connect(filter);
				filter.connect(noiseGain);
				noiseGain.connect(this.sfxGain);
				noise.start(t);
				noise.stop(t + .35);
				break;
			}
			case "magnum": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(180, t);
				osc.frequency.exponentialRampToValueAtTime(40, t + .22);
				oscGain.gain.setValueAtTime(.9, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .28);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .28);
				const noise = this.ctx.createBufferSource();
				noise.buffer = this.noiseBuffer;
				const filter = this.ctx.createBiquadFilter();
				filter.type = "lowpass";
				filter.frequency.setValueAtTime(2200, t);
				const noiseGain = this.ctx.createGain();
				noiseGain.gain.setValueAtTime(.7, t);
				noiseGain.gain.exponentialRampToValueAtTime(.001, t + .25);
				noise.connect(filter);
				filter.connect(noiseGain);
				noiseGain.connect(this.sfxGain);
				noise.start(t);
				noise.stop(t + .25);
				break;
			}
			case "carbine": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(190, t);
				osc.frequency.exponentialRampToValueAtTime(60, t + .08);
				oscGain.gain.setValueAtTime(.65, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .12);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .12);
				const noise = this.ctx.createBufferSource();
				noise.buffer = this.noiseBuffer;
				const filter = this.ctx.createBiquadFilter();
				filter.type = "bandpass";
				filter.frequency.setValueAtTime(2200, t);
				const noiseGain = this.ctx.createGain();
				noiseGain.gain.setValueAtTime(.6, t);
				noiseGain.gain.exponentialRampToValueAtTime(.001, t + .14);
				noise.connect(filter);
				filter.connect(noiseGain);
				noiseGain.connect(this.sfxGain);
				noise.start(t);
				noise.stop(t + .14);
				break;
			}
			case "crossbow": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(380, t);
				osc.frequency.exponentialRampToValueAtTime(110, t + .18);
				oscGain.gain.setValueAtTime(.7, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .2);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .2);
				break;
			}
			case "chainsaw": {
				const osc = this.ctx.createOscillator();
				const oscGain = this.ctx.createGain();
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(110 + Math.random() * 20, t);
				osc.frequency.linearRampToValueAtTime(160 + Math.random() * 30, t + .15);
				oscGain.gain.setValueAtTime(.5, t);
				oscGain.gain.exponentialRampToValueAtTime(.001, t + .2);
				osc.connect(oscGain);
				oscGain.connect(this.sfxGain);
				osc.start(t);
				osc.stop(t + .2);
				break;
			}
			case "molotov": this.playBottleShatter();
		}
	}
	playBottleShatter() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
		const t = this.ctx.currentTime;
		for (let i = 0; i < 3; i++) {
			const osc = this.ctx.createOscillator();
			const oscGain = this.ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(1800 + i * 900 + Math.random() * 400, t + i * .03);
			oscGain.gain.setValueAtTime(.4, t + i * .03);
			oscGain.gain.exponentialRampToValueAtTime(.001, t + .15 + i * .03);
			osc.connect(oscGain);
			oscGain.connect(this.sfxGain);
			osc.start(t + i * .03);
			osc.stop(t + .2 + i * .03);
		}
		const noise = this.ctx.createBufferSource();
		noise.buffer = this.noiseBuffer;
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(800, t);
		const noiseGain = this.ctx.createGain();
		noiseGain.gain.setValueAtTime(.7, t);
		noiseGain.gain.exponentialRampToValueAtTime(.001, t + .8);
		noise.connect(filter);
		filter.connect(noiseGain);
		noiseGain.connect(this.sfxGain);
		noise.start(t);
		noise.stop(t + .8);
	}
	playZombieHit(isHeadshot = false) {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();
		osc.type = "square";
		osc.frequency.setValueAtTime(isHeadshot ? 280 : 160, t);
		osc.frequency.exponentialRampToValueAtTime(40, t + (isHeadshot ? .15 : .08));
		oscGain.gain.setValueAtTime(isHeadshot ? .6 : .35, t);
		oscGain.gain.exponentialRampToValueAtTime(.001, t + (isHeadshot ? .18 : .1));
		osc.connect(oscGain);
		oscGain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .2);
		if (isHeadshot) {
			const bell = this.ctx.createOscillator();
			const bellGain = this.ctx.createGain();
			bell.type = "sine";
			bell.frequency.setValueAtTime(1400, t);
			bellGain.gain.setValueAtTime(.4, t);
			bellGain.gain.exponentialRampToValueAtTime(.001, t + .25);
			bell.connect(bellGain);
			bellGain.connect(this.sfxGain);
			bell.start(t);
			bell.stop(t + .25);
		}
	}
	playZombieGroan(type) {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const filter = this.ctx.createBiquadFilter();
		const gain = this.ctx.createGain();
		if (type === "sprinter") {
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(450, t);
			osc.frequency.linearRampToValueAtTime(320, t + .35);
			filter.type = "bandpass";
			filter.frequency.setValueAtTime(900, t);
			gain.gain.setValueAtTime(.3, t);
			gain.gain.exponentialRampToValueAtTime(.001, t + .4);
			osc.connect(filter);
			filter.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t);
			osc.stop(t + .4);
		} else if (type === "bloater_spitter") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(160, t);
			osc.frequency.linearRampToValueAtTime(240, t + .25);
			filter.type = "lowpass";
			filter.frequency.setValueAtTime(500, t);
			gain.gain.setValueAtTime(.35, t);
			gain.gain.exponentialRampToValueAtTime(.001, t + .4);
			osc.connect(filter);
			filter.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t);
			osc.stop(t + .4);
		} else if (type === "behemoth") {
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(75, t);
			osc.frequency.linearRampToValueAtTime(45, t + .8);
			filter.type = "lowpass";
			filter.frequency.setValueAtTime(350, t);
			gain.gain.setValueAtTime(.7, t);
			gain.gain.exponentialRampToValueAtTime(.001, t + .9);
			osc.connect(filter);
			filter.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t);
			osc.stop(t + .9);
		} else {
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(type === "miner_brute" ? 85 : 120, t);
			osc.frequency.linearRampToValueAtTime(type === "miner_brute" ? 65 : 95, t + .45);
			filter.type = "bandpass";
			filter.frequency.setValueAtTime(type === "miner_brute" ? 300 : 450, t);
			gain.gain.setValueAtTime(.25, t);
			gain.gain.exponentialRampToValueAtTime(.001, t + .5);
			osc.connect(filter);
			filter.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t);
			osc.stop(t + .5);
		}
	}
	playReload() {
		if (this.isMuted) return;
		this.init();
		this.playClick(.35, 900);
		setTimeout(() => this.playClick(.4, 600), 200);
		setTimeout(() => this.playClick(.45, 1100), 450);
	}
	playPickup() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(520, t);
		osc.frequency.exponentialRampToValueAtTime(1040, t + .12);
		gain.gain.setValueAtTime(.3, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .15);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .15);
	}
	playPowerup() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		[
			523.25,
			659.25,
			783.99,
			1046.5
		].forEach((freq, idx) => {
			if (!this.ctx || !this.sfxGain) return;
			const osc = this.ctx.createOscillator();
			const gain = this.ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, t + idx * .06);
			gain.gain.setValueAtTime(.25, t + idx * .06);
			gain.gain.exponentialRampToValueAtTime(.001, t + idx * .06 + .4);
			osc.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t + idx * .06);
			osc.stop(t + idx * .06 + .45);
		});
	}
	playLoreNote() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(330, t);
		osc.frequency.exponentialRampToValueAtTime(440, t + .25);
		gain.gain.setValueAtTime(.3, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .5);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .5);
		this.playClick(.35, 1200);
		setTimeout(() => this.playClick(.25, 850), 60);
	}
	playBarrelExplosion() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(140, t);
		osc.frequency.exponentialRampToValueAtTime(25, t + .5);
		oscGain.gain.setValueAtTime(.9, t);
		oscGain.gain.exponentialRampToValueAtTime(.001, t + .6);
		osc.connect(oscGain);
		oscGain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .6);
		const noise = this.ctx.createBufferSource();
		noise.buffer = this.noiseBuffer;
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(1200, t);
		filter.frequency.exponentialRampToValueAtTime(120, t + .8);
		const noiseGain = this.ctx.createGain();
		noiseGain.gain.setValueAtTime(.95, t);
		noiseGain.gain.exponentialRampToValueAtTime(.001, t + .9);
		noise.connect(filter);
		filter.connect(noiseGain);
		noiseGain.connect(this.sfxGain);
		noise.start(t);
		noise.stop(t + .9);
	}
	playNuke() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(80, t);
		osc.frequency.exponentialRampToValueAtTime(18, t + 1.2);
		oscGain.gain.setValueAtTime(1, t);
		oscGain.gain.exponentialRampToValueAtTime(.001, t + 1.4);
		osc.connect(oscGain);
		oscGain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + 1.4);
		const noise = this.ctx.createBufferSource();
		noise.buffer = this.noiseBuffer;
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(2500, t);
		filter.frequency.exponentialRampToValueAtTime(200, t + 1.5);
		const noiseGain = this.ctx.createGain();
		noiseGain.gain.setValueAtTime(.9, t);
		noiseGain.gain.exponentialRampToValueAtTime(.001, t + 1.6);
		noise.connect(filter);
		filter.connect(noiseGain);
		noiseGain.connect(this.sfxGain);
		noise.start(t);
		noise.stop(t + 1.6);
	}
	playPlayerHurt() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(130, t);
		osc.frequency.exponentialRampToValueAtTime(45, t + .2);
		gain.gain.setValueAtTime(.6, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .25);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .25);
	}
	playDodge() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(220, t);
		osc.frequency.exponentialRampToValueAtTime(90, t + .16);
		gain.gain.setValueAtTime(.28, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .18);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .18);
	}
	playBash() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "square";
		osc.frequency.setValueAtTime(90, t);
		osc.frequency.exponentialRampToValueAtTime(40, t + .12);
		gain.gain.setValueAtTime(.35, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .14);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .14);
	}
	playWaveHorn() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc1 = this.ctx.createOscillator();
		const osc2 = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc1.type = "sawtooth";
		osc2.type = "triangle";
		osc1.frequency.setValueAtTime(110, t);
		osc2.frequency.setValueAtTime(165, t);
		gain.gain.setValueAtTime(.5, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + 1.2);
		osc1.connect(gain);
		osc2.connect(gain);
		gain.connect(this.sfxGain);
		osc1.start(t);
		osc2.start(t);
		osc1.stop(t + 1.2);
		osc2.stop(t + 1.2);
	}
	playBell() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		for (const [freq, delay, vol] of [
			[
				220,
				0,
				.7
			],
			[
				330,
				.05,
				.45
			],
			[
				165,
				.8,
				.4
			],
			[
				110,
				1.6,
				.25
			]
		]) {
			const osc = this.ctx.createOscillator();
			const gain = this.ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq, t + delay);
			gain.gain.setValueAtTime(vol, t + delay);
			gain.gain.exponentialRampToValueAtTime(.001, t + delay + 2.2);
			osc.connect(gain);
			gain.connect(this.sfxGain);
			osc.start(t + delay);
			osc.stop(t + delay + 2.3);
		}
	}
	playLantern() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(480, t);
		osc.frequency.exponentialRampToValueAtTime(240, t + .2);
		gain.gain.setValueAtTime(.35, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .35);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .35);
	}
	playSnuff() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain || !this.noiseBuffer) return;
		const t = this.ctx.currentTime;
		const noise = this.ctx.createBufferSource();
		noise.buffer = this.noiseBuffer;
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(900, t);
		const gain = this.ctx.createGain();
		gain.gain.setValueAtTime(.4, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .4);
		noise.connect(filter);
		filter.connect(gain);
		gain.connect(this.sfxGain);
		noise.start(t);
		noise.stop(t + .4);
	}
	playBoard() {
		if (this.isMuted) return;
		this.init();
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(180, t);
		osc.frequency.exponentialRampToValueAtTime(90, t + .12);
		gain.gain.setValueAtTime(.45, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .18);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .18);
	}
	playBoardBreak() {
		this.playSnuff();
	}
	playClick(volume, freq) {
		if (!this.ctx || !this.sfxGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(freq, t);
		gain.gain.setValueAtTime(volume, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .05);
		osc.connect(gain);
		gain.connect(this.sfxGain);
		osc.start(t);
		osc.stop(t + .05);
	}
	startAtmosphericMusic() {
		if (this.musicPlaying) return;
		this.init();
		this.musicPlaying = true;
		const banjoNotes = [
			146.83,
			174.61,
			196,
			220,
			261.63,
			293.66
		];
		let noteIdx = 0;
		this.playDroneNote();
		this.musicInterval = window.setInterval(() => {
			if (!this.musicPlaying || this.isMuted || !this.ctx || !this.musicGain) return;
			if (Math.random() > .35) {
				const note = banjoNotes[noteIdx % banjoNotes.length];
				noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % banjoNotes.length;
				this.playBanjoPluck(note);
			}
		}, 450);
	}
	playDroneNote() {
		if (!this.ctx || !this.musicGain) return;
		const t = this.ctx.currentTime;
		const drone = this.ctx.createOscillator();
		const filter = this.ctx.createBiquadFilter();
		const gain = this.ctx.createGain();
		drone.type = "sawtooth";
		drone.frequency.setValueAtTime(55, t);
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(140, t);
		gain.gain.setValueAtTime(.12, t);
		drone.connect(filter);
		filter.connect(gain);
		gain.connect(this.musicGain);
		drone.start(t);
	}
	playBanjoPluck(freq) {
		if (!this.ctx || !this.musicGain) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const harmonic = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(freq, t);
		harmonic.type = "sawtooth";
		harmonic.frequency.setValueAtTime(freq * 2, t);
		gain.gain.setValueAtTime(.18, t);
		gain.gain.exponentialRampToValueAtTime(1e-4, t + .65);
		osc.connect(gain);
		harmonic.connect(gain);
		gain.connect(this.musicGain);
		osc.start(t);
		harmonic.start(t);
		osc.stop(t + .7);
		harmonic.stop(t + .7);
	}
	stopAtmosphericMusic() {
		this.musicPlaying = false;
		if (this.musicInterval) {
			clearInterval(this.musicInterval);
			this.musicInterval = null;
		}
	}
};
var soundEngine = new SoundEngine();
function renderEnvironment(ctx, location, viewport, bloodDecals, firePuddles, drops, barrels = [], loreNotes = [], barricades = [], extractActive = false) {
	ctx.fillStyle = location.ground || "#1c1f19";
	ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);
	const tileSize = 80;
	const startX = Math.floor(viewport.x / tileSize) * tileSize;
	const startY = Math.floor(viewport.y / tileSize) * tileSize;
	const endX = viewport.x + viewport.width;
	const endY = viewport.y + viewport.height;
	ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
	ctx.lineWidth = 1;
	for (let x = startX; x <= endX; x += tileSize) {
		ctx.beginPath();
		ctx.moveTo(x, viewport.y);
		ctx.lineTo(x, viewport.y + viewport.height);
		ctx.stroke();
	}
	for (let y = startY; y <= endY; y += tileSize) {
		ctx.beginPath();
		ctx.moveTo(viewport.x, y);
		ctx.lineTo(viewport.x + viewport.width, y);
		ctx.stroke();
	}
	ctx.fillStyle = location.trail || "#26211a";
	ctx.beginPath();
	ctx.ellipse(location.mapWidth / 2, location.mapHeight / 2, 450, 320, .2, 0, Math.PI * 2);
	ctx.fill();
	for (const decal of bloodDecals) {
		if (decal.x + decal.radius < viewport.x || decal.x - decal.radius > viewport.x + viewport.width || decal.y + decal.radius < viewport.y || decal.y - decal.radius > viewport.y + viewport.height) continue;
		ctx.save();
		ctx.translate(decal.x, decal.y);
		ctx.rotate(decal.rotation);
		ctx.fillStyle = `rgba(139, 0, 0, ${decal.alpha})`;
		ctx.beginPath();
		ctx.ellipse(0, 0, decal.radius, decal.radius * .65, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = `rgba(90, 0, 0, ${decal.alpha * .8})`;
		for (let i = 0; i < 4; i++) {
			const angle = i * Math.PI / 2 + decal.rotation;
			const dist = decal.radius * .9;
			ctx.beginPath();
			ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, decal.radius * .2, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	const now = Date.now();
	for (const puddle of firePuddles) {
		if ((now - puddle.createdTime) / puddle.duration >= 1) continue;
		const flicker = .85 + Math.sin(now * .02 + puddle.x) * .15;
		const currentRadius = puddle.radius * flicker;
		ctx.fillStyle = "rgba(20, 10, 5, 0.7)";
		ctx.beginPath();
		ctx.arc(puddle.x, puddle.y, currentRadius * 1.1, 0, Math.PI * 2);
		ctx.fill();
		const grad = ctx.createRadialGradient(puddle.x, puddle.y, 0, puddle.x, puddle.y, currentRadius);
		grad.addColorStop(0, "rgba(255, 230, 120, 0.9)");
		grad.addColorStop(.3, "rgba(255, 120, 20, 0.7)");
		grad.addColorStop(.7, "rgba(220, 50, 10, 0.4)");
		grad.addColorStop(1, "rgba(180, 20, 0, 0)");
		ctx.fillStyle = grad;
		ctx.beginPath();
		ctx.arc(puddle.x, puddle.y, currentRadius, 0, Math.PI * 2);
		ctx.fill();
	}
	for (const obs of location.obstacles) renderObstacle(ctx, obs);
	for (const bar of barricades) renderBarricade(ctx, bar);
	if (extractActive) renderExtract(ctx, location.extract);
	for (const barrel of barrels) renderExplosiveBarrel(ctx, barrel, now);
	for (const drop of drops) renderDrop(ctx, drop, now);
	for (const note of loreNotes) if (!note.collected) renderLoreNote(ctx, note, now);
}
function renderLoreNote(ctx, note, now) {
	ctx.save();
	ctx.translate(note.x, note.y);
	ctx.fillStyle = `rgba(253, 230, 138, ${.2 * (Math.sin(now * .003) * .2 + .8)})`;
	ctx.beginPath();
	ctx.arc(0, 0, 26, 0, Math.PI * 2);
	ctx.fill();
	const bob = Math.sin(now * .004) * 3;
	ctx.translate(0, bob);
	ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
	ctx.fillRect(-8, -6, 16, 20);
	ctx.fillStyle = "#fef3c7";
	ctx.fillRect(-8, -10, 16, 20);
	ctx.fillStyle = "#d97706";
	ctx.beginPath();
	ctx.moveTo(3, -10);
	ctx.lineTo(8, -5);
	ctx.lineTo(3, -5);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#451a03";
	ctx.lineWidth = 1.2;
	for (let y = -5; y <= 6; y += 3) {
		ctx.beginPath();
		ctx.moveTo(-5, y);
		ctx.lineTo(5, y);
		ctx.stroke();
	}
	ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
	ctx.beginPath();
	ctx.roundRect(-16, -26, 32, 14, 3);
	ctx.fill();
	ctx.strokeStyle = "#eab308";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fillStyle = "#fef08a";
	ctx.font = "bold 9px \"Share Tech Mono\", monospace";
	ctx.textAlign = "center";
	ctx.fillText("[E] NOTE", 0, -16);
	ctx.restore();
}
function renderExplosiveBarrel(ctx, barrel, now) {
	ctx.save();
	ctx.translate(barrel.x, barrel.y);
	const isDamaged = barrel.health < barrel.maxHealth;
	if (isDamaged) {
		ctx.fillStyle = `rgba(239, 68, 68, ${.25 * (Math.sin(now * .02) * .5 + .5)})`;
		ctx.beginPath();
		ctx.arc(0, 0, barrel.radius + 8, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
	ctx.beginPath();
	ctx.ellipse(0, barrel.radius * .4, barrel.radius * 1.05, barrel.radius * .5, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = isDamaged ? "#b91c1c" : "#dc2626";
	ctx.beginPath();
	ctx.arc(0, 0, barrel.radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#7f1d1d";
	ctx.lineWidth = 2.5;
	ctx.stroke();
	ctx.strokeStyle = "#450a0a";
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	ctx.arc(0, 0, barrel.radius * .65, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = "#fef08a";
	ctx.beginPath();
	ctx.moveTo(0, -barrel.radius * .45);
	ctx.lineTo(barrel.radius * .4, barrel.radius * .28);
	ctx.lineTo(-barrel.radius * .4, barrel.radius * .28);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#b91c1c";
	ctx.beginPath();
	ctx.arc(0, 1, 2.5, 0, Math.PI * 2);
	ctx.fill();
	if (isDamaged) {
		const barW = barrel.radius * 2;
		const barH = 3;
		const pct = Math.max(0, barrel.health / barrel.maxHealth);
		ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
		ctx.fillRect(-barW / 2, -barrel.radius - 8, barW, barH);
		ctx.fillStyle = "#ef4444";
		ctx.fillRect(-barW / 2, -barrel.radius - 8, barW * pct, barH);
	}
	ctx.restore();
}
function renderObstacle(ctx, obs) {
	ctx.save();
	switch (obs.type) {
		case "cabin":
			ctx.fillStyle = "#22150c";
			ctx.fillRect(obs.x - 4, obs.y - 4, obs.width + 8, obs.height + 8);
			ctx.fillStyle = obs.color || "#3d2817";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.strokeStyle = "#1e140d";
			ctx.lineWidth = 2;
			for (let y = obs.y + 16; y < obs.y + obs.height; y += 18) {
				ctx.beginPath();
				ctx.moveTo(obs.x, y);
				ctx.lineTo(obs.x + obs.width, y);
				ctx.stroke();
			}
			ctx.fillStyle = "#4a3321";
			ctx.fillRect(obs.x + obs.width * .35, obs.y + obs.height - 12, obs.width * .3, 14);
			ctx.fillStyle = "rgba(255, 190, 80, 0.85)";
			ctx.fillRect(obs.x + 25, obs.y + 20, 24, 20);
			ctx.fillRect(obs.x + obs.width - 49, obs.y + 20, 24, 20);
			ctx.strokeStyle = "#22150c";
			ctx.lineWidth = 2;
			ctx.strokeRect(obs.x + 25, obs.y + 20, 24, 20);
			ctx.strokeRect(obs.x + obs.width - 49, obs.y + 20, 24, 20);
			ctx.fillStyle = "#a68a68";
			ctx.font = "10px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "CABIN", obs.x + 12, obs.y - 8);
			break;
		case "pickup_truck":
			ctx.fillStyle = "#121212";
			ctx.fillRect(obs.x - 3, obs.y - 3, obs.width + 6, obs.height + 6);
			ctx.fillStyle = obs.color || "#682d24";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#181a1b";
			ctx.fillRect(obs.x + obs.width * .45, obs.y + 6, obs.width * .5, obs.height - 12);
			ctx.fillStyle = "rgba(80, 110, 130, 0.7)";
			ctx.fillRect(obs.x + obs.width * .15, obs.y + 10, obs.width * .25, obs.height - 20);
			ctx.fillStyle = "#0a0a0a";
			ctx.fillRect(obs.x + 10, obs.y - 6, 22, 7);
			ctx.fillRect(obs.x + obs.width - 32, obs.y - 6, 22, 7);
			ctx.fillRect(obs.x + 10, obs.y + obs.height - 1, 22, 7);
			ctx.fillRect(obs.x + obs.width - 32, obs.y + obs.height - 1, 22, 7);
			ctx.fillStyle = "rgba(255, 230, 150, 0.7)";
			ctx.fillRect(obs.x - 2, obs.y + 8, 4, 8);
			ctx.fillRect(obs.x - 2, obs.y + obs.height - 16, 4, 8);
			break;
		case "mine_entrance":
			ctx.fillStyle = "#090a0a";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#3a2717";
			ctx.fillRect(obs.x, obs.y, 25, obs.height);
			ctx.fillRect(obs.x + obs.width - 25, obs.y, 25, obs.height);
			ctx.fillRect(obs.x, obs.y, obs.width, 25);
			ctx.fillStyle = "#eab308";
			ctx.fillRect(obs.x + obs.width / 2 - 40, obs.y + 8, 80, 14);
			ctx.fillStyle = "#000";
			ctx.font = "bold 9px monospace";
			ctx.fillText(obs.label || "MINE SHAFT", obs.x + obs.width / 2 - 34, obs.y + 19);
			ctx.strokeStyle = "#555";
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(obs.x + obs.width * .35, obs.y + obs.height);
			ctx.lineTo(obs.x + obs.width * .35, obs.y + obs.height + 60);
			ctx.moveTo(obs.x + obs.width * .65, obs.y + obs.height);
			ctx.lineTo(obs.x + obs.width * .65, obs.y + obs.height + 60);
			ctx.stroke();
			break;
		case "tree": {
			const radius = obs.width / 2;
			const cx = obs.x + radius;
			const cy = obs.y + radius;
			ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
			ctx.beginPath();
			ctx.arc(cx + 4, cy + 6, radius + 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#142817";
			ctx.beginPath();
			ctx.arc(cx, cy, radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#1c3d22";
			ctx.beginPath();
			ctx.arc(cx - 2, cy - 2, radius * .72, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#3c2718";
			ctx.beginPath();
			ctx.arc(cx, cy, 7, 0, Math.PI * 2);
			ctx.fill();
			break;
		}
		case "rock":
			ctx.fillStyle = "#2d3330";
			ctx.beginPath();
			ctx.ellipse(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, obs.height / 2, .3, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#47504c";
			ctx.beginPath();
			ctx.ellipse(obs.x + obs.width / 2 - 3, obs.y + obs.height / 2 - 3, obs.width / 2.6, obs.height / 2.6, .3, 0, Math.PI * 2);
			ctx.fill();
			break;
		case "crate":
			ctx.fillStyle = obs.color || "#3e2a1b";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.strokeStyle = "#1d120a";
			ctx.lineWidth = 2;
			ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
			ctx.beginPath();
			ctx.moveTo(obs.x, obs.y);
			ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
			ctx.moveTo(obs.x + obs.width, obs.y);
			ctx.lineTo(obs.x, obs.y + obs.height);
			ctx.stroke();
			break;
		case "courthouse": {
			ctx.fillStyle = "#1a1612";
			ctx.fillRect(obs.x - 6, obs.y - 6, obs.width + 12, obs.height + 12);
			ctx.fillStyle = obs.color || "#3d3428";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#2a231c";
			ctx.fillRect(obs.x + 20, obs.y + 16, obs.width - 40, obs.height - 36);
			ctx.fillStyle = "#cfc3ae";
			const colW = 14;
			const gap = (obs.width - 48) / 4;
			for (let i = 0; i < 5; i++) ctx.fillRect(obs.x + 24 + i * gap, obs.y + 28, colW, obs.height - 56);
			ctx.fillStyle = "#8a1f14";
			ctx.fillRect(obs.x + obs.width * .35, obs.y + obs.height - 28, obs.width * .3, 28);
			ctx.fillStyle = "rgba(255, 190, 80, 0.75)";
			ctx.fillRect(obs.x + 36, obs.y + 40, 22, 18);
			ctx.fillRect(obs.x + obs.width - 58, obs.y + 40, 22, 18);
			ctx.fillStyle = "#d4a017";
			ctx.font = "bold 11px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "COURTHOUSE", obs.x + 16, obs.y - 8);
			break;
		}
		case "highwall":
			ctx.fillStyle = "#1c1f1c";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#2c332c";
			for (let x = obs.x; x < obs.x + obs.width; x += 28) ctx.fillRect(x, obs.y, 22, obs.height);
			ctx.fillStyle = "#0d0f0d";
			ctx.fillRect(obs.x, obs.y + obs.height - 18, obs.width, 18);
			ctx.fillStyle = "#d4a017";
			ctx.font = "bold 10px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "HIGHWALL", obs.x + 12, obs.y - 8);
			break;
		case "still":
			ctx.fillStyle = "#1a120c";
			ctx.fillRect(obs.x - 4, obs.y - 4, obs.width + 8, obs.height + 8);
			ctx.fillStyle = "#3a2818";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#b45309";
			ctx.beginPath();
			ctx.ellipse(obs.x + obs.width * .35, obs.y + obs.height * .55, 36, 42, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#92400e";
			ctx.fillRect(obs.x + obs.width * .35 + 20, obs.y + 18, 70, 10);
			ctx.fillStyle = "rgba(255, 140, 40, 0.85)";
			ctx.beginPath();
			ctx.arc(obs.x + 28, obs.y + obs.height - 22, 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#d4a017";
			ctx.font = "bold 10px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "STILL", obs.x + 8, obs.y - 8);
			break;
		case "barn":
			ctx.fillStyle = "#2a120e";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = obs.color || "#7f1d1d";
			ctx.fillRect(obs.x + 4, obs.y + 8, obs.width - 8, obs.height - 12);
			ctx.fillStyle = "#1a0a08";
			ctx.beginPath();
			ctx.moveTo(obs.x, obs.y + 18);
			ctx.lineTo(obs.x + obs.width / 2, obs.y - 16);
			ctx.lineTo(obs.x + obs.width, obs.y + 18);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "#3a1814";
			ctx.fillRect(obs.x + obs.width * .4, obs.y + obs.height - 36, obs.width * .2, 36);
			ctx.fillStyle = "#c23b22";
			ctx.font = "bold 10px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "BARN", obs.x + 8, obs.y - 20);
			break;
		case "cruiser":
			ctx.fillStyle = "#0b0d10";
			ctx.fillRect(obs.x - 3, obs.y - 3, obs.width + 6, obs.height + 6);
			ctx.fillStyle = obs.color || "#1e3a5f";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "rgba(80, 110, 140, 0.7)";
			ctx.fillRect(obs.x + obs.width * .12, obs.y + 10, obs.width * .28, obs.height - 20);
			ctx.fillStyle = "#111";
			ctx.fillRect(obs.x + obs.width * .5, obs.y + 8, obs.width * .42, obs.height - 16);
			ctx.fillStyle = "#c23b22";
			ctx.fillRect(obs.x + obs.width * .42, obs.y + 4, 16, 8);
			ctx.fillStyle = "#2563eb";
			ctx.fillRect(obs.x + obs.width * .42 + 16, obs.y + 4, 16, 8);
			ctx.fillStyle = "#0a0a0a";
			ctx.fillRect(obs.x + 10, obs.y - 6, 22, 7);
			ctx.fillRect(obs.x + obs.width - 32, obs.y - 6, 22, 7);
			break;
		case "workbench":
			ctx.fillStyle = "#1a140e";
			ctx.fillRect(obs.x - 2, obs.y - 2, obs.width + 4, obs.height + 4);
			ctx.fillStyle = "#5b4632";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "#d4a017";
			ctx.fillRect(obs.x + 6, obs.y + 8, obs.width - 12, 6);
			ctx.font = "bold 9px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "SHED", obs.x - 4, obs.y - 8);
			break;
		case "spring": {
			const cx = obs.x + obs.width / 2;
			const cy = obs.y + obs.height / 2;
			const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, obs.width / 2);
			g.addColorStop(0, "rgba(120, 160, 150, 0.85)");
			g.addColorStop(1, "rgba(30, 50, 44, 0.2)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.ellipse(cx, cy, obs.width / 2, obs.height / 2, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#d4a017";
			ctx.font = "bold 9px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "SPRING", obs.x, obs.y - 8);
			break;
		}
		case "ford":
			ctx.fillStyle = "#1a2420";
			ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
			ctx.fillStyle = "rgba(70, 110, 100, 0.55)";
			ctx.fillRect(obs.x + 8, obs.y + 10, obs.width - 16, obs.height - 20);
			ctx.strokeStyle = "rgba(180, 200, 190, 0.25)";
			ctx.lineWidth = 2;
			for (let x = obs.x + 20; x < obs.x + obs.width; x += 36) {
				ctx.beginPath();
				ctx.moveTo(x, obs.y);
				ctx.lineTo(x - 12, obs.y + obs.height);
				ctx.stroke();
			}
			ctx.fillStyle = "#d4a017";
			ctx.font = "bold 10px \"IBM Plex Mono\", monospace";
			ctx.fillText(obs.label || "FORD", obs.x + 8, obs.y - 8);
	}
	ctx.restore();
}
function renderDrop(ctx, drop, now) {
	const bob = Math.sin(now * .006 + drop.x) * 3;
	const pulse = .85 + Math.sin(now * .01 + drop.y) * .15;
	ctx.save();
	ctx.translate(drop.x, drop.y + bob);
	switch (drop.type) {
		case "ammo_universal":
			ctx.fillStyle = "rgba(74, 222, 128, 0.2)";
			ctx.beginPath();
			ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#273e20";
			ctx.fillRect(-10, -7, 20, 14);
			ctx.strokeStyle = "#142111";
			ctx.lineWidth = 1.5;
			ctx.strokeRect(-10, -7, 20, 14);
			ctx.fillStyle = "#eab308";
			ctx.fillRect(-6, -4, 4, 8);
			ctx.fillRect(-1, -4, 4, 8);
			ctx.fillRect(4, -4, 4, 8);
			break;
		case "moonshine_med":
			ctx.fillStyle = "rgba(234, 179, 8, 0.25)";
			ctx.beginPath();
			ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "rgba(240, 248, 255, 0.7)";
			ctx.fillRect(-6, -8, 12, 16);
			ctx.fillStyle = "#f59e0b";
			ctx.fillRect(-5, -3, 10, 10);
			ctx.fillStyle = "#94a3b8";
			ctx.fillRect(-7, -10, 14, 3);
			break;
		case "scrap":
			ctx.fillStyle = "rgba(203, 213, 225, 0.2)";
			ctx.beginPath();
			ctx.arc(0, 0, 14 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#94a3b8";
			ctx.beginPath();
			ctx.arc(0, 0, 6, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#334155";
			ctx.beginPath();
			ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
			ctx.fill();
			break;
		case "molotov_pickup":
			ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
			ctx.beginPath();
			ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#78350f";
			ctx.fillRect(-4, -6, 8, 14);
			ctx.fillStyle = "#ef4444";
			ctx.beginPath();
			ctx.arc(0, -9, 3, 0, Math.PI * 2);
			ctx.fill();
			break;
		case "nuke":
			ctx.fillStyle = "rgba(234, 179, 8, 0.35)";
			ctx.beginPath();
			ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#facc15";
			ctx.beginPath();
			ctx.arc(0, 0, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#854d0e";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fillStyle = "#1e1e1e";
			ctx.beginPath();
			ctx.arc(0, 0, 3, 0, Math.PI * 2);
			ctx.fill();
			for (let a = 0; a < Math.PI * 2; a += Math.PI * 2 / 3) {
				ctx.beginPath();
				ctx.arc(0, 0, 9, a - .4, a + .4);
				ctx.lineTo(0, 0);
				ctx.fill();
			}
			break;
		case "insta_kill":
			ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
			ctx.beginPath();
			ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#ef4444";
			ctx.beginPath();
			ctx.arc(0, 0, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#7f1d1d";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(0, -2, 6, 0, Math.PI * 2);
			ctx.fillRect(-4, 0, 8, 6);
			ctx.fill();
			ctx.fillStyle = "#7f1d1d";
			ctx.fillRect(-3, -3, 2, 2.5);
			ctx.fillRect(1, -3, 2, 2.5);
			break;
		case "double_points":
			ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
			ctx.beginPath();
			ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#10b981";
			ctx.beginPath();
			ctx.arc(0, 0, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#064e3b";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fillStyle = "#ffffff";
			ctx.font = "bold 11px monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("2X", 0, 0);
			break;
		case "infinite_ammo":
			ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
			ctx.beginPath();
			ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#3b82f6";
			ctx.beginPath();
			ctx.arc(0, 0, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#1e3a8a";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fillStyle = "#ffffff";
			ctx.font = "bold 14px sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("∞", 0, -1);
			break;
		case "speed_boost":
			ctx.fillStyle = "rgba(168, 85, 247, 0.35)";
			ctx.beginPath();
			ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#a855f7";
			ctx.beginPath();
			ctx.arc(0, 0, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#581c87";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fillStyle = "#fef08a";
			ctx.beginPath();
			ctx.moveTo(1, -7);
			ctx.lineTo(-4, 0);
			ctx.lineTo(0, 0);
			ctx.lineTo(-2, 7);
			ctx.lineTo(5, -1);
			ctx.lineTo(1, -1);
			ctx.closePath();
			ctx.fill();
	}
	ctx.restore();
}
function renderBarricade(ctx, b) {
	const pct = Math.max(0, b.health / b.maxHealth);
	ctx.save();
	if (b.type === "sandbags") {
		ctx.fillStyle = pct > .35 ? "#6b5a3e" : "#3f3426";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.strokeStyle = "#2a2218";
		ctx.strokeRect(b.x, b.y, b.width, b.height);
	} else if (b.type === "coal_cart") {
		ctx.fillStyle = "#2a2e2c";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.fillStyle = "#111";
		ctx.fillRect(b.x + 4, b.y + 4, b.width - 8, b.height - 8);
	} else {
		ctx.fillStyle = pct > .35 ? "#5b3d22" : "#3a2616";
		ctx.fillRect(b.x, b.y, b.width, b.height);
		ctx.strokeStyle = "#2a1a10";
		ctx.lineWidth = 2;
		for (let x = b.x + 8; x < b.x + b.width; x += 14) {
			ctx.beginPath();
			ctx.moveTo(x, b.y);
			ctx.lineTo(x, b.y + b.height);
			ctx.stroke();
		}
	}
	if (pct < 1) {
		ctx.fillStyle = "rgba(0,0,0,0.7)";
		ctx.fillRect(b.x, b.y - 6, b.width, 3);
		ctx.fillStyle = pct < .35 ? "#c23b22" : "#d4a017";
		ctx.fillRect(b.x, b.y - 6, b.width * pct, 3);
	}
	ctx.restore();
}
function renderExtract(ctx, extract) {
	const pulse = .55 + Math.sin(Date.now() * .006) * .25;
	ctx.save();
	ctx.strokeStyle = `rgba(212, 160, 23, ${.7 * pulse})`;
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(extract.x, extract.y, extract.radius, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = `rgba(212, 160, 23, ${.12 * pulse})`;
	ctx.fill();
	ctx.fillStyle = "#d4a017";
	ctx.font = "bold 12px \"IBM Plex Mono\", monospace";
	ctx.textAlign = "center";
	ctx.fillText("GET TO THE TRUCK  [E]", extract.x, extract.y - extract.radius - 10);
	ctx.restore();
}
var DynamicLighting = class {
	darknessCanvas;
	darknessCtx;
	fogParticles = [];
	constructor() {
		this.darknessCanvas = document.createElement("canvas");
		this.darknessCtx = this.darknessCanvas.getContext("2d");
		for (let i = 0; i < 40; i++) this.fogParticles.push({
			x: Math.random() * 2500,
			y: Math.random() * 2e3,
			vx: .15 + Math.random() * .25,
			vy: .05 + Math.random() * .1,
			radius: 120 + Math.random() * 160,
			alpha: .04 + Math.random() * .06
		});
	}
	renderLighting(targetCtx, width, height, player, muzzleFlashTimer, ambientLight, firePuddles, staticLights) {
		if (this.darknessCanvas.width !== width || this.darknessCanvas.height !== height) {
			this.darknessCanvas.width = width;
			this.darknessCanvas.height = height;
		}
		const dCtx = this.darknessCtx;
		dCtx.clearRect(0, 0, width, height);
		dCtx.fillStyle = `rgba(16, 20, 14, ${Math.max(.38, .72 - ambientLight - (muzzleFlashTimer > 0 ? .28 : 0))})`;
		dCtx.fillRect(0, 0, width, height);
		dCtx.globalCompositeOperation = "destination-out";
		const auraGrad = dCtx.createRadialGradient(player.x, player.y, 8, player.x, player.y, 128);
		auraGrad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
		auraGrad.addColorStop(.45, "rgba(0, 0, 0, 0.82)");
		auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
		dCtx.fillStyle = auraGrad;
		dCtx.beginPath();
		dCtx.arc(player.x, player.y, 128, 0, Math.PI * 2);
		dCtx.fill();
		const fRange = player.flashlightRange;
		const fAngle = player.flashlightAngle;
		const fSpread = .55;
		dCtx.save();
		dCtx.translate(player.x, player.y);
		dCtx.rotate(fAngle);
		const coneGrad = dCtx.createRadialGradient(0, 0, 20, 0, 0, fRange);
		coneGrad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
		coneGrad.addColorStop(.65, "rgba(0, 0, 0, 0.85)");
		coneGrad.addColorStop(.9, "rgba(0, 0, 0, 0.45)");
		coneGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
		dCtx.fillStyle = coneGrad;
		dCtx.beginPath();
		dCtx.moveTo(0, 0);
		dCtx.arc(0, 0, fRange, -.55, fSpread);
		dCtx.closePath();
		dCtx.fill();
		dCtx.restore();
		if (muzzleFlashTimer > 0) {
			const flashGrad = dCtx.createRadialGradient(player.x + Math.cos(player.angle) * 30, player.y + Math.sin(player.angle) * 30, 15, player.x, player.y, 340);
			flashGrad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
			flashGrad.addColorStop(.8, "rgba(0, 0, 0, 0.5)");
			flashGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
			dCtx.fillStyle = flashGrad;
			dCtx.beginPath();
			dCtx.arc(player.x, player.y, 340, 0, Math.PI * 2);
			dCtx.fill();
		}
		const now = Date.now();
		for (const fire of firePuddles) {
			const flicker = 1 + Math.sin(now * .015 + fire.x) * .12;
			const fireRadius = fire.radius * 2.2 * flicker;
			const fireGrad = dCtx.createRadialGradient(fire.x, fire.y, 10, fire.x, fire.y, fireRadius);
			fireGrad.addColorStop(0, "rgba(0, 0, 0, 0.95)");
			fireGrad.addColorStop(.7, "rgba(0, 0, 0, 0.6)");
			fireGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
			dCtx.fillStyle = fireGrad;
			dCtx.beginPath();
			dCtx.arc(fire.x, fire.y, fireRadius, 0, Math.PI * 2);
			dCtx.fill();
		}
		for (const light of staticLights) {
			const lGrad = dCtx.createRadialGradient(light.x, light.y, 5, light.x, light.y, light.radius);
			lGrad.addColorStop(0, `rgba(0, 0, 0, ${light.intensity})`);
			lGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
			dCtx.fillStyle = lGrad;
			dCtx.beginPath();
			dCtx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
			dCtx.fill();
		}
		dCtx.globalCompositeOperation = "source-over";
		targetCtx.drawImage(this.darknessCanvas, 0, 0);
		this.renderFog(targetCtx, width, height);
	}
	renderFog(ctx, width, height) {
		ctx.save();
		for (const p of this.fogParticles) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x > width + p.radius) p.x = -p.radius;
			if (p.y > height + p.radius) p.y = -p.radius;
			const fogGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
			fogGrad.addColorStop(0, `rgba(168, 176, 142, ${p.alpha * 1.35})`);
			fogGrad.addColorStop(.6, `rgba(120, 132, 108, ${p.alpha * .7})`);
			fogGrad.addColorStop(1, "rgba(90, 100, 80, 0)");
			ctx.fillStyle = fogGrad;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
};
var LINES = {
	white_oak_springs: [
		{
			call: "WJPS Petersburg",
			body: "County health says stay off the traces. Water at White Oak Springs is not to be drunk. Repeat: not to be drunk."
		},
		{
			call: "Unknown",
			body: "If you can hear this, the Hargrove place still has a lantern in the east window. That's the only light south of the square."
		},
		{
			call: "Deputy Miller",
			body: "Cellar holes are coming up hollow. Something climbed out of the old springs. Do not go down."
		}
	],
	mccords_ford: [
		{
			call: "WJPS Petersburg",
			body: "Patoka's up. McCord's Ford is not a crossing tonight. Lincoln's trace is a grave."
		},
		{
			call: "Winslow fire",
			body: "We lost two trucks in the fog at the Horseshoe. If you see running lights in the river, they ain't ours."
		},
		{
			call: "Unknown",
			body: "East and West Yellow Banks meet at the ford. So do they. Don't stand in the middle."
		}
	],
	stendal_backbone: [
		{
			call: "Mine radio",
			body: "Highwall at Stendal is sliding. The dragline's moving and nobody's in the cab."
		},
		{
			call: "WJPS Petersburg",
			body: "Peabody road's closed. If you see a helmet lamp in the pit, it is not a man."
		},
		{
			call: "Foreman McCoy",
			body: "We sealed the bulkhead in eighty-three. Whatever's pounding it learned the latch."
		}
	],
	petersburg_square: [
		{
			call: "Pike Co. Sheriff",
			body: "Courthouse is the last dry ground in Washington Township. Sandbags on Main. No one in, no one out."
		},
		{
			call: "WJPS Petersburg",
			body: "This is the last broadcast from the square. If dawn comes, ring the bell."
		},
		{
			call: "Capt. Sterling, IN Guard",
			body: "Quarantine holds at US-41. Do not try for Dubois. Huntingburg is dark."
		}
	],
	winslow_still: [
		{
			call: "Unknown",
			body: "Still-yard's lit. Mash and gasoline. Fire is the only language they understand."
		},
		{
			call: "WJPS Petersburg",
			body: "Winslow's gone quiet except for a two-stroke saw. If that's you, keep it running till first light."
		},
		{
			call: "Silas",
			body: "Don't aim for the chest. Their ribs are brittle. The jaw don't stop till the skull splits."
		}
	]
};
var GENERIC = [{
	call: "Static",
	body: "—county line—don't cross the river—don't—"
}, {
	call: "WJPS Petersburg",
	body: "If you find a note, keep it. Somebody has to remember who lived here."
}];
function radioFor(locationId, wave) {
	const pool = LINES[locationId] ?? GENERIC;
	return pool[Math.abs(wave) % pool.length] ?? GENERIC[0];
}
function deathLine(locationName, killer) {
	if (killer === "behemoth") return `The highwall took another one at ${locationName}.`;
	if (killer === "bloater_spitter") return `Acid in the lungs. ${locationName} keeps what it swallows.`;
	if (killer === "miner_brute") return `Helmet lamp went dark at ${locationName}.`;
	if (killer === "crawler") return `Came up through a cellar hole at ${locationName}.`;
	return `Overrun at ${locationName}. Tell them we waited as long as we could.`;
}
var ZOMBIE_LABELS = {
	shambler: "WILD",
	sprinter: "FERAL",
	miner_brute: "MINER",
	bloater_spitter: "BLOATER",
	behemoth: "BEHEMOTH",
	crawler: "CRAWLER"
};
var PATHS = {
	player: "/sprites/player.png",
	shambler: "/sprites/shambler.png",
	sprinter: "/sprites/sprinter.png",
	miner_brute: "/sprites/miner_brute.png",
	bloater_spitter: "/sprites/bloater_spitter.png",
	behemoth: "/sprites/behemoth.png",
	crawler: "/sprites/crawler.png"
};
var cache = /* @__PURE__ */ new Map();
function getSprite(id) {
	const img = cache.get(id);
	return img && img.complete && img.naturalWidth > 0 ? img : null;
}
async function loadArt() {
	if (typeof document !== "undefined" && "fonts" in document) await Promise.all([document.fonts.load("24px Creepster"), document.fonts.load("64px Nosifer")]).catch(() => void 0);
	await Promise.all(Object.entries(PATHS).map(([key, src]) => new Promise((resolve) => {
		const img = new Image();
		img.decoding = "async";
		img.onload = () => {
			cache.set(key, img);
			resolve();
		};
		img.onerror = () => resolve();
		img.src = src;
	})));
}
function drawSprite(ctx, id, size, hitFlash = 0, flipX = false) {
	const img = getSprite(id);
	if (!img) return false;
	ctx.save();
	if (flipX) ctx.scale(-1, 1);
	if (hitFlash > 0) ctx.filter = "brightness(2.2) saturate(0.35)";
	ctx.drawImage(img, -size / 2, -size / 2, size, size);
	ctx.restore();
	return true;
}
function drawWildLabel(ctx, text, x, y, size, time) {
	const jx = Math.sin(time * 18 + x * .05) * 1.4;
	const jy = Math.cos(time * 14 + y * .04) * .8;
	ctx.save();
	ctx.translate(x + jx, y + jy);
	ctx.rotate(Math.sin(time * 3 + x) * .04);
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = `${size}px Creepster, Nosifer, Impact, cursive`;
	ctx.lineJoin = "round";
	ctx.miterLimit = 2;
	ctx.lineWidth = Math.max(3, size * .16);
	ctx.strokeStyle = "#1a0404";
	ctx.strokeText(text, 0, 0);
	ctx.fillStyle = "#e11d2e";
	ctx.shadowColor = "rgba(194, 59, 34, 0.85)";
	ctx.shadowBlur = 10;
	ctx.fillText(text, 0, 0);
	ctx.restore();
}
/** Shared BFS flow field so the horde walks around cabins instead of into them. */
var FlowField = class {
	cell = 40;
	cols = 0;
	rows = 0;
	dist = /* @__PURE__ */ new Float32Array(0);
	block = /* @__PURE__ */ new Uint8Array(0);
	markBlocked(mapW, mapH, obstacles) {
		this.cols = Math.max(1, Math.ceil(mapW / this.cell));
		this.rows = Math.max(1, Math.ceil(mapH / this.cell));
		const n = this.cols * this.rows;
		this.block = new Uint8Array(n);
		for (const o of obstacles) {
			const x0 = Math.max(0, Math.floor(o.x / this.cell));
			const y0 = Math.max(0, Math.floor(o.y / this.cell));
			const x1 = Math.min(this.cols - 1, Math.floor((o.x + o.width) / this.cell));
			const y1 = Math.min(this.rows - 1, Math.floor((o.y + o.height) / this.cell));
			for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.block[y * this.cols + x] = 1;
		}
	}
	rebuild(px, py) {
		const C = this.cols;
		const R = this.rows;
		const n = C * R;
		this.dist = new Float32Array(n);
		this.dist.fill(1e8);
		const gx = Math.max(0, Math.min(C - 1, Math.floor(px / this.cell)));
		const gy = Math.max(0, Math.min(R - 1, Math.floor(py / this.cell)));
		const q = new Int32Array(n);
		let head = 0;
		let tail = 0;
		const start = gy * C + gx;
		this.dist[start] = 0;
		q[tail++] = start;
		while (head < tail) {
			const i = q[head++];
			const x = i % C;
			const y = i / C | 0;
			const nd = this.dist[i] + 1;
			const nbs = [
				x + 1,
				y,
				x - 1,
				y,
				x,
				y + 1,
				x,
				y - 1
			];
			for (let k = 0; k < 4; k++) {
				const nx = nbs[k * 2];
				const ny = nbs[k * 2 + 1];
				if (nx < 0 || ny < 0 || nx >= C || ny >= R) continue;
				const j = ny * C + nx;
				if (this.block[j] || this.dist[j] <= nd) continue;
				this.dist[j] = nd;
				q[tail++] = j;
			}
		}
	}
	dir(x, y) {
		const C = this.cols;
		const R = this.rows;
		if (C < 2 || R < 2) return null;
		const cx = Math.max(0, Math.min(C - 1, Math.floor(x / this.cell)));
		const cy = Math.max(0, Math.min(R - 1, Math.floor(y / this.cell)));
		let best = this.dist[cy * C + cx];
		let bx = 0;
		let by = 0;
		for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
			if (!ox && !oy) continue;
			const nx = cx + ox;
			const ny = cy + oy;
			if (nx < 0 || ny < 0 || nx >= C || ny >= R) continue;
			const j = ny * C + nx;
			if (this.block[j]) continue;
			if (ox && oy) {
				if (this.block[cy * C + nx] && this.block[ny * C + cx]) continue;
			}
			if (this.dist[j] < best) {
				best = this.dist[j];
				bx = ox;
				by = oy;
			}
		}
		if (!bx && !by) return null;
		const m = Math.hypot(bx, by) || 1;
		return {
			x: bx / m,
			y: by / m
		};
	}
};
var GameEngine = class {
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
		const blocks = [...loc.obstacles || [], ...this.barricades.filter((b) => b.health > 0).map((b) => ({
			x: b.x,
			y: b.y,
			width: b.width,
			height: b.height
		}))];
		this.flow.markBlocked(loc.mapWidth, loc.mapHeight, blocks);
		this.flow.rebuild(this.player.x, this.player.y);
		this.flowRebuild = .35;
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
			zombies: this.zombies.map((z) => ({
				x: z.x,
				y: z.y,
				type: z.type,
				hp: z.health,
				ai: z.ai
			})),
			holes: this.holes.map((h) => ({
				x: h.x,
				y: h.y,
				boarded: h.boarded
			})),
			map: {
				w: this.currentLocation.mapWidth,
				h: this.currentLocation.mapHeight,
				name: this.currentLocation.name
			}
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
			for (const sy of [
				this.player.y - step,
				this.player.y + step,
				this.player.y - step * 2,
				this.player.y + step * 2
			]) if (!this.checkObstacleCollision(this.player.x, sy, rad * .92) && !this.checkObstacleCollision(u, sy, rad * .92)) {
				this.player.y = clampY(sy);
				if (!this.checkObstacleCollision(u, this.player.y, rad)) this.player.x = clampX(u);
				break;
			}
		}
		if (!this.checkObstacleCollision(this.player.x, d, rad)) this.player.y = clampY(d);
		else {
			const step = Math.max(3.2, Math.abs(this.moveVX) * l + 3);
			for (const sx of [
				this.player.x - step,
				this.player.x + step,
				this.player.x - step * 2,
				this.player.x + step * 2
			]) if (!this.checkObstacleCollision(sx, this.player.y, rad * .92) && !this.checkObstacleCollision(sx, d, rad * .92)) {
				this.player.x = clampX(sx);
				if (!this.checkObstacleCollision(this.player.x, d, rad)) this.player.y = clampY(d);
				break;
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
			{
				x: 60 + Math.random() * (w - 120),
				y: 60
			},
			{
				x: 60 + Math.random() * (w - 120),
				y: h - 60
			},
			{
				x: 60,
				y: 60 + Math.random() * (h - 120)
			},
			{
				x: w - 60,
				y: 60 + Math.random() * (h - 120)
			}
		];
		edges.sort((a, b) => Math.hypot(a.x - px, a.y - py) - Math.hypot(b.x - px, b.y - py));
		for (const e of edges) if (Math.hypot(e.x - px, e.y - py) >= minDist && !this.checkObstacleCollision(e.x, e.y, 16)) return e;
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
			let i = this.player.x - r.x, a = this.player.y - r.y, o = Math.hypot(i, a);
			r.hitFlash > 0 && (r.hitFlash -= e);
			let s = Math.hypot(r.hearX - r.x, r.hearY - r.y), c = this.simTime < this.bellLureUntil && this.currentLocation.bell, l = r.type === `sprinter` ? 520 : r.type === `behemoth` ? 700 : r.type === `crawler` ? 260 : 340;
			this.player.isSneaking && (l *= .6);
			const lantern = this.currentLocation.lantern;
			if (this.lanternLit && lantern && r.type === `shambler` && r.ai === `wander`) r.wanderAngle = Math.atan2(lantern.y - r.y, lantern.x - r.x) + (Math.random() - .5) * .7;
			c && this.currentLocation.bell ? (r.hearX = this.currentLocation.bell.x, r.hearY = this.currentLocation.bell.y, r.ai = o <= r.radius + this.player.radius + 2 ? `attack` : `investigate`) : o < l ? r.ai = o <= r.radius + this.player.radius + 2 ? `attack` : `chase` : r.ai === `wander` && s > 40 && (r.hearX !== r.x || r.hearY !== r.y) && (r.ai = `investigate`), r.ai === `wander` ? (r.wanderAngle += (Math.random() - .5) * .8 * e, r.angle = r.wanderAngle) : r.ai === `investigate` ? (r.angle = Math.atan2(r.hearY - r.y, r.hearX - r.x), s < 28 && (r.ai = `wander`)) : r.angle = Math.atan2(a, i), r.type === `bloater_spitter` && (r.spitCooldown ||= 2500, r.spitCooldown -= e * 1e3, r.spitCooldown <= 0 && o < 450) && (r.spitCooldown = 3200, this.acidSpits.push({
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
				let t = this.zombies[e], i = r.x - t.x, a = r.y - t.y, o = Math.hypot(i, a), s = r.radius + t.radius;
				if (o < s && o > 0) {
					let e = (s - o) * .15;
					r.x += i / o * e, r.y += a / o * e;
				}
			}
			o <= r.radius + this.player.radius && this.invuln <= 0 && t - r.lastAttackTime >= r.attackCooldown && (this.lastKiller = r.type, this.damagePlayer(r.damage), r.lastAttackTime = t);
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
		const cone = .62;
		for (const z of this.zombies) {
			const dx = z.x - this.player.x, dy = z.y - this.player.y;
			const dist = Math.hypot(dx, dy);
			if (dist < 40 || dist > range) continue;
			let da = Math.atan2(dy, dx) - this.player.flashlightAngle;
			while (da > Math.PI) da -= Math.PI * 2;
			while (da < -Math.PI) da += Math.PI * 2;
			if (Math.abs(da) < cone && dist < this.player.flashlightRange && dist < 220) continue;
			const sx = z.x - camL, sy = z.y - camT;
			const glow = 3.4 + Math.sin(this.simTime * 8 + z.x) * 1.2;
			e.save();
			e.fillStyle = "rgba(225, 29, 46, 0.92)";
			e.shadowColor = "#e11d2e";
			e.shadowBlur = 12;
			e.beginPath();
			e.arc(sx - 5, sy - 6, glow * .42, 0, Math.PI * 2);
			e.arc(sx + 5, sy - 6, glow * .42, 0, Math.PI * 2);
			e.fill();
			e.restore();
		}
	}
	renderCompass(e, w, h) {
		const cx = w / 2, cy = 26;
		e.save();
		e.globalAlpha = .88;
		e.strokeStyle = "#8a7a64";
		e.lineWidth = 1.2;
		e.beginPath();
		e.arc(cx, cy, 20, 0, Math.PI * 2);
		e.stroke();
		const ticks = [];
		const loc = this.currentLocation;
		if (loc.lantern) ticks.push({
			x: loc.lantern.x,
			y: loc.lantern.y,
			color: "#d4a017"
		});
		if (loc.extract) ticks.push({
			x: loc.extract.x,
			y: loc.extract.y,
			color: "#d4a017"
		});
		if (loc.bell && this.bellReady) ticks.push({
			x: loc.bell.x,
			y: loc.bell.y,
			color: "#d4a017"
		});
		let nearest = null, nd = 1e9;
		for (const z of this.zombies) {
			const d = Math.hypot(z.x - this.player.x, z.y - this.player.y);
			if (d < nd) {
				nd = d;
				nearest = z;
			}
		}
		if (nearest) ticks.push({
			x: nearest.x,
			y: nearest.y,
			color: "#c23b22"
		});
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
		if (z.type === "crawler" && pump && Math.random() < .62) {
			const n = 4 + Math.floor(Math.random() * 4);
			pump.reserveAmmo = Math.min(pump.maxReserveAmmo, pump.reserveAmmo + n);
			this.spawnFloater(z.x, z.y - z.radius - 10, `+${n} SHELLS`, "#d4a017");
		} else if ((z.type === "shambler" || z.type === "sprinter") && mag && Math.random() < .5) {
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
};
var KEY = "pcz_save_v2";
var SAVE_VERSION = 2;
var defaults = {
	version: SAVE_VERSION,
	highScore: 0,
	bestWave: 0,
	unlockedWeapons: ["revolver", "shotgun"],
	journal: [],
	mapsCleared: [],
	outbreakBeaten: false,
	lastRadio: ""
};
function migrate(raw) {
	const s = {
		...defaults,
		...raw,
		version: raw.version ?? 1
	};
	if (s.version < 2) {
		s.unlockedWeapons = s.unlockedWeapons?.length ? s.unlockedWeapons : defaults.unlockedWeapons;
		s.version = 2;
	}
	return {
		...defaults,
		...s,
		version: SAVE_VERSION
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) {
			const legacy = parseInt(localStorage.getItem("pike_county_high_score") || "0", 10);
			if (legacy > 0) return migrate({
				highScore: legacy,
				version: 1
			});
			return { ...defaults };
		}
		return migrate(JSON.parse(raw));
	} catch {
		return { ...defaults };
	}
}
function writeSave(patch) {
	try {
		const next = {
			...loadSave(),
			...patch,
			version: SAVE_VERSION
		};
		localStorage.setItem(KEY, JSON.stringify(next));
		return next;
	} catch {
		return loadSave();
	}
}
function recordRun(opts) {
	const cur = loadSave();
	writeSave({
		highScore: Math.max(cur.highScore, opts.score),
		bestWave: Math.max(cur.bestWave, opts.wave),
		unlockedWeapons: Array.from(/* @__PURE__ */ new Set([...cur.unlockedWeapons, ...opts.unlocked])),
		journal: Array.from(/* @__PURE__ */ new Set([...cur.journal, ...opts.notes])),
		mapsCleared: opts.mapId ? Array.from(/* @__PURE__ */ new Set([...cur.mapsCleared, opts.mapId])) : cur.mapsCleared,
		outbreakBeaten: cur.outbreakBeaten || Boolean(opts.outbreakWon)
	});
}
function HUD({ health, maxHealth, stamina, weapon, molotovs, score, scrap, combo, wave, waveTimer, zombiesRemaining, isReloading, reloadProgress, isMuted, activePowerups = [], onToggleMute, onOpenWorkbench, onSkipWaveTimer, locationName, township, radioCall, radioBody, extractActive, interactHint: _interactHint, modeLabel, lanternLit, hasLantern, sneaking, bellReady, bellHold = 0, holesOpen = 0, holesTotal = 0, bloodRush = false, lastStandReady = true, dodgeReady = true, fog = false, weaponIndex = 0, loadout = [], switchBanner = 0, helpVisible = true, onSelectWeapon }) {
	const hpPercent = Math.max(0, Math.min(100, health / maxHealth * 100));
	const isCritical = hpPercent < 25;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 flex flex-col justify-between p-3 md:p-5 select-none",
		children: [
			isCritical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 border-8 border-primary/40 bg-danger/20 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border bg-surface/90 px-3 py-2 shadow-2xl backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] uppercase tracking-[0.22em] text-accent",
								children: township
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-heading text-2xl font-bold tracking-wider text-fg md:text-3xl",
									children: ["WAVE ", wave || 1]
								}), extractActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "animate-pulse font-mono text-xs text-accent",
									children: "EXTRACT OPEN"
								}) : bellReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex animate-pulse items-center gap-1 font-mono text-xs text-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3 w-3" }), " RING THE BELL"]
								}) : waveTimer > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-accent",
									children: [
										"ON THE TRACE · ",
										waveTimer,
										"s"
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-wild infected-count text-lg tracking-wide md:text-2xl",
									children: [zombiesRemaining, " INFECTED"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[11px] text-muted",
								children: [
									modeLabel,
									" · ",
									locationName
								]
							}),
							bellReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1 overflow-hidden rounded bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-accent",
									style: { width: `${Math.min(100, bellHold * 100)}%` }
								})
							}),
							hasLantern && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${lanternLit ? "text-accent" : "text-primary"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { className: "h-3 w-3" }), lanternLit ? "East window lit" : "Lantern out"]
							}),
							holesTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-1 font-mono text-[10px] uppercase tracking-widest ${holesOpen > 0 ? "text-primary" : "text-accent"}`,
								children: holesOpen > 0 ? `${holesOpen} ${holesOpen === 1 ? "hole" : "holes"} coughing` : "Holes boarded"
							}),
							bloodRush && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 animate-pulse font-mono text-[10px] uppercase tracking-widest text-primary",
								children: "Blood rush"
							}),
							fog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted",
								children: "Fog in the bottoms"
							})
						]
					}), waveTimer > 0 && !extractActive && !bellReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pointer-events-auto w-fit rounded border border-border bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg",
						onClick: onSkipWaveTimer,
						children: "Skip break"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded border border-border bg-surface/90 px-3 py-2 text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted",
									children: "Score"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-heading text-xl font-bold text-fg",
									children: score.toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-[11px] text-accent",
									children: ["Scrap ", scrap]
								}),
								combo > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-[11px] text-primary",
									children: [
										"×",
										combo.toFixed(2),
										" combo"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "pointer-events-auto rounded border border-border bg-surface p-2 text-fg",
							onClick: onOpenWorkbench,
							title: "Workbench",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-accent" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "pointer-events-auto rounded border border-border bg-surface p-2 text-fg",
							onClick: onToggleMute,
							title: "Mute",
							children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4 text-accent" })
						})
					]
				})]
			}),
			radioBody && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "radio-scan relative mx-auto mt-2 max-w-xl overflow-hidden rounded border border-accent/40 bg-surface/90 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3.5 w-3.5" }), radioCall || "WJPS"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 font-lore text-sm leading-snug text-fg",
					children: radioBody
				})]
			}),
			activePowerups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex justify-center gap-2",
				children: activePowerups.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 rounded border border-accent/50 bg-surface px-2 py-1 font-mono text-[10px] uppercase text-accent",
					children: [
						p.type === "nuke" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skull, { className: "h-3 w-3" }),
						p.type === "infinite_ammo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, { className: "h-3 w-3" }),
						p.type === "insta_kill" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }),
						p.type.replace("_", " "),
						" ",
						Math.ceil(p.durationRemaining / 1e3),
						"s"
					]
				}, p.type))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full items-end justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-48 rounded border border-border bg-surface/85 px-2.5 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vitals" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									Math.ceil(health),
									"/",
									maxHealth
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 overflow-hidden rounded bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full ${isCritical ? "bg-primary" : "bg-accent"}`,
									style: { width: `${hpPercent}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-1.5 overflow-hidden rounded bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-fg/50",
									style: { width: `${stamina}%` }
								})
							}),
							sneaking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-accent",
								children: "Quiet step"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2 font-mono text-[9px] uppercase tracking-widest text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: dodgeReady ? "text-accent" : "text-muted",
									children: dodgeReady ? "Roll ready" : "Roll…"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: lastStandReady ? "text-fg/70" : "text-primary",
									children: lastStandReady ? "One stand" : "Stand spent"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[220px] rounded border border-border bg-surface/90 px-4 py-3 text-center",
						children: [
							switchBanner > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 font-heading text-sm uppercase tracking-widest text-accent",
								children: "Equipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] uppercase tracking-widest text-muted",
								children: weapon.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-heading text-lg font-bold text-fg",
								children: weapon.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 font-mono text-sm text-accent",
								children: [
									weapon.currentMag,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["/ ", weapon.reserveAmmo]
									})
								]
							}),
							isReloading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-1 overflow-hidden rounded bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-accent",
									style: { width: `${reloadProgress * 100}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-center gap-1 font-mono text-[11px] text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5" }),
									molotovs,
									" mash"
								]
							}),
							loadout.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap justify-center gap-1",
								children: loadout.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !w.unlocked,
									onClick: () => w.unlocked && onSelectWeapon?.(i),
									className: `pointer-events-auto min-w-7 rounded border px-1.5 py-0.5 font-mono text-[10px] ${!w.unlocked ? "cursor-not-allowed border-border text-muted/40" : i === weaponIndex ? "border-accent bg-accent text-bg" : "border-border bg-surface-2 text-fg hover:border-accent"}`,
									title: w.unlocked ? w.name : "Locked",
									children: i + 1
								}, w.id))
							})
						]
					}),
					helpVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden w-44 rounded border border-border bg-surface/70 p-2 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted md:block",
						children: [
							"WASD move · mouse aim",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"click fire · Space roll · F bash",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Q mash · 1–6 guns · E interact",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Tab shop"
						]
					})
				]
			})
		]
	});
}
function StartScreen({ onStartGame, isMuted, onToggleMute }) {
	const [selectedLocation, setSelectedLocation] = (0, import_react.useState)(0);
	const [difficulty, setDifficulty] = (0, import_react.useState)(1);
	const [showHelp, setShowHelp] = (0, import_react.useState)(false);
	const [showJournal, setShowJournal] = (0, import_react.useState)(false);
	const save = loadSave();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bg/95 p-5 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(194,59,34,0.12),_transparent_55%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette-overlay absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 animate-pulse rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] uppercase tracking-[0.22em] text-muted",
						children: "Pike County, Indiana · Quarantine 1983"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						save.highScore > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded border border-border bg-surface px-3 py-1 font-mono text-xs text-accent",
							children: [
								"Record ",
								save.highScore.toLocaleString(),
								" · Wave ",
								save.bestWave
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded border border-border bg-surface p-2",
							onClick: () => setShowJournal((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-accent" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded border border-border bg-surface p-2",
							onClick: () => setShowHelp((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "h-4 w-4 text-fg" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded border border-border bg-surface p-2",
							onClick: onToggleMute,
							children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4 text-accent" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto my-4 w-full max-w-5xl text-center md:my-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.35em] text-accent",
						children: "Patoka River · Yellow Banks Trace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-bold tracking-[0.12em] text-fg md:text-6xl",
						children: "PIKE COUNTY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wild-title mx-auto mt-1 mb-3 w-fit font-drip text-4xl md:text-7xl",
						children: "Zombies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 hidden max-w-xl font-lore text-sm leading-relaxed text-muted md:block",
						children: "The mines exhaled. The springs went to iron. Fog on the Patoka, and the dead walking the traces Lincoln used."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded border border-border bg-surface/90 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent",
						children: "County map"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountyMap, {
						selected: GAME_LOCATIONS[selectedLocation]?.id,
						cleared: save.mapsCleared,
						onPick: (id) => {
							const i = GAME_LOCATIONS.findIndex((l) => l.id === id);
							if (i >= 0) setSelectedLocation(i);
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded border border-border bg-surface/90 p-4 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-heading text-xl text-fg",
									children: GAME_LOCATIONS[selectedLocation].name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[11px] uppercase tracking-widest text-accent",
									children: GAME_LOCATIONS[selectedLocation].township
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-lore text-sm leading-relaxed text-muted",
									children: GAME_LOCATIONS[selectedLocation].description
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: [
								{
									n: .85,
									label: "Ridge"
								},
								{
									n: 1,
									label: "County"
								},
								{
									n: 1.35,
									label: "Highwall"
								}
							].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDifficulty(d.n),
								className: `flex-1 rounded border px-2 py-2 font-mono text-[11px] uppercase tracking-widest ${difficulty === d.n ? "border-accent bg-surface-2 text-accent" : "border-border bg-surface text-muted"}`,
								children: d.label
							}, d.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							id: "start-outbreak",
							type: "button",
							onClick: () => onStartGame(0, difficulty, "outbreak"),
							className: "flex items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-3 font-heading text-lg font-bold uppercase tracking-widest text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skull, { className: "h-5 w-5" }), "Outbreak night"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							id: "start-survival",
							type: "button",
							onClick: () => onStartGame(selectedLocation, difficulty, "survival"),
							className: "flex items-center justify-center gap-2 rounded border border-accent bg-surface-2 px-4 py-3 font-heading text-lg font-bold uppercase tracking-widest text-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5" }), "Survival · this place"]
						}),
						save.outbreakBeaten && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-accent",
							children: "Dawn has already come once. Hold it again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 md:grid-cols-4",
							children: [
								{
									icon: Zap,
									title: "Roll",
									body: "Space. I-frames. Costs wind."
								},
								{
									icon: Shield,
									title: "Bash",
									body: "F or right-click. Stun them."
								},
								{
									icon: Skull,
									title: "Blood rush",
									body: "Four kills. They go slow."
								},
								{
									icon: Bell,
									title: "Last stand",
									body: "Die once. Get back up."
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border bg-surface px-2 py-2 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-3 w-3" }), item.title]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-lore text-[11px] leading-snug text-muted",
									children: item.body
								})]
							}, item.title))
						})
					]
				})]
			}),
			showHelp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 mx-auto mt-4 max-w-xl rounded border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted",
				children: "WASD move · mouse aim and fire · 1 magnum · 2 pump · 3–6 bought guns · mousewheel swap · Space roll · F bash · Q mash · R reload · Ctrl quiet step · E lantern, boards, notes, shed, truck, bell · Tab workbench · M mute. Outbreak: White Oak Springs → McCord's Ford → Stendal Backbone → Petersburg Square → Winslow Still-yard. You start with the .357. The 12-gauge is already in the truck — press 2. Unlock the rest at the shed."
			}),
			showJournal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto mt-4 max-w-xl rounded border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-heading text-lg text-fg",
					children: "County journal"
				}), save.journal.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-lore text-sm text-muted",
					children: "No notes recovered. Walk the traces."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 font-mono text-xs text-accent",
					children: save.journal.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: id.replace(/_/g, " ") }, id))
				})]
			})
		]
	});
}
function CountyMap({ selected, cleared, onPick }) {
	const nodes = [
		{
			id: "white_oak_springs",
			x: 52,
			y: 28,
			label: "White Oak"
		},
		{
			id: "petersburg_square",
			x: 48,
			y: 48,
			label: "Petersburg"
		},
		{
			id: "mccords_ford",
			x: 28,
			y: 62,
			label: "McCord's Ford"
		},
		{
			id: "winslow_still",
			x: 32,
			y: 78,
			label: "Winslow"
		},
		{
			id: "stendal_backbone",
			x: 62,
			y: 80,
			label: "Stendal"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className: "h-44 w-full md:h-80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100",
				height: "100",
				fill: "#0c0b09"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 40 C 22 48, 40 55, 70 58 C 82 60, 90 72, 94 88",
				fill: "none",
				stroke: "#3a3228",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "54",
				fill: "#8a8175",
				fontSize: "3.2",
				fontFamily: "IBM Plex Mono",
				children: "Patoka"
			}),
			nodes.map((n, i) => {
				const prev = nodes[Math.max(0, i - 1)];
				const inOrder = OUTBREAK_ORDER.indexOf(n.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					inOrder > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: nodes.find((x) => x.id === OUTBREAK_ORDER[inOrder - 1])?.x,
						y1: nodes.find((x) => x.id === OUTBREAK_ORDER[inOrder - 1])?.y,
						x2: n.x,
						y2: n.y,
						stroke: "#3a3228",
						strokeWidth: "0.6",
						strokeDasharray: "1.5 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: n.x,
						cy: n.y,
						r: selected === n.id ? 3.6 : 2.4,
						fill: cleared.includes(n.id) ? "#d4a017" : selected === n.id ? "#c23b22" : "#8a8175",
						className: "cursor-pointer",
						onClick: () => onPick(n.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: n.x + 4,
						y: n.y + 1.2,
						fill: selected === n.id ? "#e8e0d4" : "#8a8175",
						fontSize: "3.4",
						fontFamily: "Oswald",
						className: "cursor-pointer",
						onClick: () => onPick(n.id),
						children: n.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: prev.label })
				] }, n.id);
			})
		]
	});
}
function UpgradeShopModal({ weapons, perks, scrap, molotovs, maxMolotovs, onClose, onUnlockWeapon, onUpgradeWeapon, onEquipWeapon, equippedId, onUpgradePerk, onBuyAmmoRefill, onBuyMolotov }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("weapons");
	const getPerkIcon = (iconName) => {
		switch (iconName) {
			case "Shield": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-accent" });
			case "Zap": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-accent" });
			case "Sun": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5 text-accent" });
			case "Package": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-fg" });
			case "Flame": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-5 w-5 text-primary" });
			case "Target": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-primary" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5 text-muted" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded border border-border bg-surface shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border bg-bg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded border border-accent/40 bg-surface-2 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-6 w-6 text-accent" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-heading text-xl font-bold tracking-wider text-fg md:text-2xl",
							children: "HARGROVE SHED"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-widest text-muted",
							children: "Workbench · reload, file, distill"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded border border-border bg-surface-2 px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase text-muted",
								children: "Scrap "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-heading text-lg font-bold text-accent",
								children: scrap
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "shop-close-btn",
							type: "button",
							onClick: onClose,
							className: "rounded border border-border bg-surface p-2 text-muted hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex border-b border-border bg-bg px-2",
					children: [
						{
							id: "weapons",
							label: "Arsenal"
						},
						{
							id: "perks",
							label: "County grit"
						},
						{
							id: "supplies",
							label: "Shed stores"
						}
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: `shop-tab-${tab.id}`,
						type: "button",
						onClick: () => setActiveTab(tab.id),
						className: `px-4 py-3 font-heading text-sm font-bold uppercase tracking-wider ${activeTab === tab.id ? "border-b-2 border-accent text-accent" : "text-muted hover:text-fg"}`,
						children: tab.label
					}, tab.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-5",
					children: [
						activeTab === "weapons" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-2",
							children: weapons.map((wep, idx) => {
								const upgradeCost = Math.round(wep.damage * 4.5 * wep.upgradeLevel);
								const canAffordUpgrade = scrap >= upgradeCost;
								const canAffordUnlock = scrap >= wep.cost;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex flex-col justify-between rounded border bg-bg p-4 ${equippedId === wep.id ? "border-accent" : "border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-1 flex items-start justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-wider text-accent",
												children: wep.category
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-heading text-lg font-bold text-fg",
												children: wep.name
											})] }), equippedId === wep.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-accent bg-accent px-2 py-0.5 font-mono text-[10px] text-bg",
												children: "In hands"
											}) : wep.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent",
												children: ["Lv. ", wep.upgradeLevel]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-primary/40 px-2 py-0.5 font-mono text-[10px] text-primary",
												children: "Locked"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-3 font-lore text-xs leading-relaxed text-muted",
											children: wep.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 grid grid-cols-3 gap-2 rounded border border-border bg-surface p-2.5 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
													n: "Damage",
													v: Math.round(wep.damage)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
													n: "Mag",
													v: wep.magazineSize
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
													n: "Rate",
													v: `${wep.fireRate}/s`
												})
											]
										})
									] }), wep.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [equippedId !== wep.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											id: `equip-weapon-${wep.id}`,
											type: "button",
											onClick: () => {
												onEquipWeapon(idx);
												soundEngine.playPickup();
											},
											className: "flex w-full items-center justify-center gap-2 rounded border border-accent bg-surface-2 px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider text-accent",
											children: "Put in hands"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											id: `upgrade-weapon-${wep.id}`,
											type: "button",
											onClick: () => {
												if (canAffordUpgrade) {
													onUpgradeWeapon(idx);
													soundEngine.playPickup();
												}
											},
											disabled: !canAffordUpgrade,
											className: `flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${canAffordUpgrade ? "border-accent bg-accent text-bg" : "cursor-not-allowed border-border bg-surface-2 text-muted"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4" }),
												"File +20% · ",
												upgradeCost,
												" scrap"
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										id: `unlock-weapon-${wep.id}`,
										type: "button",
										onClick: () => {
											if (canAffordUnlock) {
												onUnlockWeapon(idx);
												soundEngine.playPickup();
											}
										},
										disabled: !canAffordUnlock,
										className: `flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${canAffordUnlock ? "border-primary bg-primary text-fg" : "cursor-not-allowed border-border bg-surface-2 text-muted"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
											"Unlock · ",
											wep.cost,
											" scrap"
										]
									})]
								}, wep.id);
							})
						}),
						activeTab === "perks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-2",
							children: perks.map((perk) => {
								const isMax = perk.level >= perk.maxLevel;
								const cost = perk.cost * (perk.level + 1);
								const canAfford = scrap >= cost && !isMax;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-between rounded border border-border bg-bg p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded border border-border bg-surface p-2.5",
											children: getPerkIcon(perk.icon)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-1 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-heading text-base font-bold text-fg",
													children: perk.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-xs text-accent",
													children: [
														perk.level,
														"/",
														perk.maxLevel
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-lore text-xs text-muted",
												children: perk.description
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										id: `upgrade-perk-${perk.id}`,
										type: "button",
										onClick: () => {
											if (canAfford) {
												onUpgradePerk(perk.id);
												soundEngine.playPickup();
											}
										},
										disabled: !canAfford,
										className: `flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${isMax ? "cursor-default border-accent/30 bg-surface text-accent" : canAfford ? "border-accent bg-accent text-bg" : "cursor-not-allowed border-border bg-surface-2 text-muted"}`,
										children: isMax ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Maxed"] }) : `Train · ${cost} scrap`
									})]
								}, perk.id);
							})
						}),
						activeTab === "supplies" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded border border-border bg-bg p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded border border-border bg-surface p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-6 w-6 text-accent" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-heading text-base font-bold text-fg",
										children: "Munitions cache"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-lore text-xs text-muted",
										children: "Full resupply for every gun you already own."
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: "buy-ammo-cache-btn",
									type: "button",
									onClick: () => {
										if (scrap >= 80) {
											onBuyAmmoRefill();
											soundEngine.playPickup();
										}
									},
									disabled: scrap < 80,
									className: `mt-4 flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${scrap >= 80 ? "border-accent bg-accent text-bg" : "cursor-not-allowed border-border bg-surface-2 text-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }), "Resupply · 80 scrap"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded border border-border bg-bg p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded border border-primary/40 bg-surface p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-6 w-6 text-primary" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-heading text-base font-bold text-fg",
										children: "Winslow mash bottle"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-lore text-xs text-muted",
										children: [
											"190-proof and a rag. (",
											molotovs,
											"/",
											maxMolotovs,
											" carried)"
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: "buy-molotov-btn",
									type: "button",
									onClick: () => {
										if (scrap >= 60 && molotovs < maxMolotovs) {
											onBuyMolotov();
											soundEngine.playPickup();
										}
									},
									disabled: scrap < 60 || molotovs >= maxMolotovs,
									className: `mt-4 flex w-full items-center justify-center gap-2 rounded border px-3 py-2 font-heading text-xs font-bold uppercase tracking-wider ${scrap >= 60 && molotovs < maxMolotovs ? "border-primary bg-primary text-fg" : "cursor-not-allowed border-border bg-surface-2 text-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }), molotovs >= maxMolotovs ? "Satchel full" : "Distill · 60 scrap"]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border bg-bg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] uppercase tracking-widest text-muted",
						children: "Tab or Esc to close"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "shop-resume-battle-btn",
						type: "button",
						onClick: onClose,
						className: "rounded border border-accent bg-accent px-5 py-2 font-heading text-sm font-bold uppercase tracking-wider text-bg",
						children: "Back to the trace"
					})]
				})
			]
		})
	});
}
function Stat$1({ n, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block font-mono text-[10px] uppercase text-muted",
		children: n
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-sm font-bold text-fg",
		children: v
	})] });
}
function GameOverModal({ stats, score, wave, locationName, killer, mode, won, unlocked, notes, mapId, onRestart, onHome }) {
	(0, import_react.useEffect)(() => {
		recordRun({
			score,
			wave,
			unlocked,
			notes,
			mapId,
			outbreakWon: Boolean(won && mode === "outbreak")
		});
	}, [
		score,
		wave,
		unlocked,
		notes,
		mapId,
		won,
		mode
	]);
	const isRecord = score >= loadSave().highScore;
	const line = (0, import_react.useMemo)(() => won ? "The bell rang at dawn. Pike County still has a name." : deathLine(locationName, killer), [
		won,
		locationName,
		killer
	]);
	const accuracy = stats.shotsFired > 0 ? Math.round(stats.shotsHit / stats.shotsFired * 100) : 0;
	const minutes = Math.floor(stats.survivalTime / 60);
	const seconds = stats.survivalTime % 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-xl flex-col overflow-hidden rounded border border-border bg-surface shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-danger/30 p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 inline-flex rounded-full border border-primary/60 bg-danger/40 p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skull, { className: "h-10 w-10 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-drip wild-title text-4xl md:text-6xl",
							children: won ? "HELD" : "OVERRUN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-heading uppercase tracking-widest text-accent",
							children: won ? "Dawn over the Patoka" : wave >= 12 ? "Folk legend" : wave >= 8 ? "Ridge warden" : wave >= 4 ? "Hollow defender" : "Coal-dust martyr"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-lore text-sm leading-relaxed text-muted",
							children: line
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-bg p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase tracking-widest text-muted",
							children: "Final score"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-heading text-5xl font-bold text-fg",
							children: score.toLocaleString()
						}),
						isRecord && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono text-xs uppercase text-accent",
							children: "County record"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-xs text-muted",
							children: [
								locationName,
								" · Wave ",
								wave,
								" · ",
								mode
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-px bg-border text-center font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Kills",
							value: stats.kills
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Headshots",
							value: stats.headshots
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Accuracy",
							value: `${accuracy}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Time",
							value: `${minutes}:${seconds.toString().padStart(2, "0")}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Notes",
							value: stats.notesFound
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Scrap",
							value: stats.scrapCollected
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: "restart-run",
						type: "button",
						onClick: onRestart,
						className: "flex flex-1 items-center justify-center gap-2 rounded border border-accent bg-surface-2 py-3 font-heading uppercase tracking-widest text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), "Run it back"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: "home-btn",
						type: "button",
						onClick: onHome,
						className: "flex flex-1 items-center justify-center gap-2 rounded border border-border bg-surface py-3 font-heading uppercase tracking-widest text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), "County map"]
					})]
				})
			]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg text-fg",
			children: value
		})]
	});
}
function LoreNoteModal({ note, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "lore-note-modal",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-xl overflow-hidden rounded border border-border bg-surface p-6 md:p-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between border-b border-border pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded border border-accent/40 bg-surface-2 p-2.5 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), "Recovered paper"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-heading text-xl font-bold tracking-wide text-fg md:text-2xl",
							children: note.title
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "close-lore-modal-btn",
						type: "button",
						onClick: onClose,
						className: "rounded border border-border bg-bg p-2 text-muted hover:text-fg",
						title: "Close Note (Esc)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-wrap items-center gap-4 rounded border border-border bg-bg px-3.5 py-2 font-mono text-[11px] text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.author })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.date })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase",
								children: note.locationId.replace(/_/g, " ")
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "custom-scrollbar max-h-72 space-y-3 overflow-y-auto pr-2",
					children: note.content.map((paragraph, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-l-2 border-accent/50 bg-bg p-3 font-lore text-sm leading-relaxed text-fg italic md:text-base",
						children: paragraph
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-between border-t border-border pt-4 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono uppercase tracking-widest text-accent",
						children: "+250 · +50 scrap"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "dismiss-lore-modal-btn",
						type: "button",
						onClick: onClose,
						className: "rounded border border-accent bg-accent px-4 py-2 font-heading font-bold uppercase tracking-wider text-bg",
						children: "Fold it away"
					})]
				})
			]
		})
	});
}
function MobileControls({ onMoveChange, onAimChange, onReload, onThrowMolotov, onPrevWeapon, onNextWeapon, onInteract, onInteractHold, onSneakToggle, onDodge, onBash }) {
	const [isTouchDevice, setIsTouchDevice] = (0, import_react.useState)(false);
	const [sneaking, setSneaking] = (0, import_react.useState)(false);
	const moveStickRef = (0, import_react.useRef)(null);
	const aimStickRef = (0, import_react.useRef)(null);
	const [movePos, setMovePos] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [aimPos, setAimPos] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	(0, import_react.useEffect)(() => {
		setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
	}, []);
	if (!isTouchDevice) return null;
	const handleStickTouch = (e, stickRef, setPos, onChange) => {
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
		const nx = Math.cos(angle) * clampedDist / maxDist;
		const ny = Math.sin(angle) * clampedDist / maxDist;
		setPos({
			x: Math.cos(angle) * clampedDist,
			y: Math.sin(angle) * clampedDist
		});
		onChange({
			x: nx,
			y: ny
		});
	};
	const handleStickEnd = (setPos, onChange) => {
		setPos({
			x: 0,
			y: 0
		});
		onChange({
			x: 0,
			y: 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-30 flex items-end justify-between p-6 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: moveStickRef,
				onTouchMove: (e) => handleStickTouch(e, moveStickRef, setMovePos, onMoveChange),
				onTouchStart: (e) => handleStickTouch(e, moveStickRef, setMovePos, onMoveChange),
				onTouchEnd: () => handleStickEnd(setMovePos, onMoveChange),
				className: "pointer-events-auto relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-border bg-surface/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-12 w-12 rounded-full border border-accent bg-accent/80",
					style: { transform: `translate(${movePos.x}px, ${movePos.y}px)` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-2 font-mono text-[9px] uppercase text-muted",
					children: "Move"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto mb-2 flex items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onPrevWeapon,
						className: "rounded-full border border-border bg-surface/80 p-3 text-fg",
						title: "Previous Weapon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}),
					onSneakToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							const next = !sneaking;
							setSneaking(next);
							onSneakToggle(next);
						},
						className: `rounded-full border p-3 ${sneaking ? "border-accent bg-surface-2 text-accent" : "border-border bg-surface/80 text-fg"}`,
						title: "Quiet step",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-5 w-5" })
					}),
					onDodge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onDodge,
						className: "rounded-full border border-accent bg-surface-2 p-3.5 text-accent",
						title: "Roll",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "h-5 w-5" })
					}),
					onBash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onBash,
						className: "rounded-full border border-border bg-surface/80 p-3.5 text-fg",
						title: "Bash",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "h-5 w-5" })
					}),
					onInteract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onInteract,
						onTouchStart: () => onInteractHold?.(true),
						onTouchEnd: () => onInteractHold?.(false),
						onMouseDown: () => onInteractHold?.(true),
						onMouseUp: () => onInteractHold?.(false),
						className: "rounded-full border border-accent bg-surface-2 p-3.5 text-accent",
						title: "Interact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onThrowMolotov,
						className: "rounded-full border border-primary bg-surface-2 p-3.5 text-primary",
						title: "Throw Molotov",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onReload,
						className: "rounded-full border border-border bg-surface/80 p-3.5 text-fg",
						title: "Reload",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onNextWeapon,
						className: "rounded-full border border-border bg-surface/80 p-3 text-fg",
						title: "Next Weapon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: aimStickRef,
				onTouchMove: (e) => handleStickTouch(e, aimStickRef, setAimPos, onAimChange),
				onTouchStart: (e) => handleStickTouch(e, aimStickRef, setAimPos, onAimChange),
				onTouchEnd: () => handleStickEnd(setAimPos, onAimChange),
				className: "pointer-events-auto relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/60 bg-surface/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-12 w-12 rounded-full border border-primary bg-primary/80",
					style: { transform: `translate(${aimPos.x}px, ${aimPos.y}px)` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-2 font-mono text-[9px] uppercase text-primary",
					children: "Aim / Fire"
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
function GameApp() {
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const carryRef = (0, import_react.useRef)(null);
	const outbreakStepRef = (0, import_react.useRef)(0);
	const modeRef = (0, import_react.useRef)("survival");
	const [screen, setScreen] = (0, import_react.useState)("title");
	const [isWorkbenchOpen, setIsWorkbenchOpen] = (0, import_react.useState)(false);
	const [activeLoreNote, setActiveLoreNote] = (0, import_react.useState)(null);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("survival");
	const [outbreakStep, setOutbreakStep] = (0, import_react.useState)(0);
	const [won, setWon] = (0, import_react.useState)(false);
	const [killer, setKiller] = (0, import_react.useState)("shambler");
	const [radio, setRadio] = (0, import_react.useState)(null);
	const [foundNotes, setFoundNotes] = (0, import_react.useState)([]);
	const [selectedLocationIdx, setSelectedLocationIdx] = (0, import_react.useState)(0);
	const [weapons, setWeapons] = (0, import_react.useState)(INITIAL_WEAPONS);
	const [perks, setPerks] = (0, import_react.useState)(AVAILABLE_PERKS);
	const [hudStats, setHudStats] = (0, import_react.useState)({
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
		activePowerups: [],
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
		loadout: [],
		switchBanner: 0,
		helpVisible: true
	});
	const [gameOverData, setGameOverData] = (0, import_react.useState)({
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
			notesFound: 0
		},
		score: 0,
		wave: 1
	});
	const updateCanvasDimensions = (0, import_react.useCallback)(() => {
		if (!canvasRef.current) return;
		canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;
	}, []);
	(0, import_react.useEffect)(() => {
		loadArt();
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
	(0, import_react.useEffect)(() => {
		if (!radio) return;
		const t = window.setTimeout(() => setRadio(null), 7200);
		return () => window.clearTimeout(t);
	}, [radio]);
	const applySaveUnlocks = (engine) => {
		const save = loadSave();
		for (const w of engine.weapons) if (save.unlockedWeapons.includes(w.id)) w.unlocked = true;
	};
	const handleStartGame = (locationIndex, difficultyMultiplier, nextMode = "survival") => {
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
	const bootEngine = (locationIndex, difficultyMultiplier, nextMode, step, carry) => {
		if (!canvasRef.current) return;
		updateCanvasDimensions();
		engineRef.current?.destroy();
		const engine = new GameEngine(canvasRef.current, {
			onWaveComplete: () => {
				if (engineRef.current) {
					setWeapons([...engineRef.current.weapons]);
					setPerks([...engineRef.current.perks]);
				}
			},
			onGameOver: (stats, finalScore, deathKiller) => {
				setKiller(deathKiller);
				setWon(false);
				setGameOverData({
					stats,
					score: finalScore,
					wave: engineRef.current ? engineRef.current.wave : 1
				});
				setScreen("game_over");
			},
			onStatsUpdate: (stats) => setHudStats(stats),
			onLoreNoteFound: (note) => {
				setActiveLoreNote(note);
				setFoundNotes((n) => Array.from(/* @__PURE__ */ new Set([...n, note.id])));
				engineRef.current?.setPaused(true);
			},
			onRadio: (call, body) => setRadio({
				call,
				body
			}),
			onExtractReady: () => {
				setRadio({
					call: "WJPS Petersburg",
					body: "Truck's lit. Get off this ground before the next horn."
				});
			},
			onExtract: () => advanceOutbreak(),
			onWorkbenchPrompt: () => {
				setIsWorkbenchOpen(true);
				engineRef.current?.setPaused(true);
			}
		}, locationIndex);
		applySaveUnlocks(engine);
		if (carry) engine.importSnapshot(carry);
		if (nextMode === "outbreak") engine.outbreakWaves = step >= OUTBREAK_ORDER.length - 1 ? 5 : 3;
		else engine.outbreakWaves = 0;
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
			setGameOverData({
				stats: snap.stats,
				score: snap.score,
				wave: engine.wave
			});
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
	(0, import_react.useEffect)(() => {
		const handleKey = (e) => {
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
			} else if (e.code === "KeyM") handleToggleMute();
			else if (e.code === "Escape" && isWorkbenchOpen) handleToggleWorkbench();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [
		screen,
		isWorkbenchOpen,
		activeLoreNote
	]);
	const handleUnlockWeapon = (index) => {
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
	const handleEquipWeapon = (index) => {
		const engine = engineRef.current;
		if (!engine) return;
		engine.selectWeapon(index);
		setWeapons([...engine.weapons]);
	};
	const handleUpgradeWeapon = (index) => {
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
	const handleUpgradePerk = (perkId) => {
		const engine = engineRef.current;
		if (!engine) return;
		const perk = engine.perks.find((p) => p.id === perkId);
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
		for (const w of engine.weapons) if (w.unlocked) {
			w.reserveAmmo = w.maxReserveAmmo;
			w.currentMag = w.magazineSize;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-screen w-screen overflow-hidden bg-bg select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				id: "game-canvas",
				ref: canvasRef,
				className: "block h-full w-full cursor-crosshair"
			}),
			screen === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartScreen, {
				onStartGame: handleStartGame,
				isMuted,
				onToggleMute: handleToggleMute
			}),
			screen === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HUD, {
				health: hudStats.health,
				maxHealth: hudStats.maxHealth,
				stamina: hudStats.stamina,
				weapon: hudStats.weapon,
				molotovs: hudStats.molotovs,
				score: hudStats.score,
				scrap: hudStats.scrap,
				combo: hudStats.combo,
				wave: hudStats.wave,
				waveTimer: hudStats.waveTimer,
				zombiesRemaining: hudStats.zombiesRemaining,
				isReloading: hudStats.isReloading,
				reloadProgress: hudStats.reloadProgress,
				isMuted,
				activePowerups: hudStats.activePowerups,
				onToggleMute: handleToggleMute,
				onOpenWorkbench: handleToggleWorkbench,
				onSkipWaveTimer: () => engineRef.current?.skipWaveBreak(),
				locationName: loc?.name || "Pike County",
				township: loc?.township || "",
				radioCall: radio?.call,
				radioBody: radio?.body,
				extractActive: hudStats.extractActive,
				interactHint: hudStats.interactHint,
				lanternLit: hudStats.lanternLit,
				hasLantern: hudStats.hasLantern,
				sneaking: hudStats.sneaking,
				bellReady: hudStats.bellReady,
				bellHold: hudStats.bellHold,
				holesOpen: hudStats.holesOpen,
				holesTotal: hudStats.holesTotal,
				bloodRush: hudStats.bloodRush,
				lastStandReady: hudStats.lastStandReady,
				dodgeReady: hudStats.dodgeReady,
				fog: hudStats.fog,
				weaponIndex: hudStats.weaponIndex,
				loadout: hudStats.loadout,
				switchBanner: hudStats.switchBanner,
				helpVisible: hudStats.helpVisible !== false,
				onSelectWeapon: (i) => engineRef.current?.selectWeapon(i),
				modeLabel: mode === "outbreak" ? `Outbreak ${outbreakStep + 1}/${OUTBREAK_ORDER.length}` : "Survival"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileControls, {
				onMoveChange: (vec) => {
					if (engineRef.current) engineRef.current.virtualJoystickMove = vec;
				},
				onAimChange: (vec) => {
					if (engineRef.current) engineRef.current.virtualJoystickAim = vec;
				},
				onReload: () => engineRef.current?.reloadCurrentWeapon(),
				onThrowMolotov: () => engineRef.current?.throwMolotov(),
				onPrevWeapon: () => engineRef.current?.prevWeapon(),
				onNextWeapon: () => engineRef.current?.nextWeapon(),
				onInteract: () => engineRef.current?.interactLoreNote(),
				onInteractHold: (held) => {
					if (engineRef.current) engineRef.current.holdInteract = held;
				},
				onSneakToggle: (on) => {
					if (engineRef.current) engineRef.current.forceSneak = on;
				},
				onDodge: () => engineRef.current?.tryDodge(),
				onBash: () => engineRef.current?.tryBash()
			})] }),
			isWorkbenchOpen && screen === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeShopModal, {
				weapons,
				perks,
				scrap: hudStats.scrap,
				molotovs: hudStats.molotovs,
				maxMolotovs: 5,
				onClose: handleToggleWorkbench,
				onUnlockWeapon: handleUnlockWeapon,
				onUpgradeWeapon: handleUpgradeWeapon,
				onEquipWeapon: handleEquipWeapon,
				equippedId: hudStats.weapon?.id,
				onUpgradePerk: handleUpgradePerk,
				onBuyAmmoRefill: handleBuyAmmoRefill,
				onBuyMolotov: handleBuyMolotov
			}),
			activeLoreNote && screen === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoreNoteModal, {
				note: activeLoreNote,
				onClose: handleCloseLoreNote
			}),
			screen === "game_over" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameOverModal, {
				stats: gameOverData.stats,
				score: gameOverData.score,
				wave: gameOverData.wave,
				locationName: loc?.name || "Pike County",
				killer,
				mode,
				won,
				unlocked: weapons.filter((w) => w.unlocked).map((w) => w.id),
				notes: foundNotes,
				mapId: loc?.id || "",
				onRestart: () => handleStartGame(selectedLocationIdx, engineRef.current?.difficultyMultiplier ?? 1, mode),
				onHome: () => {
					engineRef.current?.destroy();
					engineRef.current = null;
					setScreen("title");
				}
			})
		]
	});
}
//#endregion
export { Home as component };
