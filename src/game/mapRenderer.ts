import { GameLocation, BloodDecal, Drop, FirePuddle, MapObstacle, ExplosiveBarrel, LoreNote, Barricade } from '../types/game';

export function renderEnvironment(
  ctx: CanvasRenderingContext2D,
  location: GameLocation,
  viewport: { x: number; y: number; width: number; height: number },
  bloodDecals: BloodDecal[],
  firePuddles: FirePuddle[],
  drops: Drop[],
  barrels: ExplosiveBarrel[] = [],
  loreNotes: LoreNote[] = [],
  barricades: Barricade[] = [],
  extractActive = false,
) {
  // Ground base
  ctx.fillStyle = location.ground || '#1c1f19';
  ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

  // Subtle grid/gravel detail
  const tileSize = 80;
  const startX = Math.floor(viewport.x / tileSize) * tileSize;
  const startY = Math.floor(viewport.y / tileSize) * tileSize;
  const endX = viewport.x + viewport.width;
  const endY = viewport.y + viewport.height;

  // Batched grid path rendering to minimize draw calls
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = startX; x <= endX; x += tileSize) {
    ctx.moveTo(x, viewport.y);
    ctx.lineTo(x, viewport.y + viewport.height);
  }
  for (let y = startY; y <= endY; y += tileSize) {
    ctx.moveTo(viewport.x, y);
    ctx.lineTo(viewport.x + viewport.width, y);
  }
  ctx.stroke();

  // Draw natural dirt patches and trails
  ctx.fillStyle = location.trail || '#26211a';
  ctx.beginPath();
  ctx.ellipse(location.mapWidth / 2, location.mapHeight / 2, 450, 320, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Draw Blood Decals (persists on ground)
  for (const decal of bloodDecals) {
    if (
      decal.x + decal.radius < viewport.x ||
      decal.x - decal.radius > viewport.x + viewport.width ||
      decal.y + decal.radius < viewport.y ||
      decal.y - decal.radius > viewport.y + viewport.height
    ) {
      continue;
    }

    ctx.save();
    ctx.translate(decal.x, decal.y);
    ctx.rotate(decal.rotation);
    ctx.fillStyle = `rgba(139, 0, 0, ${decal.alpha})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, decal.radius, decal.radius * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();

    // Spatter drops
    ctx.fillStyle = `rgba(90, 0, 0, ${decal.alpha * 0.8})`;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + decal.rotation;
      const dist = decal.radius * 0.9;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, decal.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Draw Fire Puddles (Molotov effects)
  const now = Date.now();
  for (const puddle of firePuddles) {
    const elapsed = now - puddle.createdTime;
    const progress = elapsed / puddle.duration;
    if (progress >= 1) continue;

    const flicker = 0.85 + Math.sin(now * 0.02 + puddle.x) * 0.15;
    const currentRadius = puddle.radius * flicker;

    // Ground scorch mark
    ctx.fillStyle = 'rgba(20, 10, 5, 0.7)';
    ctx.beginPath();
    ctx.arc(puddle.x, puddle.y, currentRadius * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Fire outer glow
    const grad = ctx.createRadialGradient(puddle.x, puddle.y, 0, puddle.x, puddle.y, currentRadius);
    grad.addColorStop(0, 'rgba(255, 230, 120, 0.9)');
    grad.addColorStop(0.3, 'rgba(255, 120, 20, 0.7)');
    grad.addColorStop(0.7, 'rgba(220, 50, 10, 0.4)');
    grad.addColorStop(1, 'rgba(180, 20, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(puddle.x, puddle.y, currentRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Map Obstacles
  for (const obs of location.obstacles) {
    renderObstacle(ctx, obs);
  }

  for (const bar of barricades) {
    renderBarricade(ctx, bar);
  }

  if (extractActive) {
    renderExtract(ctx, location.extract);
  }

  // Draw Interactive Explosive Barrels
  for (const barrel of barrels) {
    renderExplosiveBarrel(ctx, barrel, now);
  }

  // Draw Drops (Ammo, Moonshine, Scrap, Powerups)
  for (const drop of drops) {
    renderDrop(ctx, drop, now);
  }

  // Draw Lore Notes on the ground
  for (const note of loreNotes) {
    if (!note.collected) {
      renderLoreNote(ctx, note, now);
    }
  }
}

function renderLoreNote(ctx: CanvasRenderingContext2D, note: LoreNote, now: number) {
  ctx.save();
  ctx.translate(note.x, note.y);

  // Mysterious yellowish-amber paper glow
  const pulse = Math.sin(now * 0.003) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(253, 230, 138, ${0.2 * pulse})`;
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.fill();

  // Subtle floating elevation animation
  const bob = Math.sin(now * 0.004) * 3;
  ctx.translate(0, bob);

  // Aged parchment paper drop shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(-8, -10 + 4, 16, 20);

  // Parchment base
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(-8, -10, 16, 20);

  // Folded corner
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(3, -10);
  ctx.lineTo(8, -5);
  ctx.lineTo(3, -5);
  ctx.closePath();
  ctx.fill();

  // Ink scribbles / text lines
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 1.2;
  for (let y = -5; y <= 6; y += 3) {
    ctx.beginPath();
    ctx.moveTo(-5, y);
    ctx.lineTo(5, y);
    ctx.stroke();
  }

  // Interact prompt badge
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(-16, -26, 32, 14, 3);
  ctx.fill();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 9px "Share Tech Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('[E] NOTE', 0, -16);

  ctx.restore();
}

function renderExplosiveBarrel(ctx: CanvasRenderingContext2D, barrel: ExplosiveBarrel, now: number) {
  ctx.save();
  ctx.translate(barrel.x, barrel.y);

  // Damaged warning pulsation
  const isDamaged = barrel.health < barrel.maxHealth;
  if (isDamaged) {
    const pulse = Math.sin(now * 0.02) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(239, 68, 68, ${0.25 * pulse})`;
    ctx.beginPath();
    ctx.arc(0, 0, barrel.radius + 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Barrel shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(0, barrel.radius * 0.4, barrel.radius * 1.05, barrel.radius * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Steel red fuel drum body
  ctx.fillStyle = isDamaged ? '#b91c1c' : '#dc2626';
  ctx.beginPath();
  ctx.arc(0, 0, barrel.radius, 0, Math.PI * 2);
  ctx.fill();

  // Steel rim borders
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner ring
  ctx.strokeStyle = '#450a0a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, barrel.radius * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  // Hazard symbol (Yellow flame or biohazard triangle)
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.moveTo(0, -barrel.radius * 0.45);
  ctx.lineTo(barrel.radius * 0.4, barrel.radius * 0.28);
  ctx.lineTo(-barrel.radius * 0.4, barrel.radius * 0.28);
  ctx.closePath();
  ctx.fill();

  // Flame inner icon
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.arc(0, 1, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Health bar if hit
  if (isDamaged) {
    const barW = barrel.radius * 2;
    const barH = 3;
    const pct = Math.max(0, barrel.health / barrel.maxHealth);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(-barW / 2, -barrel.radius - 8, barW, barH);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-barW / 2, -barrel.radius - 8, barW * pct, barH);
  }

  ctx.restore();
}

function renderObstacle(ctx: CanvasRenderingContext2D, obs: MapObstacle) {
  ctx.save();

  switch (obs.type) {
    case 'cabin': {
      // Wood cabin foundation and roof
      ctx.fillStyle = '#22150c';
      ctx.fillRect(obs.x - 4, obs.y - 4, obs.width + 8, obs.height + 8);

      // Wooden planks
      ctx.fillStyle = obs.color || '#3d2817';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      // Cabin roof slats
      ctx.strokeStyle = '#1e140d';
      ctx.lineWidth = 2;
      for (let y = obs.y + 16; y < obs.y + obs.height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(obs.x, y);
        ctx.lineTo(obs.x + obs.width, y);
        ctx.stroke();
      }

      // Porch / steps
      ctx.fillStyle = '#4a3321';
      ctx.fillRect(obs.x + obs.width * 0.35, obs.y + obs.height - 12, obs.width * 0.3, 14);

      // Window glowing warm light
      ctx.fillStyle = 'rgba(255, 190, 80, 0.85)';
      ctx.fillRect(obs.x + 25, obs.y + 20, 24, 20);
      ctx.fillRect(obs.x + obs.width - 49, obs.y + 20, 24, 20);

      // Window frames
      ctx.strokeStyle = '#22150c';
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x + 25, obs.y + 20, 24, 20);
      ctx.strokeRect(obs.x + obs.width - 49, obs.y + 20, 24, 20);

      // Label
      ctx.fillStyle = '#a68a68';
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'CABIN', obs.x + 12, obs.y - 8);
      break;
    }

    case 'pickup_truck': {
      // Rusted Appalachian pickup truck
      ctx.fillStyle = '#121212'; // shadow
      ctx.fillRect(obs.x - 3, obs.y - 3, obs.width + 6, obs.height + 6);

      // Body
      ctx.fillStyle = obs.color || '#682d24';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      // Cab vs Bed
      ctx.fillStyle = '#181a1b';
      ctx.fillRect(obs.x + obs.width * 0.45, obs.y + 6, obs.width * 0.5, obs.height - 12); // bed

      // Windshield
      ctx.fillStyle = 'rgba(80, 110, 130, 0.7)';
      ctx.fillRect(obs.x + obs.width * 0.15, obs.y + 10, obs.width * 0.25, obs.height - 20);

      // Tires
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(obs.x + 10, obs.y - 6, 22, 7);
      ctx.fillRect(obs.x + obs.width - 32, obs.y - 6, 22, 7);
      ctx.fillRect(obs.x + 10, obs.y + obs.height - 1, 22, 7);
      ctx.fillRect(obs.x + obs.width - 32, obs.y + obs.height - 1, 22, 7);

      // Headlights
      ctx.fillStyle = 'rgba(255, 230, 150, 0.7)';
      ctx.fillRect(obs.x - 2, obs.y + 8, 4, 8);
      ctx.fillRect(obs.x - 2, obs.y + obs.height - 16, 4, 8);
      break;
    }

    case 'mine_entrance': {
      // Dark mine shaft entrance with heavy timber bracing
      ctx.fillStyle = '#090a0a';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      // Wood bracing frame
      ctx.fillStyle = '#3a2717';
      ctx.fillRect(obs.x, obs.y, 25, obs.height);
      ctx.fillRect(obs.x + obs.width - 25, obs.y, 25, obs.height);
      ctx.fillRect(obs.x, obs.y, obs.width, 25);

      // Warning sign
      ctx.fillStyle = '#eab308';
      ctx.fillRect(obs.x + obs.width / 2 - 40, obs.y + 8, 80, 14);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(obs.label || 'MINE SHAFT', obs.x + obs.width / 2 - 34, obs.y + 19);

      // Coal tracks leading out
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(obs.x + obs.width * 0.35, obs.y + obs.height);
      ctx.lineTo(obs.x + obs.width * 0.35, obs.y + obs.height + 60);
      ctx.moveTo(obs.x + obs.width * 0.65, obs.y + obs.height);
      ctx.lineTo(obs.x + obs.width * 0.65, obs.y + obs.height + 60);
      ctx.stroke();
      break;
    }

    case 'tree': {
      // Appalachian Pine / Hemlock
      const radius = obs.width / 2;
      const cx = obs.x + radius;
      const cy = obs.y + radius;

      // Outer foliage shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(cx + 4, cy + 6, radius + 2, 0, Math.PI * 2);
      ctx.fill();

      // Outer dark green pine
      ctx.fillStyle = '#142817';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner foliage layer
      ctx.fillStyle = '#1c3d22';
      ctx.beginPath();
      ctx.arc(cx - 2, cy - 2, radius * 0.72, 0, Math.PI * 2);
      ctx.fill();

      // Tree trunk center
      ctx.fillStyle = '#3c2718';
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'rock': {
      // Rugged mountain boulder
      ctx.fillStyle = '#2d3330';
      ctx.beginPath();
      ctx.ellipse(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, obs.height / 2, 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#47504c';
      ctx.beginPath();
      ctx.ellipse(obs.x + obs.width / 2 - 3, obs.y + obs.height / 2 - 3, obs.width / 2.6, obs.height / 2.6, 0.3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'crate': {
      ctx.fillStyle = obs.color || '#3e2a1b';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      ctx.strokeStyle = '#1d120a';
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y);
      ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
      ctx.moveTo(obs.x + obs.width, obs.y);
      ctx.lineTo(obs.x, obs.y + obs.height);
      ctx.stroke();
      break;
    }

    case 'courthouse': {
      ctx.fillStyle = '#1a1612';
      ctx.fillRect(obs.x - 6, obs.y - 6, obs.width + 12, obs.height + 12);
      ctx.fillStyle = obs.color || '#3d3428';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = '#2a231c';
      ctx.fillRect(obs.x + 20, obs.y + 16, obs.width - 40, obs.height - 36);
      // columns
      ctx.fillStyle = '#cfc3ae';
      const colW = 14;
      const gap = (obs.width - 48) / 4;
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(obs.x + 24 + i * gap, obs.y + 28, colW, obs.height - 56);
      }
      ctx.fillStyle = '#8a1f14';
      ctx.fillRect(obs.x + obs.width * 0.35, obs.y + obs.height - 28, obs.width * 0.3, 28);
      ctx.fillStyle = 'rgba(255, 190, 80, 0.75)';
      ctx.fillRect(obs.x + 36, obs.y + 40, 22, 18);
      ctx.fillRect(obs.x + obs.width - 58, obs.y + 40, 22, 18);
      ctx.fillStyle = '#d4a017';
      ctx.font = 'bold 11px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'COURTHOUSE', obs.x + 16, obs.y - 8);
      break;
    }

    case 'highwall': {
      ctx.fillStyle = '#1c1f1c';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = '#2c332c';
      for (let x = obs.x; x < obs.x + obs.width; x += 28) {
        ctx.fillRect(x, obs.y, 22, obs.height);
      }
      ctx.fillStyle = '#0d0f0d';
      ctx.fillRect(obs.x, obs.y + obs.height - 18, obs.width, 18);
      ctx.fillStyle = '#d4a017';
      ctx.font = 'bold 10px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'HIGHWALL', obs.x + 12, obs.y - 8);
      break;
    }

    case 'still': {
      ctx.fillStyle = '#1a120c';
      ctx.fillRect(obs.x - 4, obs.y - 4, obs.width + 8, obs.height + 8);
      ctx.fillStyle = '#3a2818';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      // copper pot
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(obs.x + obs.width * 0.35, obs.y + obs.height * 0.55, 36, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#92400e';
      ctx.fillRect(obs.x + obs.width * 0.35 + 20, obs.y + 18, 70, 10);
      ctx.fillStyle = 'rgba(255, 140, 40, 0.85)';
      ctx.beginPath();
      ctx.arc(obs.x + 28, obs.y + obs.height - 22, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d4a017';
      ctx.font = 'bold 10px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'STILL', obs.x + 8, obs.y - 8);
      break;
    }

    case 'barn': {
      ctx.fillStyle = '#2a120e';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = obs.color || '#7f1d1d';
      ctx.fillRect(obs.x + 4, obs.y + 8, obs.width - 8, obs.height - 12);
      ctx.fillStyle = '#1a0a08';
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y + 18);
      ctx.lineTo(obs.x + obs.width / 2, obs.y - 16);
      ctx.lineTo(obs.x + obs.width, obs.y + 18);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#3a1814';
      ctx.fillRect(obs.x + obs.width * 0.4, obs.y + obs.height - 36, obs.width * 0.2, 36);
      ctx.fillStyle = '#c23b22';
      ctx.font = 'bold 10px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'BARN', obs.x + 8, obs.y - 20);
      break;
    }

    case 'cruiser': {
      ctx.fillStyle = '#0b0d10';
      ctx.fillRect(obs.x - 3, obs.y - 3, obs.width + 6, obs.height + 6);
      ctx.fillStyle = obs.color || '#1e3a5f';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = 'rgba(80, 110, 140, 0.7)';
      ctx.fillRect(obs.x + obs.width * 0.12, obs.y + 10, obs.width * 0.28, obs.height - 20);
      ctx.fillStyle = '#111';
      ctx.fillRect(obs.x + obs.width * 0.5, obs.y + 8, obs.width * 0.42, obs.height - 16);
      ctx.fillStyle = '#c23b22';
      ctx.fillRect(obs.x + obs.width * 0.42, obs.y + 4, 16, 8);
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(obs.x + obs.width * 0.42 + 16, obs.y + 4, 16, 8);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(obs.x + 10, obs.y - 6, 22, 7);
      ctx.fillRect(obs.x + obs.width - 32, obs.y - 6, 22, 7);
      break;
    }

    case 'workbench': {
      ctx.fillStyle = '#1a140e';
      ctx.fillRect(obs.x - 2, obs.y - 2, obs.width + 4, obs.height + 4);
      ctx.fillStyle = '#5b4632';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = '#d4a017';
      ctx.fillRect(obs.x + 6, obs.y + 8, obs.width - 12, 6);
      ctx.font = 'bold 9px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'SHED', obs.x - 4, obs.y - 8);
      break;
    }

    case 'spring': {
      const cx = obs.x + obs.width / 2;
      const cy = obs.y + obs.height / 2;
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, obs.width / 2);
      g.addColorStop(0, 'rgba(120, 160, 150, 0.85)');
      g.addColorStop(1, 'rgba(30, 50, 44, 0.2)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, obs.width / 2, obs.height / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d4a017';
      ctx.font = 'bold 9px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'SPRING', obs.x, obs.y - 8);
      break;
    }

    case 'ford': {
      ctx.fillStyle = '#1a2420';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = 'rgba(70, 110, 100, 0.55)';
      ctx.fillRect(obs.x + 8, obs.y + 10, obs.width - 16, obs.height - 20);
      ctx.strokeStyle = 'rgba(180, 200, 190, 0.25)';
      ctx.lineWidth = 2;
      for (let x = obs.x + 20; x < obs.x + obs.width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, obs.y);
        ctx.lineTo(x - 12, obs.y + obs.height);
        ctx.stroke();
      }
      ctx.fillStyle = '#d4a017';
      ctx.font = 'bold 10px "IBM Plex Mono", monospace';
      ctx.fillText(obs.label || 'FORD', obs.x + 8, obs.y - 8);
      break;
    }
  }

  ctx.restore();
}

function renderDrop(ctx: CanvasRenderingContext2D, drop: Drop, now: number) {
  const bob = Math.sin(now * 0.006 + drop.x) * 3;
  const pulse = 0.85 + Math.sin(now * 0.01 + drop.y) * 0.15;

  ctx.save();
  ctx.translate(drop.x, drop.y + bob);

  switch (drop.type) {
    case 'ammo_universal': {
      // Military / hunting green ammo crate with glowing brass bullets
      ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#273e20';
      ctx.fillRect(-10, -7, 20, 14);
      ctx.strokeStyle = '#142111';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-10, -7, 20, 14);

      // Brass bullet tips
      ctx.fillStyle = '#eab308';
      ctx.fillRect(-6, -4, 4, 8);
      ctx.fillRect(-1, -4, 4, 8);
      ctx.fillRect(4, -4, 4, 8);
      break;
    }

    case 'moonshine_med': {
      // Mason Jar with glowing amber moonshine (heals + adrenaline rush)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Glass jar body
      ctx.fillStyle = 'rgba(240, 248, 255, 0.7)';
      ctx.fillRect(-6, -8, 12, 16);

      // Amber whiskey/moonshine liquid
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-5, -3, 10, 10);

      // Silver metal lid
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-7, -10, 14, 3);
      break;
    }

    case 'scrap': {
      // Metal scrap / gears (currency)
      ctx.fillStyle = 'rgba(203, 213, 225, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 14 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'molotov_pickup': {
      // Bottle with rag
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.fillRect(-4, -6, 8, 14);
      // Flame wick
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, -9, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'nuke': {
      // Glowing nuclear warhead icon / radiation orb
      ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Golden nuclear bomb icon
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#854d0e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Radiation blades
      ctx.fillStyle = '#1e1e1e';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / 3) {
        ctx.beginPath();
        ctx.arc(0, 0, 9, a - 0.4, a + 0.4);
        ctx.lineTo(0, 0);
        ctx.fill();
      }
      break;
    }

    case 'insta_kill': {
      // Crimson Skull Powerup
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Glowing crimson disk
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Skull silhouette
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -2, 6, 0, Math.PI * 2);
      ctx.fillRect(-4, 0, 8, 6);
      ctx.fill();
      // Eyes
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(-3, -3, 2, 2.5);
      ctx.fillRect(1, -3, 2, 2.5);
      break;
    }

    case 'double_points': {
      // 2X Emerald Badge
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#064e3b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('2X', 0, 0);
      break;
    }

    case 'infinite_ammo': {
      // Infinite Ammo Infinity icon
      ctx.fillStyle = 'rgba(59, 130, 246, 0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('∞', 0, -1);
      break;
    }

    case 'speed_boost': {
      // Adrenaline Lightning Bolt
      ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#581c87';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Lightning bolt
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(1, -7);
      ctx.lineTo(-4, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(-2, 7);
      ctx.lineTo(5, -1);
      ctx.lineTo(1, -1);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

function renderBarricade(ctx: CanvasRenderingContext2D, b: Barricade) {
  const pct = Math.max(0, b.health / b.maxHealth);
  ctx.save();
  if (b.type === "sandbags") {
    ctx.fillStyle = pct > 0.35 ? "#6b5a3e" : "#3f3426";
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.strokeStyle = "#2a2218";
    ctx.strokeRect(b.x, b.y, b.width, b.height);
  } else if (b.type === "coal_cart") {
    ctx.fillStyle = "#2a2e2c";
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(b.x + 4, b.y + 4, b.width - 8, b.height - 8);
  } else {
    ctx.fillStyle = pct > 0.35 ? "#5b3d22" : "#3a2616";
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
    ctx.fillStyle = pct < 0.35 ? "#c23b22" : "#d4a017";
    ctx.fillRect(b.x, b.y - 6, b.width * pct, 3);
  }
  ctx.restore();
}

function renderExtract(ctx: CanvasRenderingContext2D, extract: { x: number; y: number; radius: number }) {
  const now = Date.now();
  const pulse = 0.55 + Math.sin(now * 0.006) * 0.25;
  ctx.save();
  ctx.strokeStyle = `rgba(212, 160, 23, ${0.7 * pulse})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(extract.x, extract.y, extract.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = `rgba(212, 160, 23, ${0.12 * pulse})`;
  ctx.fill();
  ctx.fillStyle = "#d4a017";
  ctx.font = 'bold 12px "IBM Plex Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillText("GET TO THE TRUCK  [E]", extract.x, extract.y - extract.radius - 10);
  ctx.restore();
}

