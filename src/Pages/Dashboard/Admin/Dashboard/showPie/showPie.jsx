import { PieChart } from "@mui/x-charts/PieChart";

const ShowPie = ({ admin }) => {
  if (!admin || !admin?.deliverySummary) {
    return <div>No delivery data available.</div>;
  }

  const pieData = Object.entries(admin?.deliverySummary).map(
    ([key, value], index) => ({
      id: index,
      value: value,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })
  );

  return (
    <div>
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default ShowPie;
