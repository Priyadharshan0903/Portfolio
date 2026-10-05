# Portfolio

Personal site for Priyadharshan Senthil — Next.js (App Router) static export, CSS Modules, Three.js globe.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Where things live

- `src/content/site.ts` — all copy: experience, projects, posts, skills. Edit here to update the site.
  `{{Term}}` renders a tech chip, `**text**` renders emphasis.
- `src/components/sections/*` — one server component + CSS module per section.
- `src/components/Interactions.tsx` — client controller for every effect (reveals, counters, cursor,
  magnetic buttons, card tilt, timeline, skills graph drift, globe camera per section).
- `src/lib/globe.ts` — the WebGL globe (loaded lazily). Accent colours are `ACCENT_DARK` / `ACCENT_LIGHT`.
- `src/app/globals.css` — theme tokens (dark default, `[data-theme=light]`).
- `public/Priyadharshan_Senthil_Resume.pdf` — the downloadable resume.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
In the repo settings set **Pages → Source: GitHub Actions**. The workflow sets `NEXT_PUBLIC_BASE_PATH`
to `/<repo>` automatically (or empty for a `<user>.github.io` repo).
