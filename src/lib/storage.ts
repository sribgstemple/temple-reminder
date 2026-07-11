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
  templePhone: '',
  templeWebsite: '',
  templeAddress: '',
  blessingMessage: 'May Lord Shiva bless you and your family with health, wealth, and happiness.',
  templeLogoBase64: undefined,
  templeImageBase64: undefined,
  whatsappTemplate:
    'Namaste {{name}}! 🙏\n\nYour *{{service}}* service at {{templeName}} is expiring on *{{expiryDate}}* ({{daysRemaining}} days remaining).\n\nRenewal Amount: *₹{{amount}}*\n\n🔱 Pay Seva Amount via UPI:\nupi://pay?pa=SRIBALAGURUNADHEESWARA@rbl&pn=SRI BALAGURUNADHEESWARA TRUST&mc=8398&am=null&mam=null&cu=INR\n\n{{blessingMessage}} 🔱\n\n– {{templeName}}',
}

export function loadSettings(): TempleSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: TempleSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
