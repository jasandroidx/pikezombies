/** Shared BFS flow field so the horde walks around cabins instead of into them. */

// Static lookup table for normalized 8-way direction vectors to eliminate per-frame allocations in dir()
const DIR_LOOKUP: Array<{ x: number; y: number } | null> = new Array(9);
for (let by = -1; by <= 1; by++) {
  for (let bx = -1; bx <= 1; bx++) {
    if (bx === 0 && by === 0) {
      DIR_LOOKUP[4] = null;
    } else {
      const m = Math.hypot(bx, by);
      DIR_LOOKUP[(bx + 1) + (by + 1) * 3] = Object.freeze({ x: bx / m, y: by / m });
    }
  }
}

export class FlowField {
  cell = 40;
  cols = 0;
  rows = 0;
  dist = new Float32Array(0);
  block = new Uint8Array(0);
  private q = new Int32Array(0);

  markBlocked(
    mapW: number,
    mapH: number,
    obstacles: { x: number; y: number; width: number; height: number }[],
  ) {
    this.cols = Math.max(1, Math.ceil(mapW / this.cell));
    this.rows = Math.max(1, Math.ceil(mapH / this.cell));
    const n = this.cols * this.rows;
    if (this.block.length < n) {
      this.block = new Uint8Array(n);
      this.dist = new Float32Array(n);
      this.q = new Int32Array(n);
    } else {
      this.block.fill(0);
    }
    for (const o of obstacles) {
      const x0 = Math.max(0, Math.floor(o.x / this.cell));
      const y0 = Math.max(0, Math.floor(o.y / this.cell));
      const x1 = Math.min(this.cols - 1, Math.floor((o.x + o.width) / this.cell));
      const y1 = Math.min(this.rows - 1, Math.floor((o.y + o.height) / this.cell));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) this.block[y * this.cols + x] = 1;
      }
    }
  }

  rebuild(px: number, py: number) {
    const C = this.cols;
    const R = this.rows;
    const n = C * R;
    if (n === 0) return;
    if (this.dist.length < n) {
      this.dist = new Float32Array(n);
      this.q = new Int32Array(n);
    }
    this.dist.fill(1e8);
    const gx = Math.max(0, Math.min(C - 1, Math.floor(px / this.cell)));
    const gy = Math.max(0, Math.min(R - 1, Math.floor(py / this.cell)));
    let head = 0;
    let tail = 0;
    const start = gy * C + gx;
    this.dist[start] = 0;
    this.q[tail++] = start;
    while (head < tail) {
      const i = this.q[head++];
      const x = i % C;
      const y = (i / C) | 0;
      const nd = this.dist[i] + 1;

      // Unrolled neighbor checks to prevent allocation of short-lived neighbor arrays in loop
      // Right (x + 1, y)
      if (x + 1 < C) {
        const j = i + 1;
        if (!this.block[j] && this.dist[j] > nd) {
          this.dist[j] = nd;
          this.q[tail++] = j;
        }
      }
      // Left (x - 1, y)
      if (x - 1 >= 0) {
        const j = i - 1;
        if (!this.block[j] && this.dist[j] > nd) {
          this.dist[j] = nd;
          this.q[tail++] = j;
        }
      }
      // Down (x, y + 1)
      if (y + 1 < R) {
        const j = i + C;
        if (!this.block[j] && this.dist[j] > nd) {
          this.dist[j] = nd;
          this.q[tail++] = j;
        }
      }
      // Up (x, y - 1)
      if (y - 1 >= 0) {
        const j = i - C;
        if (!this.block[j] && this.dist[j] > nd) {
          this.dist[j] = nd;
          this.q[tail++] = j;
        }
      }
    }
  }

  dir(x: number, y: number): { x: number; y: number } | null {
    const C = this.cols;
    const R = this.rows;
    if (C < 2 || R < 2) return null;
    const cx = Math.max(0, Math.min(C - 1, Math.floor(x / this.cell)));
    const cy = Math.max(0, Math.min(R - 1, Math.floor(y / this.cell)));
    let best = this.dist[cy * C + cx];
    let bx = 0;
    let by = 0;
    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
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
    }
    if (!bx && !by) return null;
    return DIR_LOOKUP[(bx + 1) + (by + 1) * 3];
  }
}
