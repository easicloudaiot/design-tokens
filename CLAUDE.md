# CLAUDE.md

Guidance for future Claude sessions working in this repo.

## What this repo is

`@easicloudaiot/design-tokens` — the **single source of truth** for semantic
icon names and color tokens shared across:

- `EASIAioT-FE` — web app (React, consumes as npm package)
- `EASIAIoT-Mobile` — Flutter app (consumes raw JSON, see "Mobile consumption")

`tokens/*.json` is canonical. `src/index.ts` re-exports JSON with TS types.
Build output goes to `dist/` via `style-dictionary`.

## Release flow — do not bypass

```
push to main
   └─ release job: semantic-release
        ├─ bumps version from Conventional Commits
        ├─ npm publish → npm.pkg.github.com
        ├─ commits CHANGELOG + package.json back to main with [skip ci]
        └─ creates GitHub Release + tag
   └─ dispatch job (only if a release was cut):
        ├─ mints EASIAIoT-Bot installation token
        └─ repository_dispatch `design-tokens-updated` → FE + Mobile
```

Files that wire this up:
- `.github/workflows/release.yml`
- `.releaserc.json`

**Never** hand-edit `version` in `package.json` or push tags manually —
semantic-release owns versioning. If a release didn't fire, the cause is
almost always non-conventional commit messages, not a workflow bug.

## Commit messages

Conventional Commits are **required** — they drive the version bump:

- `feat: …` → minor
- `fix: …` → patch
- `feat!: …` or `BREAKING CHANGE:` footer → major
- `chore:`, `docs:`, `refactor:`, `test:`, `ci:` → no release

A push to main with only non-release-triggering commits is a no-op for
consumers. That is expected, not a bug.

## Mobile consumption (strategy B)

Flutter cannot consume npm. `EASIAIoT-Mobile` checks out this repo at the
released tag, reads `tokens/*.json` directly, and generates Dart from it on
its own side. **Keep `tokens/*.json` stable and self-describing** — it's a
public contract for two consumers, not a web-only file.

If you add a new token category, both consumer repos need parallel codegen
updates. Coordinate or the mobile build will silently miss the new tokens.

## Required secrets (already configured)

- `BOT_APP_ID` — EASIAIoT-Bot App ID
- `BOT_PRIVATE_KEY` — bot's private key (full PEM)

The bot is installed on `design-tokens`, `EASIAioT-FE`, `EASIAIoT-Mobile`
with Contents + Pull requests + Packages permissions.

## Gotchas

- The release commit pushes back to `main`. Branch protection must allow
  the default `GITHUB_TOKEN` (or the bot) to bypass required reviews, or
  releases will stall.
- `[skip ci]` in the release commit message prevents an infinite loop —
  don't remove it from `.releaserc.json`.
- Repo names in `release.yml` are case-sensitive in some API paths:
  `EASIAioT-FE` and `EASIAIoT-Mobile` (note the differing capitalisation).
- `publishConfig.registry` in `package.json` must stay as
  `https://npm.pkg.github.com` — semantic-release/npm reads it.

## Local commands

- `npm run build` — style-dictionary build into `dist/`
- Releases are CI-only; there is no local release command.
