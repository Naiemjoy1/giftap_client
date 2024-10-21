import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useMonthlyStats from "../../../../../Components/Hooks/useMonthlyStats";

const LineCharts = () => {
  const [adminDate] = useMonthlyStats();

  const chartData = adminDate.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
    amount: item.totalAmount,
    orders: item.count,
    amt: item.count * 100,
  }));

  return (
    <div className="w-full h-44">
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="orders"
            stroke="#82ca9d"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
