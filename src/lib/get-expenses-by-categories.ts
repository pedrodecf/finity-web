import { TTransactions } from "@/components/tables/transactions-columns";

export type TCategoryExpense = {
  categorie: string;
  expenses: number;
  fill: string;
  avatar: string;
};

export const getExpensesByCategories = (
  transactions: TTransactions[]
): TCategoryExpense[] => {
  return transactions
    .filter(({ tipo }) => tipo === "Saida")
    .reduce((acc, transaction) => {
      const { nome, hex, avatar } = transaction.categoria;
      const found = acc.find((item) => item.categorie === nome);

      if (found) {
        found.expenses += transaction.valor;
      } else {
        acc.push({
          categorie: nome,
          expenses: transaction.valor,
          fill: hex,
          avatar,
        });
      }

      return acc;
    }, [] as TCategoryExpense[]);
};
