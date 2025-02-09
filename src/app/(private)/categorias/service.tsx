"use client";

import { queryClient } from "@/app/providers";
import {
  createCategorySchema,
  TCreateCategory,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/dialog/categories/schema";
import { ErrorRedirect } from "@/components/error-redirect";
import { TCategories } from "@/components/tables/type";
import { useQueryParams } from "@/hooks/use-query-params";
import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { CategoriesGateway } from "@/http/categories";
import { TransactionsGateway } from "@/http/transactions";
import { TErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Fallback } from "./ui/fallback";
import CategoriasView from "./view";

export default function CategoriasPage() {
  const [categoryToEdit, setCategoryToEdit] =
    useState<TCategories | null>(null);

  const [categoryToDelete, setCategoryToDelete] =
    useState<TCategories | null>(null);

  const { queries } = useQueryParams();
  const categoriesGateway = new CategoriesGateway(Api);
  const { toast } = useToast();

  const formMethods = useForm<
    TCreateCategoryInput,
    unknown,
    TCreateCategoryOutput
  >({
    mode: "onSubmit",
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      nome: "",
      avatar: "",
      hex: "",
    },
  });

  const {
    data: categorias,
    isLoading,
    isError: categoriasError,
  } = useQuery(["categories"], () => categoriesGateway.getCategories(), {
    keepPreviousData: true,
    staleTime: 60000,
  });

  const {
    data: transacoes,
    isLoading: isLoadingTransactions,
    isError: transacoesError,
  } = useQuery(
    ["transacoes", queries],
    () => new TransactionsGateway(Api).getTransactions(queries),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  const { mutateAsync: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: async (data: TCreateCategory) =>
      categoriesGateway.createCategory(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["categories"]);
      toast({
        variant: "success",
        title: "Categoria criada com sucesso",
        description: `Nova categoria foi cadastrada`,
        icon: <CircleCheckBig />,
      });
    },
    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar categoria",
        description:
          error.response?.data?.message ||
          "Um problema inesperado ocorreu, tente novamente",
        icon: <CircleX />,
      });
    },
  });

  const { mutateAsync: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: async (id: string) => categoriesGateway.deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["categories"]);
      toast({
        variant: "success",
        title: "Categoria deletada com sucesso",
        description: "A categoria foi removida da lista",
        icon: <CircleCheckBig />,
      });
    },
    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao deletar categoria",
        description:
          error.response?.data?.message ||
          "Um problema inesperado ocorreu, tente novamente",
        icon: <CircleX />,
      });
    },
  });

  const { mutateAsync: editCategory, isLoading: isEditing } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TCreateCategory }) =>
      categoriesGateway.editCategory(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["categories"]);
      toast({
        variant: "success",
        title: "Categoria editada com sucesso",
        description: "A categoria foi atualizada",
        icon: <CircleCheckBig />,
      });
    },
    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao editar categoria",
        description:
          error.response?.data?.message ||
          "Um problema inesperado ocorreu, tente novamente",
        icon: <CircleX />,
      });
    },
  });

  async function onCreate(data: TCreateCategory): Promise<boolean> {
    await createCategory(data);
    return true;
  }

  async function onDelete(id: string): Promise<boolean> {
    await deleteCategory(id);
    return true;
  }

  async function onEdit(id: string, data: TCreateCategory): Promise<boolean> {
    await editCategory({ id, data });
    return true;
  }

  if (categoriasError) {
    return <ErrorRedirect message="as categorias" />;
  }

  if (transacoesError) {
    return <ErrorRedirect message="as transações" />;
  }

  if (!categorias || !transacoes) {
    return <Fallback />;
  }

  return (
    <CategoriasView
      formMethods={formMethods}
      categories={categorias?.items}
      isLoading={isLoading}
      transactions={transacoes?.items}
      isLoadingTransactions={isLoadingTransactions}
      onCreate={onCreate}
      isCreating={isCreating}
      onDelete={onDelete}
      isDeleting={isDeleting}
      onEdit={onEdit}
      isEditing={isEditing}
      categoryToEdit={categoryToEdit}
      setCategoryToEdit={setCategoryToEdit}
      categoryToDelete={categoryToDelete}
      setCategoryToDelete={setCategoryToDelete}
    />
  );
}
