# Feature 02 - WebGL Particle Universe

## Goal

Replace or upgrade the current 2D neural canvas with a Three.js particle universe where particles form `MUGHEES`, react to the cursor, scatter on click, and morph by section.

This is a high-impact visual feature. It must be treated as progressive enhancement, not a required dependency for the site.

## Desired States

### Idle

- Particles form the word `MUGHEES` in 3D space.
- Slow drift and subtle rotation.
- Terminal green core glow with small amber and purple accents.

### Cursor Hover

- Particles near cursor repel outward.
- Creates a visible force-field pocket around the pointer.
- Particles smoothly return to their target positions.

### Click

- All particles scatter outward in a shockwave.
- Screen flashes for 100ms.
- Particles reassemble in 2 seconds.

### Section Change

Particle targets morph by section:

- Home: `MUGHEES`
- Projects: neural network diagram
- Skills: binary tree / graph
- Metrics: rising bar chart
- Contact: `@`

## Technical Recommendation

Start with CPU-driven Three.js `BufferGeometry` before moving to custom GLSL physics.

Reason: the current portfolio is static. A CPU-based Three.js particle system is simpler, easier to debug, and likely fast enough for 8k-20k particles. Add GPU computation only if needed.

## Suggested Files

```text
scripts/
  particles-three.js
  particle-targets.js
styles/components/
  particle-universe.css
assets/
  particle-font-mask/       # optional generated masks
```

## Dependencies

Option A: CDN, fastest for current static site:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.164.1/build/three.module.js"
  }
}
</script>
<script type="module" src="scripts/particles-three.js"></script>
```

Option B: Vite build:

- Add `package.json`
- Install `three`
- Use ES modules and bundling

Choose Option A if the site remains static. Choose Option B if more advanced pages are added.

## Particle Data Model

Each particle needs:

```js
{
  position: Vector3,
  velocity: Vector3,
  target: Vector3,
  color: Color,
  size: number,
  noiseSeed: number
}
```

For `BufferGeometry`, store:

- `position`
- `target`
- `color`
- `size`
- optional `random`

## Target Shape Generation

### Text Shape

Generate points from canvas text:

1. Create hidden canvas.
2. Draw text `MUGHEES` in `Fragment Mono` or a bold monospace font.
3. Read pixels.
4. Sample bright pixels.
5. Convert sampled pixels to normalized 3D coordinates.

### Diagram Shapes

Hardcode target point fields:

- Neural network: points around nodes and lines.
- Binary tree: points along branches.
- Bar chart: points inside rectangles.
- Contact `@`: canvas text mask.

## Rendering Layer

The Three.js canvas should be:

- Fixed behind the content.
- Above the flat background.
- Below text and cards.
- Pointer-events disabled unless using cursor coordinates.

```css
.particle-universe {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
}
```

## Cursor Interaction

Track mouse in normalized device coordinates. Raycast against an invisible plane to convert pointer to 3D space.

Repulsion formula:

```js
const distance = particle.position.distanceTo(cursorWorld);
if (distance < radius) {
  const force = (1 - distance / radius) * strength;
  particle.velocity.add(direction.multiplyScalar(force));
}
```

## Section Morphing

Use `IntersectionObserver` or the current horizontal track scroll position.

When active section changes:

1. Generate the next target point set.
2. Assign each particle a new target.
3. Interpolate positions toward targets each frame.
4. Trigger a small glitch flash.

## Performance Budget

Desktop:

- 12k to 20k particles.
- Target 60fps.

Tablet:

- 6k to 10k particles.
- Target 45fps+.

Mobile:

- 2k to 4k particles, or keep current 2D canvas.
- Disable shockwave if frame rate drops.

Use:

- `requestAnimationFrame`
- Delta time capping
- `window.devicePixelRatio` capped at 1.5
- Pause when tab hidden
- Reduced particle count on battery/mobile

## Accessibility and Reduced Motion

If `prefers-reduced-motion: reduce`:

- Disable scatter shockwaves.
- Disable continuous rotation.
- Render a mostly static particle word.

If WebGL is unavailable:

- Keep the existing `neural-bg.js` 2D canvas.

## Implementation Steps

1. Add a WebGL support check.
2. Add `particles-three.js` behind the current canvas.
3. Generate text-mask target points for `MUGHEES`.
4. Render static particles.
5. Add idle drift.
6. Add cursor repulsion.
7. Add click shockwave.
8. Add section morphing.
9. Add mobile and reduced-motion fallbacks.
10. Remove or dim the old `neural-bg.js` only after the new layer is stable.

## Acceptance Criteria

- The page remains readable; particles never compete with text.
- Home particles visibly form `MUGHEES`.
- Cursor repulsion is smooth and not jittery.
- Click shockwave reassembles within 2 seconds.
- Mobile does not overheat or stutter badly.
- If Three.js fails, site still works.

## Risks

- Heavy rendering can harm Lighthouse and battery.
- CDN dependency can fail offline unless cached by PWA.
- Text-mask generation may vary if fonts are not loaded.
- Too many particles can make terminal text harder to read.

## Open Decisions

- CDN versus bundler.
- Exact particle count per breakpoint.
- Whether to fully replace or layer over the current canvas.
- Whether particles should be green-only or multi-accent.

