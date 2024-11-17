import axios from "axios";
import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, DatePicker } from "antd";
import dayjs from "dayjs"; // Nếu cần thao tác với ngày
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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

  //Order Analysis
  const [totalOrders, setTotalOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // Lấy tháng hiện tại
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Lấy năm hiện tại

  // Thêm sự kiện khi chọn ngày
  const handleDateChange = (date) => {
    if (date) {
      setSelectedMonth(date.month() + 1); // Tháng trong dayjs bắt đầu từ 0
      setSelectedYear(date.year());
    }
  };

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
          const allOrders = totalOrderResponse.data; // Dữ liệu tất cả các order

          console.log("All orders:", allOrders);

          // Filter dựa vào tháng và năm
          const filteredOrders = allOrders.filter(
            (order) =>
              order.month === selectedMonth && order.year === selectedYear
          );
          // Gộp trạng thái giống nhau
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

        // Find the user with the highest totalOrders
        const topOrderUser = topUsersData.reduce((prev, curr) =>
          curr.totalOrders > prev.totalOrders ? curr : prev
        );
        setTopUserByOrders(topOrderUser);

        // Find the user with the highest totalSpent
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
        {/* Cột 1: Statistic */}
        <Col span={8}>
          <Card bordered={true}>
            {/* Row 1: Koi */}
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Available Koi Type"
                  value={totalProducts?.totalKoi?.available || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Unavailable Koi Type"
                  value={totalProducts?.totalKoi?.unavailable || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>

            {/* Row 2: Fish */}
            <Row gutter={16} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Statistic
                  title="Available Fish Type"
                  value={totalProducts?.totalFish?.available || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Unavailable Fish Type"
                  value={totalProducts?.totalFish?.unavailable || 0}
                  prefix={<InboxOutlined />}
                  formatter={formatter}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Cột 2: Gộp Total Users và Total Revenue */}
        <Col span={16}>
          <Card bordered={true}>
            {/* Hàng 1: Total Users và Total Revenue */}
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

            {/* Hàng 2: Total Feedback */}
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
                  formatter={(value) => value.toFixed(2)} // Hiển thị 2 chữ số thập phân
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Card title="Top Selling Koi Species" bordered={true}>
            {topSellingKoi ? (
              <p>{topSellingKoi.koiName}</p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Top Selling Fish Species" bordered={true}>
            {topSellingFish ? (
              <p>{topSellingFish.fishName}</p>
            ) : (
              <p>No data available</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Top User by Orders" bordered={true}>
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
          <Card title="Top User by Spent" bordered={true}>
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

      {/* Total Revenue */}
      <Row gutter={16}>
        <Col span={12}>
          <h3>Total Revenue Analysis</h3>
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
          <h3>Order Analysis</h3>
          <Card bordered={true}>
            {/* Row 1 */}
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

            {/* Row 2 */}
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
            {/* Row 3 */}
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
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <h3>Revenue by Date</h3>
          {/* Date Picker để chọn ngày */}
          <DatePicker
            onChange={(date) => {
              if (date) {
                // Định dạng lại ngày từ DatePicker và set thời gian về 00:00:00
                const selectedDate = dayjs(date)
                  .startOf("day")
                  .format("YYYY-MM-DD"); // Set thời gian về 00:00:00
                console.log("Selected date:", selectedDate); // Kiểm tra ngày đã chọn

                // Lấy doanh thu từ đối tượng dữ liệu (revenueByDate)
                const revenue = revenueByDate[selectedDate] || 0; // Nếu không có dữ liệu, mặc định là 0

                // Cập nhật doanh thu vào state
                setRevenueByDate(revenue);

                console.log("Revenue for date", selectedDate, "is:", revenue);
              }
            }}
          />
          {/* Hiển thị doanh thu theo ngày */}
          <Card bordered={true} style={{ marginTop: "16px" }}>
            {revenueByDate !== undefined ? (
              <Statistic
                title="Revenue"
                value={revenueByDate}
                formatter={formatter} // Định dạng số nếu cần
              />
            ) : (
              <p>No revenue data available for the selected date.</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
