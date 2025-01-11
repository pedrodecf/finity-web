interface formatToBRLProps {
  value: number;
  removeSymbol?: boolean;
}

export function formatToBRL({ value, removeSymbol }: formatToBRLProps): string {
  const result = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (removeSymbol) {
    return result.replace(/^R\$\s*/, "");
  }
  return result;
}
