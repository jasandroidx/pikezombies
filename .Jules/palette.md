# Palette's Journal - Critical Learnings

This journal documents critical UX and accessibility insights discovered during development.

## 2025-05-18 - Focus Ring & ARIA Labels for Icon-Only Game Controls
**Learning:** Icon-only action buttons in overlay screens (such as Journal, Help, Mute) are often skipped by screen reader users if missing `aria-label` attributes and keyboard users if lacking visible focus indicators.
**Action:** Always include explicit `aria-label`, `title`, and `focus-visible:ring-2 focus-visible:ring-accent outline-none` classes on all icon-only buttons in game overlay chrome.

## 2026-10-31 - Accessible Interactive SVG Maps and Custom Controls
**Learning:** Interactive SVG map nodes grouped with `<g>` or `<circle>`/`<text>` are completely unreachable by keyboard and screen reader users unless assigned `role="button"`, `tabIndex={0}`, descriptive `aria-label`, and `onKeyDown` handlers for Enter and Space. Furthermore, SVG elements ignore CSS `box-shadow` (so standard `ring-*` utility classes do not render on them), requiring `focus-visible:outline focus-visible:outline-accent outline-none` instead. Decorative overlay elements inside the SVG (e.g. background trails, river curves) need `pointer-events-none` to prevent blocking click hits.
**Action:** When creating clickable map nodes or vector canvas markers in SVG, wrap interactive groups in `role="button" tabIndex={0}`, supply `aria-pressed`, handle Enter/Space key events, style focus with SVG `outline`, and make purely decorative paths and texts `pointer-events-none`.
