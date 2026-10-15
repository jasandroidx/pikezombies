import assert from "node:assert/strict";
import test from "node:test";
import { FlowField } from "./flowfield.ts";

test("FlowField marks obstacles, calculates distance, and returns direction vector", () => {
  const ff = new FlowField();
  const mapW = 400;
  const mapH = 400;

  // Mark an obstacle at (80, 80) with 40x40 width/height
  ff.markBlocked(mapW, mapH, [{ x: 80, y: 80, width: 40, height: 40 }]);

  // Verify block buffer size and value
  assert.equal(ff.cols, 10);
  assert.equal(ff.rows, 10);
  assert.equal(ff.block[2 * 10 + 2], 1); // cell (2, 2) is blocked

  // Rebuild flowfield around target at (200, 200) -> cell (5, 5)
  ff.rebuild(200, 200);

  // Distance at target cell (5, 5) should be 0
  assert.equal(ff.dist[5 * 10 + 5], 0);

  // Query direction without out parameter returns a fresh object
  const dir1 = ff.dir(250, 200);
  const dir2 = ff.dir(200, 250);
  assert.ok(dir1);
  assert.ok(dir2);
  assert.notEqual(dir1, dir2);
  assert.equal(dir1.x, -1);
  assert.equal(dir1.y, 0);

  // Query direction with out parameter reuses the passed vector object
  const outVec = { x: 0, y: 0 };
  const res = ff.dir(250, 200, outVec);
  assert.equal(res, outVec);
  assert.equal(outVec.x, -1);
  assert.equal(outVec.y, 0);
});

test("FlowField markBlocked reuses block buffer when grid size is identical", () => {
  const ff = new FlowField();
  ff.markBlocked(400, 400, []);
  const initialBlockBuffer = ff.block;

  ff.markBlocked(400, 400, [{ x: 0, y: 0, width: 40, height: 40 }]);
  assert.equal(ff.block, initialBlockBuffer);
  assert.equal(ff.block[0], 1);
});
