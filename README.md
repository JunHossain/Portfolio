# Jun.Hoss — Portfolio

Personal portfolio of **Junaid Hossain**, built with [Astro](https://astro.build) on the
[Dimension](https://html5up.net/dimension) template by HTML5 UP. Deployed to GitHub Pages
automatically on every push to `main`.

Live: **https://junhossain.github.io/Portfolio/**

## ✏️ Updating content (no HTML needed)

All content lives in data files — edit, commit, push, done.

| What | Where | How |
|---|---|---|
| Add/edit a **project** | `src/content/projects/*.md` | One file per project. Copy an existing one; set `title`, `image`, `layout` (`image-right` / `image-left` / `center` / `full`), `order`. The text below `---` is the description (Markdown links work). |
| Add/remove a **friend** | `src/content/friends/*.md` | One file per friend: `name`, `image`, `url`, `order`. Delete the file to remove them. |
| **Bio / about tables** | `src/data/intro.md` | Paragraphs below `---` are the bio; the tables (personal info, education, skills) are the frontmatter above it. |
| **Social icons** | `src/data/social.json` | `label`, `url`, `icon` (Font Awesome brand class), `color`. |
| **Name / tagline / favicon** | `src/data/site.json` | |
| **Images** | `public/images/` | Drop the file in, then reference it as `images/yourfile.png`. |

## 🛠 Local development

```sh
npm install     # once
npm run dev     # live-reload dev server at http://localhost:4321/Portfolio
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## 🚀 Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages (repo **Settings → Pages → Source** must be set to
**GitHub Actions**).

## 🗂 Project layout

```
src/
  content/projects/   one .md per project (Work panel)
  content/friends/    one .md per friend (Friends panel)
  data/               intro.md, social.json, site.json
  components/         panel building blocks
  layouts/Base.astro  <head>, background, footer, template scripts
  pages/index.astro   assembles the 4 panels
  styles/             the template's Sass (+ _custom.scss additions)
public/               images, webfonts, template JS (copied verbatim)
```

The original fully-static site is preserved at the git tag `v1-static`.

Design: [HTML5 UP](https://html5up.net) (CCA 3.0). See `LICENSE.txt`.
