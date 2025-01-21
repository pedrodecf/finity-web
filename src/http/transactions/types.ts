import { TTransactions } from "@/components/tables/type";

export type ListTransactionsResponse = {
  items: TTransactions[];
  pages: number;
  totalItems: number;
  balance: {
    totalEntrada: number;
    totalSaida: number;
    total: number;
  };
};
