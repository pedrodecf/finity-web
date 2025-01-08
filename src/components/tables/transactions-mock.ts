import { TTransactions } from "./transactions-columns";

export const fetchTransactions = (): TTransactions[] => {
  return [
    {
      id: "1",
      valor: 150.75,
      tipo: "Saida",
      descricao: "Compra de supermercado Jaú Serve de Ribeirão Preto",
      categoria: {
        avatar: "Beef",
        nome: "Alimentação",
        hex: "#9E77ED",
      },
      data: new Date("2024-01-03"),
    },
    {
      id: "2",
      valor: 0.99,
      tipo: "Saida",
      descricao: "Compra de aplicativo",
      categoria: {
        avatar: "TvMinimalPlay",
        nome: "Streaming",
        hex: "#F04438",
      },
      data: new Date("2024-01-06"),
    },
    {
      id: "3",
      valor: 14.99,
      tipo: "Entrada",
      descricao: "Jogo do bicho",
      categoria: {
        avatar: "CircleDollarSign",
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-06"),
    },
    {
      id: "4",
      valor: 50,
      tipo: "Saida",
      descricao: "Gasolina",
      categoria: {
        avatar: "CarFront",
        nome: "Transporte",
        hex: "#17B26A",
      },
      data: new Date("2024-01-03"),
    },
  ];
};
