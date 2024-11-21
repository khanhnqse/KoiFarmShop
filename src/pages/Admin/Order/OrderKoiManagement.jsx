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
  Descriptions,
  Input,
} from "antd";
import { orderColumns } from "../../../constant/menu-data";
import { useAuth } from "../../../context/AuthContext";

import moment from "moment";
import {
  fetchOrderData,
  fetchOrderDetails,
  updateOrderStatus,
} from "../../../services/sevice";

const { Title } = Typography;
const { Search } = Input;

const OrderKoiManagement = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState("");
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

  const handleShowDetails = async (orderId) => {
    setLoading(true);
    try {
      const orderDetails = await fetchOrderDetails(orderId, token);
      setCurrentOrder(orderDetails);
      form.setFieldsValue(orderDetails);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      notification.error({
        message: "Failed to fetch order details",
        description: "There was an error fetching the order details.",
      });
    } finally {
      setLoading(false);
    }
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
    (order) =>
      order.orderStatus !== "completed" &&
      order.orderId.toString().includes(searchOrderId)
  );
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Card style={{ overflow: "auto" }}>
            <Title className="text-center" level={2}>
              Order Koi Management
            </Title>
            <Search
              placeholder="Search by Order ID"
              onSearch={(value) => setSearchOrderId(value)}
              style={{ width: 300, marginBottom: 20 }}
            />
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
            onClick={() =>
              handleUpdateOrderStatus({ orderStatus: "delivering" })
            }
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
                {currentOrder.userName || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {currentOrder.email || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {currentOrder.phoneNumber || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {currentOrder.address || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Promotion">
                {currentOrder.promotion || "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {currentOrder.orderDate
                  ? moment(currentOrder.orderDate).format("DD-MM-YYYY")
                  : "None"}
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
              {(currentOrder.fishes || []).map((fish) => (
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
              {(currentOrder.kois || []).map((koi) => (
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

export default OrderKoiManagement;
