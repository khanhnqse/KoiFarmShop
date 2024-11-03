import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

// Dashboard API endpoints
const dashboardApiU = "https://localhost:7285/api/Dashboard/total-users";
const dashboardApiP = "https://localhost:7285/api/Dashboard/total-products";
const dashboardApiA = "https://localhost:7285/api/Dashboard/analysis";
const dashboardApiR = "https://localhost:7285/api/Dashboard/total-revenue";
const dashboardApiTO = "https://localhost:7285/api/Dashboard/order-analysis";

const formatter = (value) => <CountUp end={value} separator="," />;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Overview = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [analysis, setAnalysis] = useState([]);
  const [topSellingKoi, setTopSellingKoi] = useState("");
  const [topSellingFish, setTopSellingFish] = useState("");
  const [totalOrders, setTotalOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(dashboardApiU);
        setTotalUsers(userResponse.data.totalUsers);

        const productResponse = await axios.get(dashboardApiP);
        setTotalProduct(productResponse.data.totalProducts);

        const revenueResponse = await axios.get(dashboardApiR);
        setTotalRevenue(revenueResponse.data.totalRevenue);

        const analysisResponse = await axios.get(dashboardApiA);
        const revenuePerMonth = analysisResponse.data.revenuePerMonth.map(
          (item) => ({
            name: `Month ${item.month}`,
            uv: item.totalRevenue,
          })
        );
        setAnalysis(revenuePerMonth);
        setTopSellingKoi(analysisResponse.data.topSellingKoi.koiName);
        setTopSellingFish(analysisResponse.data.topSellingFish.fishName);

        const totalOrderResponse = await axios.get(dashboardApiTO);
        const orderData = totalOrderResponse.data.statusCounts.map((order) => ({
          name: order.status,
          value: order.quantity,
        }));
        setTotalOrders(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Row gutter={12}>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Total Users"
              value={totalUsers}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Total Products"
              value={totalProducts}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top Selling Koi" bordered={true}>
            <p>{topSellingKoi}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Selling Fish" bordered={true}>
            <p>{topSellingFish}</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <h3>Total Revenue</h3>
          <LineChart
            width={600}
            height={300}
            data={analysis}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            style={{ width: "100%" }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Col>
        <Col span={12}>
          <h3>Order Analysis</h3>
          {totalOrders && totalOrders.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={totalOrders}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {totalOrders.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No order data available.</p>
          )}
          {/* Legend Section */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
            {totalOrders.map((entry, index) => (
              <div key={`legend-${index}`} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: COLORS[index % COLORS.length],
                    marginRight: 8,
                  }}
                />
                <span>
                  {entry.name}:{" "}
                  {((entry.value / totalOrders.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
