## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.

## 2025-05-18 - Pre-rendering Canvas Particle Sprites
**Learning:** Re-creating Canvas `createRadialGradient` objects and formatting color stop `rgba(...)` strings inside 60 FPS particle animation render loops creates extreme GC allocation churn (2,400 gradient instantiations and 7,200 string allocations/sec for 40 particles). Pre-rendering particle textures once onto offscreen canvas elements and blitting via `ctx.drawImage()` eliminates allocation overhead entirely.
**Action:** When rendering multi-particle lighting, fog, or visual effects in Canvas 2D loops, pre-render particle textures onto offscreen canvases during initialization and draw using `ctx.drawImage()`.

## 2025-05-24 - Zombie Pair Collision Separation Pass & Floater Deduplication
**Learning:** In 60 FPS top-down horde games, running $O(N^2)$ pairwise collision checks inside each entity's movement loop duplicates distance calculations ($2 \times$ per pair) and creates frame-order dependencies. Extracting separation logic into a dedicated post-movement pass with $e = n + 1$ cuts pair evaluations and square-root calculations by 50%.
**Action:** When implementing entity-entity collision or flocking separation loops, separate movement from collision resolution and iterate upper-triangular unique pairs ($e = n + 1$) to displace both entities symmetrically in one pass.
