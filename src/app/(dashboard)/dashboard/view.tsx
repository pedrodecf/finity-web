import { BalanceChartDashboard } from "@/components/charts/balance-chart-dashboard";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumns } from "@/components/tables/transactions-columns";
import { fetchTransactions } from "@/components/tables/transactions-mock";
import { TransactionsTable } from "@/components/tables/transactions-table";

export default function DashboardView() {
  const data = fetchTransactions();
  const orderedData = data.sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });

  return (
    <>
      <ControllerDashboard />
      <div className="grid grid-cols-3 gap-6 w-full  tablet:flex tablet:flex-col tablet:gap-4">
        <FinancesCard
          title="Balanço"
          balance="positive"
          percentage="10%"
          value="1.200,00"
        />
        <FinancesCard
          title="Entradas"
          balance="negative"
          percentage="5%"
          value="1.200,00"
        />
        <FinancesCard
          title="Saídas"
          balance="neutral"
          percentage="0%"
          value="1.200,00"
        />
      </div>
      <div className="grid grid-cols-5 gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <CategoriesChartDashboard className="col-span-2 h-full overflow-y-auto" />
        <div className="col-span-3 h-full gap-6 flex flex-col tablet:gap-4 overflow-hidden">
          <BalanceChartDashboard />
          <TransactionsTable columns={transactionsColumns} data={orderedData} />
        </div>
        <div />
      </div>
    </>
  );
}
