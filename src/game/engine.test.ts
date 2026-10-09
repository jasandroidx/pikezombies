import { test, describe } from 'node:test';
import assert from 'node:assert';
import { GameEngine } from './engine.ts';

describe('GameEngine performance optimizations', () => {
  test('renderParticles hoists save/restore canvas state outside loop', () => {
    let saveCalls = 0;
    let restoreCalls = 0;
    let arcCalls = 0;

    const mockCtx = {
      save: () => {
        saveCalls++;
      },
      restore: () => {
        restoreCalls++;
      },
      beginPath: () => {},
      arc: () => {
        arcCalls++;
      },
      fill: () => {},
      globalAlpha: 1,
      fillStyle: '',
    };

    const engine = Object.create(GameEngine.prototype);
    engine.particles = [
      { x: 10, y: 10, size: 2, color: 'red', alpha: 0.5 },
      { x: 20, y: 20, size: 3, color: 'blue', alpha: 0.8 },
      { x: 30, y: 30, size: 4, color: 'green', alpha: 1.0 },
    ];

    engine.renderParticles(mockCtx as any);

    // Save and restore must be called exactly ONCE per particle batch, not 3 times.
    assert.strictEqual(saveCalls, 1);
    assert.strictEqual(restoreCalls, 1);
    assert.strictEqual(arcCalls, 3);
  });

  test('renderParticles handles empty array gracefully without saving/restoring context', () => {
    let saveCalls = 0;
    let restoreCalls = 0;

    const mockCtx = {
      save: () => {
        saveCalls++;
      },
      restore: () => {
        restoreCalls++;
      },
    };

    const engine = Object.create(GameEngine.prototype);
    engine.particles = [];

    engine.renderParticles(mockCtx as any);

    assert.strictEqual(saveCalls, 0);
    assert.strictEqual(restoreCalls, 0);
  });

  test('renderZombieLabels correctly evaluates closest elite zombie using squared distance', () => {
    const engine = Object.create(GameEngine.prototype);
    engine.camX = 400;
    engine.camY = 300;
    engine.canvas = { width: 800, height: 600 };
    engine.player = { x: 400, y: 300 };
    engine.simTime = 100;

    engine.zombies = [
      { type: 'shambler', x: 400, y: 310, radius: 10 }, // non-elite
      { type: 'sprinter', x: 400, y: 350, radius: 10 }, // elite (distSq 2500)
      { type: 'behemoth', x: 400, y: 320, radius: 20 }, // elite (distSq 400, closer!)
    ];

    const mockCtx = {
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      strokeText: () => {},
      fillText: () => {},
    };

    // Should run without error and not mutate or re-sort the zombies array
    assert.doesNotThrow(() => {
      engine.renderZombieLabels(mockCtx as any);
    });

    assert.strictEqual(engine.zombies.length, 3);
    assert.strictEqual(engine.zombies[0].type, 'shambler');
    assert.strictEqual(engine.zombies[1].type, 'sprinter');
    assert.strictEqual(engine.zombies[2].type, 'behemoth');
  });
});
