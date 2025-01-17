import { Api } from "../axios";
import { ListCategoriesResponse } from "./types";

export class CategoriesGateway {
  constructor(private api: typeof Api) {}

  async getCategories(): Promise<ListCategoriesResponse> {
    const { data } = await this.api.get(
      "/categorias?orderBy=nome&ordination=desc&page=1&quantity=10"
    );
    return data;
  }
}
