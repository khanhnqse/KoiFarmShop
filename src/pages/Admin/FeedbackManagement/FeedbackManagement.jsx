import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Table, Button, Modal, Form, Input, Row, Col, Typography } from "antd";
// eslint-disable-next-line no-unused-vars
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchFeedbackData,
  saveFeedback,
  deleteFeedback,
} from "../../../services/sevice";
import { feedbackColumns } from "../../../constant/menu-data";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Store the selected feedback
  const [form] = Form.useForm();

  useEffect(() => {
    loadFeedbackData();
  }, []);

  const loadFeedbackData = async () => {
    setLoading(true);
    const feedbackData = await fetchFeedbackData();
    setFeedbacks(feedbackData);
    setLoading(false);
  };

  // Open modal for editing or adding new feedback
  const handleOpenModal = (feedback = null) => {
    setIsUpdateMode(!!feedback);
    setSelectedFeedback(feedback); // Store selected feedback for edit
    setIsModalVisible(true);
    if (feedback) {
      // Populate form with selected feedback for editing
      form.setFieldsValue({
        feedbackId: feedback.feedbackId,
        userId: feedback.userId,
        orderId: feedback.orderId,
        koiId: feedback.koiId,
        rating: feedback.rating,
        content: feedback.content,
        feedbackDate: feedback.feedbackDate,
      });
    } else {
      form.resetFields(); // Reset fields for adding new feedback
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedFeedback(null);
  };

  const handleSaveFeedback = async (values) => {
    setLoading(true);
    if (isUpdateMode && selectedFeedback) {
      // Update feedback
      await saveFeedback({ ...selectedFeedback, ...values }, true);
    } else {
      // Add new feedback
      await saveFeedback(values, false);
    }
    loadFeedbackData();
    handleCloseModal();
    setLoading(false);
  };

  const handleDeleteFeedback = async (feedbackId) => {
    setLoading(true);
    await deleteFeedback(feedbackId);
    loadFeedbackData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Feedback Management</Typography.Title>
      {/* <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Feedback
      </Button> */}
      <Table
        columns={feedbackColumns(handleOpenModal, handleDeleteFeedback)}
        dataSource={feedbacks}
        loading={loading}
        rowKey="feedbackId"
        scroll={{ x: 1500, y: 450 }}
      />
      <Modal
        title={isUpdateMode ? "Update Feedback" : "Add Feedback"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveFeedback}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userId"
                label="User ID"
                rules={[
                  { required: true, message: "Please input the user ID!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="orderId"
                label="Order ID"
                rules={[
                  { required: true, message: "Please input the order ID!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="koiId"
                label="Koi ID"
                rules={[
                  { required: true, message: "Please input the Koi ID!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[
                  { required: true, message: "Please input the rating!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    required: true,
                    message: "Please input the feedback content!",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="feedbackDate"
                label="Feedback Date"
                rules={[
                  {
                    required: true,
                    message: "Please input the feedback date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
