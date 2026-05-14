// @easicloudaiot/design-tokens/flutter
//
// Flutter renderer for the semantic icon registry. Mirror of
// src/react.tsx — same keys, same lucide identifiers, same color tokens,
// different package. This file is consumed by EASIAIoT-Mobile via raw
// fetch (strategy B, see ../README.md). It is *not* compiled by this
// package's npm build.
//
// ────────────────────────────────────────────────────────────────────
// RULE: keys of kIconMap MUST equal keys of tokens/icons.json AND keys
// of ICON_MAP in src/react.tsx. For each entry, the IconData used here
// MUST correspond to the same lucide icon named in icons.json's
// `lucide` field. Color tokens (when present) MUST match. Enforced by
// `npm run check:sync` (CI).
// ────────────────────────────────────────────────────────────────────
//
// Consumption (mobile):
//   import 'package:easiaiot_design_tokens/flutter.dart';
//
//   // Plain — inherits ambient IconTheme color:
//   AppIcon(name: 'asset')
//
//   // With token-driven color resolution wired to the mobile app's
//   // colors map (built from tokens/colors.json on the consumer side):
//   AppIcon(name: 'building', resolveColorToken: myColorResolver)

import 'package:flutter/widgets.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

/// Per-icon spec: the IconData to render, plus an optional dotted
/// color-token path (resolved against `tokens/colors.json` by the
/// consumer or by [AppIcon] when a resolver is supplied).
class IconSpec {
  const IconSpec(this.iconData, [this.colorToken]);

  final IconData iconData;
  final String? colorToken;
}

/// Canonical semantic name → [IconSpec] map. Source of truth for
/// `kKnownIconNames`. Keep entries grouped by section comment to make
/// additions easy to review.
const Map<String, IconSpec> kIconMap = <String, IconSpec>{
  // Domain entities
  'asset': IconSpec(LucideIcons.package),
  'addAsset': IconSpec(LucideIcons.packagePlus),
  'device': IconSpec(LucideIcons.smartphone),
  'user': IconSpec(LucideIcons.user),
  'users': IconSpec(LucideIcons.users),
  'userCheck': IconSpec(LucideIcons.userCheck),
  'profile': IconSpec(LucideIcons.circleUser),
  'notification': IconSpec(LucideIcons.bell),
  // Hierarchy
  'company': IconSpec(LucideIcons.building2, 'hierarchy.company'),
  'building': IconSpec(LucideIcons.factory, 'hierarchy.building'),
  'floor': IconSpec(LucideIcons.layers, 'hierarchy.floor'),
  'zone': IconSpec(LucideIcons.mapPin, 'hierarchy.zone'),
  'easicloud': IconSpec(LucideIcons.cloud, 'hierarchy.easicloud'),
  // Pages / sections
  'dashboard': IconSpec(LucideIcons.layoutDashboard),
  'settings': IconSpec(LucideIcons.settings),
  // Location / map
  'gps': IconSpec(LucideIcons.navigation),
  'floorPlan': IconSpec(LucideIcons.layers),
  'accuracy': IconSpec(LucideIcons.target),
  'target': IconSpec(LucideIcons.target),
  'crosshair': IconSpec(LucideIcons.crosshair),
  'location': IconSpec(LucideIcons.mapPin),
  'mapPinned': IconSpec(LucideIcons.mapPinned),
  'map': IconSpec(LucideIcons.map),
  'globe': IconSpec(LucideIcons.globe),
  'home': IconSpec(LucideIcons.house),
  'store': IconSpec(LucideIcons.store),
  // Search / filter
  'search': IconSpec(LucideIcons.search),
  'filter': IconSpec(LucideIcons.funnel),
  'sliders': IconSpec(LucideIcons.slidersHorizontal),
  'sort': IconSpec(LucideIcons.arrowUpDown),
  // CRUD affordances
  'edit': IconSpec(LucideIcons.pencil),
  'delete': IconSpec(LucideIcons.trash2),
  'add': IconSpec(LucideIcons.plus),
  'close': IconSpec(LucideIcons.x),
  'cancel': IconSpec(LucideIcons.circleX),
  'check': IconSpec(LucideIcons.check),
  // Status / feedback
  'warning': IconSpec(LucideIcons.triangleAlert, 'status.warning'),
  'error': IconSpec(LucideIcons.circleAlert, 'status.error'),
  'info': IconSpec(LucideIcons.info, 'status.info'),
  'success': IconSpec(LucideIcons.circleCheck, 'status.success'),
  'bug': IconSpec(LucideIcons.bug),
  // Chevrons / arrows
  'chevronDown': IconSpec(LucideIcons.chevronDown),
  'chevronUp': IconSpec(LucideIcons.chevronUp),
  'chevronLeft': IconSpec(LucideIcons.chevronLeft),
  'chevronRight': IconSpec(LucideIcons.chevronRight),
  'chevronsLeft': IconSpec(LucideIcons.chevronsLeft),
  'chevronsRight': IconSpec(LucideIcons.chevronsRight),
  'expandVertical': IconSpec(LucideIcons.chevronsUpDown),
  'collapseVertical': IconSpec(LucideIcons.chevronsDownUp),
  'arrowLeft': IconSpec(LucideIcons.arrowLeft),
  'externalLink': IconSpec(LucideIcons.arrowUpRight),
  // Menu / overflow
  'menu': IconSpec(LucideIcons.menu),
  'more': IconSpec(LucideIcons.ellipsis),
  'moreVertical': IconSpec(LucideIcons.ellipsisVertical),
  // Session / I/O
  'logout': IconSpec(LucideIcons.logOut),
  'login': IconSpec(LucideIcons.logIn),
  'inbox': IconSpec(LucideIcons.inbox),
  'calendar': IconSpec(LucideIcons.calendar),
  'clock': IconSpec(LucideIcons.clock),
  'download': IconSpec(LucideIcons.download),
  'upload': IconSpec(LucideIcons.upload),
  'refresh': IconSpec(LucideIcons.refreshCw),
  'undo': IconSpec(LucideIcons.rotateCcw),
  'repeat': IconSpec(LucideIcons.repeat),
  'save': IconSpec(LucideIcons.save),
  'send': IconSpec(LucideIcons.send),
  'eye': IconSpec(LucideIcons.eye),
  'eyeOff': IconSpec(LucideIcons.eyeOff),
  // Metrics
  'activity': IconSpec(LucideIcons.activity),
  'signal': IconSpec(LucideIcons.signal),
  'history': IconSpec(LucideIcons.history),
  'trendingUp': IconSpec(LucideIcons.trendingUp),
  'trendingDown': IconSpec(LucideIcons.trendingDown),
  // Layout
  'tree': IconSpec(LucideIcons.listTree),
  'columns': IconSpec(LucideIcons.columns2),
  'columnsSplit': IconSpec(LucideIcons.columns2),
  'grid': IconSpec(LucideIcons.grid3x3),
  'table': IconSpec(LucideIcons.table),
  'grip': IconSpec(LucideIcons.gripVertical),
  // Decorative / classification
  'tag': IconSpec(LucideIcons.tag),
  'star': IconSpec(LucideIcons.star),
  'sparkles': IconSpec(LucideIcons.sparkles),
  'rocket': IconSpec(LucideIcons.rocket),
  'palette': IconSpec(LucideIcons.palette),
  'image': IconSpec(LucideIcons.image),
  'document': IconSpec(LucideIcons.fileText),
  'folderOpen': IconSpec(LucideIcons.folderOpen),
  'link': IconSpec(LucideIcons.link),
  // Comms
  'mail': IconSpec(LucideIcons.mail),
  'phone': IconSpec(LucideIcons.phone),
  // Security
  'key': IconSpec(LucideIcons.keyRound),
  'lock': IconSpec(LucideIcons.lock),
  'shield': IconSpec(LucideIcons.shield),
  'shieldCheck': IconSpec(LucideIcons.shieldCheck),
  'shieldX': IconSpec(LucideIcons.shieldX),
  // Shapes
  'circle': IconSpec(LucideIcons.circle),
  'square': IconSpec(LucideIcons.square),
  // Devices / IoT
  'wrench': IconSpec(LucideIcons.wrench),
  'ruler': IconSpec(LucideIcons.ruler),
  'cpu': IconSpec(LucideIcons.cpu),
  'network': IconSpec(LucideIcons.network),
  'radio': IconSpec(LucideIcons.radio),
  'radioTower': IconSpec(LucideIcons.radioTower),
  'wifi': IconSpec(LucideIcons.wifi),
  'wifiOff': IconSpec(LucideIcons.wifiOff),
  'truck': IconSpec(LucideIcons.truck),
  // Window controls
  'maximize': IconSpec(LucideIcons.maximize2),
  'minimize': IconSpec(LucideIcons.minimize2),
  'zoomIn': IconSpec(LucideIcons.zoomIn),
  'zoomOut': IconSpec(LucideIcons.zoomOut),
  'loader': IconSpec(LucideIcons.loaderCircle),
  'test': IconSpec(LucideIcons.flaskConical),
  'beaker': IconSpec(LucideIcons.beaker),
};

