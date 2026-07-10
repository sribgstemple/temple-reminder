import React from "react";
import type { DevoteeRecord, TemplateConfig, TempleSettings } from "../types";
import godImage from "../assets/god.png";

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE STYLE TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const CARD_SHADOW_LIGHT =
  "0 4px 20px rgba(120,80,10,0.12), 0 1px 4px rgba(120,80,10,0.08), inset 0 1px 0 rgba(255,255,255,0.85)";
const CARD_SHADOW_DARK =
  "0 4px 20px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.06)";
const CARD_BG_LIGHT = "linear-gradient(145deg, #FFFDF8 0%, #FCF5E8 60%, #F8EDD6 100%)";
const CARD_BG_DARK = "linear-gradient(145deg, rgba(24,40,64,0.96) 0%, rgba(14,26,46,0.97) 100%)";

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICON COMPONENTS — white on coloured badge circles
// ─────────────────────────────────────────────────────────────────────────────

const IconPray = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none">
    <path
      d="M14 4 C12 4 10 5.5 10 7.5 L10 14 L14 18 L18 14 L18 7.5 C18 5.5 16 4 14 4Z"
      stroke="white" strokeWidth="1.6" strokeLinejoin="round"
      fill="white" fillOpacity="0.18"
    />
    <path d="M10 14 L8 16 M18 14 L20 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 20 C10 20 12 22 14 22 C16 22 18 20 18 20" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <rect x="4" y="5" width="20" height="19" rx="3" />
    <path d="M4 11 L24 11" />
    <path d="M9 3 L9 7 M19 3 L19 7" />
    <circle cx="9"  cy="16" r="1.2" fill="white" />
    <circle cx="14" cy="16" r="1.2" fill="white" />
    <circle cx="19" cy="16" r="1.2" fill="white" />
    <circle cx="9"  cy="21" r="1.2" fill="white" />
    <circle cx="14" cy="21" r="1.2" fill="white" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="14" cy="14" r="10" />
    <path d="M14 8 L14 14 L18 17" />
  </svg>
);

const IconRupee = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
    <path d="M8 6 L20 6" />
    <path d="M8 11 L20 11" />
    <path d="M8 6 C8 17 16 21 20 23" />
    <path d="M11 14 L20 23" />
  </svg>
);

const IconDome = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 22 L23 22" />
    <path d="M7 22 L7 16 M21 22 L21 16" />
    <path d="M7 16 Q7 8 14 5 Q21 8 21 16 Z" fill="white" fillOpacity="0.18" />
    <path d="M14 5 L14 3 M12 3 L16 3 M10 14 L18 14" />
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 28 28" width="32" height="32">
    <path
      d="M14 23 Q5 16 5 10 A5 5 0 0 1 14 8 A5 5 0 0 1 23 10 Q23 16 14 23Z"
      fill="white" fillOpacity="0.9" stroke="white" strokeWidth="0.5"
    />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 28 28" width="32" height="32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="14" cy="14" r="10" />
    <path d="M4 14 L24 14" />
    <path d="M14 4 C10 9 10 19 14 24 C18 19 18 9 14 4Z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// ORNAMENTAL CORNER  — 120 px, 8-petal flower + scrolls + beads
// (top-left; mirrored via CSS transform for the other three)
// ─────────────────────────────────────────────────────────────────────────────

const Corner = ({ color }: { color: string }) => (
  <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
    {/* Outer bracket — 4 px to match border weight */}
    <path d="M8 114 L8 32 Q8 8 32 8 L114 8" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Inner bracket */}
    <path d="M20 114 L20 38 Q20 20 38 20 L114 20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45" />

    {/* 8-petal flower at corner intersection */}
    <circle cx="28" cy="28" r="16" stroke={color} strokeWidth="1.2" />
    <circle cx="28" cy="28" r="6"  fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 28 + 11 * Math.cos(rad);
      const cy = 28 + 11 * Math.sin(rad);
      return (
        <ellipse key={i} cx={cx} cy={cy} rx="3.8" ry="6"
          transform={`rotate(${deg} ${cx} ${cy})`}
          fill={color} fillOpacity="0.55" />
      );
    })}

    {/* Bead dots along each border arm */}
    <circle cx="8"  cy="60" r="2.8" fill={color} />
    <circle cx="8"  cy="82" r="2.8" fill={color} />
    <circle cx="60" cy="8"  r="2.8" fill={color} />
    <circle cx="82" cy="8"  r="2.8" fill={color} />

    {/* Scroll curls at the open ends of the bracket */}
    <path d="M8 106 Q1 106 1 99 Q1 92 8 92"  stroke={color} strokeWidth="1.8" />
    <path d="M106 8 Q106 1 99 1 Q92 1 92 8"  stroke={color} strokeWidth="1.8" />

    {/* Extra small diamond ornament mid-way along each arm */}
    <polygon points="8,45 12,49 8,53 4,49"  fill={color} opacity="0.6" />
    <polygon points="45,8 49,12 53,8 49,4"  fill={color} opacity="0.6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LOTUS — 7-layer petal structure
