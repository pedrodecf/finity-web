import { TTransactions } from "@/components/tables/type";

export type getTransactionsQuery = {
  name: string;
  page: number;
  ordination: string;
  orderBy: string;
  periodoDe?: string;
  periodoAte?: string;
};

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
