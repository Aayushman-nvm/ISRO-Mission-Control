"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"

export function DataPieChart({ title, data }) {
  const chartData = Object.entries(data || {}).map(([vehicle, count], index) => {
    const lightness = 100 - index * 10;
    return {
      name: vehicle,
      value: count,
      fill: `hsl(0, 0%, ${Math.max(lightness, 20)}%)`,
    };
  });
  
  
  
    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
  
    return (
      <Card className="flex flex-col bg-gradient-to-r from-[#0a0a1a] via-transparent to-gray-900/80">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-white/60">{title}</CardTitle>
          <CardDescription className="text-white">Total number of {title}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-3xl font-bold"
                      >
                        {total}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        {title}
                      </tspan>
                    </text>
                  )}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
  