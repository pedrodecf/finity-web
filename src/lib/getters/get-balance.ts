import { TTransactions } from "@/components/tables/type";

export const getBalance = (transactions: TTransactions[]) => {
  const saidas = transactions.filter(({ tipo }) => tipo === "Saida");

  let fixed = 0;
  let personal = 0;

  saidas.forEach(({ valor, custoFixo }) => {
    if (custoFixo) {
      fixed += valor;
    } else {
      personal += valor;
    }
  });

  return [{ fixed, personal }];
};
