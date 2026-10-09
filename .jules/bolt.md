## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-18 - Pre-rendering Canvas Particle Sprites
**Learning:** Re-creating Canvas `createRadialGradient` objects and formatting color stop `rgba(...)` strings inside 60 FPS particle animation render loops creates extreme GC allocation churn (2,400 gradient instantiations and 7,200 string allocations/sec for 40 particles). Pre-rendering particle textures once onto offscreen canvas elements and blitting via `ctx.drawImage()` eliminates allocation overhead entirely.
**Action:** When rendering multi-particle lighting, fog, or visual effects in Canvas 2D loops, pre-render particle textures onto offscreen canvases during initialization and draw using `ctx.drawImage()`.

## 2025-05-24 - Canvas 2D Context State Hoisting & Distance-Squared Searching
**Learning:** Calling `ctx.save()` and `ctx.restore()` on every particle in 60 FPS loops causes thousands of unnecessary state stack push/pop operations every second. Hoisting `save()`/`restore()` outside the loop and using indexed iteration eliminates stack overhead. Additionally, replacing `.filter()` and `.sort()` using `Math.hypot` with single-pass linear loops using squared distance (`dx*dx + dy*dy`) eliminates per-frame array allocations and expensive square root operations.
**Action:** In Canvas 2D particle/entity render loops, hoist state stack calls outside loop batches and use squared distance comparisons for target selection.
