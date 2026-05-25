# Advanced Features Implementation Roadmap

This roadmap turns `MUGHEES_ADVANCED_FEATURES.md` into a practical build order for the current static portfolio.

## Build Philosophy

The site should become more advanced without becoming fragile. Every feature should be:

- Optional when heavy.
- Accessible without motion.
- Mobile-aware.
- Fast enough for a portfolio reviewer.
- Built in layers, not giant rewrites.

## Phase 0 - Content and Credentials

Before large implementation, collect:

- Real portrait/headshot.
- GitHub username.
- Project repository URLs.
- Final LinkedIn URL.
- Resume PDF or final resume content.
- Exact deployment target.
- AI provider choice if chatbot uses LLM.

Deliverables:

- `data/mughees-profile.js`
- `data/projects.js`
- `assets/photo.*`
- `assets/icons/`

## Phase 1 - Easy Polish Wins

Implement first:

1. Magnetic hover elements.
2. Copy email toast.
3. Theme toggle.
4. PWA manifest and service worker.
5. Static MUGHEES.AI FAQ widget.

Why:

- Low risk.
- Strong visible improvement.
- Does not require external APIs.
- Builds reusable UI patterns.

Suggested files:

```text
scripts/magnetic-hover.js
scripts/copy-email.js
scripts/theme-toggle.js
scripts/mughees-ai.js
scripts/pwa-register.js
styles/components/magnetic-hover.css
styles/components/mughees-ai.css
styles/themes.css
manifest.webmanifest
service-worker.js
```

## Phase 2 - Story and Discovery

Implement:

1. Cinematic scroll enhancements.
2. Decode Me puzzle.
3. Secret resume page.
4. Currently learning widget.
5. Konami code.

Why:

- Makes the portfolio feel authored.
- Rewards exploration.
- Builds shareable moments.

Suggested files:

```text
scripts/cinematic-scroll.js
scripts/decode-puzzle.js
scripts/currently.js
scripts/konami.js
styles/components/cinematic-scroll.css
styles/components/decode-puzzle.css
secret-resume.html
data/currently.json
```

## Phase 3 - Live Proof and Case Studies

Implement:

1. GitHub activity feed after username confirmation.
2. Transformer Chatbot case study.
3. Remaining project deep dives.
4. Project modal deep-dive links.

Why:

- Adds credibility.
- Shows thinking, not just visuals.
- Gives recruiters richer material.

Suggested files:

```text
scripts/github-feed.js
styles/components/github-feed.css
projects/transformer-chatbot.html
projects/temporal-relations.html
projects/cpp-sfml-games.html
projects/x86-super-mario.html
projects/instagram-algorithm.html
styles/case-study.css
scripts/case-study.js
```

## Phase 4 - Heavy Signature Features

Implement:

1. Three.js particle universe.
2. Ambient audio engine.
3. Game mode.
4. LLM-backed MUGHEES.AI serverless endpoint.

Why later:

- Higher complexity.
- Higher performance risk.
- Needs more assets and deployment decisions.

Suggested files:

```text
scripts/particles-three.js
scripts/particle-targets.js
scripts/audio-engine.js
scripts/game-mode.js
styles/components/particle-universe.css
styles/components/audio-controls.css
styles/components/game-mode.css
api/chat.js
assets/game/
assets/audio/
```

## Dependency Map

MUGHEES.AI:

- Needs `data/mughees-profile.js`.
- Needs backend only for LLM version.

PWA:

- Needs icons.
- Helps offline chatbot FAQ mode.

Decode Puzzle:

- Needs secret resume page.
- Can reuse project/code data.

Case Studies:

- Need project links, screenshots, metrics, and writing.

GitHub Feed:

- Needs GitHub username.
- Should be disabled/offline-safe in PWA.

Particle Universe:

- Can react to cinematic scroll sections.
- Can react to audio engine later.

Audio Engine:

- Should not be required by any other feature.
- Can expose analyser data to particles/skills.

Game Mode:

- Can unlock same secret resume or separate Easter egg.

## Recommended First Sprint

Target: make the current site feel much more premium in one pass.

Tasks:

1. Add `data/mughees-profile.js`.
2. Add static `MUGHEES.AI`.
3. Add magnetic hover.
4. Add copy email toast.
5. Add PWA manifest/service worker.
6. Add theme toggle.

Definition of done:

- No build step required.
- Site still opens from `index.html`.
- All new features work without API credentials.
- Mobile layout remains clean.

## Testing Checklist

General:

- Open `index.html` directly.
- Serve locally with `python -m http.server`.
- Test desktop width: 1440px.
- Test tablet width: 900px.
- Test mobile width: 390px.
- Test keyboard-only navigation.
- Test reduced motion.

Feature:

- Chatbot handles known and off-topic questions.
- Magnetic effects disable on touch.
- PWA service worker registers.
- Offline mode loads after first visit.
- Decode fragments persist.
- GitHub feed fails gracefully.
- Audio never autoplays.
- Game mode can close with Escape.

Performance:

- No console errors.
- No API key leakage.
- No layout overlap.
- No text overflow in buttons/cards.
- Animations use transform/opacity where possible.

## Final Quality Bar

The advanced portfolio should satisfy this:

- A recruiter can understand Mughees in 30 seconds.
- A technical visitor can explore for 5 minutes.
- The site has at least one memorable interaction.
- The site still works if JavaScript-heavy features fail.
- Every claim is backed by real content or written honestly.

