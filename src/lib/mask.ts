export type Mask =
  | "cpf"
  | "cep"
  | "tel-cel"
  | "telefone"
  | "celular"
  | "R$"
  | "number"
  | "horas"
  | "minutos"
  | "otherValues";

export const masks = (mask: Mask, value: string) => {
  if (!value) return value;

  return {
    cpf: value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"),
    cep: value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1"),
    "tel-cel": value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)(\d{4})(\d{4})/, "($1) $2$3-$4"),
    telefone: value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{4})/, "$1 $2-$3")
      .replace(/(-\d{4})\d+?$/, "$1"),
    celular: value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})(\d{4})/, "$1 $2-$3")
      .replace(/(-\d{4})\d+?$/, "$1"),
    R$: (() => {
      let v = value.replace(/\D/g, "");

      v = (+v / 100)
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d+)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");

      return v;
    })(),
    horas: (() => {
      const newValue = value.replace(/\D/g, "");
      const minutos = Math.min(parseInt(newValue.slice(-2)) || 0, 99);
      return `${newValue.slice(-5, -2).padStart(3, "0")}:${minutos
        .toString()
        .padStart(2, "0")}`;
    })(),
    minutos: (() => {
      const newValue = value.replace(/\D/g, "");
      const minutos = Math.min(parseInt(newValue.slice(-2)) || 0, 99);
      return `${newValue.slice(-5, -2).padStart(3, "0")}:${minutos
        .toString()
        .padStart(2, "0")}`;
    })(),
    number: value.replace(/\D/g, ""),
    otherValues: value
      .replace(/\D/g, "")
      .replace(/(\d)(\d{3})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, "."),
  }[mask];
};
