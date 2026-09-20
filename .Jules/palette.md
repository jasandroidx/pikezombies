## 2026-09-20 - Icon-Only Button Keyboard Navigation & ARIA Patterns
**Learning:** Icon-only buttons in game HUD and overlay modal components lacked ARIA labels and focus-visible rings, rendering them invisible or inaccessible to screen reader and keyboard users.
**Action:** Always pair icon-only buttons with explicit `aria-label`, matching `title`, and `focus-visible:ring-2 focus-visible:ring-accent outline-none` focus styles.
