"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedLogged = localStorage.getItem("finity-logged");
    setIsLogged(!!storedLogged);
  }, []);
  return (
    <main className="relative h-screen bg-black/10 overflow-hidden">
      <header className="relative z-50 py-4 border-b border-[#242442] bg-gradient-to-l from-card to-background">
        <div className="max-w-screen-lg flex justify-between items-center mx-auto">
          <div className="flex items-center gap-14">
            <Image
              src="/finity-white.svg"
              alt="Logo Finity"
              width="100"
              height="100"
              priority
            />
            <nav>
              <ul className="flex items-center space-x-8 text-sm font-semibold">
                <li>
                  <a href="#" className="hover-nav">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-nav">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-nav">
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex gap-2 items-center">
            <a
              href="https://github.com/pedrodecf/front-financas"
              target="_blank"
            >
              <Button size="icon-sm" variant="gray">
                <Github />
              </Button>
            </a>
            {isLogged ? (
              <Button size="sm" variant="gray">
                <a href="/dashboard">Dashboard</a>
              </Button>
            ) : (
              <Button size="sm" variant="gray">
                <a href="/registro">Criar conta</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full absolute w-[800px] h-[800px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />
        <div className="rounded-full absolute w-[1000px] h-[1000px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />
        <div className="rounded-full absolute w-[1200px] h-[1200px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />
        <div className="rounded-full absolute w-[1400px] h-[1400px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />
        <div className="rounded-full absolute w-[1600px] h-[1600px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />
        <div className="rounded-full absolute w-[1800px] h-[1800px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_70px_20px_rgba(36,36,66,0.23),_0_0_120px_30px_rgba(36,36,66,0.18),_0_0_170px_40px_rgba(36,36,66,0.14),_0_0_220px_50px_rgba(36,36,66,0.09),_0_0_270px_60px_rgba(36,36,66,0.06),_0_0_320px_70px_rgba(36,36,66,0.045)] -z-10" />

        <div className="text-6xl font-medium text-center relative flex flex-col items-center z-10 gap-6">
          <div className="">
            <h1>Organize seus gastos</h1>
            <h1 className="mt-3 bg-gradient-to-r from-[#6359E9] to-[#8d85f6] inline-block text-transparent bg-clip-text">
              Multiplique suas metas!
            </h1>
          </div>
          <Image
            src="/item1.svg"
            alt=""
            width="172"
            height="102"
            priority
            className="absolute -top-6 -left-72 animate-float-1"
          />
          <Image
            src="/item2.svg"
            alt=""
            width="172"
            height="58"
            priority
            className="absolute -top-14 -right-72 animate-float-2"
          />
          <Image
            src="/item3.svg"
            alt=""
            width="78"
            height="78"
            priority
            className="absolute -bottom-36 -left-40 animate-float-4"
          />
          <Image
            src="/item4.svg"
            alt=""
            width="157"
            height="90"
            priority
            className="absolute -bottom-28 -right-60 animate-float-3"
          />
          <p className="text-center font-medium text-lg">
            Conheça o Finity, seu app de controle de gastos e custos <br />
            que simplifica suas finanças. Acompanhe despesas, gastos no cartão,
            planeje
            <br /> seu orçamento e alcance a segurança financeira. De graça!
          </p>
          <div className="flex gap-2 items-center -mt-1">
            <a href="/login">
              <Button variant="purple">Acesse sua conta</Button>
            </a>
            <a href="/registro">
              <Button variant="gray">Faça seu registro grátis</Button>
            </a>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-10 w-full text-center">
        <span className="text-sub/80 text-sm">
          Desenvolvido com <span className="text-primary/80">❤</span> por
          <a
            href="https://www.linkedin.com/in/pedrodecf/"
            target="_blank"
            className="hover:text-primary/80 transition-colors"
          >
            {" "}
            pedrodecf
          </a>
        </span>
      </footer>
    </main>
  );
}
