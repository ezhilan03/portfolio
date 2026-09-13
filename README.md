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
- After Hours: a real-time 2D run-and-gun campaign with three stages and three bosses
- Double jumps, directional shooting, dash invulnerability, enemy projectiles, spread-shot upgrades, health pickups, and checkpoints
- Optional explorer assist, synthesized sound effects, pause, fullscreen, and phone touch controls
- Three career holograms and eight collectible project signals reveal original information during play
- Persistent field notes preserve recovered information verbatim, with original repository links
- Static documents for direct GitHub Pages route visits and refreshes

## Game controls

Move with A/D or left/right arrows. Space or K double-jumps; J or X fires; W or up aims upward; Shift or L dashes. Hold fire for continuous shooting. P or Escape pauses; E opens field notes. On phones, hold the on-screen controls; landscape provides the widest view. Explorer assist adds health and slows enemy shots.

Defeat the stage boss and enter the extraction gate to advance. Falling costs health; death restarts from the latest checkpoint. Checkpoints and recovered records are saved locally. Sound begins only after the player starts or enables it. Losing window focus or hiding the page pauses the game.

## Validation

The test suite covers portfolio navigation and content, game controls, pause/journal transitions, physical movement, double-jump limits, projectile damage, dash immunity, checkpoint respawns, and corrupt save recovery. Deterministic full-stage playthrough tests clear every boss using movement and shooting inputs, without teleportation or invulnerability overrides. Production builds are checked at desktop and phone sizes.

The original biography, skills, eight projects and résumé remain intact. Game physics and rendering are separate; the fixed-step simulation runs independently of React, and game code loads only when entering `/play/`.

Recommendations are awaiting the user’s approved quotes. No fabricated quotes are included.

## Publish

Run `npm run deploy` to build and publish to the repository’s `gh-pages` branch. The postbuild script generates documents for each public route so GitHub Pages can serve them directly.


## Professional engineering case studies

[Explore completed Spire work](docs/professional-work/README.md): merchant onboarding, incremental Azure data pipelines, settlement automation and the self-service analytics chatbot. Each case study explains personal contribution, decisions and outcome scope.
