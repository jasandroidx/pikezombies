import test from 'node:test';
import assert from 'node:assert/strict';
import { FlowField } from './flowfield.ts';

test('FlowField BFS calculation and pathfinding direction without obstacles', () => {
  const flow = new FlowField();
  flow.markBlocked(200, 200, []);
  flow.rebuild(0, 0); // Target at (0, 0)

  // Distance at target should be 0
  assert.equal(flow.dist[0], 0);

  // Point at (80, 80) query direction towards target (0,0)
  const d = flow.dir(80, 80);
  assert.notEqual(d, null);
  if (d) {
    assert.ok(d.x < 0);
    assert.ok(d.y < 0);
  }
});

test('FlowField BFS pathfinding around blocked obstacle', () => {
  const flow = new FlowField();
  flow.markBlocked(200, 200, [
    { x: 40, y: 40, width: 40, height: 40 }, // block cell (1, 1)
  ]);
  flow.rebuild(0, 0);

  // Blocked cell should have 1 in block array
  assert.equal(flow.block[1 * flow.cols + 1], 1);

  // Point at (80, 80) query direction towards target (0,0) around blocked cell
  const d = flow.dir(80, 80);
  assert.notEqual(d, null);
  if (d) {
    // Should navigate around the blocked diagonal cell (1,1)
    assert.notEqual(d.x, 0);
    assert.notEqual(d.y, 0);
  }
});

test('FlowField populates optional output object parameter in dir()', () => {
  const flow = new FlowField();
  flow.markBlocked(120, 120, []);
  flow.rebuild(0, 0);

  const out = { x: 0, y: 0 };
  const res = flow.dir(40, 40, out);

  assert.strictEqual(res, out);
  assert.ok(out.x < 0);
  assert.ok(out.y < 0);
});
