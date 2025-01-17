import AddButton from "@/components/add-button";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { categoriesColumns } from "@/components/tables/categorias/categories-columns";
import { CategoriesTable } from "@/components/tables/categorias/categories-table";
import { fecthCategories } from "@/components/tables/categories-moks";
import { fetchTransactions } from "@/components/tables/transactions-mock";

export default function CategoriasView() {
  const categories = fecthCategories();
  const transactions = fetchTransactions();
  return (
    <>
      <ControllerDashboard userName={"user.nome"} />
      <div className="grid grid-cols-2 gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <div className="col-span-1">
          <CategoriesTable data={categories} columns={categoriesColumns} />
        </div>
        <div className="flex flex-col gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
          <AddButton
            className="h-fit"
            title="Cadastrar nova categoria"
            description="Classifique transações de forma organizada"
            icon="Layers2"
          />
          <CategoriesChartDashboard
            transacoes={transactions}
            className="col-span-1"
          />
        </div>
      </div>
    </>
  );
}
