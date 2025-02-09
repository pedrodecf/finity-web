"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Home() {
  useGSAP(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className="h-screen bg-black/10 overflow-hidden">
      <div className="relative z-50 py-5 border-b border-[#242442] bg-background">
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
            <Button size="sm" variant="gray">
              <a href="/registro">Criar conta</a>
            </Button>
            <Button size="sm" variant="purple">
              <a href="/registro">Entrar</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-8 items-center justify-center mt-44">
        <div className="rounded-full absolute w-[800px] h-[800px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_30px_10px_rgba(36,36,66,0.30),_0_0_60px_20px_rgba(36,36,66,0.20),_0_0_90px_30px_rgba(36,36,66,0.10),_0_0_100px_40px_rgba(36,36,66,0.05)] -z-10" />
        <div className="rounded-full absolute w-[1000px] h-[1000px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_30px_10px_rgba(36,36,66,0.30),_0_0_60px_20px_rgba(36,36,66,0.20),_0_0_90px_30px_rgba(36,36,66,0.10),_0_0_100px_40px_rgba(36,36,66,0.05)] -z-10" />
        <div className="rounded-full absolute w-[1200px] h-[1200px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-[#242442] shadow-[0_0_30px_10px_rgba(36,36,66,0.30),_0_0_60px_20px_rgba(36,36,66,0.20),_0_0_90px_30px_rgba(36,36,66,0.10),_0_0_100px_40px_rgba(36,36,66,0.05)] -z-10" />
        <div className="m-auto text-6xl font-medium text-center relative">
          <h1>Organize suas contas</h1>
          <h1 className="mt-3 bg-gradient-to-r from-[#6359E9] to-[#8d85f6] inline-block text-transparent bg-clip-text">
            Multiplique seus planos
          </h1>
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
        </div>
        <p className="text-center font-medium text-lg">
          Conheça o Finity, o app de controle de gastos e custos <br />
          que simplifica suas finanças. Acompanhe despesas, gastos no cartão,
          planeje
          <br /> seu orçamento e alcance a segurança financeira.
        </p>
        <div className="flex gap-2 items-center -mt-1">
          <Button variant="purple">
            <a href="/registro">Acesse sua conta</a>
          </Button>
          <Button variant="gray">
            <a href="/registro">Faça seu registro grátis</a>
          </Button>
        </div>

        <footer className="absolute bottom-10">
          <span className="text-sub/80 text-sm">
            Desenvolvido com <span className="text-primary/80">❤</span> por
            pedrodecf
          </span>
        </footer>
      </div>
    </main>
  );
}
