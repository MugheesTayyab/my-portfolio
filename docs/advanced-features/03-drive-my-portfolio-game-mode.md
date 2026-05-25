# Feature 03 - Drive My Portfolio Game Mode

## Goal

Add a hidden game mode where visitors navigate the portfolio as a 2D pixel-art version of Mughees moving through rooms. Each room maps to a portfolio section.

This should be an optional layer. The normal portfolio must remain fully usable without it.

## Activation

Primary activation:

- Small joystick/game icon in the top-right nav.
- Tooltip: `GAME MODE`
- Click opens a full-screen overlay.

Secondary activation:

- Optional command in contact terminal:
  `sudo game-mode`

## Core Experience

When active:

- Overlay title: `[GAME MODE ACTIVATED]`
- A pixel map appears with rooms:
  - Home
  - About
  - Projects
  - Skills
  - Metrics
  - Contact
- Player character starts in Home.
- Use WASD or arrow keys to move.
- Use Space/Enter to interact.
- Walking into a section door scrolls/navigates the main site to that section.

## MVP Scope

Build a simple canvas mini-map, not a complete game engine:

- Static top-down map.
- Rectangle collision.
- Single animated player sprite.
- Doors trigger section navigation.
- Collectibles can be picked up.
- Exit button closes overlay.

This can be built with vanilla canvas and avoids adding Phaser until needed.

## Full Scope

Upgrade to Phaser if game complexity grows:

- Tile map.
- Sprite sheets.
- Animated NPCs.
- Collision layers.
- Sound effects.
- Secret unlock sequence.

## Suggested Files

```text
scripts/
  game-mode.js
styles/components/
  game-mode.css
assets/game/
  mughees-sprite.svg        # or PNG sprite sheet
  map-tiles.svg             # optional
  collectible-langchain.svg
  collectible-cpp.svg
  collectible-transformer.svg
```

## Game Objects

```js
const rooms = [
  { id: "home", label: "HOME", x: 80, y: 120, w: 140, h: 100, target: "#home" },
  { id: "projects", label: "PROJECTS", x: 280, y: 120, w: 160, h: 100, target: "#projects" },
  { id: "skills", label: "SKILLS", x: 500, y: 120, w: 140, h: 100, target: "#skills" },
  { id: "contact", label: "CONTACT", x: 700, y: 120, w: 150, h: 100, target: "#contact" }
];
```

Collectibles:

- Tiny transformer token
- `main.cpp` file
- Assembly register chip
- LangChain link icon
- 30M analytics shard

Collect all 5:

- Show `HIRE_ME_SEQUENCE_UNLOCKED`
- Trigger terminal flash and confetti-style CSS effect.

## Controls

Keyboard:

- Arrow keys / WASD: move
- Space / Enter: interact
- Escape: close game mode

Touch:

- On-screen D-pad on mobile.
- Tap a room to navigate if movement is awkward.

## UI Rules

- The overlay must have a clear close button.
- Pause all background-heavy animations while game mode is open.
- Keep map labels readable; avoid tiny pixel text on mobile.
- Do not force the user to play to access content.

## Implementation Steps

1. Add game mode button in topbar.
2. Add hidden overlay markup to `index.html`.
3. Create `game-mode.css`.
4. Create `game-mode.js` with canvas loop.
5. Draw rooms, paths, player, and collectibles.
6. Add keyboard controls.
7. Add door interaction to scroll to site sections.
8. Add localStorage for collected items.
9. Add mobile fallback controls.
10. Add reduced-motion mode: no sprite animation, only tap-to-navigate map.

## Accessibility

- The game overlay should be optional and dismissible.
- Provide keyboard instructions in text.
- Add a non-canvas room list for screen readers:
  - Home
  - Projects
  - Skills
  - Contact
- Do not trap focus unless the overlay is modal; if modal, manage focus correctly.

## Performance

- Canvas size should be fixed and scaled with CSS.
- Cap frame rate to 30fps if needed.
- Pause loop when overlay is hidden.
- Pause loop when document is hidden.

## Acceptance Criteria

- Game mode opens and closes reliably.
- Character moves with keyboard.
- At least 4 doors navigate to real sections.
- Collectibles persist in localStorage.
- Mobile has a usable fallback.
- Normal portfolio remains unaffected.

## Risks

- Game mode can feel gimmicky if it is too large or slow.
- Keyboard controls can conflict with page scroll if focus is not managed.
- Pixel art assets may be needed for a polished feel.

## Open Decisions

- Vanilla canvas or Phaser.
- Exact sprite style.
- Whether game mode should be hidden, visible, or command-unlocked.
- Whether collecting all items unlocks the same secret resume as Decode Me.

