# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview the production build locally
npm run lint     # ESLint
```

There are no tests in this project.

## Architecture

This is a **React + Vite + Tailwind CSS v3 + Framer Motion** portfolio site. The entry point is `src/main.jsx` → `src/App.jsx`.

### Color system

All colors are defined as CSS custom properties in `src/index.css`. Components use `style={{ color: 'var(--c-text)' }}` inline styles — **not** Tailwind color classes — so that the global transition rule (`0.6s cubic-bezier(0.4, 0, 0.2, 1)` on `background-color`, `color`, `border-color`, `fill`, `stroke`) produces smooth theme switching.

**Theme dimensions** — the `<html>` element carries two independent class-based overrides:

1. **Dark mode**: the `dark` class switches to a dark palette
2. **Season**: `season-spring`, `season-autumn`, or `season-winter` override accent/surface/blob colors to sakura-pink, maple-amber, or pale-cerulean respectively. The default (no season class) is summer (grass-green).

Combined states like `.dark.season-spring` are fully defined in `src/index.css`, giving 8 total theme combinations. Both dimensions are managed by `src/hooks/useTheme.js`, which persists state to `localStorage`:
- `theme-dark` — `'true'` / `'false'`
- `theme-season` — `'summer'` | `'spring'` | `'autumn'` | `'winter'`
- `theme-unlocked-seasons` — JSON array, always includes `'summer'`

(`src/hooks/useDarkMode.js` is a legacy hook, no longer used.)

**Default is light mode, summer season** for new visitors — `useTheme` only restores previously saved `localStorage` values.

Key variable groups:
- `--c-bg`, `--c-surface`, `--c-surface-2` — page/card/subtle backgrounds
- `--c-text`, `--c-text-2`, `--c-text-3` — primary/secondary/muted text
- `--c-accent`, `--c-accent-dark` — season's primary color
- `--c-border`, `--c-border-2` — borders
- `--c-nav-bg` — translucent nav background when scrolled
- `--c-badge-{game,ex,mu}-{bg,text,border}` — per-category badge colors
- `--c-tag-{bg,text,border}` — tag pill colors inside WorkModal
- `--c-award-{bg,text,border}` — award badge colors
- `--c-blob-{a,b,c}` — background breathing-blob colors (Background.jsx)
- `--c-hero-from`, `--c-hero-to` — Hero section gradient stops (light only; dark mode shows solid `--c-bg`)

Do **not** use hardcoded hex values or Tailwind `dark:` variants in components — use `var(--c-*)` instead so transitions work.

#### Gradient transition limitation

CSS cannot interpolate between two `linear-gradient` values. If a section needs a gradient background that transitions smoothly, use the `hero-bg` pattern defined in `src/index.css`: set `background-color: var(--c-bg)` on the element and apply the gradient via a `::before` pseudo-element whose `opacity` transitions to 0 in `.dark`. The `Hero` component uses this pattern.

### Interaction primitives

- `JuicyButton` — Framer Motion wrapper for any interactive element (`as="a"`, `as="button"`, etc.) with `whileHover` scale-up and `whileTap` spring press-down. Spring config: `stiffness: 400, damping: 17`.
- `JuicyCard` — Same spring feedback for card containers, with additional `y: -4` hover lift and `boxShadow` animation.

Do **not** add `transition-transform` Tailwind classes to elements wrapped by these components — the CSS transition engine will fight Framer Motion.

### Works data

All portfolio content lives in `src/data/works.js` as the exported `WORKS` array. Key helpers also exported from this file: `encodePath(p)` (percent-encodes each path segment for Chinese filenames), `embedUrl(v)` (returns iframe src for YouTube, Google Drive, or PeoPo videos), `CATEGORY_LABEL`.

**Work entry schema:**
```js
{
  id: 'kebab-id',
  title: '作品標題',
  category: 'game' | 'exhibition' | 'music',
  date: '2025.01',
  tags: ['tag1', 'tag2'],
  award: '獎項名稱',                        // optional, shown as a badge
  thumbnail: 'path/to/thumb.jpg',          // null if none
  thumbnailOverlay: 'path/to/img.png',     // optional, overlaid on thumbnail area
  primaryVideo: { type: 'yt' | 'drive' | 'peopo', id: '...', label: '...' }, // null if none
  extraVideos: [ /* same shape */ ],
  links: [{ label: '...', url: '...' }],   // optional, external links shown in modal
  sections: [ /* see below */ ],
}
```

**Section schema** — all fields optional, render order is heading → text → html → images:
```js
{ heading: '段落標題', text: '段落文字', html: '<ul>…</ul>', images: ['path1', 'path2'] }
```

The `html` field is injected via `dangerouslySetInnerHTML` wrapped in a `div.modal-html-content`. CSS classes available inside it: `.modal-list` (styled `<ul>`), `.chart-table`, `.diff-easy/normal/hard` — all defined in `src/index.css` with CSS variables so they respect dark mode.

The `MERIDIAN_CHART_DATA` and its HTML builder are also in `works.js`, storing the rendered HTML directly in a section's `html` field.

**To add a new work:** add an entry to the `WORKS` array. Image paths with Chinese characters are handled automatically by `encodePath`.

**Featured section:** `src/components/FeaturedWorks.jsx` has a `FEATURED_IDS` array at the top — only works whose `id` appears here are shown in the "精選" section. Order in the array determines display order.

**WorksSection filter tabs:** `src/components/WorksSection.jsx` has hardcoded `TABS` with keys `all`, `game`, `exhibition`, `music`. These keys must match `work.category` values exactly. Sort options (`預設` / `最新` / `最舊`) sort by the `date` field (`'YYYY.MM'` format, compared as integers after removing the dot).

**Anchor targets:** `Hero` has `id="top"` and `WorksSection` has `id="works"`. The nav link to `#about` has no matching element yet — that section is not yet implemented.

