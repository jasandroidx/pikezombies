export const ZOMBIE_LABELS: Record<string, string> = {
  shambler: "WILD",
  sprinter: "FERAL",
  miner_brute: "MINER",
  bloater_spitter: "BLOATER",
  behemoth: "BEHEMOTH",
  crawler: "CRAWLER",
};

const PATHS: Record<string, string> = {
  player: "/sprites/player.png",
  shambler: "/sprites/shambler.png",
  sprinter: "/sprites/sprinter.png",
  miner_brute: "/sprites/miner_brute.png",
  bloater_spitter: "/sprites/bloater_spitter.png",
  behemoth: "/sprites/behemoth.png",
  crawler: "/sprites/crawler.png",
};

const cache = new Map<string, HTMLImageElement>();
let loaded = false;

export function isArtReady() {
  return loaded;
}

export function getSprite(id: string): HTMLImageElement | null {
  const img = cache.get(id);
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

export async function loadArt() {
  if (typeof document !== "undefined" && "fonts" in document) {
    await Promise.all([
      document.fonts.load("24px Creepster"),
      document.fonts.load("64px Nosifer"),
    ]).catch(() => undefined);
  }
  await Promise.all(
    Object.entries(PATHS).map(
      ([key, src]) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            cache.set(key, img);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  );
  loaded = true;
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  id: string,
  size: number,
  hitFlash = 0,
  flipX = false,
) {
  const img = getSprite(id);
  if (!img) return false;
  ctx.save();
  if (flipX) ctx.scale(-1, 1);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  // OPTIMIZATION: Use `source-atop` compositing instead of `ctx.filter`.
  // Setting `ctx.filter` on a Canvas 2D context causes context state resets and forces
  // offscreen surface allocation / software filter pipeline passes in browser canvas backends,
  // causing severe frame rate drops during 60 FPS combat when multiple sprites flash simultaneously.
  if (hitFlash > 0) {
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(255, 250, 220, 0.75)";
    ctx.fillRect(-size / 2, -size / 2, size, size);
  }
  ctx.restore();
  return true;
}

export function drawWildLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  time: number,
) {
  const jx = Math.sin(time * 18 + x * 0.05) * 1.4;
  const jy = Math.cos(time * 14 + y * 0.04) * 0.8;
  ctx.save();
  ctx.translate(x + jx, y + jy);
  ctx.rotate(Math.sin(time * 3 + x) * 0.04);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${size}px Creepster, Nosifer, Impact, cursive`;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.lineWidth = Math.max(3, size * 0.16);
  ctx.strokeStyle = "#1a0404";
  ctx.strokeText(text, 0, 0);
  ctx.fillStyle = "#e11d2e";
  ctx.shadowColor = "rgba(194, 59, 34, 0.85)";
  ctx.shadowBlur = 10;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}
