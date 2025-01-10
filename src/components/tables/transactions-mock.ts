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
    {
      id: "5",
      valor: 5000,
      tipo: "Entrada",
      descricao: "Salario",
      categoria: {
        avatar: "CircleDollarSign",
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-03"),
    },
    {
      id: "6",
      valor: 95.0,
      tipo: "Saida",
      descricao: "Compra de materiais de construção",
      categoria: {
        avatar: "Home",
        nome: "Casa",
        hex: "#8E44AD",
      },
      data: new Date("2024-01-07"),
    },
    {
      id: "7",
      valor: 250.0,
      tipo: "Saida",
      descricao: "Vacina e ração do pet",
      categoria: {
        avatar: "Dog",
        nome: "Pet",
        hex: "#E67E22",
      },
      data: new Date("2024-01-08"),
    },
    {
      id: "8",
      valor: 120.5,
      tipo: "Saida",
      descricao: "Compra de roupas",
      categoria: {
        avatar: "Shirt",
        nome: "Roupas",
        hex: "#2ECC71",
      },
      data: new Date("2024-01-09"),
    },
    {
      id: "9",
      valor: 100.0,
      tipo: "Saida",
      descricao: "Cinema com amigos",
      categoria: {
        avatar: "Music2",
        nome: "Lazer",
        hex: "#3498DB",
      },
      data: new Date("2024-01-10"),
    },
    {
      id: "10",
      valor: 300.0,
      tipo: "Saida",
      descricao: "Curso de inglês",
      categoria: {
        avatar: "Book",
        nome: "Educação",
        hex: "#F1C40F",
      },
      data: new Date("2024-01-11"),
    },
    {
      id: "11",
      valor: 35.5,
      tipo: "Saida",
      descricao: "Pizzaria com amigos",
      categoria: {
        avatar: "Beef", // Alimentação
        nome: "Alimentação",
        hex: "#9E77ED",
      },
      data: new Date("2024-01-12"),
    },
    {
      id: "12",
      valor: 250.0,
      tipo: "Entrada",
      descricao: "Pagamento pela venda de peças de computador",
      categoria: {
        avatar: "CircleDollarSign", // Outros
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-13"),
    },
    {
      id: "13",
      valor: 7.99,
      tipo: "Saida",
      descricao: "Assinatura de canal de esportes",
      categoria: {
        avatar: "TvMinimalPlay", // Streaming
        nome: "Streaming",
        hex: "#F04438",
      },
      data: new Date("2024-01-14"),
    },
    {
      id: "14",
      valor: 15.0,
      tipo: "Saida",
      descricao: "Lavagem do carro",
      categoria: {
        avatar: "CarFront", // Transporte
        nome: "Transporte",
        hex: "#17B26A",
      },
      data: new Date("2024-01-15"),
    },
    {
      id: "15",
      valor: 120.0,
      tipo: "Entrada",
      descricao: "Reembolso de despesas médicas",
      categoria: {
        avatar: "CircleDollarSign", // Outros
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-16"),
    },
    {
      id: "16",
      valor: 200.0,
      tipo: "Saida",
      descricao: "Reparos elétricos na residência",
      categoria: {
        avatar: "Home", // Casa
        nome: "Casa",
        hex: "#8E44AD",
      },
      data: new Date("2024-01-17"),
    },
    {
      id: "17",
      valor: 60.0,
      tipo: "Saida",
      descricao: "Vacina anual do pet",
      categoria: {
        avatar: "Dog", // Pet
        nome: "Pet",
        hex: "#E67E22",
      },
      data: new Date("2024-01-18"),
    },
    {
      id: "18",
      valor: 80.0,
      tipo: "Saida",
      descricao: "Presente de aniversário",
      categoria: {
        avatar: "Shirt", // Roupas (vou simular compra de presente de roupa)
        nome: "Roupas",
        hex: "#2ECC71",
      },
      data: new Date("2024-01-19"),
    },
    {
      id: "19",
      valor: 50.0,
      tipo: "Entrada",
      descricao: "Dinheiro devolvido por amigo",
      categoria: {
        avatar: "CircleDollarSign", // Outros
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-20"),
    },
    {
      id: "20",
      valor: 45.0,
      tipo: "Saida",
      descricao: "Bilhar e jogos no bar",
      categoria: {
        avatar: "Music2", // Lazer
        nome: "Lazer",
        hex: "#3498DB",
      },
      data: new Date("2024-01-21"),
    },
    {
      id: "21",
      valor: 300.0,
      tipo: "Saida",
      descricao: "Matrícula em curso de fotografia",
      categoria: {
        avatar: "Book", // Educação
        nome: "Educação",
        hex: "#F1C40F",
      },
      data: new Date("2024-01-22"),
    },
    {
      id: "22",
      valor: 55.0,
      tipo: "Saida",
      descricao: "Almoço de domingo",
      categoria: {
        avatar: "Beef", // Alimentação
        nome: "Alimentação",
        hex: "#9E77ED",
      },
      data: new Date("2024-01-23"),
    },
    {
      id: "23",
      valor: 119.9,
      tipo: "Saida",
      descricao: "Troca de pneus do carro (parte da mão de obra)",
      categoria: {
        avatar: "CarFront", // Transporte
        nome: "Transporte",
        hex: "#17B26A",
      },
      data: new Date("2024-01-24"),
    },
    {
      id: "24",
      valor: 3999.0,
      tipo: "Entrada",
      descricao: "Ajuste salarial",
      categoria: {
        avatar: "CircleDollarSign", // Outros
        nome: "Outros",
        hex: "#0BA5EC",
      },
      data: new Date("2024-01-25"),
    },
    {
      id: "25",
      valor: 320.0,
      tipo: "Saida",
      descricao: "Roupas de inverno",
      categoria: {
        avatar: "Shirt", // Roupas
        nome: "Roupas",
        hex: "#2ECC71",
      },
      data: new Date("2024-01-26"),
    },
  ];
};
