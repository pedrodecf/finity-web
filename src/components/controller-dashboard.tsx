"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { SidebarTrigger } from "./ui/sidebar";

export function ControllerDashboard() {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "mesAtual"
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-hidden">
        <SidebarTrigger />
        <div className="shrink-0 bg-sub w-[1px] mr-1 h-4"></div>
        <h2 className="font-semibold text-xl truncate tracking-tight">
          Bem-vindo, Pedro! &#128075;
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="">
          <Button
            variant="outline"
            onClick={() => setSelectedButton("mesAtual")}
            className={`rounded-none rounded-tl-lg rounded-bl-lg ${
              selectedButton === "mesAtual"
                ? "bg-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Mês atual
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedButton("mesPassado")}
            className={`rounded-none ${
              selectedButton === "mesPassado"
                ? "bg-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Mês passado
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedButton("anoAtual")}
            className={`rounded-none rounded-tr-lg rounded-br-lg ${
              selectedButton === "anoAtual"
                ? "bg-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Ano atual
          </Button>
        </div>
        <DatePicker />
      </div>
    </div>
  );
}
