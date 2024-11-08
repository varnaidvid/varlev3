'use client';

import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartComponentProps {
  data: { key: string; value: number }[];
}

const chartConfig = {
  value: {
    color: "#000",
  },
} satisfies ChartConfig

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart width={400} height={400} data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="key" />
        <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
        <Line type="natural" stroke="#000" dataKey="value" strokeWidth={2} dot={false}/>
      </LineChart>
    </ChartContainer>
  );
}
