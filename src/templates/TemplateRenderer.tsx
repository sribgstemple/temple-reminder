import React from "react";
import type { DevoteeRecord, TemplateConfig, TempleSettings } from "../types";
import godImage from "../assets/god.png";

// ─────────────────────────────────────────────────────────────────────────────
// CORNER ORNAMENT — triple-bracket, 8-petal flower, scroll ends, diamonds
// top-left; CSS transform mirrors for the other three
// ─────────────────────────────────────────────────────────────────────────────

const Corner = ({ color }: { color: string }) => (
  <svg viewBox="0 0 130 130" width="130" height="130" fill="none">
    {/* Three nested bracket lines */}
    <path d="M10 124 L10 36 Q10 10 36 10 L124 10"
      stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d="M20 124 L20 43 Q20 20 43 20 L124 20"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.52" />
    <path d="M28 124 L28 50 Q28 28 50 28 L124 28"
      stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.26" />

    {/* 8-petal flower at corner intersection */}
    <circle cx="32" cy="32" r="20" stroke={color} strokeWidth="1.1" />
    <circle cx="32" cy="32" r="7.5" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 32 + 13.5 * Math.cos(rad);
      const cy = 32 + 13.5 * Math.sin(rad);
      return (
        <ellipse key={i} cx={cx} cy={cy} rx="4.6" ry="7.2"
          transform={`rotate(${deg} ${cx} ${cy})`}
          fill={color} fillOpacity="0.48" />
      );
    })}

    {/* Bead dots along bracket arms */}
    <circle cx="10" cy="68" r="3.2" fill={color} />
    <circle cx="10" cy="90" r="3.2" fill={color} />
    <circle cx="68" cy="10" r="3.2" fill={color} />
    <circle cx="90" cy="10" r="3.2" fill={color} />

    {/* Elegant scroll curls at open arm ends */}
    <path d="M10 116 Q2 116 2 108 Q2 100 10 100" stroke={color} strokeWidth="2.2" />
    <path d="M116 10 Q116 2 108 2 Q100 2 100 10" stroke={color} strokeWidth="2.2" />

    {/* Diamond accents mid-arm */}
    <polygon points="10,54 15.5,59 10,64 4.5,59" fill={color} opacity="0.75" />
    <polygon points="54,10 59,15.5 64,10 59,4.5" fill={color} opacity="0.75" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LOTUS — 7-layer symmetrical petal structure with stem
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
// MANDALA WATERMARK — 12-fold symmetry, centred, very faint
// ─────────────────────────────────────────────────────────────────────────────

const Mandala = ({ color }: { color: string }) => (
  <svg viewBox="-200 -200 400 400" width="860" height="860" fill="none">
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const tipX = 168 * Math.cos(rad);
      const tipY = 168 * Math.sin(rad);
      return (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-168" stroke={color} strokeWidth="0.4" />
          <ellipse cx="0" cy="-55"  rx="7"   ry="15" stroke={color} strokeWidth="0.5" />
          <ellipse cx="0" cy="-105" rx="5.5" ry="11" stroke={color} strokeWidth="0.45" />
          <ellipse cx="0" cy="-148" rx="4"   ry="8"  stroke={color} strokeWidth="0.4" />
          <polygon
            points={`${tipX},${tipY - 9} ${tipX + 4},${tipY} ${tipX},${tipY + 9} ${tipX - 4},${tipY}`}
            fill={color} opacity="0.55"
            transform={`rotate(${deg} ${tipX} ${tipY})`}
          />
        </g>
      );
    })}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse key={`lp-${deg}`} cx={0} cy={-44} rx={9} ry={20}
        transform={`rotate(${deg})`} stroke={color} strokeWidth="0.5"
        fill={color} fillOpacity="0.07" />
    ))}
    <circle r="32"  stroke={color} strokeWidth="0.9" />
    <circle r="32"  fill={color}   fillOpacity="0.06" />
    <circle r="55"  stroke={color} strokeWidth="0.5" strokeDasharray="3 7" />
    <circle r="80"  stroke={color} strokeWidth="0.5" />
    <circle r="112" stroke={color} strokeWidth="0.45" strokeDasharray="2 9" />
    <circle r="140" stroke={color} strokeWidth="0.45" />
    <circle r="165" stroke={color} strokeWidth="0.35" strokeDasharray="4 14" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM DIVIDER — wave flourishes + nested diamond centrepiece
