import { TCreateTransaction } from "@/components/dialog/transactions/schema";
import { Api } from "../axios";
import { getTransactionsQuery, ListTransactionsResponse } from "./types";
import { TTransactions } from "@/components/tables/type";

export class TransactionsGateway {
  constructor(private api: typeof Api) {}

  async getTransactions(
    params: getTransactionsQuery
  ): Promise<ListTransactionsResponse> {
    const { data } = await this.api.get("/transacoes", { params });
    return data;
  }

  async createTransaction(data: TCreateTransaction): Promise<void> {
    await this.api.post("/transacoes", data);
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.api.delete(`/transacoes/${id}`);
  }

  async editTransaction(id: string, data: TCreateTransaction): Promise<TTransactions> {
   const response = await this.api.put(`/transacoes/${id}`, data);
   return response.data;
  }
}
