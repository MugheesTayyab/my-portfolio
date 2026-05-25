# 🎬 MUGHEES PORTFOLIO — INTRO SEQUENCE PROMPT.md
### *"The First 8 Seconds That Change Everything"*

> **PURPOSE OF THIS FILE:** Replace the old boring BIOS terminal boot screen entirely.
> This is a pixel-perfect, frame-by-frame specification for a world-class opening sequence.
> Inspired by: Joffrey Spitzer (Codrops, Feb 2026), Samsy Ninja (50+ Awwwards),
> Chipsa Design (CSSDA Site of the Day), and Bruno Simon (most iconic portfolio ever built).

---

## 🏆 REFERENCE PORTFOLIOS — RANKED & ANALYZED

Before defining what to build, here is what the world's best opening sequences do — and why.

---

### 🥇 #1 — SAMSY.NINJA (Paris, 50+ International Awards incl. Cannes Lions)
**URL:** samsy.ninja
**Opening:** Cyberpunk 3D world powers up from complete darkness. WebGPU particles
assemble a neon cityscape at 120+ FPS. First person perspective. No loading bar —
the world simply materializes around you.
**Why it wins:** The visitor doesn't "enter" a portfolio. They *wake up inside one.*
The environment is the introduction. Zero text needed for the first 3 seconds.
**Key lesson:** Let the visual *be* the statement. Text is secondary.

---

### 🥈 #2 — JOFFREY SPITZER (Codrops Feb 2026, Awwwards Nominee)
**URL:** joffreyspitzer.fr
**Opening:** Counter `000 → 100` in 14 chunky steps (GSAP `steps(14)` ease) over a
fullscreen background image. The counter finishes → GSAP `Flip` transitions the
background from fullscreen preloader into the exact hero image position.
**Why it wins:** The preloader *becomes* the content. No jarring cut. The loading
screen dissolves into the portfolio with spatial continuity.
**Key lesson:** Preloader → Hero transition should feel like one continuous movement.

---

### 🥉 #3 — BRUNO SIMON (Most Cited Portfolio in the World, 400K+ Twitter impressions)
**URL:** bruno-simon.com
**Opening:** Black screen. A single sound plays. A toybox world slowly *renders in*
from a top-down camera. The physics settle. A wooden sign reads: "CLICK TO START."
You click → the jeep's engine revs → you're driving.
**Why it wins:** The loading screen has a *reason to exist* — it masks asset loading
with anticipation. The "click to start" forces interaction, which browsers require
for audio. Everything is intentional.
**Key lesson:** Make the visitor an *actor*, not an *audience*, from second one.

---

### 🏅 #4 — CHIPSA DESIGN (CSSDA + Awwwards Site of the Day)
**URL:** chipsa.ru
**Opening:** 3D logo materializes from particles. Cursor clicks → logo shatters into
shards that fall with physics. Each shard catches different-colored light.
**Why it wins:** The opening sequence IS a demo of their capability. You see WebGL
mastery before reading a single word.
**Key lesson:** The intro should prove your skills, not just introduce you.

---

### 🏅 #5 — JREYES MC (Awwwards Honorable Mention — Minecraft-Inspired)
**URL:** jreyes.co
**Opening:** A pixelated Minecraft-style world generates block by block as assets load.
The generation *is* the loading screen. When done, camera tilts to reveal full scene.
**Why it wins:** The metaphor matches the person. It's not a generic loader — it's *their* loader.
**Key lesson:** The loading metaphor should reflect who you are.

---

## 🧠 THE CONCEPT FOR MUGHEES — "NEURAL GENESIS"

**The idea in one sentence:**
> *The visitor watches Mughees's mind boot up — neurons fire, weights initialize,
> attention heads lock onto a target — and then: silence, clarity, and the name.*

**Why this concept is perfect for Mughees specifically:**
- He built a Transformer chatbot from scratch — the attention mechanism is *his* signature
- He grew to 30M views through algorithmic analysis — he thinks in systems
- He's a CS undergrad who codes at the hardware level (Assembly) — he understands how machines start
- The visual language (neural nets, attention maps, initializing weights) is both his aesthetic AND his biography

