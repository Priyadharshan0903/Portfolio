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
- `src/app/projects/[slug]/` — statically generated product pages for every project in `site.ts`.
- `src/components/ProjectGallery.tsx` and `ProjectCommand.tsx` — screenshot switching and copyable setup commands.
- `public/projects/` — optimized project imagery; original sources are recorded in `SOURCES.md`.
- `src/components/Interactions.tsx` — client controller for every effect (reveals, counters, cursor,
  magnetic buttons, card tilt, timeline, skills graph drift, globe camera per section).
- `src/lib/globe.ts` — the WebGL globe (loaded lazily). Accent colours are `ACCENT_DARK` / `ACCENT_LIGHT`.
- `src/app/globals.css` — theme tokens (dark default, `[data-theme=light]`).
- `public/Priyadharshan_Senthil_Resume.pdf` — the downloadable resume.

## Updating projects

Edit the typed `projects` array in `src/content/site.ts`. Each project has a stable slug, short description,
purpose, platform, stack, feature highlights, primary action, and setup instructions. Add local images with
alt text, captions, and dimensions; projects with images appear in the visual showcase, while those without
images appear in the tools list. Keep captions clear when an image shows demo content or artwork.

Project routes and metadata are generated from this array at build time. Internal links use Next.js `Link`,
and public images use the shared `asset()` helper, so both work with the GitHub Pages base path.

## Agent access and discovery

Next.js generates these static files from `src/content/site.ts` on every build:

- `llms.txt` — a short portfolio guide with links to experience, projects, writing, and contact.
- `profile.json` — structured experience, skills, projects, contributions, education, and contact data.
- `sitemap.xml` — the homepage and every project page, using their canonical public URLs.

On the current deployment these live under `https://priyadharshan0903.github.io/Portfolio/`.
`site.url` is the published site URL, including its trailing slash and any project path. Update it if
you move hosting or add a custom domain, and keep it consistent with the deploy base path. Local builds
also use this production URL for canonical URLs, sharing metadata, and links inside the discovery files.

The HTML links to the agent guide and sitemap. The homepage also advertises the JSON profile, includes
ProfilePage/Person structured data, and project pages include software structured data and individual
canonical and social sharing metadata. All descriptions come from the visible portfolio content;
release-specific limitations remain in each project's setup details and repository.

An agent can fetch the JSON and filter it locally. For example, in a browser console:

```js
const profile = await fetch("https://priyadharshan0903.github.io/Portfolio/profile.json").then(r => r.json());
profile.projects
  .filter(project => project.technologies.includes("Go"))
  .map(({ name, description, repository }) => ({ name, description, repository }));
```

This is a static snapshot, not a server-side query API. `llms.txt` is an optional convention, and these
files do not guarantee indexing or traffic. After deployment, submit the full `sitemap.xml` URL in
Google Search Console for the site's verified property. A robots.txt under `/Portfolio/` would not
control crawling: robots.txt must live at the origin root, which is managed by the GitHub Pages user site.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
In the repo settings set **Pages → Source: GitHub Actions**. The workflow sets `NEXT_PUBLIC_BASE_PATH`
to `/<repo>` automatically (or empty for a `<user>.github.io` repo).
