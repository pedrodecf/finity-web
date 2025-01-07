"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
const chartData = [{ fixed: 1260, personal: 570 }];
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

export function FixedOrPersonalDashboard() {
  const totalExpenses = chartData[0].fixed + chartData[0].personal;
  const percentageFixed = Number(
    ((chartData[0].fixed / totalExpenses) * 100).toFixed(2)
  );
  const percentagePersonal = Number(
    ((chartData[0].personal / totalExpenses) * 100).toFixed(2)
  );
  return (
    <Card className="flex flex-col relative">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm text-sub font-medium leading-none tracking-tight">
          Custos fixos X Gastos pessoais
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={100}
            outerRadius={160}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          <tspan className="text-xs">R$</tspan>
                          {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Despesas
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm absolute bottom-0 left-0 right-0">
        {getPercentageExpenses({
          personalColor: "bg-[#64CFF6]",
          personalPercentage: percentagePersonal,
          fixedColor: "bg-[#6359E9]",
          fixedPercentage: percentageFixed,
        })}
      </CardFooter>
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
        <div className="flex items-center justify-around w-full">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.personalColor
                )}
              />
              <p>Gastos pessoais</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {props.personalPercentage}%
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full h-3 w-3",
                  props.fixedColor
                )}
              />
              <p>Custos fixos</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{props.fixedPercentage}%</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
