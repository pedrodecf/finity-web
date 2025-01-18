"use client";
import { queryClient } from "@/app/providers";
import {
  createCategorySchema,
  TCreateCategory,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/categories/schema";
import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { CategoriesGateway } from "@/http/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import CategoriasView from "./view";

type TErrorResponse = {
  message?: string;
};

export default function CategoriasPage() {
  const categoriesGateway = new CategoriesGateway(Api);
  const { toast } = useToast();

  const { data: categorias, isLoading } = useQuery(
    ["categories"],
    () => categoriesGateway.getCategories(),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

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

  async function onCreate(data: TCreateCategory) {
    await createCategory(data);
  }

  async function onDelete(id: string) {
    await deleteCategory(id);
  }

  async function onEdit(id: string, data: TCreateCategory) {
    await editCategory({ id, data });
  }

  return (
    <CategoriasView
      formMethods={formMethods}
      categories={categorias?.items}
      isLoading={isLoading}
      onCreate={onCreate}
      isCreating={isCreating}
      onDelete={onDelete}
      isDeleting={isDeleting}
      onEdit={onEdit}
      isEditing={isEditing}
    />
  );
}
