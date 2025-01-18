"use client";
import AddButton from "@/components/add-button";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import CategoriesTable from "@/components/tables/categorias/categories-table";
import { TCategories, TTransactions } from "@/components/tables/type";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCategoryCreate } from "@/components/ui/dialog/categories/dialog-create";
import { DialogDelete } from "@/components/ui/dialog/categories/dialog-delete";
import { DialogCategoryEdit } from "@/components/ui/dialog/categories/dialog-edit";
import {
  TCreateCategory,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/categories/schema";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import * as LucideIcons from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  formMethods: UseFormReturn<
    TCreateCategoryInput,
    unknown,
    TCreateCategoryOutput
  >;
  categories?: TCategories[];
  isLoading?: boolean;
  transactions?: TTransactions[];
  isLoadingTransactions?: boolean;
  onCreate: (data: TCreateCategory) => void;
  isCreating?: boolean;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  onEdit: (id: string, data: TCreateCategory) => void;
  isEditing?: boolean;
};

export default function CategoriasView({
  formMethods,
  categories,
  isLoading,
  transactions,
  isLoadingTransactions,
  onCreate,
  isCreating,
  onDelete,
  isDeleting,
  onEdit,
  isEditing,
}: Props) {
  return (
    <>
      <ControllerDashboard userName="user.nome" />
      <div className="grid grid-cols-2 gap-6 w-full h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <CategoriesTable
          loading={isLoading}
          data={categories}
          columns={[
            {
              accessorKey: "nome",
              header: () => (
                <p className="text-sm text-sub font-semibold leading-none tracking-tight pt-2 pb-2">
                  Nome
                </p>
              ),
              cell: ({ row }) => {
                const IconComponent = LucideIcons[
                  row.original.avatar as keyof typeof LucideIcons
                ] as React.ElementType;
                const formatName = (name: string) => {
                  return name.charAt(0).toUpperCase() + name.slice(1);
                };
                return (
                  <div className="flex items-center text-left gap-2">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-lg cursor-default"
                      style={{ backgroundColor: row.original.hex }}
                    >
                      {IconComponent ? (
                        <IconComponent size={16} />
                      ) : (
                        getFirstLetter(row.original.nome)
                      )}
                    </div>
                    <p className="truncate">{formatName(row.original.nome)}</p>
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
              header: () => (
                <p className="text-sm text-sub text-right mr-1 font-semibold leading-none tracking-tight pt-2 pb-2">
                  Ações
                </p>
              ),
              cell: ({ row }) => (
                <div className="flex items-center justify-end gap-3">
                  <Dialog>
                    <DialogTrigger>
                      <LucideIcons.Pencil
                        className="text-sub hover:text-foreground transition-all"
                        size={20}
                      />
                    </DialogTrigger>
                    <DialogCategoryEdit
                      title="Editar categoria"
                      categoryId={String(row.original.id)}
                      isEditing={isEditing}
                      onEdit={(id, data) => onEdit(id, data)}
                      categoryData={row.original}
                    />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <LucideIcons.Trash2
                        className="text-sub hover:text-foreground transition-all"
                        size={20}
                      />
                    </DialogTrigger>
                    <DialogDelete
                      title="Deletar categoria"
                      item={row.original.nome}
                      onDelete={() => onDelete(String(row.original.id))}
                      isDeleting={isDeleting}
                    />
                  </Dialog>
                </div>
              ),
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
              onCreate={onCreate}
              isCreating={isCreating}
              title="Adicionar categoria"
            />
          </Dialog>
          <CategoriesChartDashboard
            transacoes={transactions}
            className="col-span-1"
            loading={isLoadingTransactions}
          />
        </div>
      </div>
    </>
  );
}
