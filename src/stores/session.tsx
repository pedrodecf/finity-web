export type UserSession = {
  id: string;
  nome: string;
  email: string;
  balanco: number;
  gastosPorcetagemMeta: number
};

type SessionStore = {
  user: UserSession | null;
  logout: () => void;
  setUser: (user: UserSession) => void;
};

export const useSessionStore = () => {
  const user: UserSession = {
    id: "1",
    nome: "John Doe",
    email: "john@doe.com",
    balanco: 1000,
    gastosPorcetagemMeta: 50
  };

  return { user };
};
