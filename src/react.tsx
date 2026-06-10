/**
 * @easicloudaiot/design-tokens/react
 *
 * React renderer for the semantic icon registry. Owns the canonical
 * name → Lucide component mapping so that the FE consumer doesn't have
 * to maintain a parallel ICON_MAP. The hand-authored `ICON_MAP` below
 * also acts as the source for `IconName`, so type narrowing works
 * reliably (unlike `keyof typeof iconsJson.icons`, which silently
 * widens to `string` in some TypeScript setups due to JSON-inference
 * quirks with import attributes + verbatimModuleSyntax).
 *
 * ────────────────────────────────────────────────────────────────────
 * RULE: keys of ICON_MAP MUST equal keys of tokens/icons.json.
 * Web reads ICON_MAP; mobile reads icons.json. Drift means one
 * platform missing the icon. Enforced by `npm run check:sync` (CI).
 * See README "Adding an icon" for the full flow.
 * ────────────────────────────────────────────────────────────────────
 *
 * Consumers:
 *   import { AppIcon } from "@easicloudaiot/design-tokens/react";
 *   <AppIcon name="asset" />   // "asdad" → compile error
 */
import {
  forwardRef,
  type ComponentType,
  type CSSProperties,
  type SVGProps,
} from "react";
import iconsJson from "../tokens/icons.json" with { type: "json" };
import colorsJson from "../tokens/colors.json" with { type: "json" };
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowUpDown,
  ArrowUpRight,
  Beaker,
  Bell,
  Bug,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronsDownUp,
  ChevronUp,
  Circle,
  Cloud,
  Clock,
  Columns,
  Columns2,
  Cpu,
  Crosshair,
  Download,
  Eye,
  EyeOff,
  Factory,
  FileText,
  Filter,
  FlaskConical,
  FolderOpen,
  Globe,
  Grid3x3,
  GripVertical,
  HelpCircle,
  History,
  Home,
  Image,
  Inbox,
  Info,
  KeyRound,
  Layers,
  LayoutDashboard,
  Link,
  ListTree,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Maximize2,
  Menu,
  Minimize2,
  MoreHorizontal,
  MoreVertical,
  Navigation,
  Network,
  Package,
  PackagePlus,
  Palette,
  Pencil,
  Phone,
  Plus,
  Radio,
  RadioTower,
  Receipt,
  RefreshCw,
  Repeat,
  Rocket,
  RotateCcw,
  Ruler,
  Save,
  Search,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  ShieldX,
  Signal,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Square,
  Star,
  Store,
  Table,
  Tag,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
  Upload,
  User,
  UserCheck,
  UserCircle,
  Users,
  Wifi,
  WifiOff,
  Wrench,
  X,
  XCircle,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";

/**
 * Canonical semantic name → Lucide component map. Source of truth for
 * `IconName`. Keep entries in alphabetical order within their group
 * comment to make additions easy to review.
 */
export const ICON_MAP = {
  // Domain entities
  asset: Package,
  addAsset: PackagePlus,
  device: Smartphone,
  user: User,
  users: Users,
  userCheck: UserCheck,
  profile: UserCircle,
  notification: Bell,
  // Hierarchy
  company: Building2,
  building: Factory,
  floor: Layers,
  zone: MapPin,
  easicloud: Cloud,
  // Pages / sections
  dashboard: LayoutDashboard,
  settings: Settings,
  // Location / map
  gps: Navigation,
  floorPlan: Layers,
  accuracy: Target,
  target: Target,
  crosshair: Crosshair,
  location: MapPin,
  mapPinned: MapPinned,
  map: Map,
  globe: Globe,
  home: Home,
  store: Store,
  // Search / filter
  search: Search,
  filter: Filter,
  sliders: SlidersHorizontal,
  sort: ArrowUpDown,
  // CRUD affordances
  edit: Pencil,
  delete: Trash2,
  add: Plus,
  close: X,
  cancel: XCircle,
  check: Check,
  // Status / feedback
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  success: CheckCircle2,
  bug: Bug,
  // Chevrons / arrows
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  expandVertical: ChevronsUpDown,
  collapseVertical: ChevronsDownUp,
  arrowLeft: ArrowLeft,
  externalLink: ArrowUpRight,
  // Menu / overflow
  menu: Menu,
  more: MoreHorizontal,
  moreVertical: MoreVertical,
  // Session / I/O
  logout: LogOut,
  login: LogIn,
  inbox: Inbox,
  calendar: Calendar,
  clock: Clock,
  download: Download,
  upload: Upload,
  refresh: RefreshCw,
  undo: RotateCcw,
  repeat: Repeat,
  save: Save,
  send: Send,
  eye: Eye,
  eyeOff: EyeOff,
  // Metrics
  activity: Activity,
  signal: Signal,
  history: History,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  // Layout
  tree: ListTree,
  columns: Columns,
  columnsSplit: Columns2,
  grid: Grid3x3,
  table: Table,
  grip: GripVertical,
  // Decorative / classification
  tag: Tag,
  star: Star,
  sparkles: Sparkles,
  rocket: Rocket,
  palette: Palette,
  image: Image,
  document: FileText,
  billing: Receipt,
  folderOpen: FolderOpen,
  link: Link,
  // Comms
  mail: Mail,
  phone: Phone,
  // Security
  key: KeyRound,
  lock: Lock,
  shield: Shield,
  shieldCheck: ShieldCheck,
  shieldX: ShieldX,
  // Shapes
  circle: Circle,
  square: Square,
  // Devices / IoT
  wrench: Wrench,
  ruler: Ruler,
  cpu: Cpu,
  network: Network,
  radio: Radio,
  radioTower: RadioTower,
  wifi: Wifi,
  wifiOff: WifiOff,
  truck: Truck,
  // Window controls
  maximize: Maximize2,
  minimize: Minimize2,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  loader: Loader2,
  test: FlaskConical,
  beaker: Beaker,
} as const satisfies Record<string, LucideIcon>;

