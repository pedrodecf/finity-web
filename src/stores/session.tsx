import { create } from "zustand";

export type UserSession = {
  id: string;
  nome: string;
  email: string;
  balanco: number;
  gastosPorcetagemMeta: number;
};

type SessionStore = {
  user: UserSession | null;
  setUser: (user: UserSession) => void;
  logout: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
