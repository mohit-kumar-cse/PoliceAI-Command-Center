// C:\PoliceAI-Command-Center\client\src\components\CrimeChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const MONTH_NAMES = [
  "",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CrimeChart = ({ data }) => {
  if (!data || data.length === 0)
    return (
      <div className="text-slate-400">
        No crime analytics available
      </div>
    );

  const chartData = data.map((item) => ({
    month: `${MONTH_NAMES[item._id.month]} ${item._id.year}`,
    count: item.count,
  }));

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-5
      "
    >
      <h2 className="text-white font-bold mb-5">Crime Analytics</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#334155" strokeDasharray="4 4" />

          <XAxis dataKey="month" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeChart;