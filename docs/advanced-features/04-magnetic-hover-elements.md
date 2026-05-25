# Feature 04 - Magnetic Hover Elements

## Goal

Make buttons, cards, nav links, the portrait, and headings respond physically to cursor proximity. The effect should be subtle, fast, and addictive.

This is one of the best immediate upgrades because it can be added without changing the content architecture.

## Interaction Levels

| Element | Effect | Strength |
| --- | --- | --- |
| CTA buttons | Moves toward cursor up to 20px | Strong |
| Project rows/cards | Moves up to 12px and tilts | Medium |
| Nav links | Moves up to 5px and slight rotate | Light |
| Portrait | Tilts and shifts highlight toward cursor | Medium |
| Section headings | Letter spacing expands on hover | Light |

## Technical Approach

Use vanilla JS and CSS variables:

- JS calculates cursor proximity and writes `--mx`, `--my`, `--tilt-x`, `--tilt-y`.
- CSS handles transform transitions.
- No WebGL is required for MVP.

## Suggested Files

```text
scripts/
  magnetic-hover.js
styles/components/
  magnetic-hover.css
```

## Markup Convention

Add `data-magnetic` to interactive elements:

```html
<a class="command-button" data-magnetic="strong" href="#projects">
  <span>&gt;&gt;</span> view projects
</a>
```

Allowed strengths:

- `light`
- `medium`
- `strong`

## JavaScript Behavior

For each magnetic element:

1. On pointermove, get element bounding box.
2. Calculate distance from cursor to element center.
3. If cursor is within radius, transform toward cursor.
4. On pointerleave, reset transform.

Pseudo-code:

```js
const strengthMap = {
  light: { radius: 80, max: 5 },
  medium: { radius: 120, max: 12 },
  strong: { radius: 140, max: 20 }
};
```

Transform formula:

```js
const dx = pointerX - centerX;
const dy = pointerY - centerY;
const distance = Math.hypot(dx, dy);
const force = Math.max(0, 1 - distance / radius);
const x = (dx / distance) * max * force;
const y = (dy / distance) * max * force;
```

## CSS Behavior

```css
[data-magnetic] {
  transform: translate3d(var(--magnet-x, 0), var(--magnet-y, 0), 0)
    rotateX(var(--tilt-x, 0))
    rotateY(var(--tilt-y, 0));
  transition: transform 160ms ease;
  will-change: transform;
}
```

## Current Site Targets

Add `data-magnetic` to:

- `.command-button`
- `.project-row`
- `.skill-node`
- `.source-link`
- `.brand`
- `.topbar nav a`
- `.portrait-window`
- `.metric-card`

## Mobile and Accessibility

Disable magnetic effects for:

- Touch-only devices.
- `prefers-reduced-motion: reduce`.
- Viewports below 900px.

Keep focus styles unchanged. The effect should not move an element so far that it becomes hard to click.

## Implementation Steps

1. Add `magnetic-hover.css`.
2. Add `magnetic-hover.js`.
3. Add `data-magnetic` attributes to target elements.
4. Add media query to disable on touch/reduced-motion.
5. Test hover, keyboard focus, and click accuracy.

## Acceptance Criteria

- Buttons visibly lean/pull toward the cursor.
- Project cards feel responsive without layout shifts.
- Keyboard navigation still works.
- Mobile/touch does not jitter.
- No element overlaps adjacent content during movement.

## Risks

- Overdone magnetism can feel annoying.
- Moving buttons too far can harm click precision.
- Too many pointer listeners can cost performance.

## Performance Notes

- Use one document-level `pointermove` listener if many elements are magnetic.
- Batch DOM writes with `requestAnimationFrame`.
- Only calculate visible elements if needed.
- Avoid changing layout properties; transform only.

