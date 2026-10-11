import { test, describe } from 'node:test';
import assert from 'node:assert';
import { DynamicLighting } from './lighting.ts';

describe('DynamicLighting', () => {
  test('instantiates fog particles and renders without throwing', () => {
    const lighting = new DynamicLighting();
    assert.ok(lighting);

    // Mock canvas context
    const mockCtx = {
      clearRect: () => {},
      fillStyle: '',
      fillRect: () => {},
      globalCompositeOperation: 'source-over',
      createRadialGradient: () => ({
        addColorStop: () => {},
      }),
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      save: () => {},
      translate: () => {},
      rotate: () => {},
      restore: () => {},
      moveTo: () => {},
      closePath: () => {},
      drawImage: () => {},
    } as unknown as CanvasRenderingContext2D;

    // Call renderLighting
    assert.doesNotThrow(() => {
      lighting.renderLighting(
        mockCtx,
        800,
        600,
        { x: 400, y: 300, angle: 0, flashlightAngle: 0, flashlightRange: 200 },
        0,
        0.5,
        [],
        []
      );
    });
  });
});
