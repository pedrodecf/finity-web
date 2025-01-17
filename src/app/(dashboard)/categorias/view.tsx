"use client";

import AddButton from "@/components/add-button";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
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
import { DialogDelete } from "@/components/ui/dialog/dialog-delete";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import * as LucideIcons from "lucide-react";
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
  onDelete: (id: string) => void;
};

export default function CategoriasView({
  formMethods,
  loading,
  isCreating,
  categories,
  onSubmit,
  onDelete,
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
          columns={[
            {
              accessorKey: "nome",
              header: () => {
                return (
                  <p className="text-sm text-sub font-semibold leading-none tracking-tight pt-2 pb-2">
                    Nome
                  </p>
                );
              },
              cell: ({ row }) => {
                const IconComponent = LucideIcons[
                  row.original.avatar as keyof typeof LucideIcons
                ] as React.ElementType;

                return (
                  <div className="flex items-center text-left gap-2">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-lg cursor-default"
                      style={{ backgroundColor: row.original.hex }}
                    >
                      {IconComponent ? (
                        <IconComponent size={16} />
                      ) : (
                        <>{getFirstLetter(row.original.nome)}</>
                      )}
                    </div>
                    <p className="truncate">{row.original.nome}</p>
                  </div>
                );
              },
              enableResizing: false,
              size: 200,
              minSize: 200,
              maxSize: 200,
            },
            {
              id: "actions",
              header: () => {
                return (
                  <p className="text-sm text-sub text-right mr-1 font-semibold leading-none tracking-tight pt-2 pb-2">
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
                        item={row.original.nome}
                        onHandleDelete={() => onDelete(String(row.original.id))}
                      />
                    </Dialog>
                  </div>
                );
              },
              enableResizing: false,
              size: 100,
              minSize: 100,
              maxSize: 100,
            },
          ]}
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
