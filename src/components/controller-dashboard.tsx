"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { SidebarTrigger } from "./ui/sidebar";

type TControllerDashboard = {
  userName: string;
};

export function ControllerDashboard({ userName }: TControllerDashboard) {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "mesAtual"
  );
  return (
    <div className="flex flex-row gap-4 items-center justify-between tablet:flex-col">
      <div className="flex items-center gap-2 overflow-hidden mobile:w-full justify-between">
        <SidebarTrigger className="mobile:self-start" />
        <div className="shrink-0 bg-sub w-[1px] mr-1 h-4 mobile:hidden" />
        <h2 className="text-xl truncate tracking-tight text-center w-full">
          Bem-vindo, <span className="font-bold">{userName}!</span> &#128075;
        </h2>
      </div>
      <div className="flex items-center gap-4 mobile:flex-col">
        <div>
          <Button
            variant="outline"
            size="sm"
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
            size="sm"
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
            size="sm"
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
        <DatePicker size="sm" />
      </div>
    </div>
  );
}
