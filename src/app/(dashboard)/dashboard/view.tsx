import { BalanceChartDashboard } from "@/components/charts/balance-chart-dashboard";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { FinancesCard } from "@/components/finances-card";
import { transactionsColumns } from "@/components/tables/transactions-columns";
import { fetchTransactions } from "@/components/tables/transactions-mock";
import { TransactionsTable } from "@/components/tables/transactions-table";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardView() {
  const data = fetchTransactions();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <SidebarTrigger />
          <div className="shrink-0 bg-sub w-[1px] mr-1 h-4"></div>
          <h2 className="font-semibold text-xl truncate">
            Bem-vindo, Pedro! &#128075;
          </h2>
        </div>
      </div>
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
          <TransactionsTable columns={transactionsColumns} data={data} />
        </div>
        <div />
      </div>
    </>
  );
}
