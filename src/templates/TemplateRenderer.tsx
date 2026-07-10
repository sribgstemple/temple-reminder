import React from 'react'
import type { DevoteeRecord, TemplateConfig, TempleSettings } from '../types'

// ── Inline SVG icons (white on colored circles) ────────────────────────────

const SvgPray = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M9 6c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v6l-3 3-3-3V6z"/>
    <path d="M12 15v4M9 19h6"/>
    <path d="M7 9L5 7M17 9l2-2"/>
  </svg>
)

const SvgCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M3 9h18M8 2v4m8-4v4"/>
    <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/>
  </svg>
)

const SvgClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3"/>
  </svg>
)

const SvgRupee = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" width="22" height="22">
    <path d="M6 4h12M6 9h12M6 4c0 5 4 9 6 9s6-4 6-9M12 13v7"/>
  </svg>
)

const SvgDome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <path d="M4 20h16M6 20v-6M18 20v-6M12 4 Q6 6 6 14M12 4 Q18 6 18 14M12 4v-2M10 2h4"/>
    <path d="M8 14h8"/>
  </svg>
)

const SvgHeart = () => (
  <svg viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" width="22" height="22">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const SvgGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <circle cx="12" cy="12" r="9"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// ── Decorative SVG elements ────────────────────────────────────────────────

// Lotus flower SVG (for blessing section and bottom strip)
const LotusSvg = ({ color, size = 40 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 60 50" width={size} height={size * 50 / 60} fill="none">
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
      {/* Center petal */}
      <path d="M30 42 Q20 30 30 14 Q40 30 30 42Z" fill={color} fillOpacity="0.25"/>
      {/* Left petals */}
      <path d="M30 38 Q14 30 18 14 Q26 24 30 38Z" fill={color} fillOpacity="0.20"/>
      <path d="M30 36 Q10 24 16 10 Q22 22 30 36Z" fill={color} fillOpacity="0.15"/>
      {/* Right petals */}
      <path d="M30 38 Q46 30 42 14 Q34 24 30 38Z" fill={color} fillOpacity="0.20"/>
      <path d="M30 36 Q50 24 44 10 Q38 22 30 36Z" fill={color} fillOpacity="0.15"/>
      {/* Stem */}
      <path d="M30 42 L30 48"/>
      <path d="M24 48 Q30 44 36 48"/>
    </g>
  </svg>
)

// Ornamental corner flourish (top-left; rotate for others)
const CornerOrnament = ({ color, size = 72 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} fill="none">
    <path d="M4 68 L4 18 Q4 4 18 4 L68 4" stroke={color} strokeWidth="2.5" fill="none"/>
    <path d="M12 68 L12 22 Q12 12 22 12 L68 12" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Corner diamond */}
    <rect x="9" y="9" width="14" height="14" rx="1" transform="rotate(45 16 16)" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="16" r="3" fill={color}/>
    {/* End scroll curls */}
    <path d="M4 68 Q4 74 10 74 Q16 74 16 68" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M68 4 Q74 4 74 10 Q74 16 68 16" stroke={color} strokeWidth="1.5" fill="none"/>
    {/* Mid ornament bead */}
    <circle cx="4" cy="38" r="2.5" fill={color}/>
    <circle cx="38" cy="4" r="2.5" fill={color}/>
  </svg>
)

// Small divider diamond
const DiamondDivider = ({ color }: { color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    <div style={{ height: '1px', width: '120px', background: `linear-gradient(to right, transparent, ${color})` }}/>
    <svg viewBox="0 0 20 20" width="14" height="14" fill={color}>
      <polygon points="10,1 19,10 10,19 1,10"/>
    </svg>
    <div style={{ height: '1px', width: '120px', background: `linear-gradient(to left, transparent, ${color})` }}/>
  </div>
)

// Bottom lotus strip
const LotusStrip = ({ color, bg }: { color: string; bg: string }) => {
  const count = 13
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      background: bg,
      padding: '6px 0 4px',
      flexWrap: 'nowrap',
      overflow: 'hidden',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <LotusSvg key={i} color={color} size={28} />
      ))}
    </div>
  )
}

// ── Icon circle badge ──────────────────────────────────────────────────────

