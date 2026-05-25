# Feature 05 - Cinematic Scroll Storytelling

## Goal

Turn the portfolio from a section catalogue into a scroll-driven story about Mughees's growth: algorithmic reach, harder code, Transformers, systems thinking, and contact.

The user should feel like they are moving through chapters, not just scrolling blocks.

## Story Arc

### Chapter 0 - Boot Screen

Theme: the system starts.

Current site already includes this.

Enhancements:

- Boot text feeds directly into hero.
- Hero terminal slams in after glitch.
- Background particles stabilize into `MUGHEES`.

### Chapter 1 - It Started With An Algorithm

Theme: 30M views in 20 days.

Content:

- Metrics dashboard.
- Animated growth bar.
- Short explanation of algorithmic content strategy.

Visuals:

- Film-strip timeline.
- Numbers count up with scroll.
- Amber/cyan analytics pulses.

### Chapter 2 - Then The Code Got Harder

Theme: C++, SFML, x86 assembly.

Content:

- C++ game systems.
- x86 Mario physics.

Visuals:

- Code rain.
- Register names and memory addresses.
- Game-grid movement.

### Chapter 3 - Then I Met The Transformer

Theme: understanding attention.

Content:

- Transformer chatbot.
- RAG pipeline.

Visuals:

- Attention map strokes animate.
- Multi-head diagram assembles.
- Formula moment: `softmax(QK^T / sqrt(d_k))V`

### Chapter 4 - Now I Build Systems That Think

Theme: skill graph and AI systems.

Content:

- Skill network.
- RAG, LangChain, PyTorch, algorithms.

Visuals:

- Nodes connect one by one.
- Skills unlock as network learns.

### Chapter 5 - What's Next

Theme: contact and collaboration.

Content:

- Contact terminal.
- Direct email/phone/LinkedIn.

Visuals:

- Connection established.
- Terminal cursor waits for visitor action.

## Technical Choices

### Current Static Approach

Use vanilla `IntersectionObserver`, CSS transitions, and the current horizontal desktop scroll.

Best if avoiding dependencies.

### Advanced Approach

Use GSAP + ScrollTrigger:

- Pin scenes.
- Scrub animations to scroll position.
- Animate text and SVG strokes.

This gives a more cinematic result but adds dependency and integration complexity.

## Suggested Files

```text
scripts/
  cinematic-scroll.js
styles/components/
  cinematic-scroll.css
assets/story/
  attention-diagram.svg
  growth-filmstrip.svg
```

If using GSAP:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

## Current Site Integration

The current desktop layout uses horizontal panels. Cinematic scrolling must choose one direction:

Option A:

- Keep horizontal desktop.
- Animate chapter entrance based on active panel.
- Simpler integration.

Option B:

- Convert desktop to vertical cinematic scroll.
- Stronger storytelling.
- Larger refactor.

Recommendation: start with Option A, then evaluate Option B if the story needs more room.

## Animation Inventory

Hero:

- ASCII name glitch.
- Subtitle typewriter.
- Heatmap fade-in.

Metrics:

- CountUp on scroll.
- Bars rise.
- Timeline line draws.

Projects:

- Directory rows type in sequentially.
- Modal spawns like terminal window.

Skills:

- Nodes scale in.
- Lines stroke-dash animate.

Contact:

- Ping text types.
- Input cursor blinks.

## Accessibility

- Respect `prefers-reduced-motion`.
- Do not require scroll precision to read content.
- Pinned scenes must not trap keyboard users.
- All chapter content must exist in the DOM as normal text.

## Performance

- Use `transform` and `opacity`.
- Avoid filter-heavy animations.
- Avoid animating large box shadows every frame.
- Pause or simplify background effects during pinned scenes.

## Implementation Steps

1. Define chapter data and map it to current sections.
2. Add chapter labels and scene state classes.
3. Add `cinematic-scroll.css` with entrance and active-state animations.
4. Add `cinematic-scroll.js` using `IntersectionObserver`.
5. Animate SVG paths using `stroke-dashoffset`.
6. Add GSAP only if native approach is insufficient.
7. Test desktop horizontal and mobile vertical behavior.

## Acceptance Criteria

- Each major section has a distinct chapter feeling.
- Visitor can still navigate normally through nav links.
- Mobile remains readable.
- Reduced-motion mode disables scrubbing and heavy motion.
- No content disappears permanently due to animation state.

## Risks

- Too much animation can reduce clarity.
- Horizontal scroll plus pinned scenes can conflict.
- GSAP dependency adds bundle weight.

## Open Decisions

- Keep horizontal desktop or switch to vertical cinematic story.
- Use GSAP now or later.
- Add separate story-only route or enhance existing route.

