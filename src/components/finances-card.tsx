import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

interface FinancesCardProps {
  title: string;
  value: string;
  percentage: string;
  balance: "positive" | "negative" | "neutral";
}

export function FinancesCard(props: FinancesCardProps) {
  const tagStyle =
    "self-end border py-1 px-2 flex gap-1 items-center justify-center rounded-lg text-xs mb-1";
  return (
    <div className="p-6 w-full flex justify-between rounded-lg bg-card">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-sub font-semibold leading-none tracking-tight">
          {props.title}
        </p>
        <div className="flex items-end gap-1">
          <span>R$</span>
          <h2 className="text-3xl font-semibold">{props.value}</h2>
        </div>
      </div>
      {getBalanceTag()}
    </div>
  );

  function getBalanceTag() {
    if (props.balance === "positive") {
      return (
        <div className={`${tagStyle} text-success`}>
          <ArrowUp size={12} />
          <span>{props.percentage}</span>
        </div>
      );
    }

    if (props.balance === "negative") {
      return (
        <div className={`${tagStyle} text-warning`}>
          <ArrowDown size={12} />
          <span>{props.percentage}</span>
        </div>
      );
    }

    if (props.balance === "neutral") {
      return (
        <div className={`${tagStyle}`}>
          <span>{props.percentage}</span>
        </div>
      );
    }
  }
}
