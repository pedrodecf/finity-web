export type LoginCredentials = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  token: string;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  balanco: number;
  gastosPorcetagemMeta: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
