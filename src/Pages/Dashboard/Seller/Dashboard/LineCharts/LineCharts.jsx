import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineCharts = ({ currentSellerStat }) => {
  if (!currentSellerStat || !currentSellerStat.dailyData) {
    return <div>No data available</div>;
  }

  const chartData = Object.entries(currentSellerStat.dailyData).map(
    ([date, { totalPrice, count }]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
      amount: totalPrice,
      orders: count,
    })
  );

  return (
    <div className="w-full h-96 sm:h-72 md:h-60 lg:h-44">
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
