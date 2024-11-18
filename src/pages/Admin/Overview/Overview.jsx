import axios from "axios";
import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const dashboardApiU = "https://localhost:7285/api/Dashboard/total-users";
const dashboardApiP = "https://localhost:7285/api/Dashboard/total-products";
const dashboardApiA = "https://localhost:7285/api/Dashboard/analysis";
const dashboardApiR = "https://localhost:7285/api/Dashboard/total-revenue";
const dashboardApiTO = "https://localhost:7285/api/Dashboard/order-analysis";
const dashboardApiTU = "https://localhost:7285/api/Dashboard/top-users";
const dashboardApiRBD = "https://localhost:7285/api/Dashboard/get-day-revenue";

const formatter = (value) => <CountUp end={value} separator="," />;

const Overview = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [analysis, setAnalysis] = useState([]);
  const [topSellingKoi, setTopSellingKoi] = useState("");
  const [topSellingFish, setTopSellingFish] = useState("");
  const [revenueByDate, setRevenueByDate] = useState({});
  const [selectedDateRevenue, setSelectedDateRevenue] = useState(null);

  //Order Analysis
  const [totalOrders, setTotalOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const handleDateChange = (date) => {
    if (date) {
      setSelectedMonth(date.month() + 1);
      setSelectedYear(date.year());
    }
  };

  //Revenue by date
  const handleRevenueDateChange = (date) => {
    if (date) {
      const monthStart = date.startOf("month").format("YYYY-MM-DD");
      const monthEnd = date.endOf("month").format("YYYY-MM-DD");

      const filteredRevenue = [];
      let currentDate = dayjs(monthStart);
      while (currentDate.isBefore(monthEnd) || currentDate.isSame(monthEnd)) {
        const dateKey = currentDate.format("YYYY-MM-DD");
        const revenue = revenueByDate[dateKey] || 0; 
        if (revenue > 0) {
          filteredRevenue.push({
            date: dateKey,
            revenue: revenue,
          });
        }
        currentDate = currentDate.add(1, "day");
      }

      setSelectedDateRevenue(filteredRevenue);
    } else {
      setSelectedDateRevenue(null);
    }
  };

  const chartData =
    selectedDateRevenue && Array.isArray(selectedDateRevenue)
      ? selectedDateRevenue
      : [];

  // eslint-disable-next-line no-unused-vars
  const [topUsers, setTopUsers] = useState([]);
  const [topUserByOrders, setTopUserByOrders] = useState(null);
  const [topUserBySpent, setTopUserBySpent] = useState(null);
  const [totalFeedBacks, setTotalFeedBacks] = useState();
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(dashboardApiU);
        setTotalUsers(userResponse.data.totalUsers.totak_account);

        const productResponse = await axios.get(dashboardApiP);
        setTotalProduct(productResponse.data.totalProducts);

        const revenueResponse = await axios.get(dashboardApiR);
        setTotalRevenue(revenueResponse.data.totalRevenue);

        const analysisResponse = await axios.get(dashboardApiA);
        const revenuePerMonth = analysisResponse.data.revenuePerMonth.map(
          (item) => ({
            name: `Month ${item.month}`,
            revenue: item.totalRevenue,
          })
        );
        setAnalysis(revenuePerMonth);

        setTotalFeedBacks(
          analysisResponse.data.feedbackStatistics.totalFeedbacks
        );
        setAverageRating(
          analysisResponse.data.feedbackStatistics.averageRating
        );
        setTopSellingKoi(analysisResponse.data.topSellingKoi);
        setTopSellingFish(analysisResponse.data.topSellingFish);

        try {
          const totalOrderResponse = await axios.get(dashboardApiTO);
          const allOrders = totalOrderResponse.data;

          console.log("All orders:", allOrders);

          const filteredOrders = allOrders.filter(
            (order) =>
              order.month === selectedMonth && order.year === selectedYear
          );
          const groupedOrderData = filteredOrders.reduce((acc, order) => {
            const existingStatus = acc.find(
              (item) => item.name === order.status
            );
            if (existingStatus) {
              existingStatus.value += order.quantity;
            } else {
              acc.push({ name: order.status, value: order.quantity });
            }
            return acc;
          }, []);

          setTotalOrders(groupedOrderData);
          console.log("Filtered and grouped orders:", groupedOrderData);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }

        const topUserResponse = await axios.get(dashboardApiTU);
        const topUsersData = topUserResponse.data;
        setTopUsers(topUsersData);
        console.log("User Data:", topUsersData);

        const topOrderUser = topUsersData.reduce((prev, curr) =>
          curr.totalOrders > prev.totalOrders ? curr : prev
        );
        setTopUserByOrders(topOrderUser);

        const topSpentUser = topUsersData.reduce((prev, curr) =>
          curr.totalSpent > prev.totalSpent ? curr : prev
        );
        setTopUserBySpent(topSpentUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const getDayRevenueResponse = await axios.get(dashboardApiRBD);
      console.log("Revenue by Date:", getDayRevenueResponse.data);
      setRevenueByDate(getDayRevenueResponse.data);
    };
    

    fetchData();
  }, [selectedMonth, selectedYear]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Row gutter={12}>
        <Col span={8}>
          <Card
            bordered={true}
            style={{
              backgroundColor: "#9bf7f4",
              borderColor: "#1890ff",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Available Koi"
                  value={totalProducts?.totalKoi?.available || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Unavailable Koi"
                  value={totalProducts?.totalKoi?.unavailable || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Available Fish"
                  value={totalProducts?.totalFish?.available || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Unavailable Fish"
                  value={totalProducts?.totalFish?.unavailable || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={16}>
          <Card
            bordered={true}
            style={{
              backgroundColor: "#8ff562",
              borderColor: "#59b60a",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Statistic
                  title="Total Users"
                  value={totalUsers}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Revenue"
                  value={totalRevenue}
                  formatter={formatter}
                />
              </Col>
            </Row>

            <Row gutter={12} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Total Feedback"
                  value={totalFeedBacks}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Average Rating"
                  value={averageRating}
                  formatter={(value) => value.toFixed(2)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Top Selling Koi Species"
            bordered={true}
            style={{
              backgroundColor: "#f97cf7",
              borderColor: "#b913b6",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {topSellingKoi ? (
              <p>{topSellingKoi.koiName}</p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Top Selling Fish Species"
            bordered={true}
            style={{
              backgroundColor: "#fc8fa5",
              borderColor: "#71091e",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {topSellingFish ? (
              <p>{topSellingFish.fishName}</p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Top User by Orders"
            bordered={true}
            style={{
              backgroundColor: "#eff78d",
              borderColor: "#8b9510",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {topUserByOrders ? (
              <p>
                {topUserByOrders.userName} - {topUserByOrders.totalOrders}{" "}
                orders
              </p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Top User by Spent"
            bordered={true}
            style={{
              backgroundColor: "#fac874",
              borderColor: "#a57017",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {topUserBySpent ? (
              <p>
                {topUserBySpent.userName} - $
                {topUserBySpent.totalSpent.toLocaleString()}
              </p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <h3
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Total Revenue Analysis
          </h3>
          {analysis && analysis.length > 0 ? (
            <ResponsiveContainer width={"100%"} height={450}>
              <LineChart
                style={{ width: "100%", height: "90%" }}
                data={analysis}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No revenue data available.</p>
          )}
        </Col>
        <Col span={12}>
          <DatePicker
            picker="month"
            onChange={handleDateChange}
            defaultValue={dayjs()}
          />
          <h3
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Order Analysis
          </h3>
          <Card
            bordered={true}
            style={{
              marginTop: "16px",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Completed Order"
                  value={
                    totalOrders.find((item) => item.name === "completed")
                      ?.value || 0
                  }
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Canceled Order"
                  value={
                    totalOrders.find((item) => item.name === "canceled")
                      ?.value || 0
                  }
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Delivering Order"
                  value={
                    totalOrders.find((item) => item.name === "delivering")
                      ?.value || 0
                  }
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Processing Order"
                  value={
                    totalOrders.find((item) => item.name === "processing")
                      ?.value || 0
                  }
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Remittance Order"
                  value={
                    totalOrders.find((item) => item.name === "remittance")
                      ?.value || 0
                  }
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Col span={6}>
        <DatePicker
          picker="month"
          onChange={handleRevenueDateChange}
          defaultValue={dayjs()}
        />
        <h3
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Revenue by Date in Month
        </h3>
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={chartData}
              style={{ width: "100%", height: "150%" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No revenue data available.</p>
        )}
      </Col>
    </div>
  );
};

export default Overview;
