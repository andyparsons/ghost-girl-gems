# 👻 Ghost Girl Gems

A static single-page site for **Ghost Girl Gems** — a boutique tooth gem business ("Pimp Your Teeth"). Gothic / vintage-tattoo aesthetic, no build step, deploys to Cloudflare Pages.

## Structure

```
index.html      — the page (header, hero, schedule/services, contact, footer)
styles.css      — all styling (CSS variables, responsive, font-swap point)
script.js       — mobile nav + placeholder form handler
assets/         — logo-horizontal.webp, logo-stacked.webp, hero.webp
assets/fonts/   — drop the real blackletter font here (see below)
_headers        — Cloudflare Pages caching/security headers
```

The copy and pricing are **placeholder** — swap in real services, rates, and a live booking link.

## Design system

- **Palette:** cream `#FDF8ED`, ink `#1C1C1C`, maroon `#A12B2F`, dark blocks `#1C1612`
- **Fonts:** ornate blackletter display (currently *UnifrakturMaguntia* as a stand-in), `Roboto Mono` for nav/labels/buttons, `Roboto` for body
- **Hero:** full-bleed photo with an angled bottom edge + giant blackletter headline

## Swapping in the real headline font

The display font is wired through a single swap point so the real blackletter
drops in without touching markup:

1. Add the font file to `assets/fonts/` as `ghost-display.woff2`
   (or update the path/format in the `@font-face` block at the top of `styles.css`).
2. That's it — `--display` already prefers `"Ghost Display"` and falls back to
   UnifrakturMaguntia until the file is present.

## Run locally

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to Cloudflare Pages

1. Push to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Deploy. Every push to `main` publishes automatically.

> **After editing `styles.css` or `script.js`:** bump the `?v=N` in their
> `index.html` references (e.g. `styles.css?v=3`). The files are cached for an
> hour, so without a version bump browsers keep serving the old copy. HTML is
> set to `no-cache`, so the new reference is picked up on the next visit.

## To do / hook up

- Real booking link (replace the placeholder form + "Book" buttons)
- Connect the contact form to an email/booking service
- Swap in the real blackletter font (above)
