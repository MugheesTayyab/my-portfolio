# Feature 09 - Live GitHub Activity Feed

## Goal

Show that Mughees is actively building by adding a live GitHub activity ticker and an optional contribution-style widget.

## Required Input

Need exact GitHub username.

Until known, use:

```js
const GITHUB_USERNAME = "mugheestayyab"; // placeholder
```

Do not publish with a guessed username unless confirmed.

## UX

Ticker placement:

- Desktop: thin strip below topbar or bottom of viewport.
- Mobile: collapsible or hidden behind `LIVE` button.

Example:

```text
LIVE - mughees pushed to transformer-chatbot - 2h ago
```

If API fails:

```text
LIVE - GitHub signal temporarily unavailable
```

## GitHub API Endpoints

Public events:

```text
https://api.github.com/users/{username}/events/public
```

Repos:

```text
https://api.github.com/users/{username}/repos?sort=pushed
```

No auth required for low-volume public usage, but unauthenticated rate limits apply.

## Suggested Files

```text
scripts/
  github-feed.js
styles/components/
  github-feed.css
```

## Data Normalization

Map GitHub event types:

- `PushEvent` -> `pushed to {repo}`
- `CreateEvent` -> `created {repo/branch/tag}`
- `PullRequestEvent` -> `opened/closed PR in {repo}`
- `IssuesEvent` -> `opened/closed issue in {repo}`
- `WatchEvent` -> `starred {repo}`

Format time:

- `2h ago`
- `Yesterday`
- `May 17`

## Caching

Use localStorage:

```text
mughees.githubFeed = {
  fetchedAt: 1710000000000,
  events: [...]
}
```

Rules:

- Use cached events immediately.
- Fetch fresh data in background if cache older than 5 minutes.
- Do not poll aggressively.

## Contribution Widget

GitHub's contribution graph data is not available as a simple official unauthenticated REST endpoint. Options:

1. Show repo push activity from public events.
2. Use GitHub profile SVG from a third-party service.
3. Build a custom "activity bars" widget from recent events.

Recommendation: avoid third-party contribution scraping. Use public events and repo `pushed_at` data.

## Implementation Steps

1. Confirm GitHub username.
2. Add ticker markup near topbar.
3. Add `github-feed.css`.
4. Add `github-feed.js`.
5. Fetch public events.
6. Normalize and render 3-5 items.
7. Add localStorage cache.
8. Add failure state.
9. Add optional About-section activity bars.

## Accessibility

- Ticker should not move too fast.
- Provide pause on hover/focus.
- Use readable text, not only icons.
- Do not update screen reader announcements every few seconds.

## Performance

- Fetch after page load, not before hero render.
- Poll every 5 minutes maximum.
- Cache results.
- Keep DOM updates minimal.

## Acceptance Criteria

- Shows real GitHub activity for the confirmed username.
- Handles empty/no activity state.
- Handles API failure.
- Does not block page load.
- Mobile layout does not crowd the topbar.

## Risks

- Public events may omit some activity.
- GitHub rate limits unauthenticated requests.
- A quiet GitHub profile can make the ticker look weak; fallback to curated recent work if needed.

## Open Decisions

- Exact GitHub username.
- Ticker location.
- Whether to show only code activity or also stars/follows.

