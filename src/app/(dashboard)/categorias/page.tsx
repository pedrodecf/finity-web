"use client";

import {
  createCategorySchema,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/dialog-category-create/schema";
import { Api } from "@/http/axios";
import { CategoriesGateway } from "@/http/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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

  return (
    <CategoriasView
      formMethods={formMethods}
      categories={categorias?.items}
      loading={isLoading}
    />
  );
}
