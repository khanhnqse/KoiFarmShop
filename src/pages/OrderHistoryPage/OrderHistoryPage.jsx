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
  Form,
  Input,
  Rate,
  notification,
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
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
      notification.error({
        message: "Failed to fetch order history",
        description:
          error.response?.data?.message ||
          "An error occurred while fetching the order history.",
      });
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

  const handleFeedback = (koi) => {
    setSelectedKoi(koi);
    setIsFeedbackModalVisible(true);
  };

  const handleFeedbackCancel = () => {
    setIsFeedbackModalVisible(false);
    setSelectedKoi(null);
    form.resetFields();
  };

  const handleFeedbackSubmit = async (values) => {
    const { rating, content } = values;
    const { koiId, fishesId } = selectedKoi;
    const orderId = selectedOrder.orderId;

    // Construct query parameters
    const params = new URLSearchParams();
    params.append("rating", rating);
    params.append("content", content);
    if (koiId) params.append("koiId", koiId);
    if (fishesId) params.append("fishesId", fishesId);

    try {
      await axios.post(
        `https://localhost:7285/api/Feedback/add/${orderId}?${params.toString()}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({
        message: "Feedback Submitted",
        description: "Your feedback has been submitted successfully!",
      });
      handleFeedbackCancel();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      notification.error({
        message: "Feedback Submission Failed",

        description:
          error.response?.data ||
          "There was an error submitting your feedback.",
      });
    }
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
      sorter: {
        compare: (a, b) => a.orderId - b.orderId,
      },
      defaultSortOrder: "descend",
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
      title: "Final Money",
      dataIndex: "finalMoney",
      key: "finalMoney",
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
      title: "Promotion Name",
      dataIndex: "promotionName",
      key: "promotionName",
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
            {selectedOrder.koiDetails &&
              selectedOrder.koiDetails.length > 0 && (
                <>
                  <h3 className="text-lg font-bold mt-4">Koi Details</h3>
                  {selectedOrder.koiDetails.map((koi, index) => (
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
                            className="mt-2"
                            type="primary"
                            onClick={() =>
                              handleNavigateToConsignment(koi.koiId)
                            }
                          >
                            Consignment
                          </Button>
                          <Button
                            type="default"
                            onClick={() => handleFeedback(koi)}
                            style={{ marginLeft: "10px" }}
                          >
                            Give Feedback
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              )}
            {selectedOrder.fishDetails &&
              selectedOrder.fishDetails.length > 0 && (
                <>
                  <h3 className="text-lg font-bold mt-4">Fish Details</h3>
                  {selectedOrder.fishDetails.map((fish, index) => (
                    <Card key={index} className="mb-4">
                      <Row gutter={16} align="middle">
                        <Col span={8}>
                          <Image
                            src={fish.imageFishes}
                            width={100}
                            height={100}
                            className="mb-2"
                          />
                        </Col>
                        <Col span={16}>
                          <p>
                            <strong>ID:</strong> {fish.fishesId}
                          </p>
                          <p>
                            <strong>Name:</strong> {fish.name}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {fish.quantity}
                          </p>
                          <Button
                            type="default"
                            onClick={() => handleFeedback(fish)}
                            style={{ marginLeft: "10px" }}
                          >
                            Give Feedback
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              )}
          </div>
        )}
      </Modal>

      {/* Modal for Feedback */}
      <Modal
        title="Give Feedback"
        visible={isFeedbackModalVisible}
        onCancel={handleFeedbackCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFeedbackSubmit}>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please select a rating!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input your feedback!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderHistoryPage;
