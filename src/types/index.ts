export interface DevoteeRecord {
  id: string
  name: string
  mobile?: string
  service: string
  expiryDate: string        // ISO date string "YYYY-MM-DD"
  daysRemaining: number
  amount: string
  renewalLink?: string
  village?: string
  address?: string
  devoteeId?: string
  createdAt: string         // ISO datetime
  sessionId: string
}

export interface HistorySession {
  id: string
  type: 'excel-upload' | 'single-entry'
  filename?: string
  devoteeCount: number
  createdAt: string
  templateId: string
  records: DevoteeRecord[]
}

export interface TempleSettings {
  templeName: string
  templePhone: string
  templeWebsite: string
  templeAddress: string
  blessingMessage: string
  templeLogoBase64?: string
  templeImageBase64?: string
  whatsappTemplate: string
}

export interface GeneratedCard {
  devotee: DevoteeRecord
  pngDataUrl: string
  whatsappMessage: string
}

export interface ExcelRowError {
  row: number
  field: string
  message: string
}

export interface ParsedExcelResult {
  records: DevoteeRecord[]
  errors: ExcelRowError[]
  totalRows: number
}

export type TemplateId = 'classic' | 'shiva' | 'minimal'

export interface TemplateConfig {
  id: TemplateId
  name: string
  description: string
  preview: {
    bg: string
    border: string
    text: string
    accent: string
  }
  styles: {
    // Card background
    outerBg: string            // base bg color / gradient
    bgPattern: string          // overlay gradient for texture depth

    // Ornamental border
    borderColor: string        // main frame color

    // Header
    templeNameColor: string    // large temple name text
    omNameColor: string        // "Om Namah Shivaya" italic line

    // Greeting
    greetingNameColor: string  // {{Name}} in "Namaskara {{Name}},"
    greetingTextColor: string  // body / subtext color

    // Reminder row
    reminderIconBg: string     // circle bg for calendar icon
    reminderHighlight: string  // "renewal." bold accent

    // Detail grid
    gridBg: string
    gridBorderColor: string
    gridLabelColor: string
    gridValueColor: string
    iconCircle1: string        // primary icon circles (service, days, devotee)
    iconCircle2: string        // secondary icon circles (expiry, amount, thanks)

    // Renewal button
    renewBtnBg: string
    renewBtnText: string

    // Decorative lotus / accent
    accentColor: string
    lotusColor: string

    // Blessing footer
    blessingTextColor: string
    footerOmColor: string      // "Om Namah Shivaya" gold italic at bottom

    // Bottom ornament strip
    bottomStripBg: string

    // Fonts
    fontFamily: string
    headingFont: string
  }
}
