/**
 * @easicloudaiot/design-tokens
 *
 * Single source of truth for semantic icon names and color tokens.
 * Token JSON files are the canonical input; this module re-exports them
 * with TypeScript types derived from the JSON shape.
 *
 * Each entry in `icons` is `{ lucide: string; color?: string }` —
 * `lucide` is the canonical lucide-react identifier (camelCase), and
 * `color` is an optional dotted token path into `colors` (e.g.
 * `"hierarchy.building"`). Web renders via `./react`; Flutter renders
 * via `./flutter.dart` (raw-fetched by the mobile repo).
 */

import iconsJson from "../tokens/icons.json" with { type: "json" };
import colorsJson from "../tokens/colors.json" with { type: "json" };

export const icons = iconsJson.icons;
export const colors = colorsJson.colors;

export type IconTokens = typeof icons;
export type IconName = keyof IconTokens;
export type IconSpec = { lucide: string; color?: string };

export type ColorTokens = typeof colors;
export type ColorGroup = keyof ColorTokens;

export const iconNames = Object.keys(icons) as IconName[];
