## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-11 - Pre-rendered offscreen canvas textures for 2D fog/particle radial gradients
**Learning:** In 2D HTML Canvas game loops at 60 FPS, creating radial gradients (`ctx.createRadialGradient`), interpolating template strings for color stops, and rasterizing arcs per particle on every frame creates high GC pressure (2,400 CanvasGradients and 7,200 string allocations/sec for 40 particles) and CPU overhead. Pre-rendering invariant particle gradients onto offscreen canvases once and blitting via `ctx.drawImage` eliminates gradient allocations and speeds up rendering loop.
**Action:** Pre-render static or invariant radial gradients and particle textures onto offscreen canvases instead of re-generating gradients inside 60 FPS render loops.
