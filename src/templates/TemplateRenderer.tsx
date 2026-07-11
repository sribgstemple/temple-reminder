import React from "react";
import type { DevoteeRecord, TemplateConfig, TempleSettings } from "../types";
import godImage from "../assets/god.png";

// Card dimensions for PNG export
const W = 1080;
const H = 1350;

// Color palette (from user's HTML design)
const C = {
  maroon:     "#8C1F2E",
  darkMaroon: "#6E1422",
  gold:       "#C9962E",
  lightGold:  "#E8C97A",
  cream:      "#FFF8EF",
  softCream:  "#F5EDD8",
  parchment:  "#EDE0C4",
  darkBrown:  "#4D3429",
  medBrown:   "#7A5540",
  borderGold: "#D8B37A",
};

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function urgColor(days: number): string {
  if (days < 0)   return "#C41E1E";
  if (days <= 7)  return "#B8580A";
  if (days <= 30) return "#8B6914";
  return "#1A6B2A";
}

interface Props {
  devotee: DevoteeRecord;
  template: TemplateConfig;
  settings: TempleSettings;
  qrDataUrl: string;
}

// Inline SVG icons used in info-grid badges
const IconPrayer = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3.5C9 3.5 7 5 7 9l1 8h8l1-8c0-4-2-5.5-2-5.5"/>
    <path d="M12 3v14"/>
    <path d="M9 17l-2 4h10l-2-4"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <rect x="7" y="14" width="3" height="3" rx="0.5" fill="white" stroke="none"/>
    <rect x="11" y="14" width="3" height="3" rx="0.5" fill="white" stroke="none"/>
  </svg>
);

const IconClock = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/>
    <polyline points="12 7 12 12 16 14"/>
  </svg>
);

const IconRupee = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="6" x2="18" y2="6"/>
    <line x1="6" y1="10" x2="18" y2="10"/>
    <path d="M6 10 Q6 18 12 18 Q18 18 18 10"/>
    <line x1="6" y1="18" x2="18" y2="14"/>
  </svg>
);

const IconHeart = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
    <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z"/>
  </svg>
);

const LotusSmall = () => (
  <svg width="40" height="40" viewBox="0 0 20 20" fill="none">
    <path d="M10 18C10 18 5 13.5 5 9C5 6.5 7 5 9 5.8C9 3.5 10 2 10 2C10 2 11 3.5 11 5.8C13 5 15 6.5 15 9C15 13.5 10 18 10 18Z" fill={C.gold} opacity="0.9"/>
    <path d="M10 18C10 18 2.5 12.5 3 7.5C3.5 5 6 4 7.5 5.5C6.5 7 7.5 10 10 12" fill={C.gold} opacity="0.32"/>
    <path d="M10 18C10 18 17.5 12.5 17 7.5C16.5 5 14 4 12.5 5.5C13.5 7 12.5 10 10 12" fill={C.gold} opacity="0.32"/>
  </svg>
);

// Shared label style for info-grid cells
const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  color: C.medBrown,
  fontSize: 24,
  letterSpacing: "0.09em",
  fontWeight: 600,
  textTransform: "uppercase",
  lineHeight: 1,
  marginBottom: 8,
  whiteSpace: "nowrap",
};

// Shared value style for info-grid cells
const valueStyle: React.CSSProperties = {
  fontFamily: "'Cinzel', serif",
  color: C.maroon,
  fontSize: 30,
  fontWeight: 700,
  lineHeight: 1.25,
};

