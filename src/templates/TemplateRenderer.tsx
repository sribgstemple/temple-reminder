import React from 'react'
import type { DevoteeRecord, TemplateConfig, TempleSettings } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICON COMPONENTS  (white stroke/fill, rendered inside coloured circles)
// ─────────────────────────────────────────────────────────────────────────────

const IconPray = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
    <path d="M14 4 C12 4 10 5.5 10 7.5 L10 14 L14 18 L18 14 L18 7.5 C18 5.5 16 4 14 4Z"
      stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
    <path d="M10 14 L8 16 M18 14 L20 16" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M10 20 C10 20 12 22 14 22 C16 22 18 20 18 20" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
  </svg>
)

const IconCalendar = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <rect x="4" y="5" width="20" height="19" rx="3" />
    <path d="M4 11 L24 11" />
    <path d="M9 3 L9 7 M19 3 L19 7" />
    <circle cx="9" cy="16" r="1.2" fill="white" />
    <circle cx="14" cy="16" r="1.2" fill="white" />
    <circle cx="19" cy="16" r="1.2" fill="white" />
    <circle cx="9" cy="21" r="1.2" fill="white" />
    <circle cx="14" cy="21" r="1.2" fill="white" />
  </svg>
)

const IconClock = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="14" cy="14" r="10" />
    <path d="M14 8 L14 14 L18 17" />
  </svg>
)

const IconRupee = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
    <path d="M8 6 L20 6" />
    <path d="M8 11 L20 11" />
    <path d="M8 6 C8 16 16 20 20 22" />
    <path d="M11 14 L20 22" />
  </svg>
)

const IconDome = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 22 L23 22" />
    <path d="M7 22 L7 16" />
    <path d="M21 22 L21 16" />
    <path d="M7 16 Q7 8 14 5 Q21 8 21 16 Z" fill="white" fillOpacity="0.2" />
    <path d="M14 5 L14 3" />
    <path d="M12 3 L16 3" />
    <path d="M10 14 L18 14" />
  </svg>
)

const IconHeart = () => (
  <svg viewBox="0 0 28 28" width="26" height="26">
    <path d="M14 23 Q5 16 5 10 A5 5 0 0 1 14 8 A5 5 0 0 1 23 10 Q23 16 14 23Z"
      fill="white" fillOpacity="0.9" stroke="white" strokeWidth="0.5" />
  </svg>
)

const IconGlobe = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="14" cy="14" r="10" />
    <path d="M4 14 L24 14" />
    <path d="M14 4 C10 9 10 19 14 24 C18 19 18 9 14 4Z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// ORNAMENTAL CORNER  (top-left; mirrored for other corners)
// ─────────────────────────────────────────────────────────────────────────────

const Corner = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    {/* Outer bracket */}
    <path d="M6 96 L6 26 Q6 6 26 6 L96 6"
      stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Inner bracket */}
    <path d="M16 96 L16 30 Q16 16 30 16 L96 16"
      stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

    {/* Central flower at corner */}
    <circle cx="22" cy="22" r="13" stroke={color} strokeWidth="1.2" />
    <circle cx="22" cy="22" r="5" fill={color} />
    {/* 8 petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const r = deg * Math.PI / 180
      const cx = 22 + 9 * Math.cos(r)
      const cy = 22 + 9 * Math.sin(r)
      return (
        <ellipse key={i} cx={cx} cy={cy} rx="3.5" ry="5.5"
          transform={`rotate(${deg} ${cx} ${cy})`}
          fill={color} fillOpacity="0.55" />
      )
    })}

    {/* Bead dots along borders */}
    <circle cx="6" cy="55" r="2.5" fill={color} />
    <circle cx="6" cy="74" r="2.5" fill={color} />
    <circle cx="55" cy="6" r="2.5" fill={color} />
    <circle cx="74" cy="6" r="2.5" fill={color} />

    {/* Scroll curls at ends */}
    <path d="M6 88 Q0 88 0 82 Q0 76 6 76" stroke={color} strokeWidth="1.6" />
    <path d="M88 6 Q88 0 82 0 Q76 0 76 6" stroke={color} strokeWidth="1.6" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// LOTUS  (for blessing section + bottom strip)
