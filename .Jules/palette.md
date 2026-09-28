## 2025-05-20 - Icon Button Accessibility and ESLint Shadowing
**Learning:** Icon-only buttons in retro/dark game UI components often lack accessible labels and visible focus rings. Additionally, importing `Infinity` from `lucide-react` triggers the ESLint `no-shadow-restricted-names` rule.
**Action:** Always provide explicit `aria-label` and `title` attributes along with `focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none` on icon-only buttons, and alias `Infinity as InfinityIcon`.