const IconBadge = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div style={{
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: `0 2px 8px ${bg}66`,
  }}>
    {children}
  </div>
)

// ── Grid detail cell ───────────────────────────────────────────────────────

interface GridCellProps {
  icon: React.ReactNode
  label: string
  value: string
  labelColor: string
  valueColor: string
  borderRight?: boolean
  borderBottom?: boolean
  borderColor: string
}

const GridCell = ({ icon, label, value, labelColor, valueColor, borderRight, borderBottom, borderColor }: GridCellProps) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    padding: '20px 24px',
    borderRight: borderRight ? `1px dashed ${borderColor}` : 'none',
    borderBottom: borderBottom ? `1px dashed ${borderColor}` : 'none',
  }}>
    {icon}
    <div>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: labelColor,
        marginBottom: '5px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '19px',
        fontWeight: 700,
        color: valueColor,
        lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  </div>
)

// ── Util ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${parseInt(d)} ${months[parseInt(m,10)-1]} ${y}`
}

// ── Main renderer ──────────────────────────────────────────────────────────

interface TemplateRendererProps {
  devotee: DevoteeRecord
  template: TemplateConfig
  settings: TempleSettings
  qrDataUrl: string
}

/**
 * Single reusable renderer. All three templates are config/data only —
 * no duplicated rendering logic.
 *
 * Rendered off-screen at 1080×1350px; captured by html-to-image after
 * document.fonts.ready resolves (guard lives in lib/capture.ts).
 */