// ─────────────────────────────────────────────────────────────────────────────

const Lotus = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 80 72" width={size} height={size * 72 / 80} fill="none">
    {/* Center petal — tall and narrow */}
    <path d="M40 62 Q30 46 40 18 Q50 46 40 62Z"
      fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1" />
    {/* Inner side petals */}
    <path d="M40 58 Q22 44 26 20 Q34 38 40 58Z"
      fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
    <path d="M40 58 Q58 44 54 20 Q46 38 40 58Z"
      fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
    {/* Outer petals — wide, spread */}
    <path d="M40 52 Q14 40 18 14 Q28 36 40 52Z"
      fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.7" />
    <path d="M40 52 Q66 40 62 14 Q52 36 40 52Z"
      fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.7" />
    {/* Lowest petals — nearly horizontal */}
    <path d="M40 46 Q10 36 14 12 Q24 34 40 46Z"
      fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.6" />
    <path d="M40 46 Q70 36 66 12 Q56 34 40 46Z"
      fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.6" />
    {/* Water leaves */}
    <path d="M40 63 Q26 70 18 66 Q28 60 40 63Z"
      fill={color} fillOpacity="0.4" />
    <path d="M40 63 Q54 70 62 66 Q52 60 40 63Z"
      fill={color} fillOpacity="0.4" />
    {/* Stem */}
    <path d="M40 64 L40 72" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Center dot */}
    <circle cx="40" cy="40" r="3" fill={color} fillOpacity="0.8" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// GOLD DIVIDER WITH DIAMOND
// ─────────────────────────────────────────────────────────────────────────────

const Divider = ({ color }: { color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
    <div style={{ height: '1.5px', width: '140px', background: `linear-gradient(to right, transparent, ${color})` }} />
    <svg viewBox="0 0 16 16" width="13" height="13"><polygon points="8,1 15,8 8,15 1,8" fill={color} /></svg>
    <div style={{ height: '1.5px', width: '140px', background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// ICON BADGE  (circular coloured background)
// ─────────────────────────────────────────────────────────────────────────────

const Badge = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div style={{
    width: 62, height: 62, borderRadius: '50%',
    background: bg,
    flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 3px 10px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.12)',
  }}>
    {children}
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// GRID DETAIL CELL
// ─────────────────────────────────────────────────────────────────────────────

interface CellProps {
  badge: React.ReactNode
  label: string
  value: string
  labelColor: string
  valueColor: string
  valueBold?: boolean
  valueSize?: number
  borderRight?: boolean
  borderBottom?: boolean
  borderColor: string
}

const Cell = ({
  badge, label, value, labelColor, valueColor,
  valueBold = true, valueSize = 22,
  borderRight, borderBottom, borderColor,
}: CellProps) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '20px',
    padding: '0 28px',
    borderRight: borderRight ? `1px dashed ${borderColor}` : 'none',
    borderBottom: borderBottom ? `1px dashed ${borderColor}` : 'none',
  }}>
    {badge}
    <div>
      <div style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px',
        textTransform: 'uppercase', color: labelColor, marginBottom: '7px',
      }}>{label}</div>
      <div style={{
        fontSize: `${valueSize}px`,
        fontWeight: valueBold ? 700 : 400,
        color: valueColor, lineHeight: 1.25,
      }}>{value}</div>
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// GOPURAM PLACEHOLDER  (shown when no temple image is uploaded)
// ─────────────────────────────────────────────────────────────────────────────