/** Canonical icon name type. Narrow union, reliable type-narrowing. */
export type IconName = keyof typeof ICON_MAP;

/** Fallback rendered when an unknown name slips through at runtime. */
const FALLBACK_ICON: LucideIcon = HelpCircle;

/**
 * Resolve a dotted color-token path (e.g. `"hierarchy.building"`) against
 * `tokens/colors.json`. Returns undefined if the path doesn't resolve to
 * a string leaf. Kept inline (no separate util) so the renderer is
 * self-contained.
 */
function resolveColorToken(path: string): string | undefined {
  const parts = path.split(".");
  let cursor: unknown = colorsJson.colors;
  for (const p of parts) {
    if (typeof cursor !== "object" || cursor === null) return undefined;
    cursor = (cursor as Record<string, unknown>)[p];
  }
  return typeof cursor === "string" ? cursor : undefined;
}

const ICON_SPECS = iconsJson.icons as Record<
  string,
  { lucide: string; color?: string }
>;

export interface AppIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  /** Semantic name from the design-tokens registry. */
  name: IconName;
  /** Pixel size for both width and height. Defaults to 16. */
  size?: number;
  /** Optional className passthrough. */
  className?: string;
  /** Stroke width forwarded to Lucide. Defaults to 2. */
  strokeWidth?: number;
  /**
   * If true (default when no aria-label is provided), the icon is treated
   * as decorative and hidden from assistive tech. Set an explicit
   * `aria-label` to expose it to screen readers.
   */
  decorative?: boolean;
}

export const AppIcon = forwardRef<SVGSVGElement, AppIconProps>(function AppIcon(
  {
    name,
    size = 16,
    strokeWidth = 2,
    className,
    decorative,
    color,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const Icon = ICON_MAP[name] ?? FALLBACK_ICON;
  const isDecorative = decorative ?? !ariaLabel;
  const tokenColor = ICON_SPECS[name]?.color;
  const resolvedColor =
    color ?? (tokenColor ? resolveColorToken(tokenColor) : undefined);

  return (
    <Icon
      ref={ref}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
      color={resolvedColor}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : ariaLabel}
      role={isDecorative ? undefined : "img"}
      focusable={false}
      {...rest}
    />
  );
});

/**
 * Generic icon component shape — matches the structural surface that
 * Lucide components and AppIcon-derived components share.
 */
export type IconComponent = ComponentType<{
  className?: string;
  size?: number;
  style?: CSSProperties;
}>;

/**
 * Build a stable React component that renders a specific semantic icon.
 * Used by domain centralizers (HIERARCHY_LEVELS, ENTITY_ICONS, ...) so
 * their `.icon` field remains a React component without leaking a
 * direct lucide-react dependency.
 */
export function createIconComponent(name: IconName): IconComponent {
  const Component: IconComponent = ({ className, size, style }) => (
    <AppIcon name={name} className={className} size={size} style={style} />
  );
  Component.displayName = `Icon(${name})`;
  return Component;
}
