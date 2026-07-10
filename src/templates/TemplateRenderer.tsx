import React from "react";
import type { DevoteeRecord, TemplateConfig, TempleSettings } from "../types";
import godImage from "../assets/god.png";



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
            CONTENT COLUMN — high-readability layout
            ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 10,
          height: "100%", display: "flex", flexDirection: "column",
          padding: "28px 52px 0",
        }}>

          {/* ── A. HEADER — deity image left + temple name centre ── */}
          <div style={{
            flexShrink: 0, height: 230,
            display: "flex", gap: 28, alignItems: "center",
          }}>
            {/* Deity / logo image — no border, full bleed */}
            <div style={{ width: 168, height: 214, flexShrink: 0, overflow: "hidden" }}>
              {settings.templeLogoBase64 ? (
                <img src={settings.templeLogoBase64} alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
              ) : (
                <img src={godImage} alt="Temple deity"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              )}
            </div>

            {/* Temple name only — no Om Namah Shivaya, no bell */}
            <div style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 14, textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 46, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase", lineHeight: 1.15,
                ...goldTextStyle,
              }}>
                {settings.templeName}
              </div>
              <Divider color={s.borderColor} />
            </div>
          </div>

          {/* ── B. GREETING — oversized, commands attention ─────── */}
          <div style={{ flexShrink: 0, padding: "22px 0 14px" }}>
            {/* "Namaste Name!" — very large, bold */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 64, fontWeight: 900,
              lineHeight: 1.15, color: s.greetingTextColor,
            }}>
              Namaste{" "}
              <span style={{ color: s.greetingNameColor }}>
                {devotee.name}
              </span>
              !
            </div>
            {/* Body intro — scaled up */}
            <div style={{
              fontSize: 24, color: s.greetingTextColor,
              lineHeight: 1.6, marginTop: 10,
              fontFamily: "'Inter', sans-serif", opacity: 0.85,
            }}>
              We sincerely thank you for your devotion and continued support towards the temple.
            </div>
          </div>

          {/* Divider */}
          <div style={{ flexShrink: 0, padding: "4px 0 10px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── C. DETAILS TABLE — 4 rows, flex:1 ───────────────── */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "space-evenly",
            minHeight: 360,
          }}>
            {([
              { label: "Service:",         value: devotee.service,                    color: s.gridValueColor },
              { label: "Expire Date:",     value: fmtDate(devotee.expiryDate),        color: s.gridValueColor },
              { label: "Duration:",        value: daysStr,                            color: uc              },
              { label: "Registration ID:", value: devotee.devoteeId || devotee.mobile, color: s.gridValueColor },
            ] as { label: string; value: string; color: string }[]).map(({ label, value, color }, i, arr) => (
              <div key={label} style={{
                display: "flex", alignItems: "baseline", gap: 20,
                paddingBottom: 14,
                borderBottom: i < arr.length - 1
                  ? `1.5px solid ${s.borderColor}50`
                  : "none",
              }}>
                {/* Label — large, heavy, uppercase */}
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 22, fontWeight: 800,
                  letterSpacing: "1px",
                  color: s.gridLabelColor,
                  flexShrink: 0, minWidth: 260,
                }}>
                  {label}
                </div>
                {/* Value — maximized, bold serif */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 44, fontWeight: 700,
                  color, lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Divider before footer */}
          <div style={{ flexShrink: 0, padding: "6px 0 14px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── D. FOOTER — 70 / 30 split ────────────────────────── */}
          <div style={{
            flexShrink: 0,
            display: "flex", gap: 28, alignItems: "center",
            paddingBottom: 14,
          }}>
            {/* Left 70%: blessing text + Om Namah Shivaya */}
            <div style={{ flex: 7 }}>
              {/* Lotus + blessing */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <Lotus color={s.lotusColor} size={44} />
                <div style={{
                  flex: 1,
                  fontSize: 20,
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic", color: s.blessingTextColor,
                  lineHeight: 1.7,
                }}>
                  {settings.blessingMessage}
                </div>
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontStyle: "italic",
                color: s.footerOmColor, letterSpacing: "1.5px",
                marginTop: 10,
              }}>
                ✦ Om Namah Shivaya ✦
              </div>
              {(settings.templePhone || settings.templeWebsite) && (
                <div style={{
                  fontSize: 15, color: s.greetingTextColor, opacity: 0.50,
                  fontFamily: "'Inter', sans-serif", marginTop: 6,
                }}>
                  {[settings.templePhone, settings.templeWebsite].filter(Boolean).join("  ·  ")}
                </div>
              )}
            </div>

            {/* Right 30%: large clear QR code */}
            <div style={{
              flex: 3, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8,
            }}>
              <img src={qrDataUrl} alt="QR"
                style={{ width: 220, height: 220, display: "block" }} />
              <div style={{
                fontSize: 14, fontWeight: 700,
                color: s.gridLabelColor, letterSpacing: "1.5px",
                textTransform: "uppercase", fontFamily: "'Inter', sans-serif",
              }}>
                Scan to Renew
              </div>
            </div>
          </div>

          {/* ── E. BOTTOM LOTUS STRIP ───────────────────────────── */}
          <div style={{ margin: "0 -52px", flexShrink: 0 }}>
            <LotusStrip color={s.borderColor} bg={s.bottomStripBg} />
          </div>

        </div>
      </div>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
