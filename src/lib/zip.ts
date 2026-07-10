import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratedCard } from '../types'

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\- ]/g, '').trim().replace(/\s+/g, '_')
}

function uniqueFilenames(cards: GeneratedCard[]): string[] {
  const seen = new Map<string, number>()
  return cards.map(c => {
    const base = safeName(c.devotee.name) || 'Devotee'
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  })
}

export async function exportZip(cards: GeneratedCard[]): Promise<void> {
  const zip = new JSZip()
  const names = uniqueFilenames(cards)

  const imageFolder = zip.folder('images')!
  const msgFolder = zip.folder('messages')!

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const name = names[i]
    // PNG
    const base64 = card.pngDataUrl.split(',')[1]
    imageFolder.file(`${name}.png`, base64, { base64: true })
    // Per-devotee message text
    msgFolder.file(`${name}.txt`, card.whatsappMessage)
  }

  // Combined CSV
  const csvHeader = 'Name,Mobile,Service,Expiry Date,Days Remaining,Amount,Renewal Link,WhatsApp Message\n'
  const csvRows = cards.map(c => [
    `"${c.devotee.name.replace(/"/g, '""')}"`,
    c.devotee.mobile,
    `"${c.devotee.service.replace(/"/g, '""')}"`,
    c.devotee.expiryDate,
    c.devotee.daysRemaining,
    c.devotee.amount,
    c.devotee.renewalLink,
    `"${c.whatsappMessage.replace(/"/g, '""').replace(/\n/g, '\\n')}"`,
  ].join(',')).join('\n')
  zip.file('messages.csv', csvHeader + csvRows)

  // Combined TXT
  const txt = cards.map((c, i) =>
    `${'─'.repeat(60)}\n${names[i]} · ${c.devotee.mobile}\n${'─'.repeat(60)}\n${c.whatsappMessage}\n`
  ).join('\n')
  zip.file('all-messages.txt', txt)

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
  const timestamp = new Date().toISOString().slice(0, 10)
  saveAs(blob, `SBGS-Reminders-${timestamp}.zip`)
}

export async function exportMessagesCsv(cards: GeneratedCard[]): Promise<void> {
  const csvHeader = 'Name,Mobile,Service,Expiry Date,Days Remaining,Amount,WhatsApp Message\n'
  const csvRows = cards.map(c => [
    `"${c.devotee.name.replace(/"/g, '""')}"`,
    c.devotee.mobile,
    `"${c.devotee.service.replace(/"/g, '""')}"`,
    c.devotee.expiryDate,
    c.devotee.daysRemaining,
    c.devotee.amount,
    `"${c.whatsappMessage.replace(/"/g, '""').replace(/\n/g, '\\n')}"`,
  ].join(',')).join('\n')

  const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' })
  const timestamp = new Date().toISOString().slice(0, 10)
  saveAs(blob, `SBGS-Messages-${timestamp}.csv`)
}

export async function exportMessagesTxt(cards: GeneratedCard[]): Promise<void> {
  const names = uniqueFilenames(cards)
  const txt = cards.map((c, i) =>
    `${'─'.repeat(60)}\n${names[i]} · ${c.devotee.mobile}\n${'─'.repeat(60)}\n${c.whatsappMessage}\n`
  ).join('\n')
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' })
  const timestamp = new Date().toISOString().slice(0, 10)
  saveAs(blob, `SBGS-Messages-${timestamp}.txt`)
}
