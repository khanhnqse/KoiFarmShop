import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
  Image,
  Card,
  Row,
  Col,
} from "antd";
import { orderColumns } from "../../../constant/menu-data";
import { useAuth } from "../../../context/AuthContext";
import { fetchOrderData, updateOrderStatus } from "../../../services/sevice";

const { Option } = Select;

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

  const handleUpdateStatus = async (newStatus) => {
    if (!currentOrder) return;
    setLoading(true);
    await updateOrderStatus(currentOrder.orderId, newStatus, token);
    const data = await fetchOrderData(token);
    setOrders(data);
    setLoading(false);
    handleCloseModal();
  };

  const statusMenu = (
    <Menu onClick={({ key }) => handleUpdateStatus(key)}>
      <Menu.Item key="delivering">Delivering</Menu.Item>
    </Menu>
  );

  // Filter out orders with orderStatus "completed"
  const filteredOrders = orders.filter(
    (order) => order.orderStatus !== "completed"
  );

  return (
    <div>
      <Table
        columns={orderColumns(handleOpenModal, null, handleShowDetails)}
        dataSource={filteredOrders}
        loading={loading}
        rowKey="orderId"
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Dropdown overlay={statusMenu} key="statusDropdown">
            <Button>Update Status</Button>
          </Dropdown>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="User ID" name="userId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Order Date" name="orderDate">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Total Money" name="totalMoney">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Final Money" name="finalMoney">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Discount Money" name="discountMoney">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Earned Points" name="earnedPoints">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Order Status" name="orderStatus">
            <Select disabled>
              <Option value="completed">Completed</Option>
              <Option value="processing">Processing</Option>
              <Option value="canceled">Canceled</Option>
              <Option value="remittance">Remittance</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Payment Method" name="paymentMethod">
            <Select disabled>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="VN Pay">VN Pay</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Delivery Status" name="deliveryStatus">
            <Select disabled>
              <Option value="delivered">Delivered</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
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
