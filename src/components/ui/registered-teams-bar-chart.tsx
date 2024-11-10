"use client";

import React, { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { api } from "@/trpc/react";
import { CalendarDays, Users } from "lucide-react";

const intervals = [
  { value: "7", label: "Elmúlt 7 nap" },
  { value: "30", label: "Elmúlt 30 nap" },
  { value: "90", label: "Elmúlt 90 nap" },
  { value: "180", label: "Elmúlt 180 nap" },
  { value: "365", label: "Elmúlt 365 nap" },
];

const chartConfig = {
  teams: {
    label: "Regisztrált csapatok",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const SkeletonChart = () => {
  return (
    <div className="flex h-[250px] w-full items-end gap-2 pb-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[20%] w-full rounded-sm"
          style={{
            height: `${Math.max(20, Math.random() * 100)}%`,
          }}
        />
      ))}
    </div>
  );
};

export function RegisteredTeamsBarChart() {
  const [intervalState, setIntervalState] = React.useState("7");

  const { data: rawData, isFetching } =
    api.school.getRegisteredTeamCountByIntervalDummyData.useQuery({
      days: parseInt(intervalState),
    });

  const { data: totalCount } =
    api.school.getTotalRegisteredTeamCount.useQuery();

  const chartData = React.useMemo(() => {
    if (!rawData) return [];
    return [...rawData].sort(
      (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime(),
    );
  }, [rawData]);

  const total = React.useMemo(
    () => chartData?.reduce((acc, curr) => acc + curr.value, 0) ?? 0,
    [chartData],
  );

  const periodTotal = React.useMemo(() => {
    if (!chartData?.length) return 0;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(intervalState));

    return chartData.reduce((acc, curr) => {
      const date = new Date(curr.name);
      if (date >= startDate && date <= endDate) {
        return acc + curr.value;
      }
      return acc;
    }, 0);
  }, [chartData, intervalState]);

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <div>
          <CardTitle className="text-xl">Regisztrált csapatok</CardTitle>
          <CardDescription>
            Az elmúlt {intervalState} napban regisztrált csapatok
          </CardDescription>
        </div>
        <Select value={intervalState} onValueChange={setIntervalState}>
          <SelectTrigger className="w-fit gap-2">
            <CalendarDays className="size-[18px] text-muted-foreground" />
          </SelectTrigger>
          <SelectContent>
            <p className="mb-2 border-b py-2 text-center text-sm text-muted-foreground">
              Intervallum
            </p>
            {intervals.map((interval) => (
              <SelectItem key={interval.value} value={interval.value}>
                {interval.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pb-0 pt-4 sm:px-4">
        {isFetching ? (
          <SkeletonChart />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("hu-HU", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    nameKey="teams"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("hu-HU", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar
                dataKey="value"
                fill="var(--color-teams)"
                radius={Math.max(0, 6 - parseInt(intervalState) / 60)}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Választott időszakon belül: {periodTotal} /{" "}
            {totalCount?.toLocaleString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
