"use client";

import AddButton from "@/components/add-button";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { categoriesColumns } from "@/components/tables/categorias/categories-columns";
import CategoriesTable from "@/components/tables/categorias/categories-table";
import { fetchTransactions } from "@/components/tables/transactions-mock";
import { TCategories } from "@/components/tables/type";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCategoryCreate } from "@/components/ui/dialog/dialog-category-create/dialog-transaction-create";
import {
  TCreateCategory,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/dialog-category-create/schema";
import { UseFormReturn } from "react-hook-form";

type TCategoriasView = {
  formMethods: UseFormReturn<
    TCreateCategoryInput,
    unknown,
    TCreateCategoryOutput
  >;
  loading?: boolean;
  isCreating?: boolean;
  categories?: TCategories[];
  onSubmit: (data: TCreateCategory) => void;
};

export default function CategoriasView({
  formMethods,
  loading,
  isCreating,
  categories,
  onSubmit,
}: TCategoriasView) {
  const transactions = fetchTransactions();

  console.log(categories);
  return (
    <>
      <ControllerDashboard userName={"user.nome"} />
      <div className="grid grid-cols-2 gap-6 w-full h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <CategoriesTable
          loading={loading}
          data={categories}
          columns={categoriesColumns}
        />

        <div className="h-full gap-6 flex flex-col tablet:gap-4 overflow-hidden">
          <Dialog>
            <DialogTrigger>
              <AddButton
                className="h-fit"
                title="Cadastrar nova categoria"
                description="Classifique transações de forma organizada"
                icon="Layers2"
              />
            </DialogTrigger>
            <DialogCategoryCreate
              formMethods={formMethods}
              isCreating={isCreating}
              onSubmit={onSubmit}
              title="Adicionar categoria"
            />
          </Dialog>
          <CategoriesChartDashboard
            transacoes={transactions}
            className="col-span-1"
          />
        </div>
      </div>
    </>
  );
}
