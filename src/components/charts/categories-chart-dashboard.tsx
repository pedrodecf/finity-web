"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { buildChartConfig } from "@/lib/build-chart-config";
import { getExpensesByCategories } from "@/lib/get-expenses-by-categories";
import { getFirstLetter } from "@/lib/get-first-letter";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import React from "react";
import { Pie, PieChart } from "recharts";
import { fetchTransactions } from "../tables/transactions-mock";

const transactions = fetchTransactions();
const chartData = getExpensesByCategories(transactions);
const allExpenses = chartData.reduce((acc, { expenses }) => acc + expenses, 0);
const chartConfig = buildChartConfig(chartData);

type TCategoriesChartDashboard = {
  className?: string;
};

export function CategoriesChartDashboard({
  className,
}: TCategoriesChartDashboard) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-0 text-sub">
        <CardTitle className="text-sm text-sub font-semibold leading-none tracking-tight ">
          <Link
            href="/categorias"
            className="hover:text-primary transition-colors duration-300"
          >
            Gastos por categorias
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="expenses"
              nameKey="categorie"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-sm p-0">
        {chartData
          .sort((a, b) => b.expenses - a.expenses)
          .map(({ categorie, expenses, avatar, fill }, index) => (
            <React.Fragment key={categorie}>
              <CategoriesListDashboard
                name={categorie}
                avatarUrl={avatar}
                percentage={Number(((expenses / allExpenses) * 100).toFixed(2))}
                fill={fill}
              />
              {index < chartData.length - 1 && (
                <hr className="border-t w-full border-gray-200 opacity-10" />
              )}
            </React.Fragment>
          ))}
      </CardFooter>
    </Card>
  );

  interface CategoriesChartDashboardProps {
    name: string;
    avatarUrl: string;
    percentage: number;
    fill: string;
  }

  function CategoriesListDashboard(props: CategoriesChartDashboardProps) {
    const formatName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    const IconComponent = LucideIcons[
      props.avatarUrl as keyof typeof LucideIcons
    ] as React.ElementType;
    return (
      <div className="flex flex-row justify-between items-center w-full py-3 p-6">
        <div className="flex flex-row items-center gap-2 overflow-hidden">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{ backgroundColor: props?.fill ?? "#6359E9" }}
          >
            {IconComponent ? (
              <IconComponent size={16} />
            ) : (
              <>{getFirstLetter(props.name)}</>
            )}
          </div>
          <p className="truncate">{formatName(props.name)}</p>
        </div>
        <div className="text-sub font-semibold">
          <p>{props.percentage}%</p>
        </div>
      </div>
    );
  }
}
