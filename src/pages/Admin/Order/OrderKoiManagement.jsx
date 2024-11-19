import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Form,
  Button,
  Image,
  Card,
  Row,
  Col,
  Typography,
  notification,
  Spin,
  Select,
  Descriptions,
} from "antd";
import { orderColumns } from "../../../constant/menu-data";
import { useAuth } from "../../../context/AuthContext";
import { fetchOrderData, updateOrderStatus } from "../../../services/sevice";
import moment from "moment";

const { Option } = Select;
const { Title } = Typography;

const OrderKoiManagement = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchOrderData(token);
      setOrders(data);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const handleShowDetails = (order) => {
    setCurrentOrder(order);
    form.setFieldsValue(order);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setCurrentOrder(null);
    form.resetFields();
  };

  const handleUpdateOrderStatus = async (values) => {
    if (!currentOrder) return;
    setLoading(true);
    try {
      await updateOrderStatus(currentOrder.orderId, values.orderStatus, token);

      const data = await fetchOrderData(token);
      setOrders(data);
      handleCloseDetailModal();
    } catch (error) {
      console.error("Failed to update order status:", error);
      notification.error({
        message: "Update Failed",
        description:
          "There was an error updating the order status. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.orderStatus !== "completed"
  );

  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Card style={{ overflow: "auto" }}>
            <Title className="text-center" level={2}>
              Order Koi Management
            </Title>
            {loading ? (
              <Spin size="large" />
            ) : (
              <Table
                columns={orderColumns(null, handleShowDetails)}
                dataSource={filteredOrders}
                rowKey="orderId"
                pagination={{ pageSize: 10 }}
                style={{ marginTop: "20px" }}
                scroll={{ x: "max-content" }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="Order Item Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        width={900}
        footer={[
          <Button key="close" type="primary" onClick={handleCloseDetailModal}>
            Close
          </Button>,
          <Button
            key="update"
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Update Status
          </Button>,
        ]}
      >
        {currentOrder && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Order ID">
                {currentOrder.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="User Name">
                {currentOrder.username || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {currentOrder.address || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Promotion">
                {currentOrder.promotion || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {currentOrder.orderDate || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Total Money">
                {currentOrder.totalMoney
                  ? currentOrder.totalMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Final Money">
                {currentOrder.finalMoney
                  ? currentOrder.finalMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Discount Money">
                {currentOrder.discountMoney
                  ? currentOrder.discountMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Used Points">
                {currentOrder.usedPoints || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Earned Points">
                {currentOrder.earnedPoints || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status">
                {currentOrder.orderStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {currentOrder.paymentMethod || "None"}
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} className="mt-4">
              Update Order Status
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateOrderStatus}
            >
              <Form.Item
                label="Order Status"
                name="orderStatus"
                rules={[
                  {
                    required: true,
                    message: "Please select the order status!",
                  },
                ]}
              >
                <Select placeholder="Select Order Status">
                  <Option value="delivering">Delivering</Option>
                </Select>
              </Form.Item>
            </Form>

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
              dataSource={currentOrder.point_transaction || []}
              rowKey="transactionId"
              pagination={false}
            />

            <Title level={4} className="mt-4">
              Fishes
            </Title>
            <Row gutter={16}>
              {(currentOrder.orderFishes || []).map((fish) => (
                <Col span={12} key={fish.fishesId}>
                  <Card>
                    <Image
                      src={fish.fishDetails.imageFishes}
                      width={100}
                      height={100}
                    />
                    <p>
                      <strong>ID:</strong> {fish.fishesId}
                    </p>
                    <p>
                      <strong>Name:</strong> {fish.fishDetails.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {fish.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      {fish.fishDetails.price.toLocaleString("vi-VN", {
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
              {(currentOrder.orderKois || []).map((koi) => (
                <Col span={12} key={koi.koiId}>
                  <Card>
                    <Image
                      src={koi.koiDetails.imageKoi}
                      width={100}
                      height={100}
                    />
                    <p>
                      <strong>ID:</strong> {koi.koiId}
                    </p>
                    <p>
                      <strong>Name:</strong> {koi.koiDetails.name}
                    </p>
                    <p>
                      <strong>Gender:</strong> {koi.koiDetails.gender}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {koi.quantity}
                    </p>
                    <p>
                      <strong>Size:</strong> {koi.koiDetails.size} cm
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      {koi.koiDetails.price.toLocaleString("vi-VN", {
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

export default OrderKoiManagement;
