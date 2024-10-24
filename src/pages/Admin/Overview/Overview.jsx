import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", Purchase: 30000, Sales: 20000 },
  { month: "Feb", Purchase: 40000, Sales: 30000 },
  { month: "Mar", Purchase: 45000, Sales: 35000 },
  { month: "Apr", Purchase: 50000, Sales: 40000 },
  { month: "May", Purchase: 42000, Sales: 35000 },
  { month: "Jun", Purchase: 52000, Sales: 47000 },
];

const orderData = [
  { month: "Jan", Ordered: 2000, Delivered: 1500 },
  { month: "Feb", Ordered: 3000, Delivered: 2500 },
  { month: "Mar", Ordered: 3500, Delivered: 3000 },
  { month: "Apr", Ordered: 4000, Delivered: 3500 },
  { month: "May", Ordered: 3200, Delivered: 2700 },
];

const SalesAndPurchaseChart = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Sales and Purchase Bar Chart */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h3>Sales & Purchase</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Purchase" fill="#8884d8" />
            <Bar dataKey="Sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Summary Line Chart */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h3>Order Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Ordered" stroke="#8884d8" />
            <Line type="monotone" dataKey="Delivered" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAndPurchaseChart;
