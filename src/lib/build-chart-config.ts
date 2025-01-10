import { ChartConfig } from "@/components/ui/chart";
import * as LucideIcons from "lucide-react";
import { TCategoryExpense } from "./get-expenses-by-categories";

export function buildChartConfig(chartData: TCategoryExpense[]) {
  const baseChartConfig = {} as const;

  const dynamicEntries = chartData.map(({ categorie, fill, avatar }) => {
    const key = categorie.toLowerCase().replace(/\s+/g, "_");

    const IconComponent =
      LucideIcons[avatar as keyof typeof LucideIcons] ?? LucideIcons.HelpCircle;

    return [
      key,
      {
        label: categorie,
        icon: IconComponent,
        color: fill,
      },
    ] as const;
  });

  const dynamicConfigObj = Object.fromEntries(dynamicEntries);

  const chartConfig = {
    ...baseChartConfig,
    ...dynamicConfigObj,
  } satisfies ChartConfig;

  return chartConfig;
}
