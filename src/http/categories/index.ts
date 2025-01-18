import { TCreateCategory } from "@/components/ui/dialog/categories/schema";
import { Api } from "../axios";
import { ListCategoriesResponse } from "./types";

export class CategoriesGateway {
  constructor(private api: typeof Api) {}

  async getCategories(): Promise<ListCategoriesResponse> {
    const { data } = await this.api.get(
      "/categorias?orderBy=nome&ordination=asc&page=1&quantity=10"
    );
    return data;
  }

  async createCategory(data: TCreateCategory): Promise<void> {
    await this.api.post("/categorias", data);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.api.delete(`/categorias/${id}`);
  }

  async editCategory(id: string, data: TCreateCategory): Promise<void> {
    await this.api.put(`/categorias/${id}`, data);
  }
}
