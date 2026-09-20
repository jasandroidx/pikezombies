// Static directional offsets for 4-neighbor BFS (Right, Left, Down, Up)
const DX = [1, -1, 0, 0];
const DY = [0, 0, 1, -1];

/** Shared BFS flow field so the horde walks around cabins instead of into them. */
export class FlowField {
  cell = 40;
  cols = 0;
  rows = 0;
  dist = new Float32Array(0);
  block = new Uint8Array(0);

  // Pre-allocated reusable queue buffer to avoid GC allocations during BFS rebuilds
  private queue = new Int32Array(0);

  markBlocked(
    mapW: number,
    mapH: number,
    obstacles: { x: number; y: number; width: number; height: number }[],
  ) {
    this.cols = Math.max(1, Math.ceil(mapW / this.cell));
    this.rows = Math.max(1, Math.ceil(mapH / this.cell));
    const n = this.cols * this.rows;
    if (this.block.length !== n) {
      this.block = new Uint8Array(n);
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

    // Reuse existing Float32Array and Int32Array buffers to avoid GC allocations during rebuilds
    if (this.dist.length !== n) {
      this.dist = new Float32Array(n);
    }
    this.dist.fill(1e8);

    if (this.queue.length !== n) {
      this.queue = new Int32Array(n);
    }
    const q = this.queue;

    const gx = Math.max(0, Math.min(C - 1, Math.floor(px / this.cell)));
    const gy = Math.max(0, Math.min(R - 1, Math.floor(py / this.cell)));
    let head = 0;
    let tail = 0;
    const start = gy * C + gx;
    this.dist[start] = 0;
    q[tail++] = start;

    while (head < tail) {
      const i = q[head++];
      const x = i % C;
      const y = (i / C) | 0;
      const nd = this.dist[i] + 1;

      // Direct offset traversal prevents allocating temporary neighbor arrays during BFS
      for (let k = 0; k < 4; k++) {
        const nx = x + DX[k];
        const ny = y + DY[k];
        if (nx < 0 || ny < 0 || nx >= C || ny >= R) continue;
        const j = ny * C + nx;
        if (this.block[j] || this.dist[j] <= nd) continue;
        this.dist[j] = nd;
        q[tail++] = j;
      }
    }
  }

  dir(x: number, y: number, out?: { x: number; y: number }): { x: number; y: number } | null {
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
    const m = Math.hypot(bx, by) || 1;
    const rx = bx / m;
    const ry = by / m;
    if (out) {
      out.x = rx;
      out.y = ry;
      return out;
    }
    return { x: rx, y: ry };
  }
}
