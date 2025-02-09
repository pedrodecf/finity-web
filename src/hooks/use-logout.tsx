import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import Cookies from "js-cookie";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export function useLogout() {
  const usersGateway = new UsersGateway(Api);
  const { toast } = useToast();
  const router = useRouter();

  const logout = async () => {
    try {
      await usersGateway.logout();
      localStorage.removeItem("finity-logged");
      Cookies.remove("finity-token");
      toast({
        variant: "success",
        title: "Logout realizado!",
        description: "Você foi deslogado com sucesso",
        icon: <CircleCheckBig />,
      });
      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar logout",
        description: "Tente novamente mais tarde",
        icon: <CircleX />,
      });
    }
  };

  return { logout };
}
