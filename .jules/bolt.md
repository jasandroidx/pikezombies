## 2025-05-10 - Hot path BFS flow field optimization
**Learning:** In game loops running at 60 FPS, recreating TypedArrays (`Float32Array`, `Int32Array`) and allocating temporary neighbor arrays inside BFS queue loops causes high Garbage Collection pressure and CPU overhead. Inlining grid neighbor traversals and reusing buffer TypedArrays cuts BFS flowfield rebuild execution time by over 50%.
**Action:** When working on grid/pathfinding or game engine subsystems, re-use pre-allocated buffers and avoid allocating small arrays/objects inside hot loops.
