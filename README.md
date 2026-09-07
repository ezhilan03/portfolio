# EZ portfolio redesign

A React redesign of ezhilan03/portfolio, preserving the existing biography, skills, project titles, descriptions, technical details, repository links, social destinations, and résumé PDF.

## Preview

The included production build works without installing dependencies. Run `node preview.cjs`, then open http://localhost:3000/portfolio/ . If port 3000 is already in use, stop that server first.

## Develop

Run `npm ci`, then `npm start`. Build with `npm run build`. Run interaction tests with `CI=true npm test -- --watchAll=false --runInBand`.

## Features

- Responsive editorial design in warm neutral and green tones
- Persistent light and dark themes
- Interactive SVG data sculpture, with reduced-motion support
- Eight original projects, category filters, keyword search, and grid/list views
- Search and filters encoded in the URL for direct linking
- Expandable original technical details
- Command/Ctrl+K page and project search, native modal focus management
- Accessible mobile navigation, named controls, visible focus, skip link
- Original résumé in the browser PDF viewer, plus direct open/download actions
- Corrected logo routing, custom missing-page view, descriptive metadata and favicon

## Validation

Production build passed. Three integration tests cover project search, category filtering, empty state recovery, URL state, view selection, navigation, theme persistence, command search, and the résumé download. Browser checks covered desktop and 390px phone layouts, project detail expansion, search, dark theme, and native PDF rendering. All 41 original project text/link/stack/detail values and the résumé bytes were checked against the original repository. The main JavaScript bundle is approximately 61.5 KB gzipped, compared with 258.7 KB in the original checked-in build (76% smaller).

The bundled PDF viewer is browser-provided. Where inline PDFs are unsupported, use Open PDF or Download CV. Google Fonts requires an internet connection; system fallbacks are provided. No new backend is required.

These changes have not been deployed to the live GitHub Pages site.
