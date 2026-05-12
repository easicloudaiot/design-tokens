/**
 * @easicloudaiot/design-tokens
 *
 * Single source of truth for semantic icon names and color tokens.
 * Token JSON files are the canonical input; this module re-exports them
 * with TypeScript types derived from the JSON shape.
 *
 * Consumers map semantic names to platform-specific renderers:
 *  - React (web): packages/ui/src/components/AppIcon.tsx
 *  - Flutter (future): generate a Dart map from the same JSON.
 */

import iconsJson from "../tokens/icons.json" with { type: "json" };
import colorsJson from "../tokens/colors.json" with { type: "json" };

export const icons = iconsJson.icons;
export const colors = colorsJson.colors;

export type IconTokens = typeof icons;
export type IconName = keyof IconTokens;

export type ColorTokens = typeof colors;
export type ColorGroup = keyof ColorTokens;

export const iconNames = Object.keys(icons) as IconName[];
