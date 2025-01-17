import { TCategories } from "@/components/tables/type";

export type ListCategoriesResponse = {
  items: TCategories[];
  pages: number;
  totalItems: number;
};