// ─────────────────────────────────────────────────────────────────────────────

const Divider = ({ color }: { color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", width: "100%" }}>
    {/* Left flourish */}
    <svg viewBox="0 0 110 18" width="110" height="18" fill="none">
      <path d="M0 9 L110 9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <path d="M4 9 Q20 5 36 9 Q52 13 68 9 Q84 5 100 9 Q108 11 110 9"
        stroke={color} strokeWidth="0.6" opacity="0.45" />
      <circle cx="16" cy="9" r="2.6" fill={color} />
      <circle cx="44" cy="9" r="1.8" fill={color} opacity="0.62" />
      <circle cx="74" cy="9" r="1.3" fill={color} opacity="0.38" />
    </svg>

    {/* Diamond centrepiece */}
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <polygon points="20,2 38,20 20,38 2,20" stroke={color} strokeWidth="1.5" />
      <polygon points="20,10 30,20 20,30 10,20" fill={color} fillOpacity="0.25" />
      <circle cx="20" cy="20" r="4.5" fill={color} />
      <circle cx="20" cy="3"  r="2.2" fill={color} />
      <circle cx="37" cy="20" r="2.2" fill={color} />
      <circle cx="20" cy="37" r="2.2" fill={color} />
      <circle cx="3"  cy="20" r="2.2" fill={color} />
    </svg>

    {/* Right flourish (mirrored) */}
    <svg viewBox="0 0 110 18" width="110" height="18" fill="none"
      style={{ transform: "scaleX(-1)" }}>
      <path d="M0 9 L110 9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <path d="M4 9 Q20 5 36 9 Q52 13 68 9 Q84 5 100 9 Q108 11 110 9"
        stroke={color} strokeWidth="0.6" opacity="0.45" />
      <circle cx="16" cy="9" r="2.6" fill={color} />
      <circle cx="44" cy="9" r="1.8" fill={color} opacity="0.62" />
      <circle cx="74" cy="9" r="1.3" fill={color} opacity="0.38" />
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM LOTUS STRIP
// ─────────────────────────────────────────────────────────────────────────────

const LotusStrip = ({ color, bg }: { color: string; bg: string }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "4px", background: bg, padding: "6px 0 4px", overflow: "hidden",
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
// Captured off-screen at exactly 1080×1350 px via html-to-image (Chromium).
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

    // Gold / silver foil gradient — direction adapted per theme
    const goldTextStyle: React.CSSProperties = {
      background: isLight
        ? "linear-gradient(160deg, #7A5200 0%, #C8980C 18%, #F2D440 38%, #FFF5A0 50%, #F2D440 62%, #C8980C 82%, #7A5200 100%)"
        : "linear-gradient(160deg, #3A5A7A 0%, #6A9ABE 25%, #A8D0EC 45%, #C8E8F8 50%, #A8D0EC 55%, #6A9ABE 75%, #3A5A7A 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: s.templeNameColor,
    };

    // Subtle diagonal crosshatch paper texture
    const paperTexture: React.CSSProperties = {
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage:
        "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(140,100,20,0.02) 3px, rgba(140,100,20,0.02) 4px)",
    };

    // Cream panel style — used for both the blessing and QR base
    const creamPanel = (extraStyle: React.CSSProperties = {}): React.CSSProperties => ({
      background: isLight
        ? "linear-gradient(145deg, rgba(255,255,252,0.84) 0%, rgba(253,246,228,0.78) 100%)"
        : "linear-gradient(145deg, rgba(18,32,52,0.92) 0%, rgba(10,20,36,0.94) 100%)",
      border: `1px solid ${s.borderColor}45`,
      borderRadius: 18,
      boxShadow: isLight
        ? "0 2px 20px rgba(120,80,10,0.07), inset 0 1px 0 rgba(255,255,255,0.72)"
        : "0 2px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
      ...extraStyle,
    });

    const deityImg = settings.templeLogoBase64 || godImage;

    return (
      <div
        ref={ref}
        style={{
          width: 1080, height: 1350,
          position: "relative", overflow: "hidden",
          // Warm ivory parchment — multi-stop gradient for depth
          background: isLight
            ? "linear-gradient(168deg, #FFFEFB 0%, #FDF7EC 22%, #F9EDD8 50%, #F2E0C0 78%, #E8CFA6 100%)"
            : "linear-gradient(168deg, #0C1520 0%, #111E30 35%, #172638 65%, #0E1C2C 100%)",
          fontFamily: s.fontFamily,
          boxSizing: "border-box",
        }}
      >
        {/* ── Mandala watermark (4.5 % opacity — barely there) ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0.045,
        }}>
          <Mandala color={isLight ? "#8B6010" : "#5A88B8"} />
        </div>

        {/* ── Top golden radial glow ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 88% 42% at 50% 0%, rgba(212,175,55,0.20) 0%, transparent 66%)",
        }} />

        {/* ── Soft edge vignette ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 95% 96% at 50% 50%, transparent 48%, rgba(80,44,4,0.14) 100%)",
        }} />

        {/* ── Paper crosshatch texture ── */}
        <div style={paperTexture} />

        {/* ── DOUBLE GOLD BORDER FRAME ── */}
        {/* Outer — 5 px, gold glow */}
        <div style={{
          position: "absolute", inset: 9, zIndex: 20, pointerEvents: "none",
          border: `5px solid ${s.borderColor}`,
          borderRadius: 8,
          boxShadow: [
            `0 0 0 1.5px rgba(200,168,75,0.28)`,
            `0 0 28px rgba(200,168,75,0.16)`,
            `inset 0 0 0 1.5px rgba(200,168,75,0.20)`,
          ].join(", "),
        }} />
        {/* Inner — 1.5 px */}
        <div style={{
          position: "absolute", inset: 22, zIndex: 20, pointerEvents: "none",
          border: `1.5px solid ${s.borderColor}`,
          borderRadius: 3,
          opacity: 0.55,
        }} />

        {/* ── CORNER ORNAMENTS ── */}
        {[
          { top: 0,    left: 0,   transform: "none"         },
          { top: 0,    right: 0,  transform: "scaleX(-1)"   },
          { bottom: 0, left: 0,   transform: "scaleY(-1)"   },
          { bottom: 0, right: 0,  transform: "scale(-1,-1)" },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", ...pos, zIndex: 21, pointerEvents: "none" }}>
            <Corner color={s.borderColor} />
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════════════════
            CONTENT COLUMN
            flex column, detail rows absorb remaining height via flex:1
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 10,
          height: "100%",
          display: "flex", flexDirection: "column",
          padding: "36px 70px 0",
        }}>

          {/* ── A. DEITY — ALWAYS FULLY VISIBLE ─────────────────────────────
               object-fit: contain  →  never crops, always preserves ratio
               flex centering      →  centered regardless of aspect ratio
               ─────────────────────────────────────────────────────────────── */}
          <div style={{
            flexShrink: 0,
            height: 288,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Soft golden aureole beneath the deity */}
            <div style={{
              position: "absolute",
              bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 380, height: 60,
              background:
                "radial-gradient(ellipse at center bottom, rgba(212,175,55,0.24) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />
            <img
              src={deityImg}
              alt="Temple deity"
              style={{
                maxHeight: 276,
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center center",
                display: "block",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>

          {/* ── B. TEMPLE NAME — Cinzel, gold foil ──────────────────────── */}
          <div style={{
            flexShrink: 0,
            textAlign: "center",
            padding: "10px 0 14px",
          }}>
            <div style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
              fontSize: 50, fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              lineHeight: 1.2,
              ...goldTextStyle,
            }}>
              {settings.templeName}
            </div>
          </div>

          {/* Divider 1 */}
          <div style={{ flexShrink: 0, padding: "0 0 12px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── C. GREETING — stacked for maximum elegance ────────────────── */}
          <div style={{
            flexShrink: 0,
            textAlign: "center",
            padding: "2px 24px 14px",
          }}>
            {/* "Namaste" — small italic above */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontStyle: "italic", fontWeight: 400,
              color: s.greetingTextColor,
              letterSpacing: "0.10em",
              opacity: 0.72,
              marginBottom: 2,
            }}>
              Namaste
            </div>

            {/* Devotee name — the focal point */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 56, fontWeight: 800,
              color: s.greetingNameColor,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              marginBottom: 14,
            }}>
              {devotee.name}
            </div>

            {/* Thank-you body text */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontStyle: "italic",
              color: s.greetingTextColor,
              lineHeight: 1.65, opacity: 0.80,
            }}>
              We sincerely thank you for your devotion and continued support towards the temple.
            </div>
          </div>

          {/* Divider 2 */}
          <div style={{ flexShrink: 0, padding: "2px 0 10px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── D. DETAILS — flex:1, four luxurious rows ─────────────────── */}
          <div style={{
            flex: 1,
            display: "flex", flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "0 4px",
          }}>
            {([
              { label: "Service",          value: devotee.service,                    color: s.gridValueColor },
              { label: "Expire Date",      value: fmtDate(devotee.expiryDate),        color: s.gridValueColor },
              { label: "Duration",         value: daysStr,                            color: uc              },
              { label: "Registration ID",  value: devotee.devoteeId || devotee.mobile, color: s.gridValueColor },
            ] as { label: string; value: string; color: string }[]).map(({ label, value, color }, i, arr) => (
              <div key={label}>
                {/* Label — lotus ornament + small uppercase */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: 3,
                }}>
                  <Lotus color={s.lotusColor} size={13} />
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13, fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: s.gridLabelColor,
                    opacity: 0.82,
                  }}>
                    {label}
                  </div>
                </div>

                {/* Value — maximized serif */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 46, fontWeight: 700,
                  color, lineHeight: 1.08,
                  whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis",
                  paddingLeft: 21,
                }}>
                  {value}
                </div>

                {/* Soft gradient separator */}
                {i < arr.length - 1 && (
                  <div style={{
                    height: 1, marginTop: 8,
                    background: `linear-gradient(90deg, transparent, ${s.borderColor}58 28%, ${s.borderColor}58 72%, transparent)`,
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Divider 3 */}
          <div style={{ flexShrink: 0, padding: "10px 0 14px" }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── E. FOOTER — 70 / 30 horizontal split ──────────────────────── */}
          <div style={{
            flexShrink: 0,
            display: "flex", gap: 18, alignItems: "stretch",
            paddingBottom: 14,
          }}>

            {/* Left 70%: blessing panel ─────────────────────────────────── */}
            <div style={{
              flex: 7,
              padding: "20px 24px 18px",
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              ...creamPanel(),
            }}>
              {/* Lotus pair flanking blessing text */}
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12,
              }}>
                <Lotus color={s.lotusColor} size={40} />
                <div style={{
                  flex: 1,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 19, fontStyle: "italic",
                  color: s.blessingTextColor, lineHeight: 1.65,
                  textAlign: "center",
                }}>
                  {settings.blessingMessage}
                </div>
                <Lotus color={s.lotusColor} size={40} />
              </div>

              {/* Om Namah Shivaya */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontStyle: "italic",
                color: s.footerOmColor,
                letterSpacing: "0.08em",
                textAlign: "center",
              }}>
                ✦&ensp;Om Namah Shivaya&ensp;✦
              </div>

              {/* Temple contact (when available) */}
              {(settings.templePhone || settings.templeWebsite) && (
                <div style={{
                  textAlign: "center", marginTop: 8,
                  fontSize: 13, color: s.greetingTextColor, opacity: 0.40,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {[settings.templePhone, settings.templeWebsite].filter(Boolean).join("  ·  ")}
                </div>
              )}
            </div>

            {/* Right 30%: premium QR panel ─────────────────────────────── */}
            <div style={{
              flex: 3,
              padding: "16px 14px 14px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 10,
              ...creamPanel({
                border: `2px solid ${s.borderColor}`,
                boxShadow: isLight
                  ? "0 4px 22px rgba(120,80,10,0.12), inset 0 1px 0 rgba(255,255,255,0.78)"
                  : "0 4px 22px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
              }),
            }}>
              {/* QR image in a white inset box */}
              <div style={{
                background: "#FFFFFF",
                borderRadius: 10,
                padding: 8,
                boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
              }}>
                <img src={qrDataUrl} alt="QR"
                  style={{ width: 156, height: 156, display: "block" }} />
              </div>

              {/* Scan label */}
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, fontWeight: 800,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: s.gridLabelColor,
                textAlign: "center",
              }}>
                Scan to Renew
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, fontStyle: "italic",
                color: s.greetingTextColor, opacity: 0.42,
                textAlign: "center",
              }}>
                for seva renewal
              </div>
            </div>
          </div>

          {/* ── F. BOTTOM LOTUS STRIP ─────────────────────────────────────── */}
          <div style={{ margin: "0 -70px", flexShrink: 0 }}>
            <LotusStrip color={s.borderColor} bg={s.bottomStripBg} />
          </div>

        </div>
      </div>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
