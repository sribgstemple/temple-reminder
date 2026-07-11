import * as XLSX from 'xlsx'
import { v4 as uuid } from 'uuid'
import type { DevoteeRecord, ParsedExcelResult, ExcelRowError } from '../types'

const REQUIRED_COLUMNS = ['Name', 'Service', 'Expiry Date', 'Amount']

function parseDateValue(raw: unknown): string | null {
  if (!raw) return null
  if (typeof raw === 'number') {
    const date = XLSX.SSF.parse_date_code(raw)
    if (!date) return null
    const y = date.y
    const m = String(date.m).padStart(2, '0')
    const d = String(date.d).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  const s = String(raw).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`
  return null
}

function calcDaysRemaining(expiryDateStr: string): number {
  const expiry = new Date(expiryDateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function findColumnMap(headers: string[]): Record<string, number> {
  const map: Record<string, number> = {}
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '')

  const aliases: Record<string, string[]> = {
    Name: ['name', 'devoteename', 'devotee'],
    Service: ['service', 'servicename', 'servicetype'],
    'Expiry Date': ['expirydate', 'expiry', 'expirationdate', 'validitydate', 'duedate'],
    Amount: ['amount', 'renewalamount', 'fee', 'charges'],
    'Days Remaining': ['daysremaining', 'days', 'remaining', 'daysdue'],
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
          const rowNum = idx + 2

          const name = String(row[colMap['Name']] ?? '').trim()
          const service = String(row[colMap['Service']] ?? '').trim()
          const rawDate = row[colMap['Expiry Date']]
          const amount = String(row[colMap['Amount']] ?? '').trim()

          if (!name && !service) return

          let hasError = false
          if (!name) { errors.push({ row: rowNum, field: 'Name', message: 'Name is required' }); hasError = true }
          if (!service) { errors.push({ row: rowNum, field: 'Service', message: 'Service is required' }); hasError = true }
          if (!amount) { errors.push({ row: rowNum, field: 'Amount', message: 'Amount is required' }); hasError = true }

          const expiryDate = parseDateValue(rawDate)
          if (!expiryDate) { errors.push({ row: rowNum, field: 'Expiry Date', message: `Cannot parse date: "${rawDate}"` }); hasError = true }

          if (hasError) return

          const rawDays = colMap['Days Remaining'] !== undefined ? row[colMap['Days Remaining']] : undefined
          const daysRemaining = rawDays != null && rawDays !== ''
            ? parseInt(String(rawDays), 10)
            : calcDaysRemaining(expiryDate!)

          records.push({
            id: uuid(),
            name,
            service,
            expiryDate: expiryDate!,
            daysRemaining: isNaN(daysRemaining) ? calcDaysRemaining(expiryDate!) : daysRemaining,
            amount,
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

export function downloadXlsxTemplate(): void {
  const ws = XLSX.utils.aoa_to_sheet([
    ['Name', 'Service', 'Expiry Date', 'Amount'],
    ['Example Devotee', 'Monthly Archana', '2026-12-31', '500'],
  ])
  ws['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 10 }]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Devotees')
  const buf: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const url = URL.createObjectURL(
    new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  )
  const a = document.createElement('a')
  a.href = url
  a.download = 'devotee_template.xlsx'
  a.click()
  URL.revokeObjectURL(url)
}
