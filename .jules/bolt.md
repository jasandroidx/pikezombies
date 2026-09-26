## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-11 - Canvas radial gradient caching for particle rendering
**Learning:** Creating `CanvasRadialGradient` objects and adding color stops per particle inside a 60 FPS Canvas render loop allocates thousands of objects per second, causing GC pause spikes and CPU overhead. Pre-rendering the gradient particle texture once onto an offscreen canvas and drawing via `ctx.drawImage` with `globalAlpha` eliminates gradient allocations while utilizing hardware-accelerated GPU quad blitting.
**Action:** In Canvas 2D render loops, pre-render static or reusable particle gradients to offscreen canvases and draw via `drawImage` with `globalAlpha`.
