import { useState, useEffect } from "react";
import { Table, Typography, Spin, Button, notification, Tag } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const { Title } = Typography;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7285/api/Order/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        notification.error({
          message: "Failed to fetch user orders",
          description: "There was an error fetching your orders.",
        });
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user, token]);

  const handlePayNow = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:7285/api/VNPay/Payment?orderId=${orderId}`
      );
      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      notification.error({
        message: "Payment Failed",
        description:
          "There was an error initiating the payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusTag = (status) => {
    let color;
    switch (status) {
      case "completed":
        color = "green";
        break;
      case "processing":
        color = "orange";
        break;
      case "cancelled":
        color = "red";
        break;
      default:
        color = "blue";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Total Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (money) => `${money.toLocaleString()} VND`,
    },
    {
      title: "Final Money",
      dataIndex: "finalMoney",
      key: "finalMoney",
      render: (money) => `${money.toLocaleString()} VND`,
    },
    {
      title: "Discount Money",
      dataIndex: "discountMoney",
      key: "discountMoney",
      render: (money) => `${money.toLocaleString()} VND`,
    },
    {
      title: "Earned Points",
      dataIndex: "earnedPoints",
      key: "earnedPoints",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => getOrderStatusTag(status),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        record.orderStatus === "processing" && (
          <Button type="primary" onClick={() => handlePayNow(record.orderId)}>
            Pay Now
          </Button>
        ),
    },
  ];

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <Title className="text-center" level={2}>
        Your Orders
      </Title>
      <Spin spinning={loading}>
        <Table columns={orderColumns} dataSource={orders} rowKey="orderId" />
      </Spin>
    </div>
  );
};

export default OrdersPage;
