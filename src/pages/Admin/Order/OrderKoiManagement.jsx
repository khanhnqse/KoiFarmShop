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
} from "antd";
import { orderColumns } from "../../../constant/menu-data";
import { useAuth } from "../../../context/AuthContext";
import { fetchOrderData, updateOrderStatus } from "../../../services/sevice";

const { Option } = Select;
const { Title } = Typography;

const OrderKoiManagement = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const handleOpenModal = (order) => {
    setCurrentOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
    form.resetFields();
  };

  const handleShowDetails = (order) => {
    setCurrentOrder(order);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setCurrentOrder(null);
  };

  const handleUpdateOrderStatus = async (values) => {
    if (!currentOrder) return;
    setLoading(true);
    try {
      await updateOrderStatus(currentOrder.orderId, values.orderStatus, token);

      const data = await fetchOrderData(token);
      setOrders(data);
      handleCloseModal();
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
                columns={orderColumns(handleOpenModal, handleShowDetails)}
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
        title="Update Order Status"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
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
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateOrderStatus}
          >
            <Form.Item
              label="Order Status"
              name="orderStatus"
              rules={[
                { required: true, message: "Please select the order status!" },
              ]}
            >
              <Select placeholder="Select Order Status">
                <Option value="delivering">Delivering</Option>
              </Select>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        title="Order Item Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {currentOrder && (
          <>
            <h3>Order Kois</h3>
            <Row gutter={[16, 16]}>
              {currentOrder.orderKois.map((koi) => (
                <Col span={12} key={koi.koiId}>
                  <Card hoverable>
                    <Image src={koi.koiDetails.imageKoi} width={100} />
                    <p>
                      <strong>Name:</strong> {koi.koiDetails.name}
                    </p>
                    <p>
                      <strong>Gender:</strong> {koi.koiDetails.gender}
                    </p>
                    <p>
                      <strong>Price:</strong> ${koi.koiDetails.price}
                    </p>
                    <p>
                      <strong>Size:</strong> {koi.koiDetails.size} cm
                    </p>
                    <p>
                      <strong>Quantity:</strong> {koi.quantity}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
            <h3>Order Fishes</h3>
            <Row gutter={[16, 16]}>
              {currentOrder.orderFishes.length > 0 ? (
                currentOrder.orderFishes.map((fish) => (
                  <Col span={12} key={fish.fishId}>
                    <Card hoverable>
                      <p>
                        <strong>Fish ID:</strong> {fish.fishId}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {fish.quantity}
                      </p>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No fishes in this order.</p>
              )}
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderKoiManagement;
