interface FormatToBRLProps {
  value: number;
  removeSymbol?: boolean;
  absolute?: boolean;
}

export function formatToBRL({
  value,
  removeSymbol,
  absolute,
}: FormatToBRLProps): string {
  const adjustedValue = (absolute ? Math.abs(value) : value) / 100;

  const [integerPart, fractionalPart = "00"] = adjustedValue
    .toFixed(2)
    .split(".");

  let integerFormatted = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    integerFormatted = integerPart[i] + integerFormatted;
    count++;
    if (count % 3 === 0 && i > 0) {
      integerFormatted = "." + integerFormatted;
    }
  }

  let result = `${integerFormatted},${fractionalPart}`;

  if (!removeSymbol) {
    result = `R$ ${result}`;
  }

  return result;
}
