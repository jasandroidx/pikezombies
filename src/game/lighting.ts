import { FirePuddle } from '../types/game';

interface LightSource {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  color?: string;
}

interface FogParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  // Pre-rendered offscreen canvas sprite to avoid per-frame radial gradient allocations
  sprite?: HTMLCanvasElement;
}

export class DynamicLighting {
  private darknessCanvas: HTMLCanvasElement | null = null;
  private darknessCtx: CanvasRenderingContext2D | null = null;
  private auraCanvas: HTMLCanvasElement | null = null;
  private coneCache = new Map<number, HTMLCanvasElement>();
  private lightCache = new Map<string, HTMLCanvasElement>();
  private fogParticles: FogParticle[] = [];

  constructor() {
    if (typeof document !== 'undefined') {
      this.darknessCanvas = document.createElement('canvas');
      this.darknessCtx = this.darknessCanvas.getContext('2d');

      // OPTIMIZATION: Pre-render belt lantern aura sprite (radius 128) onto an offscreen canvas.
      // Eliminates 1 `createRadialGradient` call and 3 `addColorStop` string allocations per frame.
      this.auraCanvas = document.createElement('canvas');
      this.auraCanvas.width = 256;
      this.auraCanvas.height = 256;
      const aCtx = this.auraCanvas.getContext('2d');
      if (aCtx) {
        const auraGrad = aCtx.createRadialGradient(128, 128, 8, 128, 128, 128);
        auraGrad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
        auraGrad.addColorStop(0.45, 'rgba(0, 0, 0, 0.82)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        aCtx.fillStyle = auraGrad;
        aCtx.beginPath();
        aCtx.arc(128, 128, 128, 0, Math.PI * 2);
        aCtx.fill();
      }
    }

    // Drifting Patoka fog
    for (let i = 0; i < 40; i++) {
      const radius = 120 + Math.random() * 160;
      const alpha = 0.04 + Math.random() * 0.06;

      // OPTIMIZATION: Pre-render individual fog particle sprite onto an offscreen canvas.
      // This eliminates 40 `createRadialGradient` calls, 120 `addColorStop` calls, and 120
      // string allocations per frame at 60 FPS in the main render loop.
      let sprite: HTMLCanvasElement | undefined;
      if (typeof document !== 'undefined') {
        sprite = document.createElement('canvas');
        const size = Math.ceil(radius * 2);
        sprite.width = size;
        sprite.height = size;
        const sCtx = sprite.getContext('2d');
        if (sCtx) {
          const fogGrad = sCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
          fogGrad.addColorStop(0, `rgba(168, 176, 142, ${alpha * 1.35})`);
          fogGrad.addColorStop(0.6, `rgba(120, 132, 108, ${alpha * 0.7})`);
          fogGrad.addColorStop(1, 'rgba(90, 100, 80, 0)');
          sCtx.fillStyle = fogGrad;
          sCtx.beginPath();
          sCtx.arc(radius, radius, radius, 0, Math.PI * 2);
          sCtx.fill();
        }
      }

      this.fogParticles.push({
        x: Math.random() * 2500,
        y: Math.random() * 2000,
        vx: 0.15 + Math.random() * 0.25,
        vy: 0.05 + Math.random() * 0.1,
        radius,
        alpha,
        sprite,
      });
    }
  }

  public renderLighting(
    targetCtx: CanvasRenderingContext2D,
    width: number,
    height: number,
    player: { x: number; y: number; angle: number; flashlightAngle: number; flashlightRange: number },
    muzzleFlashTimer: number,
    ambientLight: number,
    firePuddles: FirePuddle[],
    staticLights: LightSource[]
  ) {
    if (typeof document === 'undefined') return;

    if (!this.darknessCanvas) {
      this.darknessCanvas = document.createElement('canvas');
      this.darknessCtx = this.darknessCanvas.getContext('2d');
    }
    if (this.darknessCanvas.width !== width || this.darknessCanvas.height !== height) {
      this.darknessCanvas.width = width;
      this.darknessCanvas.height = height;
    }

    const dCtx = this.darknessCtx;
    if (!dCtx) return;

    dCtx.clearRect(0, 0, width, height);

    // Fill with dirty-olive darkness — never a black sheet
    const darknessAlpha = Math.max(0.38, 0.72 - ambientLight - (muzzleFlashTimer > 0 ? 0.28 : 0));
    dCtx.fillStyle = `rgba(16, 20, 14, ${darknessAlpha})`;
    dCtx.fillRect(0, 0, width, height);

    // Carve out light using 'destination-out'
    dCtx.globalCompositeOperation = 'destination-out';

    // 1. Belt lantern — always-on disc so the hunter never vanishes (using pre-rendered sprite)
    if (this.auraCanvas) {
      dCtx.drawImage(this.auraCanvas, player.x - 128, player.y - 128);
    }

    // 2. High-Beam Flashlight Cone (using cached offscreen cone sprite)
    const fRange = player.flashlightRange;
    const fAngle = player.flashlightAngle;
    const coneSprite = this.getFlashlightConeSprite(fRange);

    if (coneSprite) {
      dCtx.save();
      dCtx.translate(player.x, player.y);
      dCtx.rotate(fAngle);
      dCtx.drawImage(coneSprite, 0, -fRange);
      dCtx.restore();
    }

    // 3. Muzzle Flash (illuminates surroundings on gunshot)
    if (muzzleFlashTimer > 0) {
      const flashGrad = dCtx.createRadialGradient(
        player.x + Math.cos(player.angle) * 30,
        player.y + Math.sin(player.angle) * 30,
        15,
        player.x,
        player.y,
        340
      );
      flashGrad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
      flashGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.5)');
      flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      dCtx.fillStyle = flashGrad;
      dCtx.beginPath();
      dCtx.arc(player.x, player.y, 340, 0, Math.PI * 2);
      dCtx.fill();
    }

    // 4. Fire Puddles / Molotovs (flickering warm glow)
    const now = Date.now();
    for (const fire of firePuddles) {
      const flicker = 1.0 + Math.sin(now * 0.015 + fire.x) * 0.12;
      const fireRadius = fire.radius * 2.2 * flicker;
      const fireGrad = dCtx.createRadialGradient(fire.x, fire.y, 10, fire.x, fire.y, fireRadius);
      fireGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      fireGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.6)');
      fireGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      dCtx.fillStyle = fireGrad;
      dCtx.beginPath();
      dCtx.arc(fire.x, fire.y, fireRadius, 0, Math.PI * 2);
      dCtx.fill();
    }

