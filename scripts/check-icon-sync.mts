// Asserts that the two hand-authored icon registries agree, and that
// rich-shape fields in tokens/icons.json (`lucide`, `color`) are valid:
//
//   1. Keys match across tokens/icons.json and src/react.tsx (ICON_MAP).
//   2. Each JSON `lucide` field equals the camelCase of the lucide-react
//      identifier mapped in ICON_MAP (verified via component displayName).
//   3. Each JSON `color` field (when present) resolves to a string leaf
//      in tokens/colors.json.
//
// Drift in any of these → one platform renders the wrong icon, the
// wrong color, or nothing.
//
// (The Flutter renderer, src/flutter.dart, was removed; the mobile repo
// consumes tokens/icons.json directly, so there is no Dart map to check.)
//
// Run locally: npm run check:sync
// Runs in CI on every PR and push to main (.github/workflows/ci.yml).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ICON_MAP } from "../src/react.tsx";

const here = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(here, "..", "tokens", "icons.json");
const colorsPath = join(here, "..", "tokens", "colors.json");

type IconSpec = { lucide: string; color?: string };

const jsonIcons = (
  JSON.parse(readFileSync(jsonPath, "utf8")) as {
    icons: Record<string, IconSpec>;
  }
).icons;
const colorsTree = (
  JSON.parse(readFileSync(colorsPath, "utf8")) as {
    colors: Record<string, unknown>;
  }
).colors;

function flattenColorPaths(
  node: unknown,
  prefix: string,
  out: Set<string>,
): void {
  if (typeof node === "string") {
    out.add(prefix);
    return;
  }
  if (typeof node === "object" && node !== null) {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      flattenColorPaths(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
}

const colorPaths = new Set<string>();
flattenColorPaths(colorsTree, "", colorPaths);

const jsonKeys = new Set(Object.keys(jsonIcons));
const mapKeys = new Set(Object.keys(ICON_MAP));

const universe = Array.from(new Set([...jsonKeys, ...mapKeys])).sort();

const failures: string[] = [];

// (1) keys agree
for (const k of universe) {
  const missingFrom: string[] = [];
  if (!jsonKeys.has(k)) missingFrom.push("tokens/icons.json");
  if (!mapKeys.has(k)) missingFrom.push("src/react.tsx ICON_MAP");
  if (missingFrom.length > 0) {
    failures.push(`key "${k}" missing from: ${missingFrom.join(", ")}`);
  }
}

// (2) JSON `lucide` matches camelCase of lucide-react component identifier.
// lucide-react sets `displayName` to the PascalCase identifier (e.g. "Package").
function lowerFirst(s: string): string {
  return s.length === 0 ? s : s[0].toLowerCase() + s.slice(1);
}

for (const [k, component] of Object.entries(ICON_MAP) as [
  string,
  { displayName?: string; name?: string },
][]) {
  const spec = jsonIcons[k];
  if (!spec) continue; // already reported in (1)
  const ident = component.displayName ?? component.name;
  if (!ident) {
    failures.push(`ICON_MAP["${k}"] has no displayName/name; cannot verify`);
    continue;
  }
  const expected = lowerFirst(ident);
  if (spec.lucide !== expected) {
    failures.push(
      `icons.json["${k}"].lucide = "${spec.lucide}", but react.tsx imports "${ident}" (expected "${expected}")`,
    );
  }
}

// (3) color tokens resolve
for (const [k, spec] of Object.entries(jsonIcons)) {
  if (spec.color === undefined) continue;
  if (!colorPaths.has(spec.color)) {
    failures.push(
      `icons.json["${k}"].color = "${spec.color}" does not resolve in tokens/colors.json`,
    );
  }
}

if (failures.length === 0) {
  console.log(
    `ok: ${universe.length} icon names match across icons.json and react.tsx; ` +
      `${Object.values(jsonIcons).filter((s) => s.color !== undefined).length} color tokens resolved`,
  );
  process.exit(0);
}

console.error(
  'FAIL: design-tokens icon registries are out of sync.\nSee README "Adding an icon".\n',
);
for (const f of failures) console.error(`  - ${f}`);
console.error("");
process.exit(1);