**Project description files:** every project has a human-editable `作品集素材/<project-folder>/專案資訊.md` that mirrors its `works.js` entry. Edit the `.md` to draft changes, then apply them back to `works.js`. There are currently 15 projects.

### WorkModal internals

`WorkModal` renders two sub-components defined in the same file:

- **`VideoPlayer`** — combines `primaryVideo` and all `extraVideos` into a single navigable list. Renders a 16:9 iframe and prev/next arrow buttons when more than one video exists.
- **`Lightbox`** — clicking any `<img>` inside a `Section` opens a fullscreen overlay (z-200) with a spring-animated zoom. `Escape` closes it first before closing the modal.

### Z-index stacking

| Layer | z-index | What |
|-------|---------|------|
| Background blobs/leaves | implicit 0 | `Background.jsx` |
| Main page content | `z-10` | `<main>` in App.jsx |
| Sticky nav header | `z-50` | `Nav.jsx` |
| WorkModal backdrop | `z-[100]` | blur overlay |
| WorkModal panel | `z-[101]` | dialog sheet |
| Lightbox | `z-[200]` | full-screen image zoom |

Add new overlay elements above `z-[200]` if they must sit over the lightbox.

### Season collectible system

Spring, autumn, and winter seasons are **locked** by default and must be discovered by the user. Summer is always unlocked. `useTheme.setSeason` is guarded — it silently ignores requests to switch to a locked season. The Nav season switcher only renders buttons for `unlockedSeasons`.

Each season has a `SeasonCollectible` button placed at a fixed position in the page:
- **Spring** — top-right of the Hero section (`top-5 right-5`)
- **Autumn** — left edge of WorksSection (absolutely positioned, overflows the section's left side)
- **Winter** — right side of the footer

The button is dim (`opacity: 0.35`) until hovered. Clicking it fires `App.handleCollect`, which:
1. Starts a full-screen ripple (`ring-expand-full` keyframe, 2 rings with 300ms stagger, rendered in `App.jsx`)
2. After 2150ms calls `unlockSeason(id, true)` — adds the season to `unlockedSeasons` and switches to it
3. Shows a toast notification for ~3.2s

Clicking the avatar in Hero fires `handleAvatarClick`, which triggers the same ripple effect then resets the season to summer.

**CSS animations** for this system are defined in `src/index.css` (not Tailwind keyframes) because they use inline `animation:` strings with CSS custom properties like `--tx`/`--ty`:
- `hover-ripple` — pulsing outline ring on hover
- `particle-fly` — radial color burst on click (8 particles, uses `--tx`/`--ty`)
- `collectible-fade-out`, `collectible-pulse`, `collectible-pulse-intense` — idle/hover/post-click button states
- `ring-expand-full` — full-screen ripple expansion
- `toast-enter` — toast slide-in

**Dev panel** — visible only in `import.meta.env.DEV` mode, bottom-left of the page. Two buttons: reset unlocked seasons (clears `theme-unlocked-seasons` from localStorage) and unlock all seasons at once.

### Background animation

`src/components/Background.jsx` renders three breathing radial-gradient blobs and five floating SVG leaves. All animation is **pure CSS** (`animate-breathe`, `animate-leaf-1` … `animate-leaf-5` defined in `tailwind.config.js` keyframes) — Framer Motion is not used here, keeping performance overhead low. Blob colors use `var(--c-blob-*)` and transition automatically with dark mode.

### Static assets

`作品集素材/` lives at the project root and is served directly by the Vite dev server. It is **not** inside `public/`, so it is **not** copied into `dist/` by `vite build`. For deployment, manually place the `作品集素材/` folder alongside `dist/` (or at the same level as `index.html`). The `base: './'` in `vite.config.js` ensures all asset paths are relative, so the site can be opened as a local file (`file://`) without a web server.

There is currently **no deployment pipeline** configured for this project.

### Legacy files

`_index.legacy.html`, `script.js`, and `style.css` in the project root are the original static site preserved as reference. They are **not** used by the Vite build. `src/hooks/useDarkMode.js` is a legacy hook superseded by `useTheme.js`.
