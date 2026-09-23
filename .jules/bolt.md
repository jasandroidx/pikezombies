## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-11 - Canvas2D particle gradient pre-rendering and path batching
**Learning:** Allocating `CanvasGradient` objects inside frame loops for multi-particle rendering (e.g., fog particles) causes CPU overhead and GC churn. Pre-rendering the gradient onto an offscreen canvas texture and drawing with `ctx.globalAlpha` is much faster. Also, setting `ctx.globalAlpha > 1.0` is silently ignored by HTML Canvas2D specs, leaving the previous state intact; always clamp with `Math.min(1, val)`.
**Action:** Pre-render static radial gradients to offscreen canvases and clamp `globalAlpha` when blitting.
