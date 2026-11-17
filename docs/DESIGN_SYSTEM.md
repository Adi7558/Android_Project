# SecureChat — Design System Specification

## 1. Design Philosophy

SecureChat's visual identity communicates:
- **Privacy & Security**: Deep cyber-slate backgrounds, emerald verification badges, and military-grade monospace keys.
- **Trust & Professionalism**: Clean lines, subtle borders, high-contrast readable typography, and unhurried micro-interactions.
- **Simplicity**: Distraction-free messaging with prominent end-to-end encryption indicators.

---

## 2. Color System

All colors are centralized in `src/presentation/theme/colors.ts`. No raw hex codes are permitted in presentation components.

### Semantic Color Tokens

| Token | Light Mode | Dark Mode | Purpose |
| :--- | :--- | :--- | :--- |
| `primary` | `#1D4ED8` | `#3B82F6` | Primary brand accent & call to action |
| `primaryDark` | `#1E40AF` | `#1D4ED8` | Deep accent for headers / active tabs |
| `background` | `#F8FAFC` | `#0B0F17` | Root application background |
| `surface` | `#FFFFFF` | `#131A26` | Card, bottom sheet & modal surfaces |
| `surfaceSecondary` | `#F1F5F9` | `#1E293B` | Inputs, avatar backgrounds, list headers |
| `surfaceTertiary` | `#E2E8F0` | `#334155` | Dividers & subtle borders |
| `textPrimary` | `#0F172A` | `#F8FAFC` | High-contrast body text & titles |
| `textSecondary` | `#475569` | `#94A3B8` | Subtitles & timestamps |
| `textMuted` | `#94A3B8` | `#64748B` | Placeholders & inactive icons |
| `border` | `#E2E8F0` | `#1E293B` | Structural boundary lines |
| `success` | `#10B981` | `#34D399` | Identity verified indicator |
| `warning` | `#F59E0B` | `#FBBF24` | Safety number changed alert |
| `error` | `#EF4444` | `#F87171` | Validation error & revoke button |
| `info` | `#3B82F6` | `#60A5FA` | Informational security notices |
| `messageOutgoing` | `#1D4ED8` | `#2563EB` | Outgoing chat bubbles |
| `messageIncoming` | `#F1F5F9` | `#1E293B` | Incoming chat bubbles |
| `online` | `#10B981` | `#34D399` | Online presence dot indicator |
| `offline` | `#94A3B8` | `#64748B` | Offline status indicator |

---

## 3. Typography

Defined in `src/presentation/theme/typography.ts`:

| Style | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- |
| `displayLarge` | 32px | 700 (Bold) | 40px |
| `headingLarge` | 24px | 700 (Bold) | 32px |
| `headingMedium` | 20px | 600 (Semi-Bold) | 28px |
| `headingSmall` | 18px | 600 (Semi-Bold) | 24px |
| `bodyLarge` | 16px | 400 (Regular) | 24px |
| `bodyMedium` | 14px | 400 (Regular) | 20px |
| `bodySmall` | 12px | 400 (Regular) | 16px |
| `labelLarge` | 15px | 600 (Semi-Bold) | 20px |
| `labelMedium` | 13px | 600 (Semi-Bold) | 18px |
| `caption` | 11px | 400 (Regular) | 14px |
| `code` | 13px | 500 (Monospace) | 20px |

---

## 4. Spacing System

Defined in `src/presentation/theme/spacing.ts`:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 40px
- `xxxl`: 56px

---

## 5. Border Radius

Defined in `src/presentation/theme/borderRadius.ts`:
- `small`: 6px
- `medium`: 10px
- `large`: 16px
- `extraLarge`: 24px
- `pill`: 9999px

---

## 6. Elevation & Shadows

Defined in `src/presentation/theme/shadows.ts`:
- `none`: Flat
- `small`: Elevation 2 (Cards, headers)
- `medium`: Elevation 4 (Buttons, popups)
- `large`: Elevation 8 (Modals, bottom sheets, FABs)

---

## 7. Icon System

- Unified icon family: `lucide-react-native`
- Consistent stroke width: 2px
- Standard touch target sizes: 40px minimum
- Icons are wrapped in `IconButton` or accessible touchable controls with `accessibilityLabel` and `accessibilityRole`.
