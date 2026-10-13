## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-18 - Pre-rendering Canvas Particle Sprites
**Learning:** Re-creating Canvas `createRadialGradient` objects and formatting color stop `rgba(...)` strings inside 60 FPS particle animation render loops creates extreme GC allocation churn (2,400 gradient instantiations and 7,200 string allocations/sec for 40 particles). Pre-rendering particle textures once onto offscreen canvas elements and blitting via `ctx.drawImage()` eliminates allocation overhead entirely.
**Action:** When rendering multi-particle lighting, fog, or visual effects in Canvas 2D loops, pre-render particle textures onto offscreen canvases during initialization and draw using `ctx.drawImage()`.

## 2025-05-25 - Canvas 2D Path Batching & State Stack Optimization
**Learning:** Issuing individual `stroke()` or `fill()` calls inside loops (like background grid lines or decal spatter sub-paths) creates massive Canvas 2D pipeline call overhead (40+ stroke and 600+ fill calls per frame). Batching sub-paths into a single `beginPath()` before invoking `stroke()` or `fill()`, and bypassing `ctx.save()`/`ctx.restore()` when sprites/particles do not require matrix transformations or filters, cuts canvas draw call operations by over 80%.
**Action:** Always batch sub-paths before invoking `ctx.stroke()` or `ctx.fill()` in Canvas loops, and avoid unnecessary `save()`/`restore()` calls when drawing plain unrotated sprites or particles.
