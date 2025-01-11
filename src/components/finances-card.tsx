"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface FinancesCardProps {
  title: string;
  titleIcon?: React.ReactNode;
  value: string;
  percentage?: string;
  balance?: "positive" | "negative" | "neutral";
}

export function FinancesCard(props: FinancesCardProps) {
  const tagStyle =
    "self-end border py-0.5 px-1.5 flex gap-1 items-center justify-center rounded-lg text-xs mb-1 mobile:text-[11px]";

  return (
    <div className="@container/fin p-6 w-full flex justify-between rounded-lg bg-card overflow-hidden shadow-md">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-sub font-semibold leading-none tracking-tight flex items-center gap-2">
          {props.title}
          {props.titleIcon}
        </p>
        <div className="flex items-end gap-1 ">
          <span>R$</span>
          <h2
            className={cn("text-2xl font-semibold mobile:text-xl @xs:text-3xl")}
          >
            {props.value}
          </h2>
        </div>
      </div>
      {getBalanceTag()}
    </div>
  );

  function getBalanceTag() {
    if (props.balance === "positive") {
      return (
        <div className={`${tagStyle} text-success hidden @[224px]:flex`}>
          <ArrowUp size={12} className="mobile:hidden" />
          <span>{props.percentage}</span>
        </div>
      );
    }

    if (props.balance === "negative") {
      return (
        <div className={`${tagStyle} text-warning hidden @[224px]:flex`}>
          <ArrowDown size={12} className="mobile:hidden" />
          <span>{props.percentage}</span>
        </div>
      );
    }

    if (props.balance === "neutral") {
      return (
        <div className={`${tagStyle} hidden @[224px]:block`}>
          <span>{props.percentage}</span>
        </div>
      );
    }
  }
}
