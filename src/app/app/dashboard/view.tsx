import { BalanceChartDashboard } from "@/components/charts/balance-chart-dashboard";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumns } from "@/components/tables/dashboard-transacoes/transactions-columns";
import { TransactionsTable } from "@/components/tables/dashboard-transacoes/transactions-table";
import { TTransactions } from "@/components/tables/type";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

type TDashboardViewProps = {
  transactions?: TTransactions[];
  isLoadingTransactions?: boolean;
  balance?: {
    totalEntrada: number;
    totalSaida: number;
    total: number;
  };
  percentual?: number;
};

export default function DashboardView({
  transactions,
  isLoadingTransactions,
  balance,
  percentual,
}: TDashboardViewProps) {
  return (
    <>
      <ControllerDashboard />
      <div className="grid grid-cols-3 gap-6 w-full tablet:flex tablet:flex-col tablet:gap-4">
        <FinancesCard
          title="Balanço"
          balance={
            percentual !== undefined
              ? percentual > 0
                ? "positive"
                : "negative"
              : "neutral"
          }
          percentage={percentual}
          difference={(balance?.totalEntrada || 0) - (balance?.totalSaida || 0)}
          value={formatToBRL({
            value: balance?.total || 0,
            removeSymbol: true,
          })}
        />
        <FinancesCard
          title="Entradas"
          titleIcon={<TrendingUpIcon size={16} />}
          value={formatToBRL({
            value: balance?.totalEntrada || 0,
            removeSymbol: true,
          })}
        />
        <FinancesCard
          title="Saídas"
          titleIcon={<TrendingDownIcon size={16} />}
          value={formatToBRL({
            value: balance?.totalSaida || 0,
            removeSymbol: true,
          })}
        />
      </div>
      <div className="grid grid-cols-5 gap-6 w-full flex-1 overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <CategoriesChartDashboard
          transacoes={transactions}
          loading={isLoadingTransactions}
          className="h-fit"
        />
        <div className="col-span-3 h-full gap-6 flex flex-col tablet:gap-4 overflow-hidden">
          <BalanceChartDashboard
            transacoes={transactions || []}
            userGastosPorcetagemMeta={50}
          />
          <TransactionsTable
            columns={transactionsColumns}
            data={transactions || []}
          />
        </div>
        <div />
      </div>
    </>
  );
}
