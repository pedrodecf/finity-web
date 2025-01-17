import { Api } from "../axios";

export class CategoriesGateway {
  constructor(private api: typeof Api) {}

  async getCategories() {
    const { data } = await this.api.get("/categorias?orderBy=nome&ordination=desc&page=1&quantity=10");
    return data;
  }
}