**The old opening was:** A black screen → BIOS text → "HELLO WORLD" → hero appears.
That could be anyone. This new one can *only* be Mughees.

---

## ⏱️ FRAME-BY-FRAME SEQUENCE — Total Duration: 6.8 seconds

> Every millisecond is specified. Every easing curve is named.
> This is the exact spec to hand to an AI code generator or developer.

---

### PHASE 0 — PRE-RENDER [0ms → 200ms]
**What the visitor sees:** Complete black (`#030305`). Nothing.
**What is happening in code:**
```javascript
// Assets preloading silently:
// - Font files (Fragment Mono, JetBrains Mono)
// - Three.js scene initialization
// - Particle system geometry allocation on GPU
// - GSAP timeline construction (not yet played)

// This phase is invisible. Use it to avoid jank.
document.body.style.overflow = 'hidden'; // lock scroll
```
**Duration:** 200ms
**Easing:** N/A

---

### PHASE 1 — SINGLE PIXEL [200ms → 600ms]
**What the visitor sees:**
A single white pixel (`2px × 2px`) appears dead-center of the screen.
It pulses once — like a heartbeat. Then glows.

```
Before:                 After 400ms:
████████████            ████████████
████████████            █████·██████   ← one glowing pixel
████████████            ████████████
(complete black)        (pixel is alive)
```

**CSS/JS spec:**
```css
.origin-pixel {
  width: 2px;
  height: 2px;
  background: #00FF9C;
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0px #00FF9C;
  animation: pixel-pulse 400ms ease-out forwards;
}

@keyframes pixel-pulse {
  0%   { opacity: 0; box-shadow: 0 0 0px #00FF9C; }
  50%  { opacity: 1; box-shadow: 0 0 20px #00FF9C, 0 0 40px #00FF9C; }
  100% { opacity: 1; box-shadow: 0 0 8px #00FF9C; }
}
```
**Why this works:** Every nerve in a human brain wants to know what that pixel is.
It creates 400ms of genuine tension at zero performance cost.

---

