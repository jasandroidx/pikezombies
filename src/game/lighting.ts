import { FirePuddle } from '../types/game';

interface LightSource {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  color?: string;
}

export class DynamicLighting {
  private darknessCanvas: HTMLCanvasElement;
  private darknessCtx: CanvasRenderingContext2D;
  private fogCanvas: HTMLCanvasElement | null = null;
  private fogParticles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

  constructor() {
    this.darknessCanvas = document.createElement('canvas');
    this.darknessCtx = this.darknessCanvas.getContext('2d')!;

    // Drifting Patoka fog
    for (let i = 0; i < 40; i++) {
      this.fogParticles.push({
        x: Math.random() * 2500,
        y: Math.random() * 2000,
        vx: 0.15 + Math.random() * 0.25,
        vy: 0.05 + Math.random() * 0.1,
        radius: 120 + Math.random() * 160,
        alpha: 0.04 + Math.random() * 0.06,
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
    if (this.darknessCanvas.width !== width || this.darknessCanvas.height !== height) {
      this.darknessCanvas.width = width;
      this.darknessCanvas.height = height;
    }

    const dCtx = this.darknessCtx;
    dCtx.clearRect(0, 0, width, height);

    // Fill with dirty-olive darkness — never a black sheet
    const darknessAlpha = Math.max(0.38, 0.72 - ambientLight - (muzzleFlashTimer > 0 ? 0.28 : 0));
    dCtx.fillStyle = `rgba(16, 20, 14, ${darknessAlpha})`;
    dCtx.fillRect(0, 0, width, height);

    // Carve out light using 'destination-out'
    dCtx.globalCompositeOperation = 'destination-out';

    // 1. Belt lantern — always-on disc so the hunter never vanishes
    const auraGrad = dCtx.createRadialGradient(player.x, player.y, 8, player.x, player.y, 128);
    auraGrad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
    auraGrad.addColorStop(0.45, "rgba(0, 0, 0, 0.82)");
    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    dCtx.fillStyle = auraGrad;
    dCtx.beginPath();
    dCtx.arc(player.x, player.y, 128, 0, Math.PI * 2);
    dCtx.fill();

    // 2. High-Beam Flashlight Cone
    const fRange = player.flashlightRange;
    const fAngle = player.flashlightAngle;
    const fSpread = 0.55; // cone angle span in radians

    dCtx.save();
    dCtx.translate(player.x, player.y);
    dCtx.rotate(fAngle);

    const coneGrad = dCtx.createRadialGradient(0, 0, 20, 0, 0, fRange);
    coneGrad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
    coneGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.85)');
    coneGrad.addColorStop(0.9, 'rgba(0, 0, 0, 0.45)');
    coneGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    dCtx.fillStyle = coneGrad;
    dCtx.beginPath();
    dCtx.moveTo(0, 0);
    dCtx.arc(0, 0, fRange, -fSpread, fSpread);
    dCtx.closePath();
    dCtx.fill();

    dCtx.restore();

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

    // 5. Static environmental lights (cabin windows, lanterns)
    for (const light of staticLights) {
      const lGrad = dCtx.createRadialGradient(light.x, light.y, 5, light.x, light.y, light.radius);
      lGrad.addColorStop(0, `rgba(0, 0, 0, ${light.intensity})`);
      lGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      dCtx.fillStyle = lGrad;
      dCtx.beginPath();
      dCtx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
      dCtx.fill();
    }

    // Reset composite operation
    dCtx.globalCompositeOperation = 'source-over';

    // Draw the composite darkness overlay onto target viewport canvas
    targetCtx.drawImage(this.darknessCanvas, 0, 0);

    // Render Drifting Fog Clouds
    this.renderFog(targetCtx, width, height);
  }

  // ⚡ Bolt Optimization: Lazy pre-render radial fog particle texture once to an offscreen
  // canvas, eliminating 40 CanvasRadialGradient object allocations and 120 addColorStop calls
  // per frame in the 60 FPS game loop.
  private getFogTexture(): HTMLCanvasElement {
    if (this.fogCanvas) return this.fogCanvas;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(168, 176, 142, 1.0)');
    grad.addColorStop(0.6, 'rgba(120, 132, 108, 0.518)');
    grad.addColorStop(1, 'rgba(90, 100, 80, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.fill();
    this.fogCanvas = canvas;
    return canvas;
  }

  private renderFog(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.save();
    const texture = this.getFogTexture();
    for (const p of this.fogParticles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;

      ctx.globalAlpha = p.alpha * 1.35;
      const size = p.radius * 2;
      ctx.drawImage(texture, p.x - p.radius, p.y - p.radius, size, size);
    }
    ctx.restore();
  }
}
