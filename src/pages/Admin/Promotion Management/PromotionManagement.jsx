import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchPromotionData,
  savePromotion,
  deletePromotion,
} from "../../../services/sevice";
import { promotionColumns } from "../../../constant/menu-data";
import moment from "moment";

const { Option } = Select;

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadPromotionData();
  }, []);

  const loadPromotionData = async () => {
    setLoading(true);
    const promotionData = await fetchPromotionData();
    setPromotions(promotionData);
    setLoading(false);
  };

  const handleOpenModal = (promotion = null) => {
    setIsUpdateMode(!!promotion);
    setIsModalVisible(true);
    if (promotion) {
      form.setFieldsValue({
        ...promotion,
        startDate: moment(promotion.startDate),
        endDate: moment(promotion.endDate),
      });
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSavePromotion = async (values) => {
    setLoading(true);
    const promotionData = {
      ...values,
      promotionId: isUpdateMode ? form.getFieldValue("promotionId") : undefined,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    await savePromotion(promotionData, isUpdateMode);
    loadPromotionData();
    handleCloseModal();
    setLoading(false);
  };

  const handleDeletePromotion = async (promotionId) => {
    setLoading(true);
    await deletePromotion(promotionId);
    loadPromotionData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Promotion Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Promotion
      </Button>
      <Table
        columns={promotionColumns(handleOpenModal, handleDeletePromotion)}
        dataSource={promotions}
        loading={loading}
        rowKey="promotionId"
        scroll={{ x: 1500, y: 450 }}
        title={() => "Promotion Management"}
      />
      <Modal
        title={isUpdateMode ? "Update Promotion" : "Add Promotion"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSavePromotion}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="promotionName"
                label="Promotion Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the promotion name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discountRate"
                label="Discount Rate"
                rules={[
                  {
                    required: true,
                    message: "Please input the discount rate!",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    transform: (value) => (value ? Number(value) : 0),
                    message:
                      "Discount rate must be a number between 0 and 100!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date!" },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                dependencies={["startDate"]}
                rules={[
                  { required: true, message: "Please select the end date!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue("startDate");
                      if (!value || !startDate || value.isAfter(startDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("End date must be after start date!")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
              >
                <Select>
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
