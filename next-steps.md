# Graph View — Phase 1 Plan

## Context

The portfolio currently has a single scroll-snap view with 8 sections navigated via a left sidebar. This plan adds a second "Graph View" — a dark, cinematic, no-scroll canvas where website sections become interconnected blob nodes linked by animated lightning edges. Phase 1 ships only the Hero node (fully populated) plus 5 ghost placeholder nodes (About, Experience, Projects, Services, Contact) connected by live lightning edges. A view toggle button at the top of the Hero section switches between views with a Flash-style spark explosion transition.

---

## Architecture

### State

Add `viewMode: 'scroll' | 'graph'` state to `src/app/page.js`.  
- In `scroll` mode: render existing sections container + NavBar (unchanged).  
- In `graph` mode: render `<GraphView>` full-screen; hide NavBar and sections container; force `dark` class on root regardless of theme toggle.

### New files

| File | Purpose |
|------|---------|
| `src/components/GraphView.jsx` | Full-screen graph canvas — positions all nodes, renders edges, owns graph-level dark styles |
| `src/components/graph/HeroNode.jsx` | Large central blob node containing condensed hero content (name, role, photo, CTA) |
| `src/components/graph/GhostNode.jsx` | Dimmed outline blob for placeholder sections (About, Experience, etc.) |
| `src/components/graph/LightningEdge.jsx` | SVG animated lightning bolt path connecting two nodes |
| `src/components/graph/FlashTransition.jsx` | Full-screen spark/lightning explosion overlay that plays on view switch |
| `src/components/graph/ViewSwitcher.jsx` | Pill toggle button ("Scroll ↔ Graph") rendered at top of Hero section |

### Modified files

| File | Change |
|------|--------|
| `src/app/page.js` | Add `viewMode` state; pass `viewMode + setViewMode` to `<Hero>`; conditionally render `<GraphView>` vs sections container; suppress NavBar in graph mode |
| `src/components/Hero.jsx` | Accept `viewMode` + `setViewMode` props; render `<ViewSwitcher>` as an absolutely positioned element at the top of the hero div |

---

## Component Details

### `ViewSwitcher.jsx`
- Pill with two segments: `⚡ Graph` | `≡ Scroll`
- Amber/gold accent color (matches site palette)
- `position: absolute; top: 1.25rem; left: 50%; transform: translateX(-50%)` inside Hero's `relative` container
- On click: calls `setViewMode` and mounts `<FlashTransition>`

### `FlashTransition.jsx`
- Fixed full-screen overlay (`z-index: 9999`)
- Sequence (total ~600ms):
  1. **Frame 0–80ms**: White/amber flash (`opacity: 0 → 0.85 → 0`) via Framer Motion keyframes
  2. **Frame 0–500ms**: 8–12 SVG lightning bolt paths radiate outward from center in all directions, each animated with `pathLength: [0, 1]` + `opacity: [1, 0]`, staggered by 20ms
  3. **Frame 0–300ms**: Whole page scale pulse `scale: [1, 1.04, 1]` applied to body wrapper via Framer Motion
- Unmounts automatically via `onAnimationComplete` callback
- No interaction blocking after 300ms (pointer-events: none)

### `LightningEdge.jsx`
Props: `x1, y1, x2, y2` (absolute pixel coords relative to graph canvas)

- SVG `<path>` with jagged/zigzag `d` attribute generated deterministically from props (seeded offsets based on node index — stable across renders, no Math.random)
- 3 overlapping paths: outer glow (thick, low opacity), mid glow (medium), core (thin, bright white/amber)
- `strokeDasharray + strokeDashoffset` animation loops for the "electricity flowing" effect (repeat Infinity, duration ~1.2s)
- SVG `filter`: `feGaussianBlur` + `feComposite` for bloom glow
- Ghost node edges: 30% opacity vs 80% for future active edges

### `HeroNode.jsx`
- Large blob shape via CSS `border-radius` with 8 values, morphing animation cycling every 8s:
  ```
  0%:   60% 40% 30% 70% / 60% 30% 70% 40%
  25%:  30% 60% 70% 40% / 50% 60% 30% 60%
  50%:  50% 60% 30% 70% / 40% 30% 60% 70%
  75%:  30% 40% 60% 50% / 60% 70% 30% 40%
  ```
- Border: 2px amber gradient wrapper div (`padding: 2px`, inner `background: #050508`)
- Size: ~420×420px desktop, ~300px mobile
- Content: name, animated role, small circular photo, "View full section →" CTA
- Framer Motion entrance: `scale: 0.6 → 1`, `opacity: 0 → 1`, spring physics, after FlashTransition
- Hover: scale 1.02 + border brightens

### `GhostNode.jsx`
Props: `label`, `size` (sm/md), `style` (position offsets)

- Smaller blob (~160px), same morphing animation with a different phase offset per node
- Border: 1px `rgba(245, 158, 11, 0.25)` (faint amber)
- Interior: `background: rgba(5, 5, 8, 0.6)`, section label centered in muted text
- No click behavior — `cursor: default`, `pointer-events: none`
- Framer Motion: `opacity: 0 → 0.45`, delayed after HeroNode entrance

### `GraphView.jsx`
- `position: fixed; inset: 0; overflow: hidden; background: #050508; z-index: 50`
- Forces dark mode: adds `dark` class to `<html>` on mount, restores previous state on unmount
- Single `<svg>` overlay for all edges + positioned `<div>` nodes on top
- Node layout (viewport-relative):
  - Hero: center
  - About: top-left (~35%, 25%)
  - Experience: top-right (~65%, 25%)
  - Projects: right (~80%, 55%)
  - Services: bottom-right (~65%, 78%)
  - Contact: bottom-left (~35%, 78%)
- `ViewSwitcher` pinned top-center to return to scroll view
- No scroll events; `touch-action: none`

---

## Node layout

```
        [About]              [Experience]
            \                   /
             ⚡               ⚡
                    [HERO]
             ⚡               ⚡
            /                   \
       [Projects]           [Services]
                  [Contact]
```

Each ghost node connects to Hero with one `LightningEdge`. No ghost-to-ghost edges in phase 1.

---

## Libraries used (no new dependencies)

- **Framer Motion 12** — transitions, blob morph, node entrance, flash overlay, `AnimatePresence`
- **Tailwind CSS 4** — dark utilities, layout, spacing

---

## Verification

1. `npm run dev` → open `localhost:3000`
2. Scroll view loads normally; ViewSwitcher pill visible at top-center of Hero
3. Click "⚡ Graph" → Flash transition (spark explosion ~600ms) → Graph View appears
4. Dark cinematic canvas: Hero blob centered, 5 ghost nodes at periphery, lightning edges animating
5. Blob shapes morph continuously; edges animate flowing electricity
6. Click "≡ Scroll" → transition back, correct theme restored
7. Scroll in graph view does nothing
8. NavBar hidden in graph view
9. No layout shift or flicker on toggle
10. Works on mobile (≥394px)
