# Bonus Micro-Features

These are small upgrades with high perceived polish. They should be implemented between larger features.

## 1. Typewriter Race - Real vs Fake

Location:

- Skills section heading or top of skill graph.

Behavior:

```text
> COMPILING SKILLS...
> done in 0.03s
```

Then skills appear faster than expected.

Suggested files:

```text
scripts/skill-compiler.js
styles/components/skill-compiler.css
```

Acceptance:

- Animation runs once when skills enter viewport.
- Reduced-motion mode shows final state immediately.

## 2. Copy Email Toast

Location:

- Contact direct email line.

Behavior:

- Click email.
- Copy address to clipboard.
- Show toast:

```text
> email copied to clipboard
> muhammadmugheestayyab@gmail.com
```

Suggested implementation:

- Add `data-copy-email` to email link/button.
- Use `navigator.clipboard.writeText`.
- Fallback: select text and show manual copy message.

Acceptance:

- Works on HTTPS/localhost.
- Does not break normal `mailto:` fallback.
- Keyboard accessible.

## 3. Visitor Counter

Location:

- Topbar, metrics section, or footer.

Behavior:

```text
> SESSIONS INITIATED: 00002,847
```

Implementation options:

- CountAPI or other free counter service.
- Serverless endpoint.
- Static fake counter is not recommended unless clearly decorative.

Recommendation:

- Skip until deployment target is known.
- Do not depend on an unreliable third-party counter for page render.

## 4. Currently Reading / Learning Widget

Location:

- Bottom-left desktop.
- Dismissible card on mobile.

Content:

```text
Currently: "RLHF from Scratch" - arXiv 2025
Building: "Multi-agent RAG pipeline"
```

Data source:

```text
data/currently.json
```

Fields:

- reading title
- reading URL
- building title
- updated date

Acceptance:

- Easy to update weekly.
- Does not overlap mobile nav.
- Can be dismissed.

## 5. Dark / Light / CRT Toggle

Modes:

- `dark`: current default.
- `light`: editorial paper/inverted mode.
- `crt`: heavy scanlines, phosphor green, terminal-first.

Suggested files:

```text
scripts/theme-toggle.js
styles/themes.css
```

Implementation:

- Store `mughees.theme` in localStorage.
- Add `data-theme` to `<html>`.

```js
document.documentElement.dataset.theme = selectedTheme;
```

Acceptance:

- Theme persists after refresh.
- Light mode has readable contrast.
- CRT mode does not make text unreadable.

## 6. Konami Code Easter Egg

Sequence:

```text
ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight KeyB KeyA
```

Behavior:

```text
> CHEAT CODE DETECTED
> UNLOCKING: FULL POWER MODE
```

Then:

- Particle intensity increases briefly.
- Glitch flash.
- Confetti-style message.
- Optional audio if enabled.

Suggested file:

```text
scripts/konami.js
```

Acceptance:

- Works anywhere except while typing in input/textarea.
- Does not hijack normal form entry.
- Resets after successful trigger.

## 7. Command Palette

Not in original spec, but fits the terminal OS metaphor.

Trigger:

- `Ctrl+K` or `Cmd+K`

Commands:

- `open projects`
- `open skills`
- `copy email`
- `toggle crt`
- `open mughees.ai`
- `activate game mode`

Suggested files:

```text
scripts/command-palette.js
styles/components/command-palette.css
```

Acceptance:

- Keyboard navigable.
- Fuzzy matching optional.
- Mobile hidden unless needed.

## Implementation Priority

Best order:

1. Copy email toast.
2. Theme toggle.
3. Typewriter race.
4. Currently learning widget.
5. Konami code.
6. Command palette.
7. Visitor counter.

