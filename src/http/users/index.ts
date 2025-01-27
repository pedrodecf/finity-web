import { Api } from "../axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  Usuario,
} from "./types";

export class UsersGateway {
  constructor(private api: typeof Api) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await this.api.post("/usuarios/login", credentials, {
      withCredentials: true,
    });
    return data;
  }

  async profile(): Promise<Usuario> {
    const { data } = await this.api.get("/usuarios/me");
    return data;
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    await this.api.post("/usuarios", credentials);
  }

  async logout(): Promise<void> {
    await this.api.post("/usuarios/logout");
  }
}
