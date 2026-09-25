## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-11 - Pre-rendered offscreen canvas textures for 60 FPS particle systems
**Learning:** Calling `ctx.createRadialGradient` and `addColorStop` with string formatting for dozens of particles every frame in Canvas 2D creates thousands of temporary gradient objects and string allocations per second, driving up GC pressure and CPU overhead. Pre-rendering normalized textures onto offscreen canvases and blitting with `ctx.drawImage` and `ctx.globalAlpha` eliminates gradient setup overhead completely.
**Action:** Pre-render static radial or complex particle shapes onto offscreen canvases and blit them using `ctx.drawImage` in 60 FPS animation loops.
