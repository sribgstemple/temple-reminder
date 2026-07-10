import type { TemplateConfig } from '../types'

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic Temple',
    description: 'Cream & gold with maroon — matches the reference design',
    preview: {
      bg: 'linear-gradient(135deg, #F5E6C8 0%, #EDD9A3 100%)',
      border: '#C8A84B',
      text: '#8B1A1A',
      accent: '#C8A84B',
    },
    styles: {
      outerBg: '#F5E6C8',
      bgPattern: `radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,168,75,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 50% 30% at 100% 100%, rgba(139,26,26,0.06) 0%, transparent 50%)`,

      borderColor: '#C8A84B',

      templeNameColor: '#8B1A1A',
      omNameColor: '#B8921A',

      greetingNameColor: '#8B1A1A',
      greetingTextColor: '#4A2B0A',

      reminderIconBg: '#C8A84B',
      reminderHighlight: '#8B1A1A',

      gridBg: 'rgba(255,255,255,0.55)',
      gridBorderColor: '#D4AA50',
      gridLabelColor: '#6B4C1A',
      gridValueColor: '#8B1A1A',
      iconCircle1: '#8B1A1A',
      iconCircle2: '#B8921A',

      renewBtnBg: '#8B1A1A',
      renewBtnText: '#FFF8E7',

      accentColor: '#C8A84B',
      lotusColor: '#8B6914',

      blessingTextColor: '#4A2B0A',
      footerOmColor: '#B8921A',

      bottomStripBg: 'rgba(200,168,75,0.18)',

      fontFamily: "'Inter', 'Poppins', sans-serif",
      headingFont: "'Playfair Display', 'Cormorant Garamond', serif",
    },
  },
  {
    id: 'shiva',
    name: 'Shiva Theme',
    description: 'Deep blue & silver — sacred night sky aesthetic',
    preview: {
      bg: 'linear-gradient(135deg, #0D1B2E 0%, #1A2E4A 100%)',
      border: '#8AAEC8',
      text: '#E8F0F8',
      accent: '#8AAEC8',
    },
    styles: {
      outerBg: '#0D1B2E',
      bgPattern: `radial-gradient(ellipse 70% 40% at 50% 0%, rgba(100,160,220,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 50% 30% at 100% 100%, rgba(60,100,160,0.08) 0%, transparent 50%)`,

      borderColor: '#6A90B0',

      templeNameColor: '#D8E8F8',
      omNameColor: '#88B8D8',

      greetingNameColor: '#88B8D8',
      greetingTextColor: '#B0C8E0',

      reminderIconBg: '#2A4A6A',
      reminderHighlight: '#88B8D8',

      gridBg: 'rgba(255,255,255,0.05)',
      gridBorderColor: '#3A5A7A',
      gridLabelColor: '#7A9AB8',
      gridValueColor: '#B8D0E8',
      iconCircle1: '#1E3A5A',
      iconCircle2: '#2A5070',

      renewBtnBg: '#1E3A5A',
      renewBtnText: '#D8E8F8',

      accentColor: '#88B8D8',
      lotusColor: '#5A88A8',

      blessingTextColor: '#A0C0D8',
      footerOmColor: '#88B8D8',

      bottomStripBg: 'rgba(100,160,220,0.12)',

      fontFamily: "'Inter', sans-serif",
      headingFont: "'Cormorant Garamond', 'Playfair Display', serif",
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Gold',
    description: 'Clean white & gold — modern, professional',
    preview: {
      bg: '#FFFFFF',
      border: '#D4AF37',
      text: '#1A1A1A',
      accent: '#D4AF37',
    },
    styles: {
      outerBg: '#FFFFFF',
      bgPattern: `radial-gradient(ellipse 60% 30% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)`,

      borderColor: '#D4AF37',

      templeNameColor: '#1A1A1A',
      omNameColor: '#B8860B',

      greetingNameColor: '#B8860B',
      greetingTextColor: '#333333',

      reminderIconBg: '#D4AF37',
      reminderHighlight: '#B8860B',

      gridBg: 'rgba(212,175,55,0.04)',
      gridBorderColor: '#D4AF37',
      gridLabelColor: '#888888',
      gridValueColor: '#1A1A1A',
      iconCircle1: '#2A2A2A',
      iconCircle2: '#C8A030',

      renewBtnBg: '#1A1A1A',
      renewBtnText: '#FFFFFF',

      accentColor: '#D4AF37',
      lotusColor: '#C8A030',

      blessingTextColor: '#333333',
      footerOmColor: '#B8860B',

      bottomStripBg: 'rgba(212,175,55,0.10)',

      fontFamily: "'Inter', sans-serif",
      headingFont: "'Playfair Display', serif",
    },
  },
]

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}