const TemplateRenderer = React.forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ devotee, template, settings, qrDataUrl }, ref) => {
    const s = template.styles
    const days = devotee.daysRemaining
    const isLight = template.id !== 'shiva'

    const urgencyColor = days < 0 ? '#DC2626' : days <= 7 ? '#D97706' : days <= 30 ? '#CA8A04' : '#16A34A'

    const daysLabel = days < 0
      ? `${Math.abs(days)} days overdue`
      : days === 0 ? 'Expires today'
      : `${days} days`

    // Greeting: personalise with devotee name coloured
    const greetingName = devotee.name

    return (
      <div
        ref={ref}
        style={{
          width: '1080px',
          height: '1350px',
          position: 'relative',
          overflow: 'hidden',
          background: s.outerBg,
          fontFamily: s.fontFamily,
          boxSizing: 'border-box',
        }}
      >
        {/* Background texture overlay */}
        <div style={{ position: 'absolute', inset: 0, background: s.bgPattern, pointerEvents: 'none' }} />

        {/* ── ORNAMENTAL BORDER FRAME ────────────────────────────── */}
        {/* Outer line */}
        <div style={{ position: 'absolute', inset: '10px', border: `2.5px solid ${s.borderColor}`, borderRadius: '4px', pointerEvents: 'none', zIndex: 20 }} />
        {/* Inner line */}
        <div style={{ position: 'absolute', inset: '18px', border: `1px solid ${s.borderColor}`, borderRadius: '2px', opacity: 0.45, pointerEvents: 'none', zIndex: 20 }} />

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 21 }}>
          <CornerOrnament color={s.borderColor} />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 21, transform: 'scaleX(-1)' }}>
          <CornerOrnament color={s.borderColor} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 21, transform: 'scaleY(-1)' }}>
          <CornerOrnament color={s.borderColor} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 21, transform: 'scale(-1,-1)' }}>
          <CornerOrnament color={s.borderColor} />
        </div>

        {/* ── INNER CONTENT (padded from border) ────────────────── */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', padding: '28px 36px 0' }}>

          {/* ── HEADER: temple image | logo+name | bell ─────────── */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', height: '220px', flexShrink: 0 }}>

            {/* Left: temple image */}
            <div style={{
              width: '160px',
              height: '210px',
              flexShrink: 0,
              borderRadius: '8px',
              overflow: 'hidden',
              border: `2px solid ${s.borderColor}`,
              background: isLight
                ? 'linear-gradient(160deg, #E8D8A8 0%, #C8B080 100%)'
                : 'linear-gradient(160deg, #1A2B44 0%, #0D1A2E 100%)',
            }}>
              {settings.templeImageBase64 ? (
                <img src={settings.templeImageBase64} alt="Temple" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              ) : (
                /* Placeholder gopuram SVG */
                <svg viewBox="0 0 160 210" width="160" height="210">
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isLight ? '#87CEEB' : '#0A1628'}/>
                      <stop offset="100%" stopColor={isLight ? '#FFF8E7' : '#1A2B44'}/>
                    </linearGradient>
                  </defs>
                  <rect width="160" height="210" fill="url(#skyGrad)"/>
                  {/* Gopuram silhouette */}
                  <g fill={isLight ? '#8B1A1A' : '#3A5A7A'} opacity="0.9">
                    {/* Base */}
                    <rect x="20" y="170" width="120" height="40"/>
                    {/* First tier */}
                    <rect x="30" y="140" width="100" height="35"/>
                    {/* Second tier */}
                    <rect x="40" y="112" width="80" height="32"/>
                    {/* Third tier */}
                    <rect x="50" y="88" width="60" height="28"/>
                    {/* Fourth tier */}
                    <rect x="58" y="68" width="44" height="24"/>
                    {/* Fifth tier */}
                    <rect x="64" y="52" width="32" height="20"/>
                    {/* Spire */}
                    <rect x="72" y="36" width="16" height="20"/>
                    {/* Top kalash */}
                    <ellipse cx="80" cy="33" rx="10" ry="7"/>
                    <ellipse cx="80" cy="26" rx="6" ry="5"/>
                    <ellipse cx="80" cy="20" rx="4" ry="4"/>
                    <line x1="80" y1="16" x2="80" y2="8" stroke={isLight ? '#C8A84B' : '#8AAEC8'} strokeWidth="2"/>
                  </g>
                  {/* Gold decorative lines on tiers */}
                  <g stroke={isLight ? '#C8A84B' : '#6A90B0'} strokeWidth="1" opacity="0.6">
                    <line x1="30" y1="155" x2="130" y2="155"/>
                    <line x1="40" y1="126" x2="120" y2="126"/>
                    <line x1="50" y1="100" x2="110" y2="100"/>
                    <line x1="58" y1="78" x2="102" y2="78"/>
                  </g>
                  {/* Label */}
                  <text x="80" y="205" textAnchor="middle" fontSize="9" fill={isLight ? '#C8A84B' : '#6A90B0'} fontFamily="serif">Sri Balagurunadheeswara</text>
                </svg>
              )}
            </div>

            {/* Center: logo + temple name + Om Namah Shivaya */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '10px', paddingTop: '8px' }}>
              {/* Logo */}
              <div style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                border: `2px solid ${s.borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isLight ? 'rgba(200,168,75,0.12)' : 'rgba(100,150,200,0.12)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                {settings.templeLogoBase64 ? (
                  <img src={settings.templeLogoBase64} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  /* Shivalinga placeholder */
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    <ellipse cx="30" cy="44" rx="22" ry="8" fill={isLight ? '#8B1A1A' : '#3A5A7A'} opacity="0.3"/>
                    <rect x="14" y="28" width="32" height="18" rx="3" fill={isLight ? '#8B1A1A' : '#3A5A7A'}/>
                    <ellipse cx="30" cy="24" rx="12" ry="16" fill={isLight ? '#6B1414' : '#2A4060'}/>
                    <path d="M26 10 L30 2 L34 10" stroke={isLight ? '#C8A84B' : '#8AAEC8'} strokeWidth="2" fill="none"/>
                    <circle cx="30" cy="2" r="3" fill={isLight ? '#C8A84B' : '#8AAEC8'}/>
                  </svg>
                )}
              </div>

              {/* Temple name */}
              <div style={{
                fontFamily: s.headingFont,
                fontSize: '28px',
                fontWeight: 800,
                color: s.templeNameColor,
                lineHeight: 1.15,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                {settings.templeName}
              </div>

              {/* Gold divider with diamond */}
              <DiamondDivider color={s.borderColor} />

              {/* Om Namah Shivaya */}
              <div style={{
                fontFamily: s.headingFont,
                fontSize: '17px',
                fontStyle: 'italic',
                color: s.omNameColor,
                letterSpacing: '0.5px',
              }}>
                || Om Namah Shivaya ||
              </div>
            </div>

            {/* Right: decorative bell */}
            <div style={{ width: '130px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6px' }}>
              <svg viewBox="0 0 100 180" width="100" height="180">
                {/* Chain links */}
                {[0,1,2,3].map(i => (
                  <ellipse key={i} cx="50" cy={12 + i * 12} rx="4" ry="6" fill="none" stroke={s.borderColor} strokeWidth="2"/>
                ))}
                {/* Bell body */}
                <path d={`M50 55 Q25 62 22 90 Q18 115 15 130 L85 130 Q82 115 78 90 Q75 62 50 55Z`}
                  fill={isLight ? '#C8A84B' : '#5A7A9A'} stroke={s.borderColor} strokeWidth="1.5"/>
                {/* Bell sheen */}
                <path d="M42 65 Q36 80 36 100" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" fill="none"/>
                {/* Bell rim */}
                <ellipse cx="50" cy="130" rx="35" ry="8" fill={isLight ? '#B8921A' : '#4A6A8A'} stroke={s.borderColor} strokeWidth="1"/>
                {/* Clapper */}
                <line x1="50" y1="130" x2="50" y2="148" stroke={s.borderColor} strokeWidth="2.5"/>
                <circle cx="50" cy="151" r="7" fill={isLight ? '#B8921A' : '#4A6A8A'} stroke={s.borderColor} strokeWidth="1"/>
                {/* Band decoration */}
                <path d="M22 108 Q50 100 78 108" stroke={s.borderColor} strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </div>

          {/* ── GREETING ──────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', padding: '18px 40px 12px', flexShrink: 0 }}>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '30px',
              color: s.greetingTextColor,
              marginBottom: '6px',
            }}>
              Namaskara{' '}
              <span style={{ color: s.greetingNameColor, fontWeight: 700 }}>{greetingName}</span>,
            </div>
            <div style={{
              fontSize: '15px',
              color: s.greetingTextColor,
              opacity: 0.8,
              lineHeight: 1.5,
              maxWidth: '620px',
              margin: '0 auto',
            }}>
              We sincerely thank you for your devotion and continued support towards the temple.
            </div>
          </div>

          <div style={{ flexShrink: 0, padding: '4px 0 12px' }}>
            <DiamondDivider color={s.borderColor} />
          </div>

          {/* ── RENEWAL REMINDER ROW ──────────────────────────────── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '0 48px 14px',
            flexShrink: 0,
          }}>
            <IconBadge bg={s.reminderIconBg}>
              <SvgCalendar />
            </IconBadge>
            <div style={{ fontSize: '16px', color: s.greetingTextColor, lineHeight: 1.5 }}>
              This is a gentle reminder that your seva/service is due for{' '}
              <span style={{ fontWeight: 700, color: s.reminderHighlight }}>renewal.</span>
            </div>
          </div>

          {/* ── DETAIL GRID ───────────────────────────────────────── */}
          <div style={{
            margin: '0 4px 14px',
            borderRadius: '12px',
            border: `1.5px solid ${s.gridBorderColor}`,
            background: s.gridBg,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            flexShrink: 0,
          }}>
            <GridCell
              icon={<IconBadge bg={s.iconCircle1}><SvgPray /></IconBadge>}
              label="Service"
              value={devotee.service}
              labelColor={s.gridLabelColor}
              valueColor={s.gridValueColor}
              borderRight borderBottom
              borderColor={s.gridBorderColor}
            />
            <GridCell
              icon={<IconBadge bg={s.iconCircle2}><SvgCalendar /></IconBadge>}
              label="Expiry Date"
              value={formatDate(devotee.expiryDate)}
              labelColor={s.gridLabelColor}
              valueColor={s.gridValueColor}
              borderBottom
              borderColor={s.gridBorderColor}
            />
            <GridCell
              icon={<IconBadge bg={s.iconCircle1}><SvgClock /></IconBadge>}
              label="Days Remaining"
              value={daysLabel}
              labelColor={s.gridLabelColor}
              valueColor={urgencyColor}
              borderRight borderBottom
              borderColor={s.gridBorderColor}
            />
            <GridCell
              icon={<IconBadge bg={s.iconCircle2}><SvgRupee /></IconBadge>}
              label="Amount"
              value={`₹ ${devotee.amount}`}
              labelColor={s.gridLabelColor}
              valueColor={s.gridValueColor}
              borderBottom
              borderColor={s.gridBorderColor}
            />
            <GridCell
              icon={<IconBadge bg={s.iconCircle1}><SvgDome /></IconBadge>}
              label="Devotee ID"
              value={devotee.devoteeId || devotee.mobile}
              labelColor={s.gridLabelColor}
              valueColor={s.gridValueColor}
              borderRight
              borderColor={s.gridBorderColor}
            />
            <GridCell
              icon={<IconBadge bg={s.iconCircle2}><SvgHeart /></IconBadge>}
              label="Thank You"
              value="For being a part of our temple family."
              labelColor={s.gridLabelColor}
              valueColor={s.gridValueColor}
              borderColor={s.gridBorderColor}
            />
          </div>

          {/* ── RENEWAL LINK SECTION ──────────────────────────────── */}
          <div style={{ padding: '0 4px 12px', flexShrink: 0 }}>
            {/* Lotus + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingLeft: '4px' }}>
              <LotusSvg color={s.lotusColor} size={32} />
              <div style={{ fontSize: '14px', color: s.greetingTextColor, opacity: 0.85 }}>
                You may renew your seva/service easily using the link below.
              </div>
            </div>

            {/* RENEW NOW button + QR */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Button */}
              <div style={{
                flex: 1,
                background: s.renewBtnBg,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                height: '64px',
                border: `1.5px solid ${s.borderColor}`,
              }}>
                <div style={{
                  width: '64px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  borderRight: `1.5px solid rgba(255,255,255,0.2)`,
                }}>
                  <SvgGlobe />
                </div>
                <div style={{ padding: '0 20px', flex: 1 }}>
                  <div style={{
                    fontFamily: s.fontFamily,
                    fontSize: '18px',
                    fontWeight: 800,
                    color: s.renewBtnText,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    RENEW NOW
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: s.renewBtnText,
                    opacity: 0.7,
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '480px',
                  }}>
                    {devotee.renewalLink || settings.templeWebsite || 'Contact temple for renewal'}
                  </div>
                </div>
              </div>

              {/* QR code */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                border: `1.5px solid ${s.borderColor}`,
                background: '#fff',
                padding: '4px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img src={qrDataUrl} alt="QR" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* ── BLESSING FOOTER ────────────────────────────────────── */}
          <div style={{
            flexShrink: 0,
            textAlign: 'center',
            padding: '6px 60px 10px',
            borderTop: `1px solid ${s.borderColor}40`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '8px' }}>
              <LotusSvg color={s.lotusColor} size={36} />
              <div style={{
                fontSize: '15px',
                color: s.blessingTextColor,
                lineHeight: 1.55,
                flex: 1,
                maxWidth: '680px',
              }}>
                {settings.blessingMessage}
              </div>
              <LotusSvg color={s.lotusColor} size={36} />
            </div>

            {/* Om Namah Shivaya */}
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '18px',
              fontStyle: 'italic',
              color: s.footerOmColor,
              letterSpacing: '1px',
            }}>
              ✦ Om Namah Shivaya ✦
            </div>

            {/* Temple contact */}
            {(settings.templePhone || settings.templeWebsite) && (
              <div style={{ fontSize: '12px', color: s.greetingTextColor, opacity: 0.55, marginTop: '6px', letterSpacing: '0.3px' }}>
                {[settings.templePhone, settings.templeWebsite].filter(Boolean).join('  ·  ')}
              </div>
            )}
          </div>

          {/* Spacer to push strip to bottom */}
          <div style={{ flex: 1 }} />

          {/* ── BOTTOM LOTUS STRIP ──────────────────────────────────── */}
          <div style={{ margin: '0 -36px', flexShrink: 0 }}>
            <LotusStrip color={s.borderColor} bg={s.bottomStripBg} />
          </div>
        </div>
      </div>
    )
  }
)

TemplateRenderer.displayName = 'TemplateRenderer'
export default TemplateRenderer
