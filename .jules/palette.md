## 2025-05-18 - Icon-Only Buttons and Focus Rings in Overlay UI
**Learning:** In HUD and modal overlays, icon-only buttons (such as Workbench, Mute, Help, Journal, and Close) are frequently used without `aria-label` or visible focus rings, hindering screen readers and keyboard accessibility.
**Action:** Always provide explicit `aria-label` attributes and `focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none` styles on icon-only buttons across all game overlay and modal components.
