# Feature 10 - PWA Installable App

## Goal

Make the portfolio installable as a Progressive Web App with offline support, app icon, theme color, and standalone display.

## User Experience

Mobile visitor opens the site and can add it to their home screen. Installed app:

- Opens fullscreen/standalone.
- Uses dark terminal splash background.
- Shows Mughees-branded icon.
- Works offline for core pages/assets.

## Required Files

```text
manifest.webmanifest
service-worker.js
assets/icons/
  icon-192.png
  icon-512.png
  maskable-512.png
```

Current project has SVG favicon only. For a polished PWA, create real PNG icons.

## Manifest

```json
{
  "name": "Mughees Tayyab - AI Engineer",
  "short_name": "MUGHEES.AI",
  "description": "Neural terminal portfolio of Muhammad Mughees Tayyab.",
  "theme_color": "#00FF9C",
  "background_color": "#030305",
  "display": "standalone",
  "start_url": "./index.html",
  "scope": "./",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "assets/icons/maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

## HTML Additions

```html
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#00FF9C">
<link rel="apple-touch-icon" href="assets/icons/icon-192.png">
```

Register service worker:

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
```

## Service Worker Strategy

Static portfolio strategy:

- Precache core shell.
- Cache-first for local CSS/JS/images.
- Network-first for GitHub/API/chat endpoints.
- Offline fallback to `index.html`.

Cache list:

- `index.html`
- CSS files
- JS files
- SVG assets
- icons
- `secret-resume.html` if public

## Suggested Files

```text
scripts/
  pwa-register.js
manifest.webmanifest
service-worker.js
assets/icons/
```

## Install Prompt UI

Optional:

- Small terminal toast:
  `> install MUGHEES.AI as app?`
- Buttons:
  - `install`
  - `dismiss`

Only show if browser fires `beforeinstallprompt`.

## Offline UI

If offline:

- Show small status in topbar:
  `NET: OFFLINE`
- Hide/disable live GitHub feed.
- Chatbot uses local FAQ mode.

## Implementation Steps

1. Create icons.
2. Add `manifest.webmanifest`.
3. Add HTML manifest/meta tags.
4. Add `service-worker.js`.
5. Add `scripts/pwa-register.js`.
6. Add optional install prompt UI.
7. Test with browser DevTools Application tab.
8. Run Lighthouse PWA checks.

## Acceptance Criteria

- Manifest is valid.
- Service worker registers successfully.
- Core site loads offline after first visit.
- Install prompt is available on supported browsers.
- Icons display correctly and are not blurry.
- No stale-cache issue blocks updates.

## Update Strategy

Use versioned cache names:

```js
const CACHE_NAME = "mughees-portfolio-v1";
```

When assets change:

- Increment version.
- Delete old caches on activate.

## Risks

- Bad caching can serve stale files during development.
- Missing icon sizes can fail installability.
- Service worker paths differ depending on deployment subdirectory.

## Open Decisions

- Final domain/root path.
- Whether to use generated abstract icon or real headshot.
- Whether secret resume should be precached.

