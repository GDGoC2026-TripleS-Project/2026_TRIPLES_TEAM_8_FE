import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,

  setToken: (token) => set({ token }),

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ token: null });
  },
}));
