import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Spin,
  Button,
  notification,
  Tag,
  Modal,
  Descriptions,
  Row,
  Col,
  Image,
  Card,
} from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
          description:
            error.response?.data || "There was an error fetching your orders.",
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
          error.response?.data ||
          "There was an error initiating the payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReceived = async (orderId) => {
    setLoading(true);
    try {
      await axios.put(
        `https://localhost:7285/api/Order/${orderId}/update-status-COMPLETED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({
        message: "Order has been received",
        description: "Your order has been marked as received.",
      });

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
      console.error("Failed to update order status:", error);
      notification.error({
        message: "Update Failed",
        description:
          error.response?.data ||
          "There was an error updating the order status. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setLoading(true);
    try {
      await axios.put(
        `https://localhost:7285/api/Order/${orderId}/orderstatus-canceled`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({
        message: "Order Canceled",
        description: "Your order has been canceled successfully.",
      });

      const response = await axios.get(
        `https://localhost:7285/api/Order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
      handleCloseDetailModal();
    } catch (error) {
      console.error("Failed to cancel order:", error);
      notification.error({
        message: "Cancellation Failed",
        description:
          error.response?.data ||
          "There was an error canceling the order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const showCancelConfirm = (orderId) => {
    confirm({
      title: "Are you sure you want to cancel this order?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleCancelOrder(orderId);
      },
    });
  };

  const getOrderStatusTag = (status) => {
    let color;
    switch (status) {
      case "delivering":
        color = "purple";
        break;
      case "processing":
        color = "orange";
        break;
      case "cancelled":
        color = "red";
        break;
      case "completed":
        color = "green";
        break;
      default:
        color = "blue";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const handleViewDetails = (record) => {
    setSelectedOrder(record);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: {
        compare: (a, b) => a.orderId - b.orderId,
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Total Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (money) =>
        money === undefined || money === 0
          ? "None"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
    },
    {
      title: "Final Money",
      dataIndex: "finalMoney",
      key: "finalMoney",
      render: (money) =>
        money === undefined || money === 0
          ? "None"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
    },
    {
      title: "Discount Money",
      dataIndex: "discountMoney",
      key: "discountMoney",
      render: (money) =>
        money === undefined || money === 0
          ? "None"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
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
      render: (text, record) => (
        <>
          <Button type="default" onClick={() => handleViewDetails(record)}>
            <MoreOutlined /> Detail
          </Button>
          {record.orderStatus === "processing" && (
            <>
              <Button
                type="primary"
                onClick={() => handlePayNow(record.orderId)}
                style={{ marginLeft: "10px" }}
              >
                Pay Now
              </Button>
            </>
          )}
          {record.orderStatus === "delivering" && (
            <Button
              style={{
                marginLeft: "10px",
                background: "#52c41a",
                borderColor: "#52c41a",
              }}
              type="default"
              onClick={() => handleReceived(record.orderId)}
            >
              Received
            </Button>
          )}
        </>
      ),
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderStatus !== "completed" && order.orderStatus !== "canceled"
  );

  return (
    <div className="container mx-auto py-20 bg-white shadow-lg rounded-lg">
      <Title className="text-center" level={2}>
        Your Orders
      </Title>
      <Spin spinning={loading}>
        {filteredOrders.length === 0 ? (
          <div className="flex justify-center items-center h-full py-36">
            <p>No orders found.</p>
          </div>
        ) : (
          <Table
            columns={orderColumns}
            dataSource={filteredOrders}
            rowKey="orderId"
          />
        )}
      </Spin>

      <Modal
        title="Order Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        width={900}
        footer={[
          selectedOrder?.orderStatus === "processing" && (
            <Button
              key="cancel"
              type="default"
              onClick={() => showCancelConfirm(selectedOrder.orderId)}
              disabled={loading}
            >
              Cancel Order
            </Button>
          ),
          <Button key="close" type="primary" onClick={handleCloseDetailModal}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Order ID">
                {selectedOrder.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="User Name">
                {selectedOrder.userName || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedOrder.email || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {selectedOrder.phoneNumber || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedOrder.address || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Promotion">
                {selectedOrder.promotion || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {selectedOrder.orderDate || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Total Money">
                {selectedOrder.totalMoney
                  ? selectedOrder.totalMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Final Money">
                {selectedOrder.finalMoney
                  ? selectedOrder.finalMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status">
                {getOrderStatusTag(selectedOrder.orderStatus)}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {selectedOrder.paymentMethod || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Earned Points">
                {selectedOrder.earnedPoints || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Used Points">
                {selectedOrder.usedPoints || "None"}
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} className="mt-4">
              Point Transactions
            </Title>
            <Table
              columns={[
                {
                  title: "Transaction ID",
                  dataIndex: "transactionId",
                  key: "transactionId",
                },
                {
                  title: "Transaction Type",
                  dataIndex: "transactionType",
                  key: "transactionType",
                },
                {
                  title: "Transaction Date",
                  dataIndex: "transactionDate",
                  key: "transactionDate",
                  render: (date) => moment(date).format("DD-MM-YYYY"),
                },
                {
                  title: "Points Changed",
                  dataIndex: "pointsChanged",
                  key: "pointsChanged",
                },
                {
                  title: "New Total Points",
                  dataIndex: "newTotalPoints",
                  key: "newTotalPoints",
                },
              ]}
              dataSource={selectedOrder.point_transaction}
              rowKey="transactionId"
              pagination={false}
            />

            <Title level={4} className="mt-4">
              Fishes
            </Title>
            <Row gutter={16}>
              {selectedOrder.fishes.map((fish) => (
                <Col span={12} key={fish.fishesId}>
                  <Card>
                    <Image src={fish.imageFishes} width={100} height={100} />
                    <p>
                      <strong>ID:</strong> {fish.fishesId}
                    </p>
                    <p>
                      <strong>Name:</strong> {fish.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {fish.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      {fish.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>

            <Title level={4} className="mt-4">
              Koi
            </Title>
            <Row gutter={16}>
              {selectedOrder.kois.map((koi) => (
                <Col span={12} key={koi.koiId}>
                  <Card>
                    <Image src={koi.imageKoi} width={100} height={100} />
                    <p>
                      <strong>ID:</strong> {koi.koiId}
                    </p>
                    <p>
                      <strong>Name:</strong> {koi.name}
                    </p>
                    <p>
                      <strong>Gender:</strong> {koi.gender}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {koi.quantity}
                    </p>
                    <p>
                      <strong>Size:</strong> {koi.size} cm
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      {koi.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
