"use client";

import { formatDateToBR } from "@/lib/formatters/format-date-br";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import { ColumnDef } from "@tanstack/react-table";
import * as LucideIcons from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type TTransactions = {
  id: string;
  valor: number;
  tipo: "Entrada" | "Saida";
  custoFixo: boolean;
  descricao: string;
  categoria: {
    nome: string;
    avatar: string;
    hex: string;
  };
  data: Date;
};

export const transactionsColumns: ColumnDef<TTransactions>[] = [
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => {
      const descricao = row.original.descricao;
      const IconComponent = LucideIcons[
        row.original.categoria.avatar as keyof typeof LucideIcons
      ] as React.ElementType;
      return (
        <div className="flex items-center text-left gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full"
                  style={{ backgroundColor: row.original.categoria.hex }}
                >
                  {IconComponent ? (
                    <IconComponent size={16} />
                  ) : (
                    <>{getFirstLetter(row.original.categoria.nome)}</>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black">
                <p>{row.original.categoria.nome}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p>
            {descricao.length > 25 ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="cursor-default text-left">
                    {descricao.substring(0, 25)}
                    <span className="text-[9px]">...</span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black">
                    {descricao}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              descricao
            )}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      return <p className="text-sm">{formatDateToBR(row.original.data)}</p>;
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      return (
        <p className="font-semibold">
          {formatToBRL({
            value: row.original.valor,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      return (
        <p
          className={`text-sm ${
            row.original.tipo === "Entrada" ? "text-success" : "text-warning"
          }`}
        >
          {row.original.tipo}
        </p>
      );
    },
  },
];
