"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Welcome from "./welcome";

type TControllerDashboardProps = {
  userName: string;
  onChangePeriod?: (period: "mesAtual" | "mesPassado" | "anoAtual") => void;
};

export function ControllerDashboard({
  userName,
  onChangePeriod,
}: TControllerDashboardProps) {
  const [selectedButton, setSelectedButton] = useState<"mesAtual" | "mesPassado" | "anoAtual">("mesAtual");

  function handleClick(period: "mesAtual" | "mesPassado" | "anoAtual") {
    setSelectedButton(period);
    onChangePeriod?.(period);
  }

  return (
    <div className="flex flex-row gap-4 items-center justify-between tablet:flex-col">
      <Welcome userName={userName} />
      <div className="flex items-center gap-4 mobile:flex-col">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleClick("mesAtual")}
            className={`rounded-none rounded-tl-lg rounded-bl-lg ${
              selectedButton === "mesAtual"
                ? "bg-primary text-white"
                : "text-muted-foreground"
            }`}
          >
            Mês atual
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleClick("mesPassado")}
            className={`rounded-none ${
              selectedButton === "mesPassado"
                ? "bg-primary text-white"
                : "text-muted-foreground"
            }`}
          >
            Mês passado
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleClick("anoAtual")}
            className={`rounded-none rounded-tr-lg rounded-br-lg ${
              selectedButton === "anoAtual"
                ? "bg-primary text-white"
                : "text-muted-foreground"
            }`}
          >
            Ano atual
          </Button>
        </div>
      </div>
    </div>
  );
}
