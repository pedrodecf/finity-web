import Image from "next/image";
import { Button } from "./ui/button";

export function ErrorRedirect({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-4 flex-1 items-center justify-center">
      <h2 className="text-4xl font-bold max-w-96 text-center">
        Erro ao carregar {message}!
      </h2>
      <Image
        src="/error.png"
        alt="Erro"
        width="200"
        height="188"
        priority={true}
      />
      <p className="text-center">
        Atualize a página ou entre em contato com o suporte.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>Atualizar</Button>
        <Button variant="outline" disabled className="cursor-not-allowed">
          Suporte
        </Button>
      </div>
    </div>
  );
}
