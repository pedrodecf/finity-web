"use client";

import AddButton from "@/components/add-button";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { TransactionsTableComplete } from "@/components/tables/transacoes/transactions-table-complete";
import { TTransactions } from "@/components/tables/type";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogDelete } from "@/components/ui/dialog/categories/dialog-delete";
import { DialogTransactionCreate } from "@/components/ui/dialog/dialog-transaction-create/dialog-transaction-create";
import {
  TCreateTransaction,
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "@/components/ui/dialog/dialog-transaction-create/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/primitive/tooltip";
import { formatDateToBR } from "@/lib/formatters/format-date-br";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import * as LucideIcons from "lucide-react";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownZA,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FinancesStack } from "./ui/cards";

type TTransacoesView = {
  transacoes?: TTransactions[];
  loading?: boolean;
  formMethods: UseFormReturn<
    TCreateTransactionInput,
    unknown,
    TCreateTransactionOutput
  >;
  onCreate: (data: TCreateTransaction) => void;
  isCreating: boolean;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export default function TransacoesView({
  transacoes,
  loading,
  formMethods,
  onCreate,
  isCreating,
  onDelete,
  isDeleting,
}: TTransacoesView) {
  return (
    <>
      <ControllerDashboard userName="pedrão" />
      <div className="grid grid-cols-3 gap-6 w-full tablet:flex tablet:flex-col tablet:gap-4">
        <Dialog>
          <DialogTrigger>
            <AddButton
              title="Adiconar transação"
              description="Crie uma nova entrada ou saída"
              icon="ChartSpline"
            />
          </DialogTrigger>
          <DialogTransactionCreate
            formMethods={formMethods}
            onCreate={onCreate}
            isCreating={isCreating}
            title="Adicionar transação"
          />
        </Dialog>
        <FinancesCard
          title="Balanço"
          value="1.000,00"
          balance="positive"
          percentage={11}
          difference={80}
        />
        {FinancesStack({
          totalEntradas: 1000,
          totalSaidas: 200,
        })}
      </div>
      <div className="flex flex-col flex-1 h-full overflow-hidden tablet:flex-col tablet:overflow-auto tablet:gap-4 pb-6 tablet:mt-28">
        <TransactionsTableComplete
          data={transacoes}
          loading={loading}
          columns={[
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
                    className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center hover:border-transparent"
                  >
                    Descrição
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              },
              cell: ({ row }) => {
                const IconComponent = LucideIcons[
                  row.original.categoria.avatar as keyof typeof LucideIcons
                ] as React.ElementType;
                return (
                  <div className="flex items-center text-left gap-2">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="flex items-center justify-center w-7 h-7 rounded-lg cursor-default"
                            style={{
                              backgroundColor: row.original.categoria.hex,
                            }}
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
                    <p className="truncate">{row.original.descricao}</p>
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
                    className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center hover:border-transparent"
                  >
                    Data
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              },
              cell: ({ row }) => {
                return (
                  <p className="text-sm text-sub">
                    {formatDateToBR(row.original?.data)}
                  </p>
                );
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
                    className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center hover:border-transparent"
                  >
                    Valor
                    <Icon className="h-4 w-4" />
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
                    className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center hover:border-transparent"
                  >
                    Tipo
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              },
              cell: ({ row }) => {
                const isEntrada = row.original.tipo === "Entrada";

                return (
                  <div className="flex items-center gap-2">
                    {isEntrada ? (
                      <div className="pl-2 text-success flex items-center gap-1">
                        <LucideIcons.ArrowUp size={14} />
                        <p className={`text-[13px] font-normal`}>
                          {row.original.tipo}
                        </p>
                      </div>
                    ) : (
                      <div className="pl-2 text-warning/80 flex items-center gap-1">
                        <LucideIcons.ArrowDown size={16} />
                        <p className={`text-[13px] font-normal`}>
                          {row.original.tipo}
                        </p>
                      </div>
                    )}
                  </div>
                );
              },
            },
            {
              id: "actions",
              header: ({ column }) => {
                return (
                  <p className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center">
                    Ações
                  </p>
                );
              },
              cell: ({ row }) => {
                return (
                  <div className="flex items-center justify-end gap-3">
                    <Dialog>
                      <DialogTrigger>
                        <LucideIcons.Pencil
                          className="text-sub hover:text-foreground transition-all"
                          size={20}
                        />
                      </DialogTrigger>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <LucideIcons.Trash2
                          className="text-sub hover:text-foreground transition-all"
                          size={20}
                        />
                      </DialogTrigger>
                      <DialogDelete
                        title="Deletar transação"
                        item={row.original.descricao}
                        onDelete={() => onDelete(String(row.original.id))}
                        isDeleting={isDeleting}
                      />
                    </Dialog>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
}
