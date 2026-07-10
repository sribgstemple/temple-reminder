import * as XLSX from 'xlsx'
import { v4 as uuid } from 'uuid'
import type { DevoteeRecord, ParsedExcelResult, ExcelRowError } from '../types'

const REQUIRED_COLUMNS = ['Name', 'Mobile', 'Service', 'Expiry Date', 'Amount', 'Renewal Link']

function parseDateValue(raw: unknown): string | null {
  if (!raw) return null
  // Excel serial date number
  if (typeof raw === 'number') {
    const date = XLSX.SSF.parse_date_code(raw)
    if (!date) return null
    const y = date.y
    const m = String(date.m).padStart(2, '0')
    const d = String(date.d).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  // String date
  const s = String(raw).trim()
  // Try YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  // Try DD/MM/YYYY or DD-MM-YYYY
  const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`
  // Try MM/DD/YYYY
  const mdy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (mdy) return `${mdy[3]}-${mdy[1].padStart(2, '0')}-${mdy[2].padStart(2, '0')}`
  return null
}

function calcDaysRemaining(expiryDateStr: string): number {
  const expiry = new Date(expiryDateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function cleanMobile(raw: unknown): string {
  return String(raw ?? '').replace(/\D/g, '').slice(-10)
}

function findColumnMap(headers: string[]): Record<string, number> {
  const map: Record<string, number> = {}
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '')

  const aliases: Record<string, string[]> = {
    Name: ['name', 'devoteename', 'devotee'],
    Mobile: ['mobile', 'phone', 'mobileno', 'phoneno', 'contact', 'whatsapp'],
    Service: ['service', 'servicename', 'servicetype'],
    'Expiry Date': ['expirydate', 'expiry', 'expirationdate', 'validitydate', 'duedate'],
    Amount: ['amount', 'renewalamount', 'fee', 'charges'],
    'Renewal Link': ['renewallink', 'link', 'url', 'paymentlink'],
    'Days Remaining': ['daysremaining', 'days', 'remaining', 'daysdue'],
    Village: ['village', 'area', 'locality'],
    Address: ['address', 'addr'],
    'Devotee ID': ['devoteeid', 'id', 'memberid'],
  }

  headers.forEach((h, idx) => {
    const n = normalize(h)
    for (const [canonical, alts] of Object.entries(aliases)) {
      if (alts.some(a => n === a || n.includes(a))) {
        map[canonical] = idx
        break
      }
    }
  })
  return map
}

export function parseExcel(file: File, sessionId: string): Promise<ParsedExcelResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array', cellDates: false })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })

        if (rows.length < 2) {
          return resolve({ records: [], errors: [{ row: 0, field: 'file', message: 'Sheet appears to be empty or has no data rows.' }], totalRows: 0 })
        }

        const headerRow = (rows[0] as string[]).map(h => String(h).trim())
        const colMap = findColumnMap(headerRow)

        // Check required columns
        const missingCols = REQUIRED_COLUMNS.filter(c => colMap[c] === undefined)
        if (missingCols.length > 0) {
          return resolve({
            records: [],
            errors: [{ row: 0, field: 'columns', message: `Missing required columns: ${missingCols.join(', ')}` }],
            totalRows: 0,
          })
        }

        const records: DevoteeRecord[] = []
        const errors: ExcelRowError[] = []
        const dataRows = rows.slice(1) as unknown[][]

        dataRows.forEach((row, idx) => {
          const rowNum = idx + 2 // 1-indexed + header

          const name = String(row[colMap['Name']] ?? '').trim()
          const mobile = cleanMobile(row[colMap['Mobile']])
          const service = String(row[colMap['Service']] ?? '').trim()
          const rawDate = row[colMap['Expiry Date']]
          const amount = String(row[colMap['Amount']] ?? '').trim()
          const renewalLink = String(row[colMap['Renewal Link']] ?? '').trim()

          // Skip blank rows
          if (!name && !mobile && !service) return

          let hasError = false
          if (!name) { errors.push({ row: rowNum, field: 'Name', message: 'Name is required' }); hasError = true }
          if (mobile.length !== 10) { errors.push({ row: rowNum, field: 'Mobile', message: `Invalid mobile: "${row[colMap['Mobile']]}"` }); hasError = true }
          if (!service) { errors.push({ row: rowNum, field: 'Service', message: 'Service is required' }); hasError = true }
          if (!amount) { errors.push({ row: rowNum, field: 'Amount', message: 'Amount is required' }); hasError = true }

          const expiryDate = parseDateValue(rawDate)
          if (!expiryDate) { errors.push({ row: rowNum, field: 'Expiry Date', message: `Cannot parse date: "${rawDate}"` }); hasError = true }

          if (hasError) return

          const rawDays = row[colMap['Days Remaining']]
          const daysRemaining = rawDays != null && rawDays !== ''
            ? parseInt(String(rawDays), 10)
            : calcDaysRemaining(expiryDate!)

          records.push({
            id: uuid(),
            name,
            mobile,
            service,
            expiryDate: expiryDate!,
            daysRemaining: isNaN(daysRemaining) ? calcDaysRemaining(expiryDate!) : daysRemaining,
            amount,
            renewalLink,
            village: colMap['Village'] !== undefined ? String(row[colMap['Village']] ?? '').trim() || undefined : undefined,
            address: colMap['Address'] !== undefined ? String(row[colMap['Address']] ?? '').trim() || undefined : undefined,
            devoteeId: colMap['Devotee ID'] !== undefined ? String(row[colMap['Devotee ID']] ?? '').trim() || undefined : undefined,
            createdAt: new Date().toISOString(),
            sessionId,
          })
        })

        resolve({ records, errors, totalRows: dataRows.filter(r => (r as string[]).some(c => String(c).trim())).length })
      } catch (err) {
        reject(new Error(`Failed to parse Excel file: ${err instanceof Error ? err.message : String(err)}`))
      }
    }
    reader.onerror = () => reject(new Error('File read error'))
    reader.readAsArrayBuffer(file)
  })
}

export function calcDaysRemainingFromDate(expiryDate: string): number {
  return calcDaysRemaining(expiryDate)
}