// ─────────────────────────────────────────────────────────────────────────────

const Lotus = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 80 72" width={size} height={(size * 72) / 80} fill="none">
    <path d="M40 62 Q30 46 40 18 Q50 46 40 62Z" fill={color} fillOpacity="0.75" stroke={color} strokeWidth="1" />
    <path d="M40 58 Q22 44 26 20 Q34 38 40 58Z" fill={color} fillOpacity="0.52" stroke={color} strokeWidth="0.8" />
    <path d="M40 58 Q58 44 54 20 Q46 38 40 58Z" fill={color} fillOpacity="0.52" stroke={color} strokeWidth="0.8" />
    <path d="M40 52 Q14 40 18 14 Q28 36 40 52Z" fill={color} fillOpacity="0.32" stroke={color} strokeWidth="0.7" />
    <path d="M40 52 Q66 40 62 14 Q52 36 40 52Z" fill={color} fillOpacity="0.32" stroke={color} strokeWidth="0.7" />
    <path d="M40 46 Q10 36 14 12 Q24 34 40 46Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.6" />
    <path d="M40 46 Q70 36 66 12 Q56 34 40 46Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.6" />
    <path d="M40 63 Q26 70 18 66 Q28 60 40 63Z" fill={color} fillOpacity="0.42" />
    <path d="M40 63 Q54 70 62 66 Q52 60 40 63Z" fill={color} fillOpacity="0.42" />
    <path d="M40 64 L40 72" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="40" cy="40" r="3.5" fill={color} fillOpacity="0.85" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MANDALA WATERMARK — 12-fold symmetry, rendered as inline JSX SVG
// ─────────────────────────────────────────────────────────────────────────────

const Mandala = ({ color }: { color: string }) => (
  <svg viewBox="-200 -200 400 400" width="860" height="860" fill="none">
    {/* 12 spokes with petal ovals */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const tipX = 168 * Math.cos(rad);
      const tipY = 168 * Math.sin(rad);
      return (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-168" stroke={color} strokeWidth="0.4" />
          <ellipse cx="0" cy="-55"  rx="7"  ry="15" stroke={color} strokeWidth="0.5" />
          <ellipse cx="0" cy="-105" rx="5.5" ry="11" stroke={color} strokeWidth="0.45" />
          <ellipse cx="0" cy="-148" rx="4"  ry="8"  stroke={color} strokeWidth="0.4" />
          <polygon
            points={`${tipX},${tipY - 9} ${tipX + 4},${tipY} ${tipX},${tipY + 9} ${tipX - 4},${tipY}`}
            fill={color} opacity="0.6"
            transform={`rotate(${deg} ${tipX} ${tipY})`}
          />
        </g>
      );
    })}
    {/* Inner 8-petal lotus ring */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse key={`lp-${deg}`} cx={0} cy={-44} rx={9} ry={20}
        transform={`rotate(${deg})`} stroke={color} strokeWidth="0.5"
        fill={color} fillOpacity="0.07" />
    ))}
    {/* Concentric rings */}
    <circle r="32"  stroke={color} strokeWidth="0.9" />
    <circle r="32"  fill={color} fillOpacity="0.06" />
    <circle r="55"  stroke={color} strokeWidth="0.5" strokeDasharray="3 7" />
    <circle r="80"  stroke={color} strokeWidth="0.5" />
    <circle r="112" stroke={color} strokeWidth="0.45" strokeDasharray="2 9" />
    <circle r="140" stroke={color} strokeWidth="0.45" />
    <circle r="165" stroke={color} strokeWidth="0.35" strokeDasharray="4 14" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM ORNAMENTAL DIVIDER — floral diamond with wave flourishes
