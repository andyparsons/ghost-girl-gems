# 👻 Ghost Girl Gems

A simple static single-page site for **Ghost Girl Gems** — a boutique tooth gem business. Pastel goth glam aesthetic, no build step, deploys to Cloudflare Pages.

## Structure

```
index.html    — the page (header, hero, about, gems, gallery, book, footer)
styles.css    — all styling (CSS variables, animations, responsive)
script.js     — mobile nav + scroll reveals
_headers      — Cloudflare Pages caching/security headers
```

The content is **placeholder** — swap in real copy, pricing, photos, and social links as the business grows.

## Run locally

It's plain static files. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Deploy. Every push to `main` publishes automatically.

## Customize

- **Colors / fonts:** edit the `:root` variables at the top of `styles.css`.
- **Sections / copy:** edit `index.html`.
- **Photos:** replace the gradient `.tile` placeholders in the gallery with `<img>` tags.
