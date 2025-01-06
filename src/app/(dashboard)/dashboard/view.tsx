import { FinancesCard } from "@/components/finances-card";

export default function DashboardView() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
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
  );
}
