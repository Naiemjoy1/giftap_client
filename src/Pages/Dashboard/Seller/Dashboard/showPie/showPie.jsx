import { useEffect, useState, useRef } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const ShowPie = ({ currentSellerStat }) => {
  const [chartWidth, setChartWidth] = useState(400);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!currentSellerStat || !currentSellerStat.deliverySummary) {
    return <div>No delivery data available.</div>;
  }

  const pieData = Object.entries(currentSellerStat.deliverySummary).map(
    ([key, value]) => ({
      id: key,
      value: value,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })
  );

  return (
    <div
      ref={chartRef}
      className="w-full lg:h-64 flex justify-center items-center"
    >
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={chartWidth}
        height={200}
      />
    </div>
  );
};

export default ShowPie;
