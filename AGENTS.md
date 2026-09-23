# Preserve approved published work
Before any portfolio edit, fetch all remote branches and inspect `origin/gh-pages:deployment-source.json`, origin/main, and existing worktrees. The currently published design is authoritative even when it originated on another task's branch. Read the corresponding task/history if source lineage is unclear; never infer that a branch is unpublished from its name.

The approved Ink and Copper design originates at facbb87. Content-only requests must preserve its layout, copper lamp, visible experience section, navigation and styling. Use stable project identifiers/titles rather than array positions. Preserve the latest resume and all five released project records.

Publishing uses the canonical-main GitHub Actions Pages workflow. `npm run deploy` dispatches that workflow; pushes to main also trigger it. GitHub Pages must remain in workflow mode, so legacy gh-pages pushes from old checkouts cannot change the website. The workflow requires origin/main HEAD plus ancestry of facbb87 and the currently live deployment-source.json commit. Never disable the guard, change Pages back to branch mode, or bypass a missing manifest. Verify desktop/mobile screenshots, tests, build, current project data, PDF checksum and the live deployment manifest.

Do not force-push or discard another task's work. Merge source histories and explain conflicts. Design changes require an explicit design request.
