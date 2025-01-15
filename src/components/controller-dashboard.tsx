"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import Welcome from "./welcome";

type TControllerDashboard = {
  userName: string;
};

export function ControllerDashboard({ userName }: TControllerDashboard) {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "mesAtual"
  );
  return (
    <div className="flex flex-row gap-4 items-center justify-between tablet:flex-col">
      <Welcome userName={userName} />
      <div className="flex items-center gap-4 mobile:flex-col">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedButton("mesAtual")}
            className={`rounded-none rounded-tl-lg rounded-bl-lg ${
              selectedButton === "mesAtual"
                ? "bg-primary/50 text-foreground"
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
                ? "bg-primary/50 text-foreground"
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
                ? "bg-primary/50 text-foreground"
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
