# Swiss AI Futures Recruitment Page

Static recruitment page for the Atgora-based citizen input study.

## Structure

- `index.html` - short minimalist workshop invitation shown at the public root
- `details.html` - full recruitment page with practical details, FAQ, sharing text, and team information
- `workshop-flyer.html` - direct alias of the short invitation page
- `assets/css/styles.css` - visual design and responsive layout
- `assets/js/translations.js` - EN, DE, FR, and IT page copy
- `assets/js/script.js` - language switching, app preview, and visual interactions
- `assets/images/logos/` - project, funder, favicon, and institutional logo assets
- `assets/images/qr/` - App Store and Google Play QR codes
- `assets/images/app-screenshots/` - Atgora interface screenshots used in the app preview
- `assets/images/instructions/` - step-by-step screenshots for finding the Swiss AI Futures course in Atgora
- `assets/images/photos/` - team photography
- `docs/participant_landing_page_brief.md` - source brief and content notes

## Local Check

Open `index.html` directly in a browser, or run a local static server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages Custom Domain

This repository is configured for `swissaifutures.org` through the root `CNAME` file.

In GitHub, enable Pages from the repository settings:

- Source: deploy from a branch
- Branch: `main`
- Folder: `/ (root)`
- Custom domain: `swissaifutures.org`
- HTTPS: enforce HTTPS after DNS checks pass

In Namecheap Advanced DNS, point the apex domain to GitHub Pages:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `joshuay1.github.io` |

Use `Automatic` or the lowest available TTL. DNS propagation can take a few minutes and may take up to 24 hours.
