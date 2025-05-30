"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "ISRO vehicle launches per year";

const vehicleColors = {
  PSLV: "rgba(255, 255, 255, 0.1)",
  GSLV: "rgba(255, 255, 255, 0.2)",
  LVM3: "rgba(255, 255, 255, 0.35)",
  SSLV: "rgba(255, 255, 255, 0.5)",
  SLV: "rgba(255, 255, 255, 0.65)",
  ASLV: "rgba(255, 255, 255, 0.8)",
  testVehicle: "	rgba(255, 255, 255, 0.95)",
};

export function LaunchAreaChart({ data = [] }) {
  const chartConfig = Object.fromEntries(
    Object.keys(vehicleColors).map((vehicle) => [
      vehicle,
      { label: vehicle, color: vehicleColors[vehicle] },
    ])
  );

  return (
    <Card className="bg-gradient-to-r from-[#0a0a1a] via-transparent to-gray-900/80">
      <CardHeader>
        <CardTitle>Launches Per Year</CardTitle>
        <CardDescription>Grouped by Vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12, top: 8, bottom: 8 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.keys(vehicleColors).map((vehicle) => (
              <Area
                key={vehicle}
                type="monotone"
                dataKey={vehicle}
                stroke={vehicleColors[vehicle]}
                fill={vehicleColors[vehicle]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trends over the years <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              From {data[0]?.year || "Start"} to {data[data.length - 1]?.year || "End"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