const TemplateRenderer = React.forwardRef<HTMLDivElement, Props>(
  ({ devotee, template: _template, settings, qrDataUrl }, ref) => {
    const days = devotee.daysRemaining;
    const uc = urgColor(days);
    const daysStr =
      days < 0 ? `${Math.abs(days)} days overdue` :
      days === 0 ? "Expires today" :
      `${days} days`;

    const deityImg = settings.templeLogoBase64 || godImage;

    return (
      <div
        ref={ref}
        style={{
          width: W, height: H,
          background: C.cream,
          borderRadius: 45,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 14px 56px rgba(90,15,28,0.25), 0 3px 12px rgba(201,150,46,0.2)",
          boxSizing: "border-box",
          fontFamily: "'Lora', serif",
        }}
      >

        {/* ── GOLD INSET BORDER ── */}
        <div style={{
          position: "absolute", inset: 18, borderRadius: 30,
          border: `3px solid ${C.gold}`,
          boxShadow: `0 0 0 2px rgba(232,201,122,0.25), inset 0 0 30px rgba(201,150,46,0.08)`,
          pointerEvents: "none", zIndex: 10,
        }} />

        {/* ── RADIAL GLOW ── */}
        <div style={{
          position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)",
          width: "80%", height: "50%", pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(ellipse, rgba(201,150,46,0.09) 0%, transparent 68%)",
        }} />

        {/* ── MANDALA WATERMARK (scaled 280→700) ── */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          opacity: 0.05, pointerEvents: "none", zIndex: 1,
        }}>
          <svg width="700" height="700" viewBox="0 0 280 280" fill="none">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
              <g key={deg} transform={`rotate(${deg} 140 140)`}>
                <ellipse cx="140" cy="64" rx="11" ry="30" fill={C.gold}/>
              </g>
            ))}
            <circle cx="140" cy="140" r="46" fill="none" stroke={C.gold} strokeWidth="2"/>
            <circle cx="140" cy="140" r="20" fill={C.gold} opacity="0.55"/>
          </svg>
        </div>

        {/* ── GOPURAM TOWER (scaled 80×195 → 200×490) ── */}
        <div style={{
          position: "absolute", top: 35, left: 15,
          zIndex: 2, opacity: 0.7, pointerEvents: "none",
        }}>
          <svg width="200" height="490" viewBox="0 0 80 195" fill="none">
            <defs>
              <linearGradient id="twFR" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.cream} stopOpacity="0"/>
                <stop offset="100%" stopColor={C.cream} stopOpacity="0.96"/>
              </linearGradient>
              <linearGradient id="twFB" x1="0" y1="0.65" x2="0" y2="1">
                <stop offset="0%" stopColor={C.cream} stopOpacity="0"/>
                <stop offset="100%" stopColor={C.cream} stopOpacity="0.95"/>
              </linearGradient>
            </defs>
            <rect x="5"    y="185" width="70" height="10" rx="3"   fill={C.parchment}  opacity="0.50"/>
            <rect x="10"   y="178" width="60" height="10" rx="2"   fill={C.borderGold} opacity="0.30"/>
            <rect x="10"   y="170" width="60" height="15" rx="1.5" fill={C.borderGold} opacity="0.22"/>
            <rect x="13"   y="153" width="54" height="15" rx="1.5" fill={C.borderGold} opacity="0.21"/>
            <rect x="16"   y="137" width="48" height="15" rx="1.5" fill={C.borderGold} opacity="0.20"/>
            <rect x="18.5" y="122" width="43" height="15" rx="1.5" fill={C.borderGold} opacity="0.18"/>
            <rect x="21.5" y="109" width="37" height="15" rx="1.5" fill={C.borderGold} opacity="0.17"/>
            <rect x="24"   y="97"  width="32" height="15" rx="1.5" fill={C.borderGold} opacity="0.16"/>
            <rect x="26"   y="86"  width="28" height="15" rx="1.5" fill={C.borderGold} opacity="0.15"/>
            <rect x="28.5" y="76"  width="23" height="15" rx="1.5" fill={C.borderGold} opacity="0.14"/>
            <ellipse cx="40" cy="70" rx="7" ry="3.5" fill={C.gold} opacity="0.35"/>
            <rect x="34" y="58" width="12" height="14" rx="6" fill={C.gold} opacity="0.30"/>
            <circle cx="40" cy="52" r="5.5" fill={C.gold} opacity="0.32"/>
            <line x1="40" y1="47" x2="40" y2="34" stroke={C.gold} strokeWidth="1.8" opacity="0.26"/>
            <circle cx="40" cy="32" r="3.5" fill={C.gold} opacity="0.28"/>
            <rect x="0" y="0" width="80" height="195" fill="url(#twFR)"/>
            <rect x="0" y="0" width="80" height="195" fill="url(#twFB)"/>
          </svg>
        </div>

        {/* ══════════════════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 5,
          height: "100%",
          display: "flex", flexDirection: "column",
          padding: "42px 45px 40px",
          gap: 14,
          boxSizing: "border-box",
        }}>

          {/* ── HEADER: deity + temple name ── */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 30, flexShrink: 0 }}>
            {/* Deity / Temple logo */}
            <div style={{
              flexShrink: 0, width: 175,
              borderRadius: 25,
              border: `4px solid ${C.borderGold}`,
              boxShadow: "0 4px 14px rgba(201,150,46,0.28)",
              overflow: "hidden",
              background: "#fff",
            }}>
              <img
                src={deityImg}
                alt="Temple deity"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              />
            </div>
            {/* Temple name + subtitle + divider */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                color: C.maroon,
                fontSize: 40, fontWeight: 900,
                letterSpacing: "0.04em",
                lineHeight: 1.3,
              }}>
                {settings.templeName}
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: C.medBrown,
                fontSize: 26, letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 10, fontWeight: 500,
              }}>
                A Gentle Seva Reminder
              </div>
              {/* Decorative divider */}
              <div style={{ marginTop: 18 }}>
                <svg width="100%" height="35" viewBox="0 0 220 14" style={{ display: "block" }}>
                  <line x1="4"   y1="7" x2="88"  y2="7" stroke={C.borderGold} strokeWidth="0.9"/>
                  <polygon points="92,7 97,3.5 102,7 97,10.5" fill={C.gold} opacity="0.8"/>
                  <circle cx="110" cy="7" r="4" fill="none" stroke={C.gold} strokeWidth="1.4"/>
                  <circle cx="110" cy="7" r="1.8" fill={C.gold}/>
                  <polygon points="118,7 123,3.5 128,7 123,10.5" fill={C.gold} opacity="0.8"/>
                  <line x1="132" y1="7" x2="216" y2="7" stroke={C.borderGold} strokeWidth="0.9"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── GREETING ── */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: C.darkBrown,
              fontSize: 48, fontWeight: 600, lineHeight: 1.35,
            }}>
              Namaskara{" "}
              <span style={{ color: C.maroon, fontWeight: 800 }}>{devotee.name}</span>,
            </div>
            <div style={{
              fontFamily: "'Lora', serif",
              color: C.medBrown,
              fontSize: 32, lineHeight: 1.7, marginTop: 8,
            }}>
              Thank you for your devotion &amp; continued support to the temple.
            </div>
          </div>

          {/* ── RENEWAL REMINDER BANNER ── */}
          <div style={{
            background: "linear-gradient(135deg, #FAF2E2, #F5EDD8)",
            border: `1px solid rgba(216,179,122,0.33)`,
            borderRadius: 30, padding: "12px 26px",
            display: "flex", alignItems: "center", gap: 22,
            flexShrink: 0,
          }}>
            {/* Calendar badge */}
            <div style={{
              width: 82, height: 82, borderRadius: "50%",
              background: C.maroon, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(140,31,46,0.31)",
            }}>
              <IconCalendar />
            </div>
            <div style={{
              fontFamily: "'Lora', serif",
              color: C.darkBrown, fontSize: 33, lineHeight: 1.65,
            }}>
              Your seva / service is due for{" "}
              <strong style={{ fontFamily: "'Cinzel', serif", color: C.maroon }}>renewal</strong>.
            </div>
          </div>

          {/* ── INFO GRID ── */}
          <div style={{
            flex: 1,
            borderRadius: 35,
            border: `3px solid ${C.borderGold}`,
            background: "linear-gradient(155deg, #FFFCF5, #F5EDD8)",
            boxShadow: "0 3px 18px rgba(201,150,46,0.12)",
            overflow: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "space-evenly",
          }}>
            {/* Row 1: Service — full width */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "12px 22px" }}>
              <div style={{
                width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
                background: C.maroon,
                boxShadow: "0 2px 6px rgba(140,31,46,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconPrayer />
              </div>
              <div>
                <div style={labelStyle}>Service</div>
                <div style={valueStyle}>{devotee.service}</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: `1px dashed rgba(216,179,122,0.44)`, margin: "0 28px" }} />

            {/* Row 2: Expiry Date | Days Left */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* Expiry Date */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "12px 22px" }}>
                <div style={{
                  width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
                  background: C.gold,
                  boxShadow: "0 2px 6px rgba(201,150,46,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IconCalendar />
                </div>
                <div>
                  <div style={labelStyle}>Expiry Date</div>
                  <div style={valueStyle}>{fmtDate(devotee.expiryDate)}</div>
                </div>
              </div>
              {/* Days Left */}
              <div style={{
                display: "flex", alignItems: "center", gap: 20, padding: "12px 22px",
                borderLeft: `1px dashed rgba(216,179,122,0.44)`,
              }}>
                <div style={{
                  width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
                  background: C.maroon,
                  boxShadow: "0 2px 6px rgba(140,31,46,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IconClock />
                </div>
                <div>
                  <div style={labelStyle}>Days Left</div>
                  <div style={{ ...valueStyle, color: uc }}>{daysStr}</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: `1px dashed rgba(216,179,122,0.44)`, margin: "0 28px" }} />

            {/* Row 3: Amount | Thank You */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* Amount */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "12px 22px" }}>
                <div style={{
                  width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
                  background: C.gold,
                  boxShadow: "0 2px 6px rgba(201,150,46,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IconRupee />
                </div>
                <div>
                  <div style={labelStyle}>Amount</div>
                  <div style={valueStyle}>₹ {devotee.amount}</div>
                </div>
              </div>
              {/* Thank You */}
              <div style={{
                display: "flex", alignItems: "center", gap: 20, padding: "12px 22px",
                borderLeft: `1px dashed rgba(216,179,122,0.44)`,
              }}>
                <div style={{
                  width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
                  background: "#A85040",
                  boxShadow: "0 2px 6px rgba(168,80,64,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IconHeart />
                </div>
                <div>
                  <div style={labelStyle}>Thank You</div>
                  <div style={{
                    fontFamily: "'Lora', serif",
                    fontSize: 24, fontWeight: 400, fontStyle: "italic",
                    color: C.darkBrown, lineHeight: 1.5,
                  }}>
                    Thank you for being a devoted part of our temple family.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BLESSING + QR ── */}
          <div style={{
            borderRadius: 33,
            border: `3px solid ${C.borderGold}`,
            background: "linear-gradient(155deg, #FFFDF8, #F5EDD8)",
            boxShadow: "inset 0 0 30px rgba(201,150,46,0.06)",
            display: "flex", alignItems: "stretch", overflow: "hidden",
            flexShrink: 0,
          }}>
            {/* Blessing text (70%) */}
            <div style={{
              flex: "0 0 70%", padding: "18px 26px",
              borderRight: `1px dashed rgba(216,179,122,0.5)`,
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: 14,
              overflow: "hidden",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: C.darkBrown, fontSize: 30,
                fontWeight: 500, lineHeight: 1.75, letterSpacing: "0.01em",
              }}>
                {settings.blessingMessage}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <LotusSmall />
                <span style={{
                  fontFamily: "'Cinzel', serif", color: C.maroon,
                  fontSize: 28, fontWeight: 800, letterSpacing: "0.05em",
                }}>
                  Om Namah Shivaya
                </span>
                <LotusSmall />
              </div>
              {settings.templeWebsite && (
                <div style={{ textAlign: "left", marginTop: 14 }}>
                  <span style={{
                    fontFamily: "'Lora', serif", color: C.medBrown,
                    fontSize: 22, fontStyle: "italic",
                  }}>
                    For more details visit{" "}
                  </span>
                  <span style={{
                    fontFamily: "'Cinzel', serif", color: C.maroon,
                    fontSize: 22, fontWeight: 600, letterSpacing: "0.02em",
                  }}>
                    {settings.templeWebsite.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              )}
            </div>
            {/* QR panel (30%) */}
            <div style={{
              flex: "0 0 30%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "14px 16px", gap: 10,
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", color: C.maroon,
                fontSize: 22, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center",
              }}>
                RENEW HERE
              </div>
              <div style={{
                padding: 10, background: "white", borderRadius: 18,
                border: `3px solid ${C.borderGold}`,
                boxShadow: "0 2px 10px rgba(201,150,46,0.18)",
                width: "100%", boxSizing: "border-box",
                display: "flex", justifyContent: "center",
              }}>
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
