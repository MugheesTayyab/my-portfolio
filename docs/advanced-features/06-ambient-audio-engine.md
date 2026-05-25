# Feature 06 - Ambient Audio Engine

## Goal

Add optional audio modes that make the portfolio feel like a place: terminal hum, keyboard clicks, navigation blips, and optional synthwave ambience.

Audio must never autoplay.

## UX Rule

First click on the speaker icon turns audio on. Until then, the site is silent.

Modes:

- `TERMINAL`: server hum, typing clicks, nav blips.
- `SYNTHWAVE`: low-volume loop, beat-reactive visuals.
- `SILENCE`: all audio off.

## UI

Topbar control:

```text
[speaker icon] AUDIO: SILENCE
```

Click cycles:

1. Silence
2. Terminal
3. Synthwave
4. Silence

Use icon-only button plus accessible label:

```html
<button id="audio-toggle" aria-label="Audio mode: silence">
  ...
</button>
```

## MVP Scope

No external audio files:

- Use Web Audio API oscillators/noise.
- Generate short blips for navigation.
- Generate keyboard click sound on boot/contact typing.
- Add low-volume synthetic terminal hum.

## Full Scope

- Add royalty-free synthwave loop.
- Add analyser node.
- Pulse particles/skill nodes based on frequency data.
- Add boot startup sound.

## Suggested Files

```text
scripts/
  audio-engine.js
styles/components/
  audio-controls.css
assets/audio/
  synthwave-loop.mp3       # optional
  startup.mp3              # optional
```

## Audio Architecture

```js
const state = {
  mode: "silence",
  ctx: null,
  master: null,
  analyser: null,
  hum: null
};
```

Functions:

- `initAudio()`: creates AudioContext after user gesture.
- `setMode(mode)`: starts/stops sound sources.
- `playBlip(type)`: short interaction sound.
- `getEnergy()`: returns analyser energy for visual systems.
- `destroyAudio()`: stop all nodes.

## Events To Sonify

- Boot line typed: soft click.
- Nav section change: blip.
- Project modal open: terminal spawn sound.
- Contact submit: success chirp.
- Off-topic chatbot query: short error buzz.
- Decode puzzle fragment found: unlock tone.

## Sound-Reactive Visuals

Expose global read-only method:

```js
window.MugheesAudio = {
  getEnergy: () => normalizedEnergy,
  mode: () => state.mode
};
```

Consumers:

- Particle universe scales particle velocity.
- Skill nodes glow on beat.
- Terminal border pulses slightly.

## Accessibility and UX

- Default mode is silence.
- Store user preference in localStorage.
- Do not start audio from stored preference until user clicks once.
- Provide visible mode state.
- Keep volume low by default.
- Allow instant mute.

## Performance

- Reuse one AudioContext.
- Avoid creating many nodes per frame.
- Throttle analyser reads.
- Stop sources when mode is silence.

## Implementation Steps

1. Add audio toggle button.
2. Add `audio-engine.js`.
3. Implement silence/terminal modes with generated sounds.
4. Connect nav, boot, modal, and form events.
5. Add synthwave loop later if audio file exists.
6. Add analyser API after visuals are stable.
7. Test across Chrome, Edge, mobile Safari/Chrome.

## Acceptance Criteria

- No audio plays before user clicks audio toggle.
- Audio mode can be switched or disabled.
- Interaction sounds are subtle.
- Sound does not continue after switching to silence.
- Site works normally if Web Audio is unsupported.

## Risks

- Audio can annoy users quickly.
- Mobile browsers have strict audio unlock rules.
- External audio files increase load size.
- Sound-reactive visuals can add performance overhead.

## Open Decisions

- Use generated sounds only or add real audio files.
- Final default after first click: Terminal or Synthwave.
- Whether audio toggle belongs in topbar or hidden command palette.

