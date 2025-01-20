import { ColumnDef } from "@tanstack/react-table";

export type TTransactions = {
  id: number;
  descricao: string;
  valor: number;
  categoriaId: number;
  data: Date;
  tipo: "Entrada" | "Saida";
  custoFixo: boolean;
  cartaoCredito: boolean;
  categoria: {
    id: number;
    nome: string;
    avatar: string;
    hex: string;
  };
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  loading?: boolean;
}

export type TCategories = {
  id: number;
  nome: string;
  avatar: string;
  hex: string;
};
