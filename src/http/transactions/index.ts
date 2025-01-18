import { TCreateTransaction } from "@/components/ui/dialog/dialog-transaction-create/schema";
import { Api } from "../axios";
import { ListTransactionsResponse } from "./types";

export class TransactionsGateway {
  constructor(private api: typeof Api) {}

  async getTransactions(): Promise<ListTransactionsResponse> {
    const { data } = await this.api.get(
      "/transacoes?orderBy=data&ordination=desc&page=1&quantity=10"
    );
    return data;
  }

  async createTransaction(data: TCreateTransaction): Promise<void> {
    await this.api.post("/transacoes", data);
  }
}
