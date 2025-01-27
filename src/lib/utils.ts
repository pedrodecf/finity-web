import { ListTransactionsResponse } from "@/http/transactions/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcularPercentual(transacoes: ListTransactionsResponse) {
    const { total, totalEntrada } = transacoes.balance;

    if (totalEntrada === 0) {
      if (total < 0) {
        return -100;
      } else {
        return 0;
      }
    } else {
      return (total / totalEntrada) * 100;
    }
  }