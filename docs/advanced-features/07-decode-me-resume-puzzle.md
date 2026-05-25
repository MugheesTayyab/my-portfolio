# Feature 07 - Decode Me Resume Puzzle

## Goal

Hide 7 interactive code fragments throughout the portfolio. Visitors who find and decode all fragments unlock a secret resume page.

This rewards curiosity and gives technical visitors a reason to explore deeply.

## Core Loop

1. Visitor notices a glitched fragment.
2. Hover/click reveals a code line.
3. Fragment is marked collected.
4. Progress indicator appears.
5. Collect all 7.
6. Unlock secret resume page.

## Fragment List

### Fragment 1 - Hero Scanlines

Location: Hero section overlay.

Encrypted text:

```text
M--u-g--h-e--e-s
```

Decoded:

```python
def attention(Q, K, V):
```

Interaction:

- Hover for 1 second or click.

### Fragment 2 - About Identity Matrix

Location: portrait terminal metadata.

Encrypted:

```text
PID::4T73N710N
```

Decoded:

```python
scores = Q @ K.T
```

Interaction:

- Click the `PID: MMT_2026` title 3 times.

### Fragment 3 - Projects Directory

Location: `transformer-chatbot/` row.

Encrypted:

```text
README_LOCKED[03]
```

Decoded:

```python
weights = softmax(scores / sqrt(d_k))
```

Interaction:

- Open the project modal and click `view_source()`.

### Fragment 4 - Skills Node

Location: Algorithms or PyTorch skill tooltip.

Encrypted:

```text
[ENCRYPTED_GRAPH_SIGNAL]
```

Decoded:

```python
centrality = nx.pagerank(G)
```

Interaction:

- Click the skill node while tooltip is visible.

### Fragment 5 - Metrics Dashboard

Location: 30M views metric.

Encrypted:

```text
30M_V13W5
```

Decoded:

```js
views = algorithm * content * time;
```

Interaction:

- Click the `30M+` number after it counts up.

### Fragment 6 - Education Log

Location: FAST commit block.

Encrypted:

```text
commit a3f9d2e --hidden
```

Decoded:

```cpp
while (learning) build();
```

Interaction:

- Expand the details block and click the commit hash.

### Fragment 7 - Contact Terminal

Location: contact input.

Encrypted command:

```text
decode --resume
```

Decoded:

```text
resume_unlocked = true
```

Interaction:

- Type `decode --resume` after collecting at least 6 fragments.

## Unlock Experience

When all fragments are collected:

```text
> ALL_FRAGMENTS_DECODED
> RESUME VAULT OPENED
> /secret-resume.html
```

Then:

- Show a modal with `OPEN SECRET RESUME`.
- Add a nav link only after unlock.
- Store unlock in localStorage.

## Secret Resume Page

Suggested file:

```text
secret-resume.html
```

Contents:

- Print-quality resume layout.
- Premium typography.
- Contact details.
- Project highlights.
- Education and certifications.
- One-click print/download button.
- Message:
  `You found this. You're exactly who I want to work with.`

If no resume PDF exists yet:

- Implement print button using browser print.
- Add PDF later.

## Suggested Files

```text
scripts/
  decode-puzzle.js
styles/components/
  decode-puzzle.css
secret-resume.html
```

## Data Model

```js
const fragments = [
  {
    id: "hero-attention",
    label: "Fragment 1",
    decoded: "def attention(Q, K, V):",
    selector: "[data-fragment='hero-attention']"
  }
];
```

LocalStorage:

```text
mughees.fragments = {
  collected: ["hero-attention", "..."],
  unlockedAt: 1710000000000,
  expiresAt: 1710086400000
}
```

Spec says fragments reset every 24h. Recommendation:

- Do not reset full unlock for recruiters.
- Reset only the active puzzle progress after 24h if incomplete.

## Progress UI

Hidden until first fragment is found.

```text
[■□□□□□□] 1/7 FRAGMENTS
```

Placement:

- Bottom-left desktop.
- Above mobile nav on mobile.

## Implementation Steps

1. Add fragment data attributes to existing elements.
2. Add `decode-puzzle.js`.
3. Add localStorage tracking.
4. Add progress indicator.
5. Add reveal animations.
6. Add contact command handling.
7. Add unlock modal.
8. Add `secret-resume.html`.
9. Add print/download action.

## Accessibility

- Fragments must be accessible by keyboard.
- Do not rely only on hover.
- Progress indicator should have readable text.
- Secret resume must not be inaccessible if animations fail.

## Acceptance Criteria

- All 7 fragments can be found and collected.
- Progress persists after refresh.
- Unlock state persists.
- Secret resume page opens.
- Puzzle does not block normal contact form usage.
- Mobile users can complete it.

## Risks

- Hidden interactions can be too hidden; include subtle hints after first fragment.
- Recruiters may not complete puzzle, so normal resume/contact path must remain available.
- If exact project code is not available, decoded lines must be representative and not falsely claimed as real source.

## Open Decisions

- Whether the secret resume is public but unlinked or guarded by localStorage.
- Whether to include a downloadable PDF.
- Whether puzzle progress should expire.

