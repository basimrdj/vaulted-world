import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  name: string
  interests: string[]
  hasCompletedOnboarding: boolean
  notificationsEnabled: boolean
  isPremium: boolean

  setName: (name: string) => void
  setInterests: (interests: string[]) => void
  toggleInterest: (interest: string) => void
  completeOnboarding: () => void
  enableNotifications: () => void
  setPremium: (premium: boolean) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      interests: [],
      hasCompletedOnboarding: false,
      notificationsEnabled: false,
      isPremium: false,

      setName: (name) => set({ name }),
      setInterests: (interests) => set({ interests }),
      toggleInterest: (interest) => {
        const current = get().interests
        if (current.includes(interest)) {
          set({ interests: current.filter((i) => i !== interest) })
        } else {
          set({ interests: [...current, interest] })
        }
      },
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      enableNotifications: () => set({ notificationsEnabled: true }),
      setPremium: (premium) => set({ isPremium: premium }),
    }),
    { name: "vaulted-user" }
  )
)