const GopuramPlaceholder = ({ isLight }: { isLight: boolean }) => {
  const stone = isLight ? '#C4A882' : '#2A3F58'
  const shadow = isLight ? '#9A7850' : '#1A2B3E'
  const gold = isLight ? '#D4A830' : '#5A88A8'
  const sky = isLight ? '#C8E8F8' : '#0A1628'

  return (
    <svg viewBox="0 0 180 240" width="180" height="240">
      <defs>
        <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky} />
          <stop offset="100%" stopColor={isLight ? '#F5E8CC' : '#0D1B2E'} />
        </linearGradient>
        <linearGradient id="g-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stone} />
          <stop offset="100%" stopColor={shadow} />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="180" height="240" fill="url(#g-sky)" />

      {/* Trees / greenery (left & right) */}
      <ellipse cx="22" cy="195" rx="16" ry="28" fill={isLight ? '#5A8A3A' : '#2A4A2A'} opacity="0.6" />
      <ellipse cx="158" cy="195" rx="16" ry="28" fill={isLight ? '#5A8A3A' : '#2A4A2A'} opacity="0.6" />
      <rect x="19" y="210" width="6" height="30" fill={isLight ? '#8B6020' : '#3A4A2A'} opacity="0.6" />
      <rect x="155" y="210" width="6" height="30" fill={isLight ? '#8B6020' : '#3A4A2A'} opacity="0.6" />

      {/* Base platform */}
      <rect x="8" y="210" width="164" height="30" rx="2" fill="url(#g-stone)" />
      <rect x="14" y="206" width="152" height="8" fill={stone} />

      {/* Gopuram tiers — each narrower as they go up */}
      {/* Tier 1 (widest) */}
      <rect x="20" y="180" width="140" height="32" rx="2" fill="url(#g-stone)" />
      <path d="M20 180 L90 172 L160 180" fill={shadow} opacity="0.3" />
      {/* Tier 2 */}
      <rect x="30" y="150" width="120" height="34" rx="2" fill="url(#g-stone)" />
      <path d="M30 150 L90 143 L150 150" fill={shadow} opacity="0.3" />
      {/* Tier 3 */}
      <rect x="40" y="122" width="100" height="32" rx="2" fill="url(#g-stone)" />
      {/* Tier 4 */}
      <rect x="50" y="96" width="80" height="30" rx="2" fill="url(#g-stone)" />
      {/* Tier 5 */}
      <rect x="60" y="74" width="60" height="26" rx="2" fill="url(#g-stone)" />
      {/* Tier 6 */}
      <rect x="68" y="56" width="44" height="22" rx="2" fill="url(#g-stone)" />
      {/* Neck */}
      <rect x="76" y="40" width="28" height="20" rx="2" fill="url(#g-stone)" />
      {/* Kalash (pot) */}
      <ellipse cx="90" cy="37" rx="14" ry="9" fill={gold} />
      <ellipse cx="90" cy="30" rx="9" ry="6" fill={gold} />
      <ellipse cx="90" cy="24" rx="6" ry="5" fill={gold} />
      <ellipse cx="90" cy="18" rx="4" ry="4" fill={gold} />
      {/* Trident / flag pole */}
      <line x1="90" y1="14" x2="90" y2="2" stroke={gold} strokeWidth="2.5" />
      <path d="M87 8 L90 2 L93 8" fill={gold} />
      <path d="M85 7 L84 4 M95 7 L96 4" stroke={gold} strokeWidth="1.5" />

      {/* Gold decorative bands on each tier */}
      {[186, 164, 136, 110, 84, 62].map((y, i) => (
        <line key={i} x1={20 + i * 10} y1={y} x2={160 - i * 10} y2={y}
          stroke={gold} strokeWidth="1" opacity="0.6" />
      ))}

      {/* Small decorative arched niches on tier 1 */}
      {[40, 65, 90, 115, 140].map((x, i) => (
        <g key={i}>
          <path d={`M${x - 8} 198 L${x - 8} 188 Q${x} 183 ${x + 8} 188 L${x + 8} 198`}
            fill={shadow} opacity="0.4" />
        </g>
      ))}

      {/* Temple label */}
      <text x="90" y="237" textAnchor="middle" fontSize="8" fontFamily="serif"
        fill={gold} letterSpacing="0.5">Sri Balagurunadheeswara</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BELL DECORATION
// ─────────────────────────────────────────────────────────────────────────────

const BellDecor = ({ color, isLight }: { color: string; isLight: boolean }) => {
  const bellFill = isLight ? '#D4A830' : '#5A7A9A'
  const bellSheen = isLight ? '#F0C840' : '#7A9ABE'
  const leafFill = isLight ? '#5A8A3A' : '#3A5A3A'

  return (
    <svg viewBox="0 0 120 220" width="110" height="220" fill="none">
      {/* Chain links */}
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx="60" cy={14 + i * 14} rx="5" ry="7"
          stroke={color} strokeWidth="1.8" fill="none" />
      ))}

      {/* Green leaves hanging from chain */}
      <path d="M60 30 Q38 40 32 58 Q48 50 60 30Z" fill={leafFill} opacity="0.75" />
      <path d="M60 30 Q82 40 88 58 Q72 50 60 30Z" fill={leafFill} opacity="0.75" />
      <path d="M60 42 Q34 56 30 76 Q48 64 60 42Z" fill={leafFill} opacity="0.6" />
      <path d="M60 42 Q86 56 90 76 Q72 64 60 42Z" fill={leafFill} opacity="0.6" />

      {/* Bell body */}
      <path d="M60 80 Q32 88 28 118 Q24 145 22 162 L98 162 Q96 145 92 118 Q88 88 60 80Z"
        fill={bellFill} />
      {/* Bell sheen highlight */}
      <path d="M48 92 Q38 110 38 136" stroke={bellSheen} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <path d="M54 90 Q46 106 46 126" stroke={bellSheen} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />

      {/* Decorative band on bell */}
      <path d="M28 128 Q60 120 92 128" stroke={color} strokeWidth="2" fill="none" />
      {/* Band ornament dots */}
      {[38, 52, 60, 68, 82].map((x, i) => (
        <circle key={i} cx={x} cy={124} r="2.5" fill={color} opacity="0.8" />
      ))}

      {/* Bell rim */}
      <path d="M22 162 Q60 172 98 162 Q96 168 60 172 Q24 168 22 162Z" fill={isLight ? '#B8921A' : '#4A6A8A'} />
      <ellipse cx="60" cy="162" rx="38" ry="9" stroke={color} strokeWidth="1.5" />

      {/* Clapper */}
      <line x1="60" y1="162" x2="60" y2="184" stroke={color} strokeWidth="3" />
      <ellipse cx="60" cy="188" rx="9" ry="6" fill={isLight ? '#B8921A' : '#4A6A8A'} stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM LOTUS STRIP
