import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Row, Col, Typography, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchPurchaseHistoryData, savePurchaseHistory, deletePurchaseHistory } from "../../../services/sevice";
import { purchaseHistoryColumns } from "../../../constant/menu-data";

const PurchaseHistoryManagement = () => {
  const [purchaseHistories, setPurchaseHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedPurchaseHistory, setSelectedPurchaseHistory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadPurchaseHistoryData();
  }, []);

  const loadPurchaseHistoryData = async () => {
    setLoading(true);
    const purchaseHistoryData = await fetchPurchaseHistoryData();
    setPurchaseHistories(purchaseHistoryData);
    setLoading(false);
  };

  const handleOpenModal = (purchaseHistory = null) => {
    setIsUpdateMode(!!purchaseHistory);
    setSelectedPurchaseHistory(purchaseHistory);
    setIsModalVisible(true);
    if (purchaseHistory) {
      form.setFieldsValue({
        orderID: purchaseHistory.orderID,
        userID: purchaseHistory.userID,
        purchaseDate: purchaseHistory.purchaseDate,
        totalMoney: purchaseHistory.totalMoney,
        discountMoney: purchaseHistory.discountMoney,
        finalMoney: purchaseHistory.finalMoney,
        orderStatus: purchaseHistory.orderStatus,
        paymentMethod: purchaseHistory.paymentMethod,
        shippingDate: purchaseHistory.shippingDate,
        deliveryStatus: purchaseHistory.deliveryStatus,
        promotionID: purchaseHistory.promotionID,
        earnedPoints: purchaseHistory.earnedPoints,
        usedPoints: purchaseHistory.usedPoints,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedPurchaseHistory(null);
  };

  const handleSavePurchaseHistory = async (values) => {
    setLoading(true);
    if (isUpdateMode && selectedPurchaseHistory) {
      await savePurchaseHistory({ ...selectedPurchaseHistory, ...values }, true);
    } else {
      await savePurchaseHistory(values, false);
    }
    loadPurchaseHistoryData();
    handleCloseModal();
    setLoading(false);
  };

  const handleDeletePurchaseHistory = async (orderID) => {
    setLoading(true);
    await deletePurchaseHistory(orderID);
    loadPurchaseHistoryData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Purchase History Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Purchase History
      </Button>
      <Table
        columns={purchaseHistoryColumns(handleOpenModal, handleDeletePurchaseHistory)}
        dataSource={purchaseHistories}
        loading={loading}
        rowKey="orderID"
        scroll={{ x: 1500, y: 450 }}
      />
      <Modal
        title={isUpdateMode ? "Update Purchase History" : "Add Purchase History"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSavePurchaseHistory}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="orderID"
                label="Order ID"
                rules={[{ required: true, message: "Please input the order ID!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userID"
                label="User ID"
                rules={[{ required: true, message: "Please input the user ID!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="purchaseDate"
                label="Purchase Date"
                rules={[{ required: true, message: "Please select the purchase date!" }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalMoney"
                label="Total Money"
                rules={[{ required: true, message: "Please input the total money!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="discountMoney"
                label="Discount Money"
                rules={[{ required: true, message: "Please input the discount money!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="finalMoney"
                label="Final Money"
                rules={[{ required: true, message: "Please input the final money!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="orderStatus"
                label="Order Status"
                rules={[{ required: true, message: "Please input the order status!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: "Please input the payment method!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="shippingDate"
                label="Shipping Date"
                rules={[{ required: true, message: "Please select the shipping date!" }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deliveryStatus"
                label="Delivery Status"
                rules={[{ required: true, message: "Please input the delivery status!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="promotionID"
                label="Promotion ID"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="earnedPoints"
                label="Earned Points"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="usedPoints"
                label="Used Points"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PurchaseHistoryManagement;
