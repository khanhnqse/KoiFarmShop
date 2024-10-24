import { useState, useEffect } from "react";
import { Table, Typography, Spin, Tag, Row, Col, Card } from "antd";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";

const { Title } = Typography;

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrderHistory(user.userId);
    }
  }, [user]);

  const fetchOrderHistory = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/PurchaseHistory/getPurchaseHistoryByUserID/${userId}`
      );
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Total Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (money) => `${money.toLocaleString()} VND`,
    },
    {
      title: "Discount Money",
      dataIndex: "discountMoney",
      key: "discountMoney",
      render: (money) => `${money.toLocaleString()} VND`,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <Tag
          color={
            orderStatus === "completed"
              ? "green"
              : orderStatus === "pending"
              ? "orange"
              : "red"
          }
        >
          {orderStatus}
        </Tag>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Shipping Date",
      dataIndex: "shippingDate",
      key: "shippingDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (deliveryStatus) => (
        <Tag
          color={
            deliveryStatus === "delivered"
              ? "green"
              : deliveryStatus === "shipping"
              ? "blue"
              : "red"
          }
        >
          {deliveryStatus}
        </Tag>
      ),
    },
    {
      title: "Promotion ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Earned Points",
      dataIndex: "earnedPoints",
      key: "earnedPoints",
    },
  ];

  return (
    <div style={{ padding: "120px" }}>
      <Row justify="center">
        <Col span={24}>
          <Card>
            <Title className="text-center" level={2}>
              Order History
            </Title>
            {loading ? (
              <Spin size="large" />
            ) : (
              <Table
                columns={columns}
                dataSource={orderHistory}
                rowKey="orderId"
                pagination={{ pageSize: 10 }}
                style={{ marginTop: "20px" }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderHistoryPage;
