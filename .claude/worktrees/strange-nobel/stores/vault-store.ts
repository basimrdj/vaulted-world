import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface VaultItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  currency: string
  image: string
  category: string
  tags: string[]
  retailer: string
  retailerUrl: string
  priority: 1 | 2 | 3
  priceHistory: { date: string; price: number }[]
  priceStatus: "dropped" | "rising" | "stable" | "best"
  dateAdded: string
  notes: string
  boardIds: string[]
  isPurchased: boolean
}

export interface Board {
  id: string
  name: string
  description: string
  coverImage: string
  type: "standard" | "moodboard" | "gift" | "comparison"
  itemIds: string[]
  isPublic: boolean
  createdAt: string
}

export interface Alert {
  id: string
  type: "price_drop" | "low_stock" | "suggestion" | "weekly_summary"
  title: string
  description: string
  itemId?: string
  read: boolean
  createdAt: string
}

interface VaultState {
  items: VaultItem[]
  boards: Board[]
  alerts: Alert[]
  activeFilter: string

  addItem: (item: VaultItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<VaultItem>) => void
  addBoard: (board: Board) => void
  removeBoard: (id: string) => void
  addAlert: (alert: Alert) => void
  markAlertRead: (id: string) => void
  setActiveFilter: (filter: string) => void
}

export const useVaultStore = create<VaultState>()(
  persist(
    (set) => ({
      items: [],
      boards: [],
      alerts: [],
      activeFilter: "all",

      addItem: (item) =>
        set((state) => ({ items: [item, ...state.items] })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        })),
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
      removeBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
        })),
      addAlert: (alert) =>
        set((state) => ({ alerts: [alert, ...state.alerts] })),
      markAlertRead: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, read: true } : a
          ),
        })),
      setActiveFilter: (filter) => set({ activeFilter: filter }),
    }),
    { name: "vaulted-vault" }
  )
)
