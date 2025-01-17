"use client";

import { queryClient } from "@/app/providers";
import {
  createCategorySchema,
  TCreateCategory,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/dialog-category-create/schema";
import { Api } from "@/http/axios";
import { CategoriesGateway } from "@/http/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CategoriasView from "./view";

export default function CategoriasPage() {
  const categoriesGateway = new CategoriesGateway(Api);

  const {
    data: categorias,
    isError,
    isLoading,
  } = useQuery(["categories"], () => categoriesGateway.getCategories(), {
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

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
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: TCreateCategory) => {
    await createCategory(data);
  }

  return (
    <CategoriasView
      formMethods={formMethods}
      categories={categorias?.items}
      loading={isLoading}
      onSubmit={onSubmit}
    />
  );
}
