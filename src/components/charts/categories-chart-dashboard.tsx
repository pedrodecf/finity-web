"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Pie, PieChart } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const chartData = [
  { categories: "despesas", expenses: 255.59, fill: "var(--color-despesas)" },
  { categories: "gatos", expenses: 200, fill: "var(--color-gatos)" },
  { categories: "comidas", expenses: 127, fill: "var(--color-comidas)" },
  { categories: "carros", expenses: 173, fill: "var(--color-carros)" },
  { categories: "streamings", expenses: 90, fill: "var(--color-streamings)" },
];

const allExpenses = chartData.reduce((acc, { expenses }) => acc + expenses, 0);

const chartConfig = {
  expenses: {
    label: "Categories",
  },
  despesas: {
    label: "Despesas",
    color: "hsl(var(--chart-1))",
  },
  gatos: {
    label: "Gatos",
    color: "hsl(var(--chart-2))",
  },
  comidas: {
    label: "Comidas",
    color: "hsl(var(--chart-3))",
  },
  carros: {
    label: "Carros",
    color: "hsl(var(--chart-4))",
  },
  streamings: {
    label: "Streamdasdasdasdings",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

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
      <CardContent className="flex-1 pb-0">
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
              nameKey="categories"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-sm p-0">
        {chartData
          .sort((a, b) => b.expenses - a.expenses)
          .map(({ categories, expenses }, index) => (
            <React.Fragment key={categories}>
              <CategoriesListDashboard
                name={categories}
                avatarUrl=""
                percentage={Number(((expenses / allExpenses) * 100).toFixed(2))}
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
  }

  function CategoriesListDashboard(props: CategoriesChartDashboardProps) {
    const firstLetter = props.name.charAt(0).toUpperCase() || "C";
    const formatName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
      <div className="flex flex-row justify-between items-center w-full py-3 p-6">
        <div className="flex flex-row items-center gap-2 overflow-hidden">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={props.avatarUrl}
              alt={`Avatar da Categoria ${props.name}`}
            />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <p className="truncate">{formatName(props.name)}</p>
        </div>
        <div className="text-sub font-semibold">
          <p>{props.percentage}%</p>
        </div>
      </div>
    );
  }
}
