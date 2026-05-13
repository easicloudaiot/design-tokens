// Asserts that tokens/icons.json (read by mobile via raw fetch) and
// the ICON_MAP in src/react.tsx (read by web via TS import) declare
// the same set of icon names. Drift = one platform missing the icon.
//
// Run locally: npm run check:sync
// Runs in CI on every PR and push to main (.github/workflows/ci.yml).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ICON_MAP } from "../src/react.tsx";

const here = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(here, "..", "tokens", "icons.json");

const jsonIcons = (JSON.parse(readFileSync(jsonPath, "utf8")) as {
  icons: Record<string, string>;
}).icons;

const jsonKeys = Object.keys(jsonIcons).sort();
const mapKeys = Object.keys(ICON_MAP).sort();

const onlyInJson = jsonKeys.filter((k) => !mapKeys.includes(k));
const onlyInMap = mapKeys.filter((k) => !jsonKeys.includes(k));

if (onlyInJson.length === 0 && onlyInMap.length === 0) {
  console.log(`ok: ${jsonKeys.length} icon names match between tokens/icons.json and src/react.tsx`);
  process.exit(0);
}

console.error("FAIL: tokens/icons.json and src/react.tsx ICON_MAP are out of sync.");
console.error("Both must list the same icon names. See README \"Adding an icon\".\n");

if (onlyInJson.length) {
  console.error(`In tokens/icons.json but NOT in ICON_MAP (web won't render these):`);
  for (const k of onlyInJson) console.error(`  - ${k}`);
  console.error("");
}
if (onlyInMap.length) {
  console.error(`In ICON_MAP but NOT in tokens/icons.json (mobile won't see these):`);
  for (const k of onlyInMap) console.error(`  - ${k}`);
  console.error("");
}

process.exit(1);
