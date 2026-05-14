# @easicloudaiot/design-tokens

Single source of truth for semantic icon names and color tokens used by:

- **EASIAioT-FE** (web, React) — consumes the `/react` subpath which ships `<AppIcon />` + `ICON_MAP`
- **EASIAIoT-Mobile** (Flutter) — raw-fetches `tokens/*.json` and `src/flutter.dart` via `tool/sync_shared.dart`

## Repo layout

```
tokens/
├── icons.json      ← semantic icon registry (rich shape, see below)
└── colors.json     ← color tokens (brand, text, surface, status, hierarchy)

src/
├── index.ts        ← platform-neutral exports (types + JSON re-export)
├── react.tsx       ← <AppIcon /> + ICON_MAP (web renderer)
└── flutter.dart    ← AppIcon + kIconMap (mobile renderer)
```

## `tokens/icons.json` shape

Each entry is `{ lucide, color? }`:

```jsonc
{
  "icons": {
    "asset":    { "lucide": "package" },
    "building": { "lucide": "factory", "color": "hierarchy.building" },
    "warning":  { "lucide": "triangleAlert", "color": "status.warning" }
  }
}
```

- **`lucide`** — required. Canonical lucide-react identifier in camelCase
  (i.e. `displayName` lowercased on first char). Matches what the icon
  exports as in the lucide-react package; mobile uses the same string as
  `LucideIcons.<name>` in `lucide_icons_flutter`.
- **`color`** — optional. Dotted token path into `tokens/colors.json`
  (e.g. `"hierarchy.building"` → `colors.hierarchy.building`). When
  present, both renderers default the icon's stroke to that color.
  Consumer-supplied `color` props still win.

Today, `color` is used for **hierarchy** icons (`easicloud`, `company`,
`building`, `floor`, `zone`) and **status** icons (`warning`, `error`,
`info`, `success`).

## Three sources, one truth

`tokens/icons.json`, `ICON_MAP` in `src/react.tsx`, and `kIconMap` in
`src/flutter.dart` are all hand-authored. `npm run check:sync` enforces:

1. The **same set of keys** appears in all three files.
2. Each JSON `lucide` matches the lucide-react component imported in
   `ICON_MAP` (verified via `Component.displayName`).
3. Each Dart `LucideIcons.<name>` matches the JSON `lucide` for the same key.
4. Each JSON `color` resolves to a string leaf in `tokens/colors.json`.

CI gate: `.github/workflows/ci.yml`.

## Adding an icon

Walk-through for adding e.g. `wifiSignal`:

1. **`tokens/icons.json`** — add the entry:
   ```jsonc
   "wifiSignal": { "lucide": "wifiHigh" }
   ```

2. **`src/react.tsx`** — import the matching Lucide component and add it
   to `ICON_MAP`:
   ```tsx
   import { WifiHigh } from "lucide-react";

   export const ICON_MAP = {
     ...,
     wifiSignal: WifiHigh,
   } as const satisfies Record<string, LucideIcon>;
   ```

3. **`src/flutter.dart`** — add to `kIconMap`:
   ```dart
   'wifiSignal': IconSpec(LucideIcons.wifiHigh),
   ```

4. Open a PR. CI runs `typecheck` and `check:sync`; both must pass.

5. Merge to `main`. The `Notify consumers` workflow fires
   `repository_dispatch` at EASIAioT-FE and EASIAIoT-Mobile. Each
   consumer's `bump-shared-deps` workflow re-pulls and opens its own
   bump PR. FE picks up the new entry from `IconName`; mobile picks it
   up from `kIconMap` once `tool/sync_shared.dart` fetches
   `src/flutter.dart`.

## Local commands

```
npm run typecheck    # tsc --noEmit
npm run check:sync   # validates the four invariants above
npm run lint         # eslint
```

## Consumption

**Web** (FE):
```tsx
import { AppIcon } from "@easicloudaiot/design-tokens/react";
<AppIcon name="asset" />            // typo on `name` errors at compile time
<AppIcon name="building" />         // auto-colors with hierarchy.building
<AppIcon name="building" color="currentColor" />  // explicit override
```

**Mobile** (Flutter): see `EASIAIoT-Mobile/tool/sync_shared.dart`. Fetches
`tokens/icons.json`, `tokens/colors.json`, and `src/flutter.dart` from
`raw.githubusercontent.com` at the SHA pinned in `tool/shared_versions.json`.
Wire a `ColorTokenResolver` (built from `colors.json`) into `AppIcon` to
get token-driven colors:

```dart
AppIcon(name: 'building', resolveColorToken: myColorResolver)
```
