# Portfolio Website — Design Improvement Tasks

> Tasks derived from a design audit of [iamaccosta.dev](https://iamaccosta.dev).  
> Focus: layout, visual consistency, UX polish, and missing UI elements.

---

## 1. Layout & Spacing

- [ ] **Reduce excessive inter-section whitespace** — Audit the vertical gap between each section (especially About → Education and Services → Contact). Standardize section padding to a consistent value (e.g., `py-24` or `py-32`) and remove any unintentional extra margin caused by animation containers.
- [ ] **Fix white flash on scroll** — Investigate and resolve the brief white background flash that appears when scrolling between dark sections. Likely caused by a missing `background-color` on section wrappers or a z-index stacking issue with scroll-triggered elements.

---

## 2. Hero Section

- [ ] **Fix profile image / badge overflow** — The floating tech badge labels (React, Next.js, Node.js, etc.) are being clipped at the right edge of the viewport. Reposition the image container or adjust the badge offsets so all elements are fully visible without horizontal overflow.

---

## 3. Typography & Text Styling

- [ ] **Resolve About section text weight inconsistency** — The first paragraph in the About section appears bold/emphasized while subsequent paragraphs are lighter gray. If this is a scroll-triggered reveal animation, ensure all text reaches its final readable state correctly. If intentional, document the design decision; if not, unify the font weight and color across all body paragraphs.

---

## 4. Project Cards

- [ ] **Improve private/no-image project cards** — Cards for private projects currently display a large watermark-style text (e.g., "Research", "Mobile") on a plain dark gradient, which reads as an empty placeholder. Replace with one of the following:
  - A category-specific abstract illustration or icon collage
  - A color-coded left border or top accent bar per project type
  - A subtle pattern or texture background tied to the tech stack
- [ ] **Add visual differentiation between project categories** — Research, Professional, Course, and Mobile projects look visually identical aside from the label badge. Consider distinct card border colors or icon treatments per category to aid scanning.

---

## 5. Skills Section

- [ ] **Create a dedicated Skills / Tech Stack section** — Currently, skills only appear as scattered tag pills on project and service cards. Add a standalone section that groups technologies visually, for example:
  - Icon grid with official logos (React, Node.js, Docker, PostgreSQL, etc.)
  - Grouped by category: Frontend, Backend, DevOps, Research Tools
  - This gives recruiters and clients an at-a-glance summary of technical range

---

## 6. FAQ Section

- [ ] **Restyle FAQ accordion to match the design system** — The current Q&A accordion items look plain and inconsistent with the rest of the site's visual language. Improvements to consider:
  - Add orange left-border accent on expanded items (matching the site's accent color)
  - Use the same card style (dark background, rounded corners, subtle border) as other content cards
  - Animate the expand/collapse with a smooth height transition if not already present

---

## 7. Footer

- [ ] **Add a site footer** — The page currently ends abruptly. Add a minimal footer containing:
  - Name and copyright year (e.g., © 2019 – 2026 André Costa)
  - Social links (Instagram, LinkedIn, GitHub) — mirroring the hero section
  - Optional: a short tagline or "Back to top" button
  - Style it consistently with the dark theme and orange accent

---

## Priority Summary

| Priority | Task |
|----------|------|
| 🔴 High | Fix white flash on scroll |
| 🔴 High | Fix hero image / badge clipping |
| 🟠 Medium | Reduce inter-section whitespace |
| 🟠 Medium | Fix About section text inconsistency |
| 🟠 Medium | Improve private project card visuals |
| 🟡 Low | Add dedicated Skills section |
| 🟡 Low | Restyle FAQ accordion |
| 🟡 Low | Add site footer |
