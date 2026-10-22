# atlantic-s-ateos-landing

One-page site (French and English) for the sideload build of ATEOS Alarm. Same stack as `pure-scan-landing`: React 19, TypeScript, Vite, no CSS framework, no third-party requests, CSP meta tag added at build time.

The language follows the browser (`navigator.languages`, French if any entry starts with `fr`, English otherwise). The header button switches it and remembers the choice in `localStorage`. All copy lives in `src/i18n.tsx`.

## Development

```bash
npm install
npm run dev
npm run build
```

## Things to fill in

- **Screenshots:** drop PNG/JPG/WebP files into `src/screenshots/`. They appear in file-name order (`01-home.png`, `02-zones.png`, ...). The section is hidden while the folder is empty.
- **Download link:** `DOWNLOAD_URL` in `src/constants.ts`. It defaults to the GitHub Releases page; attach the APK to a release.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on pushes to `main`. It sets `VITE_BASE=/atlantic-s-ateos-landing/` for project Pages; change it to `/` for a custom domain. Pages must be enabled once under Settings → Pages → Source: GitHub Actions.
