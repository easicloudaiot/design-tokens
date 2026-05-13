# @easicloudaiot/design-tokens

Single source of truth for semantic icon names and color tokens used by:

- **EASIAioT-FE** (web, React) — consumes the `/react` subpath which ships `<AppIcon />` + `ICON_MAP` directly
- **EASIAIoT-Mobile** (Flutter) — consumes the raw JSON files via `tool/sync_shared.dart` + a hand-authored Dart icon map

## Repo layout

```
tokens/
├── icons.json      ← semantic icon names (mobile reads this)
└── colors.json     ← color tokens

src/
├── index.ts        ← platform-neutral exports (types + JSON re-export)
└── react.tsx       ← <AppIcon /> + ICON_MAP (web reads this)
```

## Two sources, one truth — `tokens/icons.json` must equal `keyof ICON_MAP`

`tokens/icons.json` and `src/react.tsx`'s `ICON_MAP` are both hand-authored
and must declare the **same set of icon names**. The platforms read different
files; both have to agree for the icon to actually render everywhere.

- Add a name to `icons.json` but forget `ICON_MAP` → mobile sees the icon, web doesn't render it.
- Add to `ICON_MAP` but forget `icons.json` → web renders it, mobile's `kKnownIconNames` doesn't include it.

This is enforced by `npm run check:sync` (CI gate — `.github/workflows/ci.yml`).

## Adding an icon

Walk-through for adding e.g. `wifiSignal`:

1. **`tokens/icons.json`** — add the entry (alphabetical within a group is nice but not enforced):
   ```jsonc
   "wifiSignal": "wifiSignal"
   ```

2. **`src/react.tsx`** — import the Lucide component and add it to `ICON_MAP`:
   ```tsx
   import { WifiHigh } from "lucide-react";

   export const ICON_MAP = {
     ...,
     wifiSignal: WifiHigh,
   } as const satisfies Record<string, LucideIcon>;
   ```

3. Open a PR. CI runs `typecheck` and `check:sync`; both must pass.

4. Merge to `main`. The `Notify consumers` workflow fires `repository_dispatch`
   at EASIAioT-FE and EASIAIoT-Mobile. Each consumer's `bump-shared-deps`
   workflow re-pulls and opens its own bump PR:
   - **FE**: `pnpm up -r @easicloudaiot/design-tokens` updates the lockfile
     SHA; typecheck stays green because `IconName` (= `keyof typeof ICON_MAP`)
     already includes `"wifiSignal"`.
   - **Mobile**: `dart run tool/sync_shared.dart` regenerates
     `lib/shared/design_tokens/icon_names.g.dart`. The bump PR will fail
     `dart analyze` until someone adds `wifiSignal: LucideIcons.wifiHigh`
     to `lib/shared/design_tokens/icon_map.dart` — by design, so the team
     consciously picks the Flutter icon.

Net: 1 PR upstream, 1 small follow-up in mobile.

## Local commands

```
npm run typecheck    # tsc --noEmit
npm run check:sync   # asserts icons.json keys == ICON_MAP keys
npm run lint         # eslint
```

## Consumption

**Web** (FE):
```tsx
import { AppIcon } from "@easicloudaiot/design-tokens/react";
<AppIcon name="asset" />            // name is keyof typeof ICON_MAP — typo errors at compile time
```

**Mobile** (Flutter): see `EASIAIoT-Mobile/tool/sync_shared.dart`. Fetches
`tokens/icons.json` from `raw.githubusercontent.com` at the SHA pinned in
`tool/shared_versions.json`.
