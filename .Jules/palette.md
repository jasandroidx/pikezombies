# Palette's Journal - Critical Learnings

This journal documents critical UX and accessibility insights discovered during development.

## 2025-05-18 - Focus Ring & ARIA Labels for Icon-Only Game Controls
**Learning:** Icon-only action buttons in overlay screens (such as Journal, Help, Mute) are often skipped by screen reader users if missing `aria-label` attributes and keyboard users if lacking visible focus indicators.
**Action:** Always include explicit `aria-label`, `title`, and `focus-visible:ring-2 focus-visible:ring-accent outline-none` classes on all icon-only buttons in game overlay chrome.

## 2026-10-03 - Accessible SVG Map Nodes & Selection Controls
**Learning:** Interactive SVG map nodes rendered using `<g>`, `<circle>`, and `<text>` are invisible to keyboard tab order and screen readers if lacking semantic roles and key handlers.
**Action:** Add `role="button"`, `tabIndex={0}`, `aria-label`, `aria-pressed`, `onKeyDown` (Enter/Space), and `group-focus-visible` styling to interactive SVG elements.
