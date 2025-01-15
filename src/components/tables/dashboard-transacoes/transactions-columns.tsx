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
} from "../../ui/primitive/tooltip";
import { TTransactions } from "../type";

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
                  className="flex items-center justify-center w-7 h-7 rounded-full cursor-default"
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

          <p className="truncate">{descricao}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      return (
        <p className="text-sm text-sub">{formatDateToBR(row.original.data)}</p>
      );
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const isEntrada = row.original.tipo === "Entrada";

      return (
        <>
          {isEntrada ? (
            <>
              <p className="font-semibold text-success">
                +{" "}
                {formatToBRL({
                  value: row.original.valor,
                  removeSymbol: false,
                })}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold ">
                -{" "}
                {formatToBRL({
                  value: row.original.valor,
                  removeSymbol: false,
                })}
              </p>
            </>
          )}
        </>
      );
    },
  },
];