### PHASE 2 — NEURAL EXPANSION [600ms → 1800ms]
**What the visitor sees:**
From that single pixel, **neural connections explode outward** across the full screen.
Imagine a time-lapse of a neuron growing dendrites — but at digital speed.
Lines shoot from the center pixel in 12 directions, then branch, then branch again.
Each branch is `--terminal` green (`#00FF9C`), 1px wide, alpha 0.6.
The branching is slightly random (seeded RNG so it's consistent across loads).

```
        /|\ 
       / | \
      /  |  \
─────●───●───●─────   ← pixel at center, lines radiating
      \  |  /
       \ | /
        \|/
```

**Three.js / Canvas Implementation:**
```javascript
// Use canvas 2D for this phase — simpler than Three.js, faster to render
const ctx = canvas.getContext('2d');

function drawNeuron(x, y, angle, depth, length) {
  if (depth === 0 || length < 2) return;

  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;

  // Animate stroke-dashoffset for "growing" line effect
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = `rgba(0, 255, 156, ${0.3 + depth * 0.1})`;
  ctx.lineWidth = depth * 0.5;
  ctx.stroke();

  // Branch: two child lines at ±25° with 0.7x length, +random jitter
  const spread = 0.44 + Math.random() * 0.1; // ~25°
  drawNeuron(endX, endY, angle - spread, depth - 1, length * 0.7);
  drawNeuron(endX, endY, angle + spread, depth - 1, length * 0.7);
}

// Animate expansion with requestAnimationFrame
// Each frame: increase maxDepth by 0.1 (creates the "growing" effect)
```

**Visual character:**
- Lines grow from center pixel outward at ~800px/sec perceived speed
- Branches reach screen edges at exactly 1800ms
- Nodes (branch points) glow briefly as they're born (0→8px box-shadow → 0)
- Total node count when complete: ~240 nodes across the screen
- Entire network fades to 15% opacity by end of phase (it becomes the background)

**Duration:** 1200ms
**Easing:** `expo.out` — fast start, graceful settle at edges

---

### PHASE 3 — ATTENTION AWAKENING [1800ms → 2800ms]
**What the visitor sees:**
The neural network is now spread across the full screen (dim, 15% opacity).
Suddenly — like a Transformer attention head locking onto a sequence —
**8 specific nodes light up simultaneously** across the network.
Each lights up with a different color timed 60ms apart (staggered).

```
Colors of the 8 attention heads (in order):
  Head 1: #00FF9C  (terminal green)
  Head 2: #9D00FF  (neural purple)
  Head 3: #FFB830  (amber)
  Head 4: #00FF9C
  Head 5: #FF2D55  (error red)
  Head 6: #9D00FF
  Head 7: #FFB830
  Head 8: #00FF9C
```

**Between lit nodes:** Thin, bright connection lines draw themselves (like attention weights
connecting tokens). These lines are 2px, alpha 0.8, animated with `stroke-dashoffset`.

**Visual reference:** This should look *exactly* like a Transformer attention visualization
you'd see in a research paper — but alive, real-time, and covering a full browser window.

```
   ●━━━━━━━━━━━━━━━━●
   ╲                 ╱
    ●               ●
     ╲             ╱
      ●━━━━━━━━━━━●
           ●
```

**JS Implementation:**
```javascript
// Pre-select 8 nodes from the drawn network
// Prioritize nodes roughly evenly spread spatially
const attentionNodes = selectAttentionNodes(networkNodes, 8);

// Staggered activation
attentionNodes.forEach((node, i) => {
  setTimeout(() => activateNode(node, ATTENTION_COLORS[i]), i * 60);
});

function activateNode(node, color) {
  gsap.to(node, {
    glowRadius: 30,
    glowColor: color,
    scale: 2,
    duration: 0.4,
    ease: 'back.out(2)',
    onComplete: () => drawAttentionLines(node, attentionNodes)
  });
}
```

**Duration:** 1000ms (400ms activation + 600ms for attention lines to complete)
**Easing:** `back.out(2)` for node pop, `power2.inOut` for line drawing

---

### PHASE 4 — CONVERGENCE [2800ms → 3600ms]
**What the visitor sees:**
All 8 attention nodes and their connecting lines **converge toward center screen**.
They don't teleport — they *travel*, leaving fading trails.
As they converge, they collapse into a single point of white-hot light at exact center.
This implosion takes 500ms.
The collision: a flash of white (`#FFFFFF`) that fills ~40% of the screen radius, then fades.

```
Phase start:              Phase end:
  ● ─────── ●              
   \       /              
    ● ─── ●     →    ☀️ (single bright point)
   /       \              
  ● ─────── ●              
```

**CSS flash:**
```javascript
gsap.to('.convergence-flash', {
  scale: 1,        // starts at 0
  opacity: 1,      // starts at 0
  duration: 0.15,  // fast in
  ease: 'power4.out',
  onComplete: () => {
    gsap.to('.convergence-flash', {
      opacity: 0,
      scale: 3,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
});
```

**Duration:** 800ms
**Easing:** `power4.in` for convergence, `power4.out` for flash

---

### PHASE 5 — NAME REVEAL [3600ms → 5200ms]
**What the visitor sees:**
From the convergence point, the name **M U G H E E S** materializes.
Not typed. Not faded. It *forms* — each letter assembles from particles that scatter
out from the center point like shrapnel, travel to their final positions,
then sharpen into crisp characters.

**This is the signature moment. Get it perfect.**

**Typography:**
```css
.hero-name {
  font-family: 'Fragment Mono', monospace;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1.5px #00FF9C;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}
```

**The assembly animation (THREE.js TextGeometry + custom shader):**
```glsl
// Vertex shader: particles start at origin, travel to letter positions
uniform float uProgress;  // 0 → 1 over 1200ms
uniform vec3 uTargetPos;  // final letter vertex position

void main() {
  // Start: random scatter position (seeded per particle)
  vec3 scatterPos = aScatterOrigin;  // pre-calculated random offset

  // Interpolate: scatter → target
  vec3 currentPos = mix(scatterPos, uTargetPos, pow(uProgress, 0.6));

  // Add turbulence during mid-flight
  float turbulence = sin(uProgress * 3.14159) * 0.3;
  currentPos += aNoise * turbulence * (1.0 - uProgress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPos, 1.0);

  // Particles sharpen from blur to crisp as they settle
  gl_PointSize = mix(4.0, 1.5, uProgress);
  vAlpha = mix(0.3, 1.0, uProgress);
}
```

**Visual stages of letter formation:**
```
[0%]    ·  ·    ·    ·  · ·  ·  ·    (scattered particles)
[30%]   ╌  ╌   ╌╌   ╌  ╌ ╌  ╌  ╌    (coalescing into rough shapes)
[60%]   ▌  ▌   ▌▌   ▌  ▌ ▌  ▌  ▌    (letterforms recognizable)
[100%]  M  U   GH   E  E S          (crisp, sharp, perfect)
```

**Stagger:** Letters form LEFT → RIGHT, 80ms apart.
So M finishes forming slightly before U, which finishes before G, etc.
Total spread across 7 letters × 80ms = 560ms of stagger within the 1200ms window.

**After the name settles (at 1200ms):**
A `--terminal` green underline draws itself left-to-right beneath the name.
Duration: 400ms. 3px height. The width matches the name exactly.

**Duration:** 1600ms (1200ms assembly + 400ms underline)
**Easing:** Custom `pow(t, 0.6)` for particle travel — fast early, slow to settle

---

### PHASE 6 — SUBTITLE & FINAL HERO [5200ms → 6800ms]
**What the visitor sees:**
Below the name, the subtitle appears — but NOT typed character by character (too slow, too cliché).
Instead: the subtitle appears **all at once, behind a masking rectangle that slides away.**
This is the "curtain reveal" technique used by top agencies.

```
Before:  ██████████████████████████████████
         (solid colored rectangle covering text)

After:   AI ENGINEER  ·  FAST CS  ·  ISLAMABAD
         (rectangle slides right → text is revealed)
```

**GSAP implementation:**
```javascript
// The "mask" is a ::after pseudo-element or sibling div
gsap.to('.subtitle-mask', {
  scaleX: 0,       // collapse from right
  transformOrigin: 'right center',
  duration: 0.6,
  ease: 'expo.inOut',
  delay: 0.1       // slight delay after name settles
});

// Simultaneously: hero background fades from 0% to 100% opacity
gsap.to('.hero-background', {
  opacity: 1,
  duration: 0.8,
  ease: 'power2.inOut'
});
```

**The two stat badges appear:**
After subtitle reveal, two small data badges float in from below (40px travel up, fade in):

```
  ┌──────────────────┐    ┌──────────────────┐
  │  30M+  VIEWS     │    │  ⬡ GENAI CERT    │
  │  20 DAYS         │    │  PLANETBEYOND    │
  └──────────────────┘    └──────────────────┘
```
These use `back.out(1.5)` easing — the slight overshoot makes them feel alive.

**Duration:** 1600ms
**Final state:** Full hero is visible, neural network is dim in background, cursor is active.

---

### PHASE 7 — INVITATION [6800ms → ∞]
**What the visitor sees:**
Three seconds after hero appears, a single line fades in at the bottom of the screen:

```
▼  scroll to enter the mind
```

The `▼` bounces gently (CSS `animation: bounce 2s ease-in-out infinite`).
The text fades between 60% and 100% opacity, 3s cycle.

This is the only instruction on the entire opening screen.

---

## 📐 LAYOUT SPECIFICATIONS

### Full Viewport Breakdown (desktop, 1440px wide)
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ← Neural network nodes (15% opacity, full bleed canvas) →     │
│                                                                  │
│                         [60px top padding]                       │
│                                                                  │
│                                                                  │
│                                                                  │
│               M  U  G  H  E  E  S                                │
│               ───────────────────                                │
│          AI ENGINEER  ·  FAST CS  ·  ISLAMABAD                   │
│                                                                  │
│       [30M+ VIEWS · 20 DAYS]   [⬡ GENAI CERTIFIED]              │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│                     ▼  scroll to enter the mind                  │
└──────────────────────────────────────────────────────────────────┘
```

### Vertical centering:
- Name: `top: 42%` (slightly above center — asymmetric, more tension)
- Subtitle: `top: 42% + name_height + 24px`
- Badges: `top: subtitle_bottom + 40px`
- Scroll hint: `bottom: 40px`, centered horizontally

---

## 🎨 EXACT COLOR VALUES FOR INTRO SEQUENCE

```css
:root {
  /* Phase 1 */
  --pixel-color:        #00FF9C;
  --pixel-glow:         rgba(0, 255, 156, 0.6);

  /* Phase 2 — Neural Network */
  --neuron-line:        rgba(0, 255, 156, 0.6);
  --neuron-node-glow:   rgba(0, 255, 156, 0.4);
  --network-settled:    rgba(0, 255, 156, 0.15);  /* dim background state */

  /* Phase 3 — Attention Colors */
  --attention-0:        #00FF9C;
  --attention-1:        #9D00FF;
  --attention-2:        #FFB830;
  --attention-3:        #00FF9C;
  --attention-4:        #FF2D55;
  --attention-5:        #9D00FF;
  --attention-6:        #FFB830;
  --attention-7:        #00FF9C;

  /* Phase 4 — Convergence */
  --flash-color:        #FFFFFF;
  --flash-glow:         rgba(255, 255, 255, 0.8);

  /* Phase 5 — Name */
  --name-stroke:        #00FF9C;
  --name-underline:     #00FF9C;
  --particle-color:     #00FF9C;

  /* Phase 6 — Hero */
  --mask-color:         #030305;   /* same as background — seamless */
  --subtitle-color:     #6B6B8A;
  --badge-bg:           #1A1A2E;
  --badge-border:       rgba(0, 255, 156, 0.3);
  --badge-text:         #00FF9C;
}
```

---

## ⚡ EASING REFERENCE CARD

| Phase | Element | GSAP Ease | Feeling |
|-------|---------|-----------|---------|
| 1 | Pixel pulse | `power2.out` | Gentle heartbeat |
| 2 | Neural growth | `expo.out` | Explosive then settling |
| 3 | Node activation | `back.out(2)` | Snappy pop |
| 3 | Attention lines | `power2.inOut` | Deliberate drawing |
| 4 | Node convergence | `power4.in` | Gravity pull |
| 4 | Flash | `power4.out` | Shock then dissipate |
| 5 | Particle travel | `power(t, 0.6)` | Surging then precise |
| 5 | Underline draw | `power3.inOut` | Confident stroke |
| 6 | Mask reveal | `expo.inOut` | Agency-grade reveal |
| 6 | Badge float | `back.out(1.5)` | Alive, slightly bouncy |
| 7 | Scroll hint | `sine.inOut` | Breathing |

---

## 📱 MOBILE ADAPTATION (< 768px)

The full sequence runs on mobile **with these simplifications:**

| Change | Reason |
|--------|--------|
| Neural network: max 80 nodes (vs 240) | GPU memory constraint |
| Particle name assembly: skip on low-power mode | `navigator.hardwareConcurrency < 4` check |
| Fallback: name fades + slides up (`y: 30 → 0`) | Still beautiful, just simpler |
| All durations × 0.85 | Mobile users are more impatient |
| Attention heads: 4 (vs 8) | Visual clarity on small screen |
| Phase 1 pixel: `4px × 4px` | Visible on high-DPI small screens |

```javascript
// Low-power mode detection
const isLowPower = navigator.hardwareConcurrency < 4
  || /Android|iPhone/.test(navigator.userAgent);

if (isLowPower) {
  runSimplifiedIntro(); // fade + slide version
} else {
  runFullIntro();       // full neural genesis sequence
}
```

---

## 🚫 WHAT TO REMOVE FROM OLD INTRO

Delete entirely:
- ❌ `> INITIALIZING MUGHEES_OS v2026...` — generic, seen everywhere
- ❌ `> LOADING AI_MODULES............[OK]` — cliché terminal fake-loading
- ❌ `> MOUNTING ALGORITHMS...........[OK]` — no real meaning
- ❌ `> CONNECTING NEURAL_NET.........[OK]` — we're *showing* the neural net now, not typing it
- ❌ `> HELLO, WORLD.` — overused, unpersonal
- ❌ The glitch flash at 3.8s → hero "slam" from below — jarring, not premium
- ❌ ASCII art name — low-fidelity, takes too much space, hard to read at scale

**Replace with:** Everything in this document.

---

## 🔧 TECH STACK FOR THIS SEQUENCE ONLY

```
Three.js r158+          → Particle system for name assembly (Phase 5)
Canvas 2D API           → Neural network drawing (Phases 1-2) — faster than Three.js for 2D lines
GSAP 3.12+              → All timing, easing, coordination
GSAP SplitText Plugin   → Subtitle character splitting (Phase 6)
GSAP Flip Plugin        → Any layout transitions
Custom GLSL Shaders     → Particle-to-letter morphing (Phase 5 vertex shader)
```

**Total estimated JS payload for intro:** ~28KB gzipped (Three.js excluded — already loaded for background)

**Loading strategy:**
```html
<!-- In <head>: preload critical fonts -->
<link rel="preload" href="/fonts/fragment-mono.woff2" as="font" crossorigin>

<!-- Three.js scene initializes during Phase 0-2 (invisible phases) -->
<!-- By Phase 5 (name assembly), Three.js scene is fully ready -->
```

---

## ✅ QUALITY CHECKLIST

Before shipping, verify every item:

- [ ] Single pixel appears at exact viewport center (test at 1280×800, 1920×1080, 2560×1440, 375×812)
- [ ] Neural network reaches all 4 screen edges before Phase 3 begins
- [ ] 8 attention nodes are spatially distributed (no clustering)
- [ ] Attention lines don't overlap in a way that looks like a mess — test this
- [ ] Convergence flash doesn't burn retinas (max opacity: 0.85, max radius: 40vw)
- [ ] Name particles: all 7 letters identifiable at 40% progress (test by pausing animation)
- [ ] Underline exact width of name (not hardcoded — measured dynamically via JS)
- [ ] Subtitle mask reveal direction: RIGHT-TO-LEFT (more natural for LTR reading)
- [ ] Both badges appear at same time, not staggered (they're peers, not list items)
- [ ] Scroll hint only appears after full hero is visible (not during animation)
- [ ] Total sequence: 6.8s on fast connection, max 8.5s on slow (test with CPU throttle)
- [ ] Sequence does NOT replay on back navigation (check sessionStorage flag)
- [ ] Skip button appears at 2s: `[skip intro →]` — top right, 10px font, 40% opacity

---

## 💡 THE SKIP BUTTON

**Always include this.** Returning visitors and impatient recruiters appreciate it.

```javascript
// Show skip button at exactly 2000ms
setTimeout(() => {
  gsap.to('.skip-intro', { opacity: 0.4, duration: 0.3 });
}, 2000);

document.querySelector('.skip-intro').addEventListener('click', () => {
  gsap.killAll();                          // stop all running animations
  gsap.to('.intro-overlay', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      document.querySelector('.intro-overlay').remove();
      initHeroAnimations(); // jump straight to hero state
    }
  });
});
```

```css
.skip-intro {
  position: fixed;
  top: 20px; right: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #6B6B8A;
  opacity: 0;
  cursor: pointer;
  letter-spacing: 0.1em;
  z-index: 9999;
  transition: color 0.2s;
}
.skip-intro:hover { color: #00FF9C; }
```

---

## 🎯 SUCCESS CRITERIA

The intro sequence is **done** when a stranger watching a screen recording says one of:

> *"How did they do that?"*
> *"Wait, can you play that again?"*
> *"Is this an AI portfolio or an AI itself?"*
> *"This is the coolest intro I've ever seen on a portfolio."*

If they say **"cool boot screen"** → you've shipped the old version by accident. Start over.

---

*Research sources: Awwwards 2025-2026, Codrops Feb 2026 (Joffrey Spitzer case study),*
*Bruno Simon Medium case study, Samsy.ninja awards list, Chipsa Design CSSDA submission,*
*CreativeDevJobs Three.js Portfolio Rankings 2026*

*Spec version: 1.0 | Mughees Tayyab Portfolio | May 2026*
*"Don't show them a loading screen. Show them a universe being born."*
