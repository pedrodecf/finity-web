import { BalanceChartDashboard } from "@/components/charts/balance-chart-dashboard";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumns } from "@/components/tables/dashboard-transacoes/transactions-columns";
import { TransactionsTable } from "@/components/tables/dashboard-transacoes/transactions-table";
import { TTransactions } from "@/components/tables/type";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { UserSession } from "@/stores/session";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

type TDashboardView = {
  transacoes: TTransactions[];
  transacoesOrdenadas: TTransactions[];
  saldoTotal: number;
  totalEntradas: number;
  totalSaidas: number;
  user: UserSession;
  percentual: number;
};

export default function DashboardView({
  transacoes,
  transacoesOrdenadas,
  saldoTotal,
  totalEntradas,
  totalSaidas,
  user,
  percentual,
}: TDashboardView) {
  return (
    <>
      <ControllerDashboard userName={user.nome} />
      <div className="grid grid-cols-3 gap-6 w-full tablet:flex tablet:flex-col tablet:gap-4">
        <FinancesCard
          title="Balanço"
          balance={percentual > 0 ? "positive" : "negative"}
          percentage={percentual}
          difference={totalEntradas - totalSaidas}
          value={formatToBRL({
            value: saldoTotal,
            removeSymbol: true,
          })}
        />
        <FinancesCard
          title="Entradas"
          titleIcon={<TrendingUpIcon size={16} />}
          value={formatToBRL({
            value: totalEntradas,
            removeSymbol: true,
          })}
        />
        <FinancesCard
          title="Saídas"
          titleIcon={<TrendingDownIcon size={16} />}
          value={formatToBRL({
            value: totalSaidas,
            removeSymbol: true,
          })}
        />
      </div>
      <div className="grid grid-cols-5 gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <CategoriesChartDashboard transacoes={transacoes} />
        <div className="col-span-3 h-full gap-6 flex flex-col tablet:gap-4 overflow-hidden">
          <BalanceChartDashboard
            transacoes={transacoes}
            userGastosPorcetagemMeta={user.gastosPorcetagemMeta}
          />
          <TransactionsTable
            columns={transactionsColumns}
            data={transacoesOrdenadas}
          />
        </div>
        <div />
      </div>
    </>
  );
}
