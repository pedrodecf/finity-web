"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getBalance } from "@/lib/getters/get-balance";
import { cn } from "@/lib/utils";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { TTransactions } from "../tables/type";

const chartConfig = {
  fixed: {
    label: "Fixos",
    color: "hsl(var(--chart-1))",
  },
  personal: {
    label: "Pessoais",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TBalanceChartDashboard = {
  className?: string;
  transacoes: TTransactions[];
  userGastosPorcetagemMeta: number;
};

export function BalanceChartDashboard({
  className,
  transacoes,
  userGastosPorcetagemMeta,
}: TBalanceChartDashboard) {
  const chartData = getBalance(transacoes);

  const totalExpenses = chartData[0].fixed + chartData[0].personal;

  const percentageFixed = Number(
    ((chartData[0].fixed / totalExpenses) * 100).toFixed(2)
  );

  const percentagePersonal = Number(
    ((chartData[0].personal / totalExpenses) * 100).toFixed(2)
  );

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-0 mobile:pb-2">
        <CardTitle className="text-sm text-sub font-semibold leading-none tracking-tight">
          Balanço de custos
        </CardTitle>
      </CardHeader>
      <CardContent className="@container/card mt-2 -mb-2">
        <div className="flex flex-col-reverse items-center justify-center @md/card:flex-row">
          {getPercentageExpenses({
            personalColor: "bg-[#64CFF6]",
            personalPercentage: percentagePersonal || 0,
            fixedColor: "bg-[#6359E9]",
            fixedPercentage: percentageFixed || 0,
          })}
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full max-w-[250px]"
          >
            <RadialBarChart
              width={250}
              height={125}
              cy={100}
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={90}
              outerRadius={140}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                className="flex items-center justify-center"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const text = checkExpenseBalance(
                        percentagePersonal,
                        userGastosPorcetagemMeta
                      );
                      const lines = text.split("\n");

                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          {lines.map((line, index) => (
                            <tspan
                              key={index}
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 36}
                              dy={index === 0 ? 0 : "1.2em"}
                              className="fill-foreground text-lg font-bold tracking-tight truncate"
                            >
                              {line}
                            </tspan>
                          ))}

                          <tspan
                            x={viewBox.cx}
                            dy="1.4em"
                            className="fill-muted-foreground"
                          >
                            Indicador
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="fixed"
                stackId="a"
                cornerRadius={5}
                fill="#6359E9"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="personal"
                fill="#64CFF6"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );

  interface getPercentageExpensesProps {
    personalColor: string;
    personalPercentage: number;
    fixedColor: string;
    fixedPercentage: number;
  }

  function getPercentageExpenses(props: getPercentageExpensesProps) {
    return (
      <>
        <div className="flex flex-row gap-4 w-full justify-around @xl/card:flex-row @md/card:flex-col">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.fixedColor
                )}
              />
              <p className="text-sub">Custos fixos</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{props.fixedPercentage}%</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.personalColor
                )}
              />
              <p className="text-sub">Gastos pessoais</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {props.personalPercentage}%
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function checkExpenseBalance(personalSpending: number, goal: number): string {
    if (
      personalSpending < 0 ||
      personalSpending > 100 ||
      goal < 0 ||
      goal > 100
    ) {
      throw new Error("Valores devem estar entre 0 e 100.");
    }

    const difference = personalSpending - goal;
    let indicator: string;

    switch (true) {
      case Math.abs(difference) <= 5:
        indicator = "Equilíbrio perfeito";
        break;
      case difference > 5 && difference <= 10:
        indicator = "Gastos leves";
        break;
      case difference > 10 && difference <= 15:
        indicator = "Gastos moderados";
        break;
      case difference > 15 && difference <= 20:
        indicator = "Gastos altos";
        break;
      case difference > 20:
        indicator = "Gastos excessivos";
        break;
      case difference < -5 && difference >= -49:
        indicator = "Poucos gastos";
        break;
      case difference === -50:
        indicator = "Nenhum gasto";
        break;
      default:
        indicator = "Sem resultados!";
    }

    return indicator.split(" ").join("\n");
  }
}
