# Vortex Transition — Implementation Tasks

> **Context:** Single-page portfolio site. Stack: React, Next.js, Tailwind CSS, Framer Motion.
> Existing Framer Motion transitions live directly on elements inside each section component.
> Lightning edges already run on a Canvas 2D layer inside `GraphView.jsx`.
> Color palette: orange `rgba(255, 150, 30, α)` / gold `rgba(255, 210, 80, α)` on black.

---

## Task 1 — Create `VortexTransition.jsx`

**File:** `src/components/VortexTransition.jsx`

Create a new component that receives two props: `active` (bool) and `onComplete` (callback function).

- When `active` becomes `true`, mount a `<canvas>` with `position: fixed`, `inset: 0`, `z-index: 9999`, covering the full viewport
- Use `useRef` for the canvas element and `useEffect` to start/stop the animation loop
- Clean up with `cancelAnimationFrame` on unmount or when `active` becomes `false`

**Animation — entry phase (0s → 1.4s):**

- Draw 14 concentric ellipses centered on the canvas midpoint
- Ring spacing is exponential (not linear) so inner rings are tighter — simulates depth acceleration
- Each frame, shift ring radii inward toward the vanishing point (center), wrapping the outermost ring back to the edge when it reaches zero — this creates the forward-tunnel illusion
- Rotate the entire drawing context slightly each frame: `ctx.rotate(0.004 * frameCount)`
- Ring stroke color: `rgba(255, 150, 30, alpha)` where alpha is lower for outer rings and stronger for inner rings

**Animation — exit phase (1.4s → 2.8s):**

- Reverse: rings expand outward from center as if the tunnel is opening up
- Rings accelerate outward, expanding past the viewport edge
- Overall canvas `globalAlpha` fades from 1 → 0 during the last 0.4s

**Completion:**

- At exactly 2.8s, call `onComplete()`
- After calling `onComplete`, set a local state flag to unmount the canvas

---

## Task 2 — Add light-streak radial lines

**File:** `src/components/VortexTransition.jsx` (same animation loop as Task 1)

After drawing the rings each frame, draw 10 radial lines from the canvas center outward:

- Distribute them evenly at 36° intervals around 360°
- Line length: scales with the current speed phase — short at the start (20px), peak at mid-transition (150px), short again at exit (20px)
- Alternate stroke colors: odd lines use `rgba(255, 80, 10, 0.6)` (orange), even lines use `rgba(255, 210, 80, 0.4)` (gold)
- Line width: `1px`
- Fade in using `globalAlpha` during the first 0.5s, fade out during the last 0.5s
- Lines should also rotate with the canvas context (they inherit the same `ctx.rotate` from Task 1)

---

## Task 3 — Create `useVortexNavigation` hook

**File:** `src/components/graph/useVortexNavigation.js`

Create a custom hook that exposes:

```js
const { triggerVortex, isVortexActive, targetSectionId, handleComplete } = useVortexNavigation()
```

Internal behavior:

- `triggerVortex(sectionId)` — sets `isVortexActive = true` and stores `sectionId` in a ref
- `handleComplete()` — scrolls to the target section instantly, then sets `isVortexActive = false`
  - Use `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'instant' })` for the scroll
  - Reset `targetSectionId` to `null` after scrolling

Section ID map (use these exact strings as the `sectionId` argument):

| Node label | `sectionId` |
|------------|------------|
| About | `about` |
| Experience | `experience` |
| Projects | `projects` |
| Services | `services` |
| Contact | `contact` |

Ensure each section's root element in its respective component (`About.jsx`, etc.) has a matching `id` attribute — add them if missing.

---

## Task 4 — Wire into `GraphView.jsx`

**File:** `src/components/GraphView.jsx`

1. Import `VortexTransition` from `../VortexTransition`
2. Import and call `useVortexNavigation` at the top of the component
3. Replace each outer node's existing `onClick` with:
   ```js
   onClick={() => triggerVortex('sectionId')}
   ```
   Use the section ID map from Task 3.
4. Render at the root of `GraphView.jsx` (outside/above the canvas layer):
   ```jsx
   <VortexTransition active={isVortexActive} onComplete={handleComplete} />
   ```
5. Remove any Framer Motion `onClick` transition props previously attached to the node elements — the vortex is now the sole navigation transition for graph-mode clicks
6. Do **not** modify the lightning canvas logic — it should continue running underneath the vortex overlay

---

## Notes

- The vortex overlay sits above everything (`z-index: 9999`) but the scroll happens during peak opacity so the user never sees it
- Framer Motion transitions on section content elements (fade-in on mount, etc.) are left untouched — they will still play when the section becomes visible after the scroll
- The vortex duration is set to **2.8s** — this can be adjusted later by changing the two time constants in `VortexTransition.jsx` (`ENTRY_DURATION` and `EXIT_DURATION`)
- Canvas must handle window resize: add a `ResizeObserver` or `window.resize` listener that updates `canvas.width` and `canvas.height`