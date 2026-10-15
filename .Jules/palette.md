# Palette's Journal - Critical Learnings

This journal documents critical UX and accessibility insights discovered during development.

## 2025-05-18 - Focus Ring & ARIA Labels for Icon-Only Game Controls
**Learning:** Icon-only action buttons in overlay screens (such as Journal, Help, Mute) are often skipped by screen reader users if missing `aria-label` attributes and keyboard users if lacking visible focus indicators.
**Action:** Always include explicit `aria-label`, `title`, and `focus-visible:ring-2 focus-visible:ring-accent outline-none` classes on all icon-only buttons in game overlay chrome.

## 2025-05-19 - Accessible SVG Map Nodes and Decorative SVG Layers
**Learning:** Interactive SVG map location nodes (`<g>`) are inaccessible to keyboard and screen reader users unless assigned `role="button"`, `tabIndex={0}`, descriptive `aria-label`s with node status, Enter/Space key handlers, and visible focus styles. Additionally, background SVG elements can intercept click events unless marked with `pointer-events-none`.
**Action:** Always add standard keyboard/ARIA attributes to interactive SVG `<g>` groups and `pointer-events-none` to decorative SVG paths and rectangles.
