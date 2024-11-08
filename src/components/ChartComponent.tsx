'use client';

import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartComponentProps {
  data: { key: string; value: number }[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <LineChart width={400} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
