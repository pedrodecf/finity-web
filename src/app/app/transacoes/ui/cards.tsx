import { FinancesCard } from "@/components/finances-card";
import { formatToBRL } from "@/lib/formatters/format-to-brl";
import { motion } from "framer-motion";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";

type TFinancesStack = {
  totalEntradas: number;
  totalSaidas: number;
};

export function FinancesStack(props: TFinancesStack) {
  const [showFirstCard, setShowFirstCard] = useState(true);

  function handleRepeatClick() {
    setShowFirstCard(!showFirstCard);
  }

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0"
        animate={
          showFirstCard
            ? {
                x: 0,
                y: 0,
                scale: 1,
                zIndex: 2,
              }
            : {
                x: 20,
                y: 13,
                scale: 0.95,
                zIndex: 1,
              }
        }
        transition={{ duration: 0.3 }}
      >
        <FinancesCard
          title="Entradas"
          titleIcon={<TrendingUpIcon size={16} />}
          value={formatToBRL({
            value: props.totalEntradas,
            removeSymbol: true,
          })}
          handleRepeatClick={handleRepeatClick}
          changeIcon
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={
          showFirstCard
            ? {
                x: 20,
                y: 13,
                scale: 0.95,
                zIndex: 1,
              }
            : {
                x: 0,
                y: 0,
                scale: 1,
                zIndex: 2,
              }
        }
        transition={{ duration: 0.3 }}
      >
        <FinancesCard
          title="Saídas"
          titleIcon={<TrendingDownIcon size={16} />}
          value={formatToBRL({
            value: props.totalSaidas,
            removeSymbol: true,
          })}
          handleRepeatClick={handleRepeatClick}
          changeIcon
        />
      </motion.div>
    </div>
  );
}
