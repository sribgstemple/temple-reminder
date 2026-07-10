export interface DevoteeRecord {
  id: string
  name: string
  mobile: string
  service: string
  expiryDate: string        // ISO date string "YYYY-MM-DD"
  daysRemaining: number
  amount: string
  renewalLink: string
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
    outerBg: string
    outerBgPattern: string
    borderColor: string
    borderGradient: string
    headerBg: string
    headerTextColor: string
    headerSubColor: string
    bodyBg: string
    devoteeName: string
    labelColor: string
    valueColor: string
    accentColor: string
    footerBg: string
    footerTextColor: string
    qrBorderColor: string
    highlightBg: string
    highlightText: string
    fontFamily: string
    headingFont: string
    decorationOpacity: number
  }
}
