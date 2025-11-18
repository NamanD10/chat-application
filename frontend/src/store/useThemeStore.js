import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: "sunset",
  setTheme: (theme) => set({ theme }),
}));