import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 h-screen linear-bg-2">
      <h2 className="text-4xl font-bold uppercase">Página não encontrada!</h2>
      <Image src="/404.png" alt="404" width={300} height={300} priority />
      <Link href="/dashboard">
        <Button>Voltar para onde é seguro</Button>
      </Link>
    </div>
  );
}
