import { useModelStats } from "../../hooks/useModelStats";
import { PieChart } from "../ui/PieChart";

export function ModelUsageChart({ userId }) {
  const { data: stats = [], isLoading } = useModelStats(userId);

  if (isLoading || stats.length === 0) return null;

  const chartData = stats.map((item, index) => ({
    name: item.model,
    value: item.count,
    fill: [
      "#ffdb33", // Primary Yellow
      "#000000", // Black
      "#e63946", // Red
      "#9b5de5", // Purple
      "#aeaeae", // Muted Gray
      "#fae583", // Accent Yellow
      "#3b82f6", // Blue
    ][index % 7],
    // Add stroke for white/black slices visibility
    stroke: "#000000",
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="mt-6 p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3
        className="text-lg font-bold mb-6 text-black uppercase tracking-tight"
        style={{ fontFamily: "var(--font-head)" }}
      >
        AI Model Usage
      </h3>
      <div className="h-[250px] w-full relative flex items-center justify-center">
        <PieChart
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={85}
          valueFormatter={(value) => `${value} uses`}
          className="h-full w-full"
          colors={chartData.map((d) => d.fill)}
          tooltipBgColor="#ffffff"
          tooltipBorderColor="#000000"
        />
        {/* Center Text displaying Total */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span
              className="text-3xl font-bold text-black block"
              style={{ fontFamily: "var(--font-head)" }}
            >
              {total}
            </span>
            <span
              className="text-xs text-black font-bold uppercase tracking-widest bg-yellow-300 px-1 border border-black"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Total
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {chartData.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between text-sm p-2 border-b-2 border-black last:border-0 hover:bg-yellow-50 transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 border-2 border-black"
                style={{ backgroundColor: entry.fill }}
              />
              <span
                className="text-black font-bold truncate max-w-[140px] uppercase text-xs"
                style={{ fontFamily: "var(--font-sans)" }}
                title={entry.name}
              >
                {entry.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="font-bold text-xs text-black bg-gray-200 px-2 py-0.5 border border-black"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {Math.round((entry.value / total) * 100)}%
              </span>
              <span
                className="text-xs font-bold text-black w-8 text-right"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {entry.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
