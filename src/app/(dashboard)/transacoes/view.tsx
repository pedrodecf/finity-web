"use client";

import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumnsComplete } from "@/components/tables/transacoes/transactions-columns-complete";
import { TransactionsTableComplete } from "@/components/tables/transacoes/transactions-table-complete";
import { CirclePlus } from "lucide-react";
import { FinancesStack } from "./ui/cards";

type TTransacoesView = {
  transacoes: any;
  transacoesOrdenadas: any;
};

export default function TransacoesView({
  transacoes,
  transacoesOrdenadas,
}: TTransacoesView) {
  return (
    <>
      <ControllerDashboard userName="pedrão" />
      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center rounded-lg bg-card p-4 gap-4 tablet:gap-2 group cursor-pointer border border-border">
          <div className="rounded-lg bg-primary/50 p-3 flex items-center gap-4 ">
            <CirclePlus
              size={38}
              className="text-white/80 group-hover:scale-110 duration-500 ease-out group-hover:text-white"
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg mobile:text-base">
              Adicionar transação
            </h2>
            <p className="text-sub text-[13px]">Cadastrar movimentação</p>
          </div>
        </div>

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
      <div className="flex flex-col flex-1 h-full overflow-hidden tablet:flex-col tablet:overflow-auto tablet:gap-4 pb-6">
        <TransactionsTableComplete
          columns={transactionsColumnsComplete}
          data={transacoesOrdenadas}
        />
      </div>
    </>
  );
}
