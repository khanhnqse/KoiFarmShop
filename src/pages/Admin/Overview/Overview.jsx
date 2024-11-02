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
} from "recharts";
import CountUp from "react-countup";
// Dashboard Api
const dashboardApiU = "https://localhost:7285/api/Dashboard/total-users"; //total users
const dashboardApiP = "https://localhost:7285/api/Dashboard/total-products"; //total products
const dashboardApiA = "https://localhost:7285/api/Dashboard/analysis"; //analysis
const dashboardApiR = "https://localhost:7285/api/Dashboard/total-revenue"; //total revenue

const formatter = (value) => <CountUp end={value} separator="," />;

const Overview = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [analysis, setAnalysis] = useState();
  const [topSellingKoi, setTopSellingKoi] = useState(); 
const [topSellingFish, setTopSellingFish] = useState();
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const userResponse = await axios.get(dashboardApiU);
        setTotalUsers(userResponse.data); // Cập nhật state với dữ liệu từ API
        console.log(userResponse.data);
        setTotalUsers(userResponse.data.totalUsers);
        const productResponse = await axios.get(dashboardApiP);
        setTotalProduct(productResponse.data); // Cập nhật state với dữ liệu từ API
        console.log(productResponse.data);
        setTotalProduct(productResponse.data.totalProducts);
        const revenueResponse = await axios.get(dashboardApiR);
        setTotalRevenue(revenueResponse.data); // Cập nhật state với dữ liệu từ API
        console.log(revenueResponse.data);
        setTotalRevenue(revenueResponse.data.totalRevenue);
        const analysisResponse = await axios.get(dashboardApiA); // Cập nhật state với dữ liệu từ API
        setAnalysis(analysisResponse.data);
        console.log(analysisResponse.data);
        setAnalysis(analysisResponse.data.analysis);
       setTopSellingKoi(analysisResponse.data.topSellingKoi.totalSold);
       setTopSellingFish(analysisResponse.data.topSellingFish.totalSold);
        const revenuePerMonth = analysisResponse.data.revenuePerMonth;
        const chartData = revenuePerMonth.map((item) => ({
          name: `Month ${item.month}`, // Hoặc có thể sử dụng tên tháng
          uv: item.totalRevenue,
        }));
        setAnalysis(chartData); // Cập nhật state với dữ liệu biểu đồ
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalUsers();
  }, []); // Chỉ chạy một lần khi component được mount

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Total User Stat */}
      <Row gutter={12}>
        <Col span={4}>
          <Card bordered={true}>
            <Statistic
              title="Total Users"
              value={totalUsers}
              formatter={formatter}
            />
          </Card>
        </Col>
        {/* Total Products Stat */}
        <Col span={4}>
          <Card bordered={true}>
            <Statistic
              title="Total Products"
              value={totalProducts}
              formatter={formatter}
            />
          </Card>
        </Col>
        {/* Total Revenues Stat */}
        <Col span={4}>
          <Card bordered={true}>
            <Statistic
              title="Total Revenues"
              value={totalRevenue}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>

     {/* Row for Top Selling Koi and Fish */}
     <Row gutter={10} justify="center">
        <Col span={5}>
          <Card bordered={true}>
            <Statistic
              title="Top Selling Koi"
              value={topSellingKoi}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={true}>
            <Statistic
              title="Top Selling Fish"
              value={topSellingFish}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>

      {/* Analysis Chart */}
      <h3>Total Revenue</h3>
      <LineChart
        width={800}
        height={400}
        data={analysis}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Overview;
