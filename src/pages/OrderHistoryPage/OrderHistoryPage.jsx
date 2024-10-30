import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Spin,
  Tag,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Image,
  Dropdown,
  Menu,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleViewDetails = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleNavigateToConsignment = (koiId) => {
    console.log("Navigating with koiId:", koiId); // Log koiId before navigating
    navigate("/consignment", { state: { koiId } });
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="viewDetails" onClick={() => handleViewDetails(record)}>
        View Details
      </Menu.Item>
    </Menu>
  );

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
      title: "Promotion ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Earned Points",
      dataIndex: "earnedPoints",
      key: "earnedPoints",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "120px" }}>
      <Row justify="center">
        <Col span={24}>
          <Card>
            <Title className="text-center" level={2}>
              Purchase History
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

      {/* Modal for Order Details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <h3 className="text-lg font-bold mt-4">Koi Details</h3>
            {selectedOrder.koiDetails &&
              selectedOrder.koiDetails.map((koi, index) => (
                <Card key={index} className="mb-4">
                  <Row gutter={16} align="middle">
                    <Col span={8}>
                      <Image
                        src={koi.imageKoi}
                        width={100}
                        height={100}
                        className="mb-2"
                      />
                    </Col>
                    <Col span={16}>
                      <p>
                        <strong>ID:</strong> {koi.koiId}
                      </p>
                      <p>
                        <strong>Name:</strong> {koi.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {koi.quantity}
                      </p>
                      <Button
                        type="primary"
                        onClick={() => handleNavigateToConsignment(koi.koiId)}
                      >
                        Go to Consignment
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistoryPage;
