"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Welcome from "./welcome";
import { useQueryParams } from "@/hooks/use-query-params";

// ----- Funções auxiliares de data -----

// formata a data no padrão "ddMMyyyy", ex.: 24012025
function formatDateToDDMMYYYY(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}${month}${year}`;
}

// retorna { firstDay, lastDay } do mês atual
function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 a 11
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // último dia do mês
  return { firstDay, lastDay };
}

// retorna { firstDay, lastDay } do mês anterior
function getPreviousMonthRange() {
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return { firstDay, lastDay };
}

// retorna { firstDay, lastDay } do ano atual
function getCurrentYearRange() {
  const now = new Date();
  const year = now.getFullYear();
  const firstDay = new Date(year, 0, 1);   // 1º de janeiro
  const lastDay = new Date(year, 11, 31); // 31 de dezembro
  return { firstDay, lastDay };
}

// ----- Componente principal -----
export function ControllerDashboard() {
  const { setQueries } = useQueryParams();

  const [selectedButton, setSelectedButton] = useState<
    "mesAtual" | "mesPassado" | "anoAtual"
  >("mesAtual");

  // Função que dispara ao clicar em cada botão
  function handleClick(period: "mesAtual" | "mesPassado" | "anoAtual") {
    setSelectedButton(period);

    if (period === "mesAtual") {
      const { firstDay, lastDay } = getCurrentMonthRange();
      setQueries({
        periodoDe: formatDateToDDMMYYYY(firstDay),
        periodoAte: formatDateToDDMMYYYY(lastDay),
      });
    } else if (period === "mesPassado") {
      const { firstDay, lastDay } = getPreviousMonthRange();
      setQueries({
        periodoDe: formatDateToDDMMYYYY(firstDay),
        periodoAte: formatDateToDDMMYYYY(lastDay),
      });
    } else if (period === "anoAtual") {
      const { firstDay, lastDay } = getCurrentYearRange();
      setQueries({
        periodoDe: formatDateToDDMMYYYY(firstDay),
        periodoAte: formatDateToDDMMYYYY(lastDay),
      });
    }
  }

  return (
    <div className="flex flex-row gap-4 items-center justify-between tablet:flex-col">
      <Welcome />
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
