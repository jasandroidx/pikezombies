# Palette's Journal

## 2025-05-18 - Icon-Only Controls in Game Overlay HUD & Modals
**Learning:** Canvas/WebGL game UIs with HTML overlay components often rely heavily on icon-only buttons for fast visual scanning during gameplay (e.g. Workbench, Mute, Journal, Help). Without explicit ARIA labels and focus ring styles, these interactive overlay controls become inaccessible to screen readers and keyboard navigation.
**Action:** Always complement icon-only buttons in HUD overlays and game modals with explicit `aria-label` attributes and keyboard focus-visible rings (`focus-visible:ring-2 focus-visible:ring-accent outline-none`).
