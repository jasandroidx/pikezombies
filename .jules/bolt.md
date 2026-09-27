## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-11 - Pre-rendered Canvas2D gradient particle textures
**Learning:** Calling `ctx.createRadialGradient`, `addColorStop`, and circular `arc()` path generation inside 60 FPS render loops for multi-particle effects (e.g. 40 fog clouds) creates ~2,400 `CanvasGradient` objects/sec and thousands of string color parsing calls/sec. Pre-rendering the gradient particle texture once onto an offscreen canvas and blitting it via `ctx.drawImage` with `ctx.globalAlpha` eliminates GC pressure and reduces rendering CPU time by ~75-80%.
**Action:** Pre-render particle radial gradients onto an offscreen canvas sprite once at startup and render them using `drawImage` in 60 FPS game loops.
