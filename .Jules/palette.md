# Palette's Journal - Critical Learnings

This journal documents critical UX and accessibility insights discovered during development.

## 2025-05-18 - Focus Ring & ARIA Labels for Icon-Only Game Controls

**Learning:** Icon-only action buttons in overlay screens (such as Journal, Help, Mute) are often skipped by screen reader users if missing `aria-label` attributes and keyboard users if lacking visible focus indicators.
**Action:** Always include explicit `aria-label`, `title`, and `focus-visible:ring-2 focus-visible:ring-accent outline-none` classes on all icon-only buttons in game overlay chrome.

## 2025-05-19 - Accessible Interactive SVG Map Nodes

**Learning:** SVG `<g>` groups acting as map buttons are inaccessible to keyboard and screen-reader users by default, and standard Tailwind `ring-2` (box-shadow) does not render on SVG primitives.
**Action:** Unify interactive map nodes into `<g role="button" tabIndex={0} aria-label="..." aria-pressed="...">`, add Enter/Space key handling, use SVG-compatible `focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent outline-none`, and ensure decorative layers have `pointer-events-none aria-hidden="true"`.
