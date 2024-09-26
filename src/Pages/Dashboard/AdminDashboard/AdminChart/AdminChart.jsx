import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area
} from "recharts";

const AdminChart = () => {

    const data = [
        {
            name: "United States",
            Sales: 590,
            Bounce: 800,
            Value: 1400,
            cnt: 490
        },
        {
            name: "Germany",
            Sales: 868,
            Bounce: 967,
            Value: 1506,
            cnt: 590
        },
        {
            name: "Brasil",
            Sales: 1397,
            Bounce: 1098,
            Value: 989,
            cnt: 350
        },
        {
            name: "Canada",
            Sales: 1480,
            Bounce: 1200,
            Value: 1228,
            cnt: 480
        },
        {
            name: "France",
            Sales: 1520,
            Bounce: 1108,
            Value: 1100,
            cnt: 460
        },
        {
            name: "Australia",
            Sales: 1400,
            Bounce: 680,
            Value: 1700,
            cnt: 380
        }
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="w-full h-full">
                {/* Adjust the chart width/height for responsiveness */}
                <ComposedChart
                    width={window.innerWidth < 640 ? 320 : window.innerWidth < 768 ? 600 : window.innerWidth < 1024 ? 800 : 900}
                    height={window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 400 : 500}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        bottom: 20,
                        left: 20
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis
                        dataKey="name"
                        label={{ value: "Country", position: "insideBottomRight", offset: 0 }}
                        scale="band"
                    />
                    <YAxis label={{ value: "Amount", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="Value" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="Bounce" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="Sales" stroke="#ff7300" />
                </ComposedChart>
            </div>
        </div>
    );
};

export default AdminChart;
