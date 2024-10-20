import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchStaffData,
  saveStaff,
  deleteStaff,
} from "../../../services/sevice";
import { staffColumns } from "../../../constant/menu-data";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadStaffData();
  }, []);

  const loadStaffData = async () => {
    setLoading(true);
    const staffData = await fetchStaffData();
    setStaff(staffData);
    setLoading(false);
  };

  const handleOpenModal = (staff = null) => {
    setIsUpdateMode(!!staff);
    setIsModalVisible(true);
    if (staff) {
      form.setFieldsValue(staff);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSaveStaff = async (values) => {
    setLoading(true);
    if (isUpdateMode) {
      const { userName, email, phoneNumber, address } = values;
      await saveStaff(
        {
          userId: form.getFieldValue("userId"),
          userName,
          email,
          phoneNumber,
          address,
        },
        isUpdateMode
      );
    } else {
      const { userName, password, confirmPassword, email } = values;
      await saveStaff(
        { userName, password, confirmPassword, email },
        isUpdateMode
      );
    }
    loadStaffData();
    handleCloseModal();
    setLoading(false);
  };

  const handleDeleteStaff = async (userId) => {
    setLoading(true);
    await deleteStaff(userId);
    loadStaffData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Staff Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Staff
      </Button>
      <Table
        columns={staffColumns(handleOpenModal, handleDeleteStaff)}
        dataSource={staff}
        loading={loading}
        rowKey="userId"
        scroll={{ x: 1500, y: 450 }}
      />
      <Modal
        title={isUpdateMode ? "Update Staff" : "Add Staff"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveStaff}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="User Name"
                rules={[
                  { required: true, message: "Please input the user name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {isUpdateMode ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input the phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      { required: true, message: "Please input the address!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please input the password!" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm the password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default StaffManagement;