// ─────────────────────────────────────────────────────────────────────────────

const Divider = ({ color }: { color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", width: "100%" }}>
    {/* Left wave flourish */}
    <svg viewBox="0 0 90 18" width="90" height="18" fill="none">
      <path d="M0 9 Q15 9 30 9 Q45 9 60 9 Q75 9 90 9" stroke={color} strokeWidth="1" />
      <path d="M4 9 Q14 5 24 9 Q34 13 44 9 Q54 5 64 9 Q74 13 84 9" stroke={color} strokeWidth="0.6" opacity="0.5" />
      <circle cx="14" cy="9" r="2.2" fill={color} />
      <circle cx="36" cy="9" r="1.5" fill={color} opacity="0.65" />
      <circle cx="60" cy="9" r="1.5" fill={color} opacity="0.45" />
    </svg>

    {/* Central ornament — nested diamond with petals */}
    <svg viewBox="0 0 36 36" width="28" height="28" fill="none">
      <polygon points="18,2 34,18 18,34 2,18" stroke={color} strokeWidth="1.4" />
      <polygon points="18,9 27,18 18,27 9,18" fill={color} fillOpacity="0.35" />
      <circle cx="18" cy="18" r="4" fill={color} />
      <circle cx="18" cy="3"  r="2" fill={color} />
      <circle cx="33" cy="18" r="2" fill={color} />
      <circle cx="18" cy="33" r="2" fill={color} />
      <circle cx="3"  cy="18" r="2" fill={color} />
    </svg>

    {/* Right wave flourish (mirror) */}
    <svg viewBox="0 0 90 18" width="90" height="18" fill="none" style={{ transform: "scaleX(-1)" }}>
      <path d="M0 9 Q15 9 30 9 Q45 9 60 9 Q75 9 90 9" stroke={color} strokeWidth="1" />
      <path d="M4 9 Q14 5 24 9 Q34 13 44 9 Q54 5 64 9 Q74 13 84 9" stroke={color} strokeWidth="0.6" opacity="0.5" />
      <circle cx="14" cy="9" r="2.2" fill={color} />
      <circle cx="36" cy="9" r="1.5" fill={color} opacity="0.65" />
      <circle cx="60" cy="9" r="1.5" fill={color} opacity="0.45" />
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ICON BADGE — larger, gradient sphere look
// ─────────────────────────────────────────────────────────────────────────────

const Badge = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div style={{
    width: 78, height: 78, borderRadius: "50%",
    background: bg, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.28), inset 0 2px 4px rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.20)",
    border: "2px solid rgba(255,255,255,0.14)",
  }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BELL DECORATION
// ─────────────────────────────────────────────────────────────────────────────

const BellDecor = ({ color, isLight }: { color: string; isLight: boolean }) => {
  const bellFill  = isLight ? "#D4A830" : "#5A7A9A";
  const bellSheen = isLight ? "#F0C840" : "#7A9ABE";
  const leafFill  = isLight ? "#5A8A3A" : "#3A5A3A";

  return (
    <svg viewBox="0 0 120 220" width="110" height="220" fill="none">
      {[0,1,2,3,4].map(i => (
        <ellipse key={i} cx="60" cy={14 + i * 14} rx="5" ry="7" stroke={color} strokeWidth="1.8" />
      ))}
      <path d="M60 30 Q38 40 32 58 Q48 50 60 30Z" fill={leafFill} opacity="0.78" />
      <path d="M60 30 Q82 40 88 58 Q72 50 60 30Z" fill={leafFill} opacity="0.78" />
      <path d="M60 42 Q34 56 30 76 Q48 64 60 42Z" fill={leafFill} opacity="0.62" />
      <path d="M60 42 Q86 56 90 76 Q72 64 60 42Z" fill={leafFill} opacity="0.62" />
      <path d="M60 80 Q32 88 28 118 Q24 145 22 162 L98 162 Q96 145 92 118 Q88 88 60 80Z" fill={bellFill} />
      <path d="M48 92 Q38 110 38 136" stroke={bellSheen} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <path d="M54 90 Q46 106 46 126" stroke={bellSheen} strokeWidth="2.5" strokeLinecap="round" opacity="0.28" />
      <path d="M28 128 Q60 120 92 128" stroke={color} strokeWidth="2" fill="none" />
      {[38,52,60,68,82].map((x, i) => (
        <circle key={i} cx={x} cy={124} r="2.5" fill={color} opacity="0.8" />
      ))}
      <path d="M22 162 Q60 172 98 162 Q96 168 60 172 Q24 168 22 162Z" fill={isLight ? "#B8921A" : "#4A6A8A"} />
      <ellipse cx="60" cy="162" rx="38" ry="9" stroke={color} strokeWidth="1.5" />
      <line x1="60" y1="162" x2="60" y2="184" stroke={color} strokeWidth="3" />
      <ellipse cx="60" cy="188" rx="9" ry="6" fill={isLight ? "#B8921A" : "#4A6A8A"} stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM LOTUS STRIP — refined, smaller, less visual weight
// ─────────────────────────────────────────────────────────────────────────────

const LotusStrip = ({ color, bg }: { color: string; bg: string }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "4px", background: bg, padding: "5px 0 3px", overflow: "hidden",
  }}>
    {Array.from({ length: 18 }).map((_, i) => (
      <Lotus key={i} color={color} size={22} />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LUXURY GRID CELL — individual card with rounded corners, paper bg, shadows
// ─────────────────────────────────────────────────────────────────────────────

interface CellProps {
  badge: React.ReactNode;
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
  valueBold?: boolean;
  valueSize?: number;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
}

const Cell = ({
  badge, label, value,
  labelColor, valueColor,
  valueBold = true, valueSize = 34,
  cardBg: bg, cardBorder, cardShadow,
}: CellProps) => (
  <div style={{
    borderRadius: 16,
    background: bg,
    border: cardBorder,
    boxShadow: cardShadow,
    display: "flex", alignItems: "center",
    gap: "18px", padding: "0 24px",
  }}>
    {badge}
    <div>
      <div style={{
        fontSize: 14, fontWeight: 700, letterSpacing: "1.4px",
        textTransform: "uppercase", color: labelColor, marginBottom: "8px",
        fontFamily: "'Inter', sans-serif",
      }}>
        {label}
      </div>
      <div style={{
        fontSize: `${valueSize}px`,
        fontWeight: valueBold ? 700 : 500,
        color: valueColor, lineHeight: 1.2,
        fontFamily: "'Playfair Display', serif",
      }}>
        {value}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function urgColor(days: number): string {
  if (days < 0)   return "#C41E1E";
  if (days <= 7)  return "#B8580A";
  if (days <= 30) return "#8B6914";
  return "#1A6B2A";
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RENDERER
// One component — three templates are config/data only, no duplicated logic.
// Rendered off-screen at exactly 1080×1350; captured after document.fonts.ready.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  devotee: DevoteeRecord;
  template: TemplateConfig;
  settings: TempleSettings;
  qrDataUrl: string;
}

const TemplateRenderer = React.forwardRef<HTMLDivElement, Props>(
  ({ devotee, template, settings, qrDataUrl }, ref) => {
    const s = template.styles;
    const isLight = template.id !== "shiva";
    const days = devotee.daysRemaining;
    const uc = urgColor(days);
    const daysStr =
      days < 0 ? `${Math.abs(days)} days overdue` :
      days === 0 ? "Expires today" :
      `${days} days`;

    // Per-template cell styles (shared across all 6 grid cells)
    const cellBg     = isLight ? CARD_BG_LIGHT : CARD_BG_DARK;
    const cellBorder = `1.5px solid ${s.gridBorderColor}`;
    const cellShadow = isLight ? CARD_SHADOW_LIGHT : CARD_SHADOW_DARK;

    // Gold foil gradient for temple name (Chromium / html-to-image supports this)
    const goldTextStyle: React.CSSProperties = {
      background: "linear-gradient(170deg, #6A4800 0%, #B8870A 22%, #E8C030 42%, #F8E070 50%, #E8C030 58%, #B8870A 78%, #6A4800 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: s.templeNameColor, // plain-color fallback
    };

    // Paper crosshatch texture (repeating diagonal lines at very low opacity)
    const paperTextureStyle: React.CSSProperties = {
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage:
        "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(140,100,30,0.026) 3px, rgba(140,100,30,0.026) 4px)",
    };

    return (
      <div
        ref={ref}
        style={{
          width: 1080, height: 1350,
          position: "relative", overflow: "hidden",
          // Layer 1 — parchment gradient base
          background: "linear-gradient(170deg, #FFFDF8 0%, #FCF4E3 35%, #F5E7CF 65%, #EDD9B4 100%)",
          fontFamily: s.fontFamily,
          boxSizing: "border-box",
        }}
      >
        {/* ── Layer 2: Mandala watermark (centred, 4 % opacity) ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0.04,
        }}>
          <Mandala color={isLight ? "#8B6010" : "#5A88B8"} />
        </div>

        {/* ── Layer 3: Top golden glow radial ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 38% at 50% 0%, rgba(212,175,55,0.16) 0%, transparent 68%)",
        }} />

        {/* ── Layer 4: Soft edge vignette ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 95% 95% at 50% 50%, transparent 52%, rgba(100,60,8,0.13) 100%)",
        }} />

        {/* ── Layer 5: Fine paper crosshatch texture ── */}
        <div style={paperTextureStyle} />

        {/* ── BORDER FRAME ── */}
        {/* Outer 4 px gold border with glow shadow */}
        <div style={{
          position: "absolute", inset: 10, zIndex: 20, pointerEvents: "none",
          border: `4px solid ${s.borderColor}`, borderRadius: 6,
          boxShadow: `0 0 0 1px rgba(200,168,75,0.25), 0 0 18px rgba(200,168,75,0.20), inset 0 0 0 1px rgba(200,168,75,0.18)`,
        }} />
        {/* Inner 1 px border */}
        <div style={{
          position: "absolute", inset: 22, zIndex: 20, pointerEvents: "none",
          border: `1px solid ${s.borderColor}`, borderRadius: 3, opacity: 0.48,
        }} />

        {/* ── CORNER ORNAMENTS ── */}
        {[
          { top: 0, left: 0,  transform: "none" },
          { top: 0, right: 0, transform: "scaleX(-1)" },
          { bottom: 0, left: 0,  transform: "scaleY(-1)" },
          { bottom: 0, right: 0, transform: "scale(-1,-1)" },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", ...pos, zIndex: 21, pointerEvents: "none" }}>
            <Corner color={s.borderColor} />
          </div>
        ))}

        {/* ════════════════════════════════════════════════════════
            CONTENT COLUMN
            flex column, grid section gets flex:1 to absorb
            remaining height — no dead space at bottom
            ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 10,
          height: "100%", display: "flex", flexDirection: "column",
          padding: "32px 48px 0",
        }}>

          {/* ── A. HEADER (fixed 264px) ─────────────────────────── */}
          <div style={{
            height: 264, flexShrink: 0,
            display: "flex", gap: 22, alignItems: "center",
          }}>
            {/* Left: logo — shown as-is, no border, no background */}
            <div style={{
              width: 174, height: 248, flexShrink: 0,
              overflow: "hidden",
            }}>
              {settings.templeLogoBase64 ? (
                <img src={settings.templeLogoBase64} alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
              ) : (
                <img src={godImage} alt="Temple deity"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              )}
            </div>

            {/* Centre: temple name (gold foil) + divider + Om Namah Shivaya */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 12, textAlign: "center",
            }}>
              {/* Temple name — gold foil gradient, Playfair Display, uppercase */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 42, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase", lineHeight: 1.18,
                ...goldTextStyle,
              }}>
                {settings.templeName}
              </div>

              <Divider color={s.borderColor} />

              {/* Om Namah Shivaya */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontStyle: "italic",
                color: s.omNameColor, letterSpacing: 0.8,
              }}>
                || Om Namah Shivaya ||
              </div>
            </div>

            {/* Right: decorative bell */}
            <div style={{ width: 110, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BellDecor color={s.borderColor} isLight={isLight} />
            </div>
          </div>

          {/* ── B. GREETING ─────────────────────────────────────── */}
          <div style={{
            flexShrink: 0, textAlign: "center",
            padding: "20px 36px 8px",
          }}>
            {/* "Namaskara Name," — Playfair Display */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42, color: s.greetingTextColor,
              lineHeight: 1.3, marginBottom: 8,
            }}>
              Namaskara{" "}
              <span style={{
                fontWeight: 800, color: s.greetingNameColor,
                fontStyle: "italic",
              }}>
                {devotee.name}
              </span>
              ,
            </div>
            <div style={{
              fontSize: 19, color: s.greetingTextColor, opacity: 0.82,
              lineHeight: 1.65, maxWidth: 600, margin: "0 auto",
              fontFamily: "'Inter', sans-serif",
            }}>
              We sincerely thank you for your devotion and continued support towards the temple.
            </div>
          </div>

          {/* ── Ornamental divider ──────────────────────────────── */}
          <div style={{ flexShrink: 0, padding: "10px 0 14px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── C. REMINDER PANEL — cream card with soft shadow ── */}
          <div style={{
            flexShrink: 0,
            margin: "0 0 14px",
            padding: "18px 24px",
            borderRadius: 16,
            background: isLight ? "linear-gradient(145deg, #FFFDF8, #FBF4E6)" : "linear-gradient(145deg, rgba(24,40,64,0.94), rgba(14,26,46,0.96))",
            border: `1.5px solid ${s.gridBorderColor}`,
            boxShadow: isLight
              ? "0 3px 14px rgba(120,80,10,0.09), inset 0 1px 0 rgba(255,255,255,0.85)"
              : "0 3px 14px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <Badge bg={s.iconCircle1}>
              <IconCalendar />
            </Badge>
            <div style={{
              fontSize: 21, color: s.greetingTextColor,
              lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
            }}>
              This is a gentle reminder that your seva/service is due for{" "}
              <span style={{ fontWeight: 800, color: s.reminderHighlight }}>renewal.</span>
            </div>
          </div>

          {/* ── D. INFO GRID — flex:1, 3 rows × 2 cols of luxury cards ── */}
          <div style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gap: "10px",
            margin: "0 0 14px",
            minHeight: 300,
          }}>
            <Cell
              badge={<Badge bg={s.iconCircle1}><IconPray /></Badge>}
              label="Service" value={devotee.service}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
            <Cell
              badge={<Badge bg={s.iconCircle2}><IconCalendar /></Badge>}
              label="Expiry Date" value={fmtDate(devotee.expiryDate)}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
            <Cell
              badge={<Badge bg={s.iconCircle1}><IconClock /></Badge>}
              label="Days Remaining" value={daysStr}
              labelColor={s.gridLabelColor} valueColor={uc}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
            <Cell
              badge={<Badge bg={s.iconCircle2}><IconRupee /></Badge>}
              label="Amount" value={`₹ ${devotee.amount}`}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
            <Cell
              badge={<Badge bg={s.iconCircle1}><IconDome /></Badge>}
              label="Devotee ID" value={devotee.devoteeId || devotee.mobile}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
            <Cell
              badge={<Badge bg={s.iconCircle2}><IconHeart /></Badge>}
              label="Thank You"
              value="For being a part of our temple family."
              valueBold={false} valueSize={20}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              cardBg={cellBg} cardBorder={cellBorder} cardShadow={cellShadow}
            />
          </div>

          {/* ── E. RENEWAL SECTION ──────────────────────────────── */}
          <div style={{ flexShrink: 0, padding: "0 0 12px" }}>
            {/* Lotus + helper text */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
            }}>
              <Lotus color={s.lotusColor} size={32} />
              <div style={{
                fontSize: 18, color: s.greetingTextColor, opacity: 0.85,
                fontFamily: "'Inter', sans-serif",
              }}>
                You may renew your seva/service easily using the link below.
              </div>
            </div>

            {/* RENEW NOW button + QR card side-by-side */}
            <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
              {/* Luxurious RENEW NOW pill */}
              <div style={{
                flex: 1,
                background: "linear-gradient(160deg, #6B0D0D 0%, #8B1A1A 35%, #7A1414 65%, #5E0D0D 100%)",
                borderRadius: 14,
                border: `2px solid ${s.borderColor}`,
                boxShadow:
                  "0 6px 28px rgba(107,13,13,0.42), 0 2px 6px rgba(107,13,13,0.28), inset 0 1px 0 rgba(255,200,80,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)",
                display: "flex", alignItems: "center",
                height: 74, overflow: "hidden",
              }}>
                {/* Globe icon zone */}
                <div style={{
                  width: 74, height: "100%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: "1.5px solid rgba(255,255,255,0.14)",
                  background: "rgba(0,0,0,0.15)",
                }}>
                  <IconGlobe />
                </div>

                {/* RENEW NOW label */}
                <div style={{
                  padding: "0 22px",
                  borderRight: "1.5px solid rgba(255,255,255,0.14)",
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 27, fontWeight: 900,
                    letterSpacing: "3px", color: "#F5D870",
                    textShadow: "0 1px 4px rgba(0,0,0,0.35)",
                  }}>
                    RENEW NOW
                  </div>
                </div>

                {/* Renewal link text */}
                <div style={{ flex: 1, padding: "0 18px", overflow: "hidden" }}>
                  <div style={{
                    fontSize: 15, color: "rgba(245,220,110,0.85)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {devotee.renewalLink || settings.templeWebsite || "Contact temple for renewal"}
                  </div>
                </div>
              </div>

              {/* QR code in its own cream card */}
              <div style={{
                width: 86, flexShrink: 0,
                borderRadius: 12,
                background: isLight
                  ? "linear-gradient(145deg, #FFFDF8, #FBF4E6)"
                  : "linear-gradient(145deg, rgba(24,40,64,0.94), rgba(14,26,46,0.96))",
                border: `1.5px solid ${s.borderColor}`,
                boxShadow: isLight
                  ? "0 3px 14px rgba(120,80,10,0.10), inset 0 1px 0 rgba(255,255,255,0.8)"
                  : "0 3px 14px rgba(0,0,0,0.25)",
                padding: "8px 8px 4px",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4,
              }}>
                <img src={qrDataUrl} alt="QR" style={{ width: 68, height: 68, display: "block" }} />
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: s.gridLabelColor, letterSpacing: "1px",
                  textTransform: "uppercase", fontFamily: "'Inter', sans-serif",
                }}>
                  Scan to Renew
                </div>
              </div>
            </div>
          </div>

          {/* ── F. BLESSING PANEL — elegant cream card ─────────── */}
          <div style={{
            flexShrink: 0,
            margin: "0 0 10px",
            padding: "16px 28px 14px",
            borderRadius: 16,
            background: isLight
              ? "linear-gradient(145deg, rgba(255,253,248,0.88), rgba(251,243,226,0.88))"
              : "linear-gradient(145deg, rgba(24,40,64,0.90), rgba(14,26,46,0.92))",
            border: `1px solid ${s.gridBorderColor}`,
            boxShadow: isLight
              ? "0 2px 12px rgba(120,80,10,0.07), inset 0 1px 0 rgba(255,255,255,0.65)"
              : "0 2px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            {/* Lotuses flanking blessing text */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 10 }}>
              <Lotus color={s.lotusColor} size={48} />
              <div style={{
                flex: 1, fontSize: 18,
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic", color: s.blessingTextColor,
                lineHeight: 1.7, textAlign: "center",
              }}>
                {settings.blessingMessage}
              </div>
              <Lotus color={s.lotusColor} size={48} />
            </div>

            {/* Om Namah Shivaya */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontStyle: "italic",
              color: s.footerOmColor, letterSpacing: "2px",
            }}>
              ✦&ensp;Om Namah Shivaya&ensp;✦
            </div>

            {/* Temple contact (subtle) */}
            {(settings.templePhone || settings.templeWebsite) && (
              <div style={{
                textAlign: "center", marginTop: 6,
                fontSize: 13, color: s.greetingTextColor, opacity: 0.52,
                fontFamily: "'Inter', sans-serif",
              }}>
                {[settings.templePhone, settings.templeWebsite].filter(Boolean).join("  ·  ")}
              </div>
            )}
          </div>

          {/* ── G. BOTTOM LOTUS STRIP ───────────────────────────── */}
          <div style={{ margin: "0 -48px", flexShrink: 0 }}>
            <LotusStrip color={s.borderColor} bg={s.bottomStripBg} />
          </div>

        </div>
      </div>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
