"use client";

import { ScrollDownIcon } from "@/assets/icons";
import { FinityLogo } from "@/assets/icons/finity-logo";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ReactNode, useRef } from "react";

export default function Home() {
  const logoRef = useRef(null);

  useGSAP(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full z-50">
        <div className="grid grid-cols-4 w-full h-full">
          <div className="bg-background" />
          <div className="bg-background" />
          <div className="bg-background" />
          <div className="bg-background" />

          <div className="absolute inset-0 flex justify-center items-center z-50">
            <FinityLogo ref={logoRef} className="w-40 h-40" />
          </div>
        </div>
      </div>

      <div>
        <Hero />
        <Navbar />
        <Description />
      </div>
    </>
  );

  function Hero() {
    const backgroundImgRef = useRef(null);
    const introImgRef = useRef(null);
    const titleTextRef = useRef(null);
    const scrollDownIconRef = useRef(null);

    useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top",
          end: "+=500px",
          scrub: true,
        },
      });

      timeline.to(introImgRef.current, { height: "100px" }, 0);
    }, []);

    useGSAP(() => {
      gsap.fromTo(
        titleTextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: "power2.inOut" }
      );
    }, []);

    useGSAP(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top",
          end: "+=50",
          scrub: true,
        },
      });

      timeline.to(scrollDownIconRef.current, { opacity: 0 }, 0);
    }, []);

    return (
      <div className="relative w-full flex justify-center">
        <div ref={backgroundImgRef} className="w-full h-[140vh] absolute">
          <Image
            src="/background.jpeg"
            alt="Hero"
            fill={true}
            priority={true}
            className="object-cover brightness-50"
          />
        </div>

        <div className="flex justify-center relative items-center mt-[35vh]">
          <div
            ref={introImgRef}
            className="w-[350px] h-[475px] absolute"
            data-scroll
            data-scroll-speed="0.3"
          >
            <Image
              src="/intro.png"
              alt="Intro"
              fill={true}
              priority={true}
              className="object-cover object-center brightness-50"
            />
            <div
              ref={scrollDownIconRef}
              className="absolute -bottom-28 right-0 left-0 opacity-60 animate-float-3"
              data-scroll
              data-scroll-speed="0.2"
            >
              <ScrollDownIcon className="size-10" />
            </div>
          </div>

          <h1
            ref={titleTextRef}
            className="text-white font-bold text-[6vw] z-10 text-center whitespace-nowrap leading-none"
            data-scroll
            data-scroll-speed="0.7"
          >
            CONTROLE SUAS FINANÇAS <br /> COM{" "}
            <span className="bg-gradient-to-t from-[#25c15e] to-[#00fc87] inline-block text-transparent bg-clip-text font-bold">
              FINNITY
            </span>
          </h1>
        </div>
      </div>
    );
  }

  function Navbar() {
    const navbarRef = useRef(null);

    useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top+=330px",
          end: "top+=500px",
          scrub: true,
          markers: true,
        },
      });

      timeline.from(navbarRef.current, { top: "-64px" }, 0);
    }, []);
    return (
      <header
        ref={navbarRef}
        className="w-full h-16 bg-card z-20 fixed top-0 flex justify-between items-center px-6"
      >
        <div className="w-52">
          <Image src="/finity-white.svg" alt="Logo" width={100} height={100} />
        </div>
        <nav>
          <ul className="flex space-x-10 text-sm">
            <li>
              <a href="#" className="hover-nav">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover-nav">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="hover-nav">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#" className="hover-nav">
                Contato
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4 w-52">
          <a href="/registro">
            <Button variant="ghost">Criar conta</Button>
          </a>
          <a href="/login">
            <Button>Entrar</Button>
          </a>
        </div>
      </header>
    );
  }

  function Description() {
    const frases = [
      "Finnity gerencia suas finanças",
      "Controle receitas e despesas",
      "Acompanhe seus gastos diários",
      "Crie orçamentos personalizados",
      "Veja relatórios detalhados",
    ];

    return (
      <div className="relative text-[3vw] mt-[20vw] ml-[10vw]">
        {frases.map((frase, index) => {
          return <AnimatedText key={index}>{frase}</AnimatedText>;
        })}
      </div>
    );
  }

  function AnimatedText({ children }: { children: ReactNode }) {
    const animatedTextRef = useRef(null);

    useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(animatedTextRef.current, {
        scrollTrigger: {
          trigger: animatedTextRef.current,
          start: "0px bottom",
          end: "bottom+=400px bottom",
          scrub: true,
          markers: true,
        },
        opacity: 0,
        left: "-100px",
        ease: "power3.inOut",
      });
    }, []);

    return (
      <p className="m-0 relative" ref={animatedTextRef}>
        {children}
      </p>
    );
  }
}
