import React from 'react'
import type { DevoteeRecord, TemplateConfig, TempleSettings } from '../types'

interface TemplateRendererProps {
  devotee: DevoteeRecord
  template: TemplateConfig
  settings: TempleSettings
  qrDataUrl: string
}

// Mandala SVG as inline data URL — subtle lotus/mandala pattern
const MANDALA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <g opacity="1" fill="none" stroke="currentColor" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180
      const x1 = 200 + 160 * Math.cos(angle)
      const y1 = 200 + 160 * Math.sin(angle)
      const x2 = 200 + 80 * Math.cos(angle + Math.PI / 12)
      const y2 = 200 + 80 * Math.sin(angle + Math.PI / 12)
      return `<line x1="200" y1="200" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" /><ellipse cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" rx="18" ry="8" transform="rotate(${i * 30 + 15} ${x2.toFixed(1)} ${y2.toFixed(1)})" />`
    }).join('')}
    <circle cx="200" cy="200" r="60" />
    <circle cx="200" cy="200" r="100" stroke-dasharray="6 8" />
    <circle cx="200" cy="200" r="150" stroke-dasharray="4 12" />
    <circle cx="200" cy="200" r="30" />
  </g>
</svg>`

const MANDALA_DATA_URL = `data:image/svg+xml,${encodeURIComponent(MANDALA_SVG)}`

// Bell SVG for Shiva theme
const BELL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M50 10 Q30 15 28 40 Q26 60 20 70 L80 70 Q74 60 72 40 Q70 15 50 10Z" />
    <line x1="50" y1="5" x2="50" y2="12" />
    <ellipse cx="50" cy="74" rx="12" ry="4" />
    <circle cx="50" cy="80" r="4" />
  </g>
</svg>`

const BELL_DATA_URL = `data:image/svg+xml,${encodeURIComponent(BELL_SVG)}`

// Om symbol for card
const OM_SYMBOL = 'ॐ'

