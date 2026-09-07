# EZ portfolio redesign

A React redesign of ezhilan03/portfolio, preserving the existing biography, skills, project titles, descriptions, technical details, repository links, social destinations, and résumé PDF.

## Preview

Live portfolio: https://ezhilan03.github.io/portfolio/ . Game mode: https://ezhilan03.github.io/portfolio/play/ . These public links work on mobile; a localhost preview is only available on the computer running it.

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
- Optional six-level RPG mode, a remembered invitation, and a permanent Play link
- Three illustrated career characters in chronological order, drawn from the original résumé
- Character sheet, bronze/silver/gold pipeline puzzle, and eight project quests with original text
- 27 skills with a three-slot loadout, saved progress, chapter completion, and adventure XP
- Three-round data-chaos boss encounter and a contact form that opens a reviewable email draft
- Guild section ready for approved recommendations; no fabricated testimonials
- Static documents for direct GitHub Pages route visits, including refreshes and mobile links

## Validation

Interaction tests cover the original portfolio plus invitation persistence, character selection, pipeline puzzle order, quest discovery, inventory limits, saved progress recovery, boss answers, and direct game links. All 41 original project text/link/stack/detail values and the résumé bytes were checked against the original repository. Game code is loaded on demand; the main JavaScript bundle is approximately 63.7 KB gzipped, compared with 258.7 KB in the original checked-in build.

The bundled PDF viewer is browser-provided. Where inline PDFs are unsupported, use Open PDF or Download CV. Google Fonts requires an internet connection; system fallbacks are provided. No new backend is required.

## Recommendations

Add only approved quotes to `testimonials` in `src/components/Game/gameData.js`. Each entry takes `name`, `role`, and `text`; the quote text is displayed verbatim. Until quotes are supplied, the guild shows a gathering message and existing social links.

## Publish

Run `npm run deploy` to build and publish to the repository’s `gh-pages` branch. The postbuild script generates documents for each public route so GitHub Pages can serve them directly.
