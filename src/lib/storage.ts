import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { HistorySession, TempleSettings } from '../types'

// ── IndexedDB (history) ────────────────────────────────────────────────────

interface AppDB extends DBSchema {
  sessions: {
    key: string
    value: HistorySession
    indexes: { byCreatedAt: string }
  }
}

let _db: IDBPDatabase<AppDB> | null = null

async function getDB(): Promise<IDBPDatabase<AppDB>> {
  if (_db) return _db
  _db = await openDB<AppDB>('temple-reminder', 1, {
    upgrade(db) {
      const store = db.createObjectStore('sessions', { keyPath: 'id' })
      store.createIndex('byCreatedAt', 'createdAt')
    },
  })
  return _db
}

export async function saveSession(session: HistorySession): Promise<void> {
  const db = await getDB()
  await db.put('sessions', session)
}

export async function getAllSessions(): Promise<HistorySession[]> {
  const db = await getDB()
  const all = await db.getAll('sessions')
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getSession(id: string): Promise<HistorySession | undefined> {
  const db = await getDB()
  return db.get('sessions', id)
}

export async function deleteSession(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('sessions', id)
}

// ── localStorage (settings) ───────────────────────────────────────────────

const SETTINGS_KEY = 'sbgst-temple-settings'

const DEFAULT_SETTINGS: TempleSettings = {
  templeName: 'Sri Balagurunadheeswara Swamy Temple',
  templePhone: '9035654006',
  templeWebsite: 'https://sribgstemple.org/',
  templeAddress: 'Rachapalyam Village (SBR Puram), Palasamudram Mandal, Chittoor District, Andhra Pradesh - 517599',
  blessingMessage: 'May Lord Shiva bless you and your family with health, wealth, and happiness.',
  templeLogoBase64: undefined,
  templeImageBase64: undefined,
  whatsappTemplate:
    '🙏 Namaskara {{name}},\n\nPlease find your personalized Seva Renewal Reminder from Sri Balagurunadheeswara Swamy Temple attached to this message.\n\nKindly review the reminder card for your seva details and renewal information.\n\nIf you wish to pay directly through a UPI app, tap the link below:\n\n🔱 UPI Payment\nupi://pay?pa=SRIBALAGURUNADHEESWARA@rbl&pn=SRI%20BALAGURUNADHEESWARA%20TRUST&mc=8398&am={{amount}}&mam={{amount}}&cu=INR\n\nIf you have already renewed your seva, please ignore this reminder.\n\nMay Lord Balagurunadheeswara bless you and your family with health, happiness, and prosperity.\n\nOm Namah Shivaya 🙏',
}

export function loadSettings(): TempleSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    const saved = JSON.parse(raw)
    // Migrate old WhatsApp template to new format
    if (saved.whatsappTemplate?.startsWith('Namaste {{name}}')) {
      saved.whatsappTemplate = DEFAULT_SETTINGS.whatsappTemplate
    } else if (saved.whatsappTemplate) {
      saved.whatsappTemplate = saved.whatsappTemplate
        .replace('pn=SRI BALAGURUNADHEESWARA TRUST', 'pn=SRI%20BALAGURUNADHEESWARA%20TRUST')
        .replace('&am=null&mam=null&', '&am={{amount}}&mam={{amount}}&')
    }
    return { ...DEFAULT_SETTINGS, ...saved }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: TempleSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
