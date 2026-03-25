"use client";

import { cn } from "../../lib/utils";
import React from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChart = React.forwardRef(
  (
    {
      data = [],
      dataKey,
      nameKey,
      colors = [
        "var(--color-chart-1)",
        "var(--color-chart-2)",
        "var(--color-chart-3)",
        "var(--color-chart-4)",
        "var(--color-chart-5)",
      ],
      tooltipBgColor = "var(--color-bg-primary)",
      tooltipBorderColor = "var(--color-border-primary)",
      valueFormatter = (value) => value.toString(),
      showTooltip = true,
      innerRadius = 60,
      outerRadius = 80,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("h-80 w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              isAnimationActive={true}
              paddingAngle={2}
              className="outline-none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill || colors[index % colors.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>

            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const data = payload[0];

                  return (
                    <div
                      className="border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      style={{
                        backgroundColor: tooltipBgColor,
                        borderColor: tooltipBorderColor,
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-xs uppercase text-gray-500 font-bold tracking-wider"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {data.name}
                        </span>
                        <span
                          className="font-bold text-foreground"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {valueFormatter(data.value)}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

PieChart.displayName = "PieChart";

export { PieChart };
