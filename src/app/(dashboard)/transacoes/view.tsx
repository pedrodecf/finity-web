"use client";

import AddTransaction from "@/components/add-transaction";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumnsComplete } from "@/components/tables/transacoes/transactions-columns-complete";
import { TransactionsTableComplete } from "@/components/tables/transacoes/transactions-table-complete";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogTransactionCreate } from "@/components/ui/dialog/dialog-transaction-create/dialog-transaction-create";
import {
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "@/components/ui/dialog/dialog-transaction-create/schema";
import { UseFormReturn } from "react-hook-form";
import { FinancesStack } from "./ui/cards";

type TTransacoesView = {
  transacoes: any;
  transacoesOrdenadas: any;
  formMethods: UseFormReturn<
    TCreateTransactionInput,
    unknown,
    TCreateTransactionOutput
  >;
};

export default function TransacoesView({
  transacoes,
  transacoesOrdenadas,
  formMethods,
}: TTransacoesView) {
  return (
    <>
      <ControllerDashboard userName="pedrão" />
      <div className="grid grid-cols-3 gap-6">
        <Dialog>
          <DialogTrigger>
            <AddTransaction />
          </DialogTrigger>
          <DialogTransactionCreate
            formMethods={formMethods}
            onHandleSubmit={() => {}}
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
      <div className="flex flex-col flex-1 h-full overflow-hidden tablet:flex-col tablet:overflow-auto tablet:gap-4 pb-6">
        <TransactionsTableComplete
          columns={transactionsColumnsComplete}
          data={transacoesOrdenadas}
        />
      </div>
    </>
  );
}