    // 5. Static environmental lights (cabin windows, lanterns) - cached by radius & intensity
    for (const light of staticLights) {
      const sprite = this.getStaticLightSprite(light.radius, light.intensity);
      if (sprite) {
        dCtx.drawImage(sprite, light.x - light.radius, light.y - light.radius);
      }
    }

    // Reset composite operation
    dCtx.globalCompositeOperation = 'source-over';

    // Draw the composite darkness overlay onto target viewport canvas
    targetCtx.drawImage(this.darknessCanvas, 0, 0);

    // Render Drifting Fog Clouds
    this.renderFog(targetCtx, width, height);
  }

  /**
   * Returns a cached offscreen canvas containing a pre-rendered flashlight cone sprite for a given range.
   * Prevents creating radial gradient objects and color string allocations every frame at 60 FPS.
   */
  private getFlashlightConeSprite(range: number): HTMLCanvasElement | null {
    if (typeof document === 'undefined') return null;
    let sprite = this.coneCache.get(range);
    if (!sprite) {
      sprite = document.createElement('canvas');
      const size = Math.ceil(range * 2);
      sprite.width = Math.ceil(range);
      sprite.height = size;
      const sCtx = sprite.getContext('2d');
      if (sCtx) {
        const fSpread = 0.55;
        const coneGrad = sCtx.createRadialGradient(0, range, 20, 0, range, range);
        coneGrad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
        coneGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.85)');
        coneGrad.addColorStop(0.9, 'rgba(0, 0, 0, 0.45)');
        coneGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        sCtx.fillStyle = coneGrad;
        sCtx.beginPath();
        sCtx.moveTo(0, range);
        sCtx.arc(0, range, range, -fSpread, fSpread);
        sCtx.closePath();
        sCtx.fill();
      }
      this.coneCache.set(range, sprite);
    }
    return sprite;
  }

  /**
   * Returns a cached offscreen canvas containing a pre-rendered static light mask for a given radius and intensity.
   */
  private getStaticLightSprite(radius: number, intensity: number): HTMLCanvasElement | null {
    if (typeof document === 'undefined') return null;
    const key = `${radius}_${intensity}`;
    let sprite = this.lightCache.get(key);
    if (!sprite) {
      sprite = document.createElement('canvas');
      const size = Math.ceil(radius * 2);
      sprite.width = size;
      sprite.height = size;
      const sCtx = sprite.getContext('2d');
      if (sCtx) {
        const lGrad = sCtx.createRadialGradient(radius, radius, 5, radius, radius, radius);
        lGrad.addColorStop(0, `rgba(0, 0, 0, ${intensity})`);
        lGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sCtx.fillStyle = lGrad;
        sCtx.beginPath();
        sCtx.arc(radius, radius, radius, 0, Math.PI * 2);
        sCtx.fill();
      }
      this.lightCache.set(key, sprite);
    }
    return sprite;
  }

  /**
   * Renders drifting fog particles onto target canvas using fast pre-rendered sprites.
   * Eliminates 40 radial gradient instantiations and 120 string allocations per frame.
   */
  private renderFog(ctx: CanvasRenderingContext2D, width: number, height: number) {
    for (const p of this.fogParticles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;

      if (p.sprite) {
        ctx.drawImage(p.sprite, p.x - p.radius, p.y - p.radius);
      }
    }
  }
}
