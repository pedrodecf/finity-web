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

  const strValue = adjustedValue.toFixed(2);

  const isNegative = strValue.startsWith("-");
  const onlyNumber = isNegative ? strValue.substring(1) : strValue;
  const [integerPart, fractionalPart = "00"] = onlyNumber.split(".");

  let integerFormatted = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    integerFormatted = integerPart[i] + integerFormatted;
    count++;
    if (count % 3 === 0 && i > 0) {
      integerFormatted = "." + integerFormatted;
    }
  }

  let result = `${isNegative ? "-" : ""}${integerFormatted},${fractionalPart}`;

  if (!removeSymbol) {
    result = `R$ ${result}`;
  }

  return result;
}
