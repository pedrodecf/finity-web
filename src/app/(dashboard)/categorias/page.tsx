"use client";

import {
  createCategorySchema,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/dialog-category-create/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CategoriasView from "./view";

export default function CategoriasPage() {
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
  return <CategoriasView formMethods={formMethods} />;
}
