import { ColumnDef } from "@tanstack/react-table";

export type TTransactions = {
  id: number;
  valor: number;
  tipo: "Entrada" | "Saida";
  custoFixo: boolean;
  descricao: string;
  categoria: {
    nome: string;
    avatar: string;
    hex: string;
  };
  data: Date;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TCategories = {
  id: number;
  nome: string;
  avatar: string;
  hex: string;
};
