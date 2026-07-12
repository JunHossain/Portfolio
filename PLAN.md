# Portfolio: Static → Content-Driven (Astro)

## Context

The site is HTML5 UP's "Dimension" template: a single [index.html](index.html) where
every nav item reveals an overlay "panel," with all content hand-typed into the HTML and
jQuery driving the panel animations. Adding a project or editing the bio means editing raw
HTML — tedious and error-prone.

Goal: keep the exact look and feel, but make content **data-driven** so updates = editing a
data file, not the markup. This is *not* a backend project — GitHub Pages serves static files
only, and we don't need a server. We rebuild on **Astro** (static output, content collections),
keep publishing from **this repo** (stable URL + history), and edit content via **data files**.

The page collapses from 7 panels to **4**: Intro, Work/Projects, Contact, Friends.

## Decisions (confirmed with user)
- **Update flow:** edit JSON/Markdown data files in the repo, push → auto-deploy.
- **Stack:** Astro (uses Vite under the hood; ships near-zero JS; great for GitHub Pages).
- **Repo:** restructure *this* repo. Tag the current version first as a safety net.

## Target structure
```
.
├─ src/
│  ├─ content/
│  │  ├─ config.ts          # zod schemas for collections
│  │  ├─ projects/          # one .md per project (Work panel)
│  │  └─ friends/           # one .md per friend (Friends panel)
│  ├─ data/
│  │  ├─ intro.md           # bio + about-me text
│  │  └─ social.json        # contact icons: label, url, icon, color
│  ├─ layouts/Base.astro    # <head>, bg, header, footer, script includes
│  ├─ components/           # Header.astro, Panel.astro, WorkItem.astro, etc.
│  ├─ pages/index.astro     # assembles the 4 panels from content
│  └─ styles/               # ported Sass (see below)
├─ public/
│  ├─ images/               # existing images carried over verbatim
│  └─ assets/               # webfonts, favicon
├─ astro.config.mjs         # site + base set for GitHub Pages
└─ .github/workflows/deploy.yml
```

## Implementation steps

### 1. Safety net
- `git tag v1-static` (or branch `legacy-static`) on the current commit so the original site is
  always recoverable before restructuring.

### 2. Scaffold Astro in-place
- Initialize Astro in the repo, add config. Set `site`/`base` in `astro.config.mjs` to match the
  published GitHub Pages path (confirm exact repo/Pages URL during execution).

### 3. Port the look & feel (do NOT redesign)
- Move `assets/sass/**` into `src/styles/` and keep the existing SCSS (Astro supports Sass).
  The visual system to preserve: full-screen `#bg` with `images/bg.jpg` + `overlay.png` gradient
  and the blur-on-open effect ([_bg.scss](assets/sass/layout/_bg.scss)), palette in
  [_vars.scss](assets/sass/libs/_vars.scss), and the panel show/hide behavior.
- Carry `assets/js/main.js` panel logic ([main.js](assets/js/main.js)) as-is initially (jQuery +
  breakpoints/util/browser libs) so animations are identical. Optimization to vanilla JS is a
  later, optional pass — not required for parity.
- Copy all of `images/` and `assets/webfonts/` into `public/`. Keep the CDN links for Font
  Awesome / Devicon / Google Fonts from the current [index.html](index.html) `<head>`.

### 4. Extract content into data
- **Intro panel:** merge today's Intro + About text into `src/data/intro.md` (bio paragraphs;
  the About table — name/age/education/skills — becomes structured frontmatter rendered by a
  component). Keeps `pic01.jpg`/`pic03.jpg`.
- **Work panel:** fold current Work items *and* the UNO panel into `src/content/projects/`, one
  file each (QuizShow, Indoor Games leaflet, Club logo, UNO). Fields: `title, image, blurb,
  link, layout` (layout = left/right/center to reproduce the existing alternating grid via
  `.work-section` classes in [index.html:63-108](index.html#L63-L108)).
- **Contact panel:** replace the dead `<form action="#">` with **social icons only**
  (user's request) from `src/data/social.json` — Facebook, Discord, WhatsApp, GitHub already in
  [index.html:205-233](index.html#L205-L233); each `{label, url, icon, color}`.
- **Friends panel:** move the 5 friends into `src/content/friends/` (name, image, url) — same
  layout as [index.html:237-268](index.html#L237-L268). Content unchanged, just data-fied.
- **Drop:** the leftover "Elements" demo panel ([index.html:271-510](index.html#L271-L510)) and
  the separate About/UNO nav entries. New nav = Intro / Work / Contact / Friends.

### 5. Build the pages
- `Base.astro` = the `<head>`, `#bg`, `#header` (logo + nav generated from a panel list),
  `#footer`, and the script tags.
- `index.astro` loops the collections/data into `Panel` components so markup matches the
  original article structure (the `#id` anchors the nav/hash navigation depends on).
- Header `<h1>`/tagline and titles pulled from a small `site.json` (name, tagline, favicon).

### 6. Deploy via GitHub Actions
- Add `.github/workflows/deploy.yml` using Astro's official GitHub Pages action (build → upload
  `dist/` → deploy). Switch the repo's Pages **Source** to "GitHub Actions."
- Workflow becomes: edit a data file → `git push` → Action builds and publishes. (Different from
  today's "commit HTML = live," but standard and fully automated.)

## Files to modify / create
- **New:** `astro.config.mjs`, `package.json`, `.github/workflows/deploy.yml`,
  `src/pages/index.astro`, `src/layouts/Base.astro`, `src/components/*`,
  `src/content/config.ts`, `src/content/projects/*`, `src/content/friends/*`,
  `src/data/intro.md`, `src/data/social.json`, `src/data/site.json`.
- **Moved:** `assets/sass/**` → `src/styles/**`; `assets/js/*` → `src/scripts/` (or `public/`);
  `images/**` + `assets/webfonts/**` → `public/`.
- **Removed:** root `index.html` (replaced by Astro), Elements/About/UNO markup folded in.

## Reuse (don't rewrite)
- All SCSS partials in [assets/sass/](assets/sass/) — port, don't restyle.
- Panel animation logic in [main.js](assets/js/main.js) — reuse as-is for parity.
- Existing images in [images/](images/) — reuse verbatim.

## Verification (end-to-end)
1. `npm install` then `npm run dev` — visit `localhost:4321`; confirm all 4 panels open/close,
   the bg blur animates, and it matches the old site visually.
2. Resize to a phone width (or DevTools device mode) — confirm nav + panels are usable on mobile
   (the template's breakpoints in [main.js:18-25](index.html) should carry over).
3. Edit-a-file test: add a dummy file to `src/content/projects/`, confirm it appears in Work
   without touching any markup. Then remove it.
4. `npm run build` + `npm run preview` — confirm the static `dist/` renders identically.
5. After first Actions deploy, load the live GitHub Pages URL on both desktop and phone and
   re-check the 4 panels. Confirm friends' outbound links and your social links all work.
