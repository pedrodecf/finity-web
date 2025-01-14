"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateToBR } from "@/lib/formatters/format-date-br";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import { ColumnDef } from "@tanstack/react-table";
import * as LucideIcons from "lucide-react";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownZA,
  MoreHorizontal,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { TTransactions } from "../type";

export const transactionsColumnsComplete: ColumnDef<TTransactions>[] = [
  {
    accessorKey: "descricao",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const Icon =
        isSorted === "asc"
          ? ArrowDownAZ
          : isSorted === "desc"
          ? ArrowDownZA
          : ArrowDownAZ;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Descrição
          <Icon className="ml-1 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const Icon =
        isSorted === "asc"
          ? ArrowDown01
          : isSorted === "desc"
          ? ArrowDown10
          : ArrowDown01;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Data
          <Icon className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-sm">{formatDateToBR(row.original.data)}</p>;
    },
  },
  {
    accessorKey: "valor",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const Icon =
        isSorted === "asc"
          ? ArrowDownNarrowWide
          : isSorted === "desc"
          ? ArrowDownWideNarrow
          : ArrowDownNarrowWide;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Valor
          <Icon className="ml-1 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const Icon =
        isSorted === "asc"
          ? ArrowDownAZ
          : isSorted === "desc"
          ? ArrowDownZA
          : ArrowDownAZ;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Tipo
          <Icon className="ml-1 h-4 w-4" />
        </Button>
      );
    },
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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
