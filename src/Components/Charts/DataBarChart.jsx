"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function DataBarChart({ title = "Bar Chart", data = {} }) {
  const formattedData = Object.entries(data)
    .filter(([key, value]) => key !== "total" && value !== null)
    .map(([key, value]) => ({
      name: key,
      value,
    }));

  const chartConfig = {
    value: {
      label: "Missions",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card className="bg-gradient-to-r from-[#0a0a1a] via-transparent to-gray-900/80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Mission counts per launch vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={400} height={300} data={formattedData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" fill="white" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
        Based on current success data <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Compare with above Pie Chart to know the success ratio 
        </div>
      </CardFooter>
    </Card>
  );
}
