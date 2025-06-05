"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";

export const description = "ISRO vehicle launches per year";

const vehicleColors = {
  PSLV: "rgba(255, 255, 255, 0.1)",
  GSLV: "rgba(255, 255, 255, 0.2)",
  LVM3: "rgba(255, 255, 255, 0.35)",
  SSLV: "rgba(255, 255, 255, 0.5)",
  SLV: "rgba(255, 255, 255, 0.65)",
  ASLV: "rgba(255, 255, 255, 0.8)",
  testVehicle: "rgba(255, 255, 255, 0.95)",
};

const chartConfig = Object.fromEntries(
  Object.keys(vehicleColors).map((vehicle) => [
    vehicle,
    {
      label: vehicle,
      color: vehicleColors[vehicle],
    },
  ])
);

export function DataYearChart({data}) {
  return (
    <Card className="bg-gradient-to-r from-[#0a0a1a] via-transparent to-gray-900/80">
      <CardHeader>
        <CardTitle className="text-white/60">Launches Per Year</CardTitle>
        <CardDescription>Grouped by Vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              left: 12,
              right: 16,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="year"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.keys(vehicleColors).map((vehicle) => (
              <Bar
                key={vehicle}
                dataKey={vehicle}
                fill={vehicleColors[vehicle]}
                radius={4}
                stackId="a"
              >
                <LabelList
                  dataKey={vehicle}
                  position="right"
                  offset={8}
                  className="text-white"
                  fontSize={12}
                />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trends over the years <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          From {data[0]?.year || "Start"} to {data[data.length - 1]?.year || "End"}
        </div>
      </CardFooter>
    </Card>
  );
}