/// Fallback rendered when an unknown name slips through at runtime.
const IconSpec _kFallbackSpec = IconSpec(LucideIcons.circleHelp);

/// Function shape for resolving a dotted color-token path
/// (e.g. `"hierarchy.building"`) into a Flutter [Color]. Mobile builds
/// one of these from its parsed copy of `tokens/colors.json`.
typedef ColorTokenResolver = Color? Function(String token);

/// Convenience wrapper over [Icon] that resolves a semantic name and
/// applies sensible defaults. Pass [resolveColorToken] to opt into
/// token-driven color (icons like `building` / `warning` carry a
/// color token in `tokens/icons.json`).
class AppIcon extends StatelessWidget {
  const AppIcon({
    super.key,
    required this.name,
    this.size = 16,
    this.color,
    this.semanticLabel,
    this.resolveColorToken,
  });

  /// Semantic name from the design-tokens registry.
  final String name;

  /// Pixel size for both width and height. Defaults to 16.
  final double size;

  /// Explicit color override. Wins over the token-derived color when set.
  final Color? color;

  /// If provided, the icon is exposed to assistive tech with this label.
  /// If null, the icon is treated as decorative.
  final String? semanticLabel;

  /// Optional resolver for dotted color-token paths. Wire this up to
  /// the mobile app's `tokens/colors.json`-derived color map to make
  /// hierarchy / status icons paint themselves automatically.
  final ColorTokenResolver? resolveColorToken;

  @override
  Widget build(BuildContext context) {
    final spec = kIconMap[name] ?? _kFallbackSpec;
    final tokenColor = (spec.colorToken != null && resolveColorToken != null)
        ? resolveColorToken!(spec.colorToken!)
        : null;
    return Icon(
      spec.iconData,
      size: size,
      color: color ?? tokenColor,
      semanticLabel: semanticLabel,
    );
  }
}