// ─────────────────────────────────────────────────────────────────────────────

const LotusStrip = ({ color, bg }: { color: string; bg: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '0px', background: bg, padding: '6px 0 2px', overflow: 'hidden',
  }}>
    {Array.from({ length: 14 }).map((_, i) => (
      <Lotus key={i} color={color} size={30} />
    ))}
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${parseInt(d)} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1]} ${y}`
}

function urgColor(days: number): string {
  if (days < 0)  return '#DC2626'
  if (days <= 7)  return '#D97706'
  if (days <= 30) return '#B8860B'
  return '#16A34A'
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RENDERER
// One component — three templates are config/data only, no duplicated logic.
// Rendered off-screen at exactly 1080×1350; captured after document.fonts.ready.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  devotee: DevoteeRecord
  template: TemplateConfig
  settings: TempleSettings
  qrDataUrl: string
}

const TemplateRenderer = React.forwardRef<HTMLDivElement, Props>(
  ({ devotee, template, settings, qrDataUrl }, ref) => {
    const s = template.styles
    const isLight = template.id !== 'shiva'
    const days = devotee.daysRemaining
    const uc = urgColor(days)
    const daysStr = days < 0 ? `${Math.abs(days)} days overdue` : days === 0 ? 'Expires today' : `${days} days`

    // Parchment-style crosshatch texture data URL
    const textureUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Crect width='6' height='6' fill='none'/%3E%3Cpath d='M0 0 L6 6 M-1 5 L1 7 M5 -1 L7 1' stroke='rgba(160%2C120%2C60%2C0.07)' stroke-width='0.6'/%3E%3C/svg%3E")`

    return (
      <div ref={ref} style={{
        width: 1080, height: 1350,
        position: 'relative', overflow: 'hidden',
        background: s.outerBg,
        fontFamily: s.fontFamily,
        boxSizing: 'border-box',
      }}>
        {/* Parchment texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: textureUrl, pointerEvents: 'none' }} />
        {/* Colour depth gradient */}
        <div style={{ position: 'absolute', inset: 0, background: s.bgPattern, pointerEvents: 'none' }} />

        {/* ── BORDER FRAME ───────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 10, border: `3px solid ${s.borderColor}`, borderRadius: 4, pointerEvents: 'none', zIndex: 20 }} />
        <div style={{ position: 'absolute', inset: 19, border: `1px solid ${s.borderColor}`, opacity: 0.4, pointerEvents: 'none', zIndex: 20 }} />

        {/* Corner ornaments */}
        {[
          { top: 0, left: 0, transform: 'none' },
          { top: 0, right: 0, transform: 'scaleX(-1)' },
          { bottom: 0, left: 0, transform: 'scaleY(-1)' },
          { bottom: 0, right: 0, transform: 'scale(-1,-1)' },
        ].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, zIndex: 21 }}>
            <Corner color={s.borderColor} />
          </div>
        ))}

        {/* ── CONTENT COLUMN ─────────────────────────────────────── */}
        {/* Uses flex-column. Grid section gets flex:1 to fill leftover height. */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%', display: 'flex', flexDirection: 'column',
          padding: '30px 44px 0',
        }}>

          {/* ── A. HEADER (fixed 260px) ────────────────────────── */}
          <div style={{ height: 260, flexShrink: 0, display: 'flex', gap: 24, alignItems: 'center' }}>

            {/* Left: temple image */}
            <div style={{
              width: 172, height: 244, flexShrink: 0,
              borderRadius: 10, overflow: 'hidden',
              border: `2.5px solid ${s.borderColor}`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.18)`,
            }}>
              {settings.templeImageBase64
                ? <img src={settings.templeImageBase64} alt="Temple"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                : <GopuramPlaceholder isLight={isLight} />}
            </div>

            {/* Centre: logo + name + Om */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {/* Logo circle */}
              <div style={{
                width: 82, height: 82, borderRadius: '50%',
                border: `2.5px solid ${s.borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isLight ? 'rgba(200,168,75,0.14)' : 'rgba(80,120,180,0.14)',
                overflow: 'hidden', boxShadow: `0 2px 10px ${s.borderColor}44`,
              }}>
                {settings.templeLogoBase64
                  ? <img src={settings.templeLogoBase64} alt="Logo"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (
                    // Shivalinga placeholder
                    <svg viewBox="0 0 70 70" width="68" height="68">
                      <ellipse cx="35" cy="52" rx="24" ry="9" fill={isLight ? '#8B1A1A' : '#2A3F58'} opacity="0.3" />
                      <rect x="16" y="36" width="38" height="20" rx="3" fill={isLight ? '#8B1A1A' : '#2A4060'} />
                      <ellipse cx="35" cy="30" rx="14" ry="18" fill={isLight ? '#6B1414' : '#1E3450'} />
                      {/* Cloth */}
                      <path d="M21 44 Q35 48 49 44 Q49 54 35 56 Q21 54 21 44Z" fill={isLight ? '#C8A84B' : '#5A80A0'} opacity="0.6" />
                      {/* Trident */}
                      <line x1="35" y1="12" x2="35" y2="2" stroke={isLight ? '#C8A84B' : '#8AAEC8'} strokeWidth="2.5" />
                      <path d="M32 8 L35 2 L38 8" fill={isLight ? '#C8A84B' : '#8AAEC8'} />
                      <path d="M30 7 L29 4 M40 7 L41 4" stroke={isLight ? '#C8A84B' : '#8AAEC8'} strokeWidth="1.5" />
                    </svg>
                  )}
              </div>

              {/* Temple name — large, bold, potentially 2 lines */}
              <div style={{
                fontFamily: s.headingFont, fontSize: 30, fontWeight: 900,
                color: s.templeNameColor, letterSpacing: 1, textTransform: 'uppercase',
                textAlign: 'center', lineHeight: 1.15,
              }}>
                {settings.templeName}
              </div>

              <Divider color={s.borderColor} />

              <div style={{
                fontFamily: s.headingFont, fontSize: 18, fontStyle: 'italic',
                color: s.omNameColor, letterSpacing: 0.8,
              }}>
                || Om Namah Shivaya ||
              </div>
            </div>

            {/* Right: bell */}
            <div style={{ width: 110, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BellDecor color={s.borderColor} isLight={isLight} />
            </div>
          </div>

          {/* ── B. GREETING (fixed ~148px) ─────────────────────── */}
          <div style={{ flexShrink: 0, textAlign: 'center', padding: '18px 36px 6px' }}>
            <div style={{ fontFamily: s.headingFont, fontSize: 32, color: s.greetingTextColor, marginBottom: 7 }}>
              Namaskara{' '}
              <span style={{ color: s.greetingNameColor, fontWeight: 800 }}>{devotee.name}</span>,
            </div>
            <div style={{ fontSize: 15, color: s.greetingTextColor, opacity: 0.8, lineHeight: 1.6, maxWidth: 660, margin: '0 auto' }}>
              We sincerely thank you for your devotion and continued support towards the temple.
            </div>
          </div>

          <div style={{ flexShrink: 0, padding: '10px 0 12px' }}>
            <Divider color={s.borderColor} />
          </div>

          {/* ── C. REMINDER ROW (fixed ~78px) ──────────────────── */}
          <div style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 18,
            padding: '0 16px 14px',
          }}>
            <Badge bg={s.reminderIconBg}>
              <IconCalendar />
            </Badge>
            <div style={{ fontSize: 17, color: s.greetingTextColor, lineHeight: 1.5 }}>
              This is a gentle reminder that your seva/service is due for{' '}
              <span style={{ fontWeight: 700, color: s.reminderHighlight }}>renewal.</span>
            </div>
          </div>

          {/* ── D. DETAIL GRID  (flex:1 — absorbs all leftover height) */}
          <div style={{
            flex: 1,                              // ← KEY: fills remaining height
            margin: '0 0 14px',
            borderRadius: 14, overflow: 'hidden',
            border: `1.8px solid ${s.gridBorderColor}`,
            background: s.gridBg,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',     // equal rows
            minHeight: 300,
          }}>
            <Cell badge={<Badge bg={s.iconCircle1}><IconPray /></Badge>}
              label="Service" value={devotee.service}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              borderRight borderBottom borderColor={s.gridBorderColor} />
            <Cell badge={<Badge bg={s.iconCircle2}><IconCalendar /></Badge>}
              label="Expiry Date" value={fmtDate(devotee.expiryDate)}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              borderBottom borderColor={s.gridBorderColor} />
            <Cell badge={<Badge bg={s.iconCircle1}><IconClock /></Badge>}
              label="Days Remaining" value={daysStr}
              labelColor={s.gridLabelColor} valueColor={uc}
              borderRight borderBottom borderColor={s.gridBorderColor} />
            <Cell badge={<Badge bg={s.iconCircle2}><IconRupee /></Badge>}
              label="Amount" value={`₹ ${devotee.amount}`}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              borderBottom borderColor={s.gridBorderColor} />
            <Cell badge={<Badge bg={s.iconCircle1}><IconDome /></Badge>}
              label="Devotee ID" value={devotee.devoteeId || devotee.mobile}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              borderRight borderColor={s.gridBorderColor} />
            <Cell badge={<Badge bg={s.iconCircle2}><IconHeart /></Badge>}
              label="Thank You"
              value="For being a part of our temple family."
              valueBold={false} valueSize={15}
              labelColor={s.gridLabelColor} valueColor={s.gridValueColor}
              borderColor={s.gridBorderColor} />
          </div>

          {/* ── E. RENEWAL SECTION (fixed ~168px) ──────────────── */}
          <div style={{ flexShrink: 0, padding: '0 0 14px' }}>
            {/* Lotus + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Lotus color={s.lotusColor} size={36} />
              <div style={{ fontSize: 15, color: s.greetingTextColor, opacity: 0.85 }}>
                You may renew your seva/service easily using the link below.
              </div>
            </div>
            {/* Button row + QR */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
              {/* RENEW NOW pill */}
              <div style={{
                flex: 1, background: s.renewBtnBg, borderRadius: 12,
                display: 'flex', alignItems: 'center',
                border: `1.5px solid ${s.borderColor}`,
                overflow: 'hidden', height: 70,
              }}>
                <div style={{
                  width: 70, height: '100%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRight: '1.5px solid rgba(255,255,255,0.18)',
                }}>
                  <IconGlobe />
                </div>
                <div style={{ padding: '0 22px', borderRight: '1.5px solid rgba(255,255,255,0.18)', flex: '0 0 auto' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.renewBtnText, letterSpacing: 2 }}>
                    RENEW NOW
                  </div>
                </div>
                <div style={{ padding: '0 18px', flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    fontSize: 12, color: s.renewBtnText, opacity: 0.75,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {devotee.renewalLink || settings.templeWebsite || 'Contact temple for renewal'}
                  </div>
                </div>
              </div>
              {/* QR code */}
              <div style={{
                width: 70, height: 70, flexShrink: 0,
                borderRadius: 10, border: `1.8px solid ${s.borderColor}`,
                background: '#fff', padding: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={qrDataUrl} alt="QR" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>

          {/* ── F. BLESSING FOOTER (fixed ~128px) ──────────────── */}
          <div style={{
            flexShrink: 0,
            borderTop: `1px solid ${s.borderColor}40`,
            padding: '14px 40px 10px',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
              <Lotus color={s.lotusColor} size={46} />
              <div style={{ flex: 1, fontSize: 15, color: s.blessingTextColor, lineHeight: 1.65, fontStyle: 'italic' }}>
                {settings.blessingMessage}
              </div>
              <Lotus color={s.lotusColor} size={46} />
            </div>
            <div style={{
              fontFamily: s.headingFont, fontSize: 20, fontStyle: 'italic',
              color: s.footerOmColor, letterSpacing: 2,
            }}>
              ✦ Om Namah Shivaya ✦
            </div>
            {(settings.templePhone || settings.templeWebsite) && (
              <div style={{ fontSize: 11, color: s.greetingTextColor, opacity: 0.5, marginTop: 5 }}>
                {[settings.templePhone, settings.templeWebsite].filter(Boolean).join('  ·  ')}
              </div>
            )}
          </div>

          {/* ── G. BOTTOM LOTUS STRIP ──────────────────────────── */}
          <div style={{ margin: '0 -44px', flexShrink: 0 }}>
            <LotusStrip color={s.borderColor} bg={s.bottomStripBg} />
          </div>

        </div>
      </div>
    )
  }
)

TemplateRenderer.displayName = 'TemplateRenderer'
export default TemplateRenderer