function formatDate(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`
}

function urgencyColor(days: number, isShiva: boolean): string {
  if (days < 0) return isShiva ? '#FF6B6B' : '#DC2626'
  if (days <= 7) return isShiva ? '#FFB347' : '#D97706'
  if (days <= 30) return isShiva ? '#FFD700' : '#D4AF37'
  return isShiva ? '#90EE90' : '#16A34A'
}

/**
 * Single reusable template renderer.
 * Rendered at exactly 1080×1350px off-screen, then captured via html-to-image.
 * Three templates are config/data (templateConfigs.ts), not separate components.
 */
const TemplateRenderer = React.forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ devotee, template, settings, qrDataUrl }, ref) => {
    const s = template.styles
    const isShiva = template.id === 'shiva'
    const isMinimal = template.id === 'minimal'
    const days = devotee.daysRemaining
    const urg = urgencyColor(days, isShiva)

    const urgencyLabel = days < 0 ? 'EXPIRED' : days === 0 ? 'EXPIRES TODAY' : days <= 7 ? 'URGENT' : days <= 30 ? 'DUE SOON' : 'UPCOMING'

    // Decoration: mandala for classic/minimal, bells for shiva
    const decorSrc = isShiva ? BELL_DATA_URL : MANDALA_DATA_URL

    return (
      <div
        ref={ref}
        style={{
          width: '1080px',
          height: '1350px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: s.fontFamily,
          background: s.outerBg,
          boxSizing: 'border-box',
        }}
      >
        {/* Background pattern layer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: s.outerBgPattern,
          pointerEvents: 'none',
        }} />

        {/* Decorative motif — top center, large & faint */}
        <div style={{
          position: 'absolute',
          top: isShiva ? -60 : -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isShiva ? 320 : 480,
          height: isShiva ? 320 : 480,
          opacity: s.decorationOpacity,
          backgroundImage: `url("${decorSrc}")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: `sepia(1) saturate(3) hue-rotate(${isShiva ? 180 : 30}deg)`,
          pointerEvents: 'none',
        }} />

        {/* Decorative motif — bottom corners */}
        {[{ left: -60, bottom: -60 }, { right: -60, bottom: -60 }].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...pos,
            width: 200,
            height: 200,
            opacity: s.decorationOpacity * 0.7,
            backgroundImage: `url("${decorSrc}")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: `sepia(1) saturate(3) hue-rotate(${isShiva ? 180 : 30}deg)`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Outer gold/silver border frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: `6px solid transparent`,
          borderImage: `${s.borderGradient} 1`,
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        {/* Inner double-line border */}
        <div style={{
          position: 'absolute',
          inset: '18px',
          border: `1.5px solid ${s.borderColor}`,
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 10,
        }} />
        <div style={{
          position: 'absolute',
          inset: '24px',
          border: `0.5px solid ${s.borderColor}`,
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div style={{
          background: s.headerBg,
          padding: isMinimal ? '36px 56px 28px' : '32px 56px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderBottom: isMinimal ? `2px solid ${s.borderColor}` : 'none',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Temple Logo */}
          <div style={{
            width: '90px',
            height: '90px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: `2px solid ${s.accentColor}`,
            background: isMinimal ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            {settings.templeLogoBase64 ? (
              <img
                src={settings.templeLogoBase64}
                alt="Temple Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{
                fontSize: '42px',
                lineHeight: 1,
                color: isMinimal ? '#D4AF37' : s.headerTextColor,
                fontFamily: "'Noto Serif Devanagari', serif",
              }}>{OM_SYMBOL}</span>
            )}
          </div>

          {/* Temple name + Om Namah Shivaya */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '15px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: s.accentColor,
              marginBottom: '6px',
              opacity: 0.9,
            }}>
              {OM_SYMBOL} Namah Shivaya
            </div>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '26px',
              fontWeight: 700,
              color: s.headerTextColor,
              lineHeight: 1.2,
              letterSpacing: '0.5px',
            }}>
              {settings.templeName}
            </div>
            {settings.templeAddress && (
              <div style={{
                fontSize: '12px',
                color: s.headerSubColor,
                marginTop: '4px',
                opacity: 0.8,
                letterSpacing: '0.3px',
              }}>
                {settings.templeAddress}
              </div>
            )}
          </div>

          {/* Urgency badge */}
          <div style={{
            background: urg,
            color: '#fff',
            fontFamily: s.fontFamily,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            padding: '6px 14px',
            borderRadius: '4px',
            alignSelf: 'flex-start',
            flexShrink: 0,
            boxShadow: `0 2px 8px ${urg}55`,
          }}>
            {urgencyLabel}
          </div>
        </div>

        {/* ── TEMPLE IMAGE STRIP ─────────────────────────────────── */}
        {settings.templeImageBase64 && (
          <div style={{
            height: '140px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}>
            <img
              src={settings.templeImageBase64}
              alt="Temple"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, transparent 50%, ${isShiva ? '#0A1628' : isMinimal ? '#fff' : '#FDF8F0'}CC)`,
            }} />
          </div>
        )}

        {/* ── RENEWAL REMINDER TITLE ─────────────────────────────── */}
        <div style={{
          background: s.bodyBg,
          padding: '28px 56px 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            display: 'inline-block',
            borderBottom: `2px solid ${s.accentColor}`,
            paddingBottom: '10px',
          }}>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '32px',
              fontWeight: 700,
              color: isShiva ? s.devoteeName : s.highlightText,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Renewal Reminder
            </div>
          </div>

          {/* Accent divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '16px',
          }}>
            <div style={{ height: '1px', width: '80px', background: `linear-gradient(to right, transparent, ${s.accentColor})` }} />
            <span style={{ color: s.accentColor, fontSize: '18px' }}>✦</span>
            <div style={{ height: '1px', width: '80px', background: `linear-gradient(to left, transparent, ${s.accentColor})` }} />
          </div>
        </div>

        {/* ── DEVOTEE NAME ───────────────────────────────────────── */}
        <div style={{
          background: s.bodyBg,
          padding: '20px 56px 16px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            fontFamily: s.headingFont,
            fontSize: '52px',
            fontWeight: 800,
            color: s.devoteeName,
            lineHeight: 1.1,
            letterSpacing: '1px',
          }}>
            {devotee.name}
          </div>
          {devotee.village && (
            <div style={{
              fontSize: '15px',
              color: s.labelColor,
              marginTop: '6px',
              letterSpacing: '0.5px',
            }}>
              {devotee.village}
            </div>
          )}
        </div>

        {/* ── MAIN DETAILS CARD ──────────────────────────────────── */}
        <div style={{
          background: s.bodyBg,
          padding: '8px 56px 0',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            background: s.highlightBg,
            border: `1px solid ${s.accentColor}40`,
            borderRadius: '12px',
            padding: '28px 36px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px 40px',
          }}>
            {[
              { label: 'Service', value: devotee.service },
              { label: 'Expiry Date', value: formatDate(devotee.expiryDate) },
              { label: 'Days Remaining', value: days < 0 ? `${Math.abs(days)} days overdue` : `${days} days`, color: urg },
              { label: 'Renewal Amount', value: `₹ ${devotee.amount}`, bold: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: s.labelColor,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: item.bold ? '24px' : '19px',
                  fontWeight: item.bold ? 700 : 500,
                  color: item.color ?? s.valueColor,
                  fontFamily: item.bold ? s.headingFont : s.fontFamily,
                  lineHeight: 1.2,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QR + MOBILE ROW ────────────────────────────────────── */}
        <div style={{
          background: s.bodyBg,
          padding: '20px 56px 0',
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* QR Code */}
          <div style={{
            border: `2px solid ${s.qrBorderColor}`,
            borderRadius: '10px',
            padding: '10px',
            background: '#fff',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <img
              src={qrDataUrl}
              alt="QR Code"
              style={{ width: '170px', height: '170px', display: 'block' }}
            />
            <div style={{
              fontSize: '10px',
              color: '#888',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Scan to Renew
            </div>
          </div>

          {/* Contact info + mobile */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              fontSize: '13px',
              color: s.labelColor,
              letterSpacing: '0.5px',
              lineHeight: 1.6,
            }}>
              Or renew online at:
            </div>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '16px',
              color: s.accentColor,
              wordBreak: 'break-all',
              lineHeight: 1.4,
            }}>
              {devotee.renewalLink || settings.templeWebsite}
            </div>

            <div style={{ borderTop: `1px solid ${s.accentColor}30`, paddingTop: '14px' }}>
              {settings.templePhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: s.accentColor }}>📞</span>
                  <span style={{ fontSize: '17px', fontWeight: 600, color: s.valueColor, letterSpacing: '0.5px' }}>
                    {settings.templePhone}
                  </span>
                </div>
              )}
              {devotee.mobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: s.accentColor }}>📱</span>
                  <span style={{ fontSize: '16px', color: s.valueColor, letterSpacing: '0.5px' }}>
                    {devotee.mobile}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BLESSING MESSAGE ───────────────────────────────────── */}
        <div style={{
          background: s.bodyBg,
          padding: '20px 56px 0',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            background: s.highlightBg,
            border: `1px solid ${s.accentColor}30`,
            borderRadius: '8px',
            padding: '18px 28px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: s.headingFont,
              fontSize: '16px',
              fontStyle: 'italic',
              color: s.valueColor,
              lineHeight: 1.6,
              opacity: 0.85,
            }}>
              "{settings.blessingMessage}"
            </div>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: s.footerBg,
          padding: '20px 56px 28px',
          textAlign: 'center',
          zIndex: 5,
          borderTop: isMinimal ? `2px solid ${s.borderColor}` : 'none',
        }}>
          {/* Gold divider for non-minimal */}
          {!isMinimal && (
            <div style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, ${s.accentColor}80, transparent)`,
              marginBottom: '14px',
            }} />
          )}

          <div style={{
            fontFamily: s.headingFont,
            fontSize: '18px',
            fontWeight: 600,
            color: s.footerTextColor,
            letterSpacing: '1px',
            marginBottom: '6px',
          }}>
            {settings.templeName}
          </div>

          {settings.templeAddress && (
            <div style={{
              fontSize: '12px',
              color: s.footerTextColor,
              opacity: 0.7,
              lineHeight: 1.5,
              letterSpacing: '0.3px',
            }}>
              {settings.templeAddress}
            </div>
          )}

          {(settings.templePhone || settings.templeWebsite) && (
            <div style={{
              fontSize: '12px',
              color: s.footerTextColor,
              opacity: 0.7,
              marginTop: '4px',
            }}>
              {[settings.templePhone, settings.templeWebsite].filter(Boolean).join('  ·  ')}
            </div>
          )}

          {/* Bottom decorative line */}
          <div style={{
            marginTop: '12px',
            fontSize: '13px',
            color: s.accentColor,
            opacity: 0.7,
            letterSpacing: '3px',
          }}>
            {OM_SYMBOL} · · · {OM_SYMBOL}
          </div>
        </div>
      </div>
    )
  }
)

TemplateRenderer.displayName = 'TemplateRenderer'

export default TemplateRenderer
