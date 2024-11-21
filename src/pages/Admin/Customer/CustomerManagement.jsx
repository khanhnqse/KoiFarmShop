import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { customerColumns } from "../../../constant/menu-data";
import {
  deleteCustomer,
  fetchCustomerData,
  saveCustomer,
  updateCustomerStatus,
} from "../../../services/sevice";

const { Search } = Input;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    setLoading(true);
    const customerData = await fetchCustomerData();
    setCustomers(customerData);
    setLoading(false);
  };

  const handleOpenModal = (customer = null) => {
    setIsUpdateMode(!!customer);
    setIsModalVisible(true);
    if (customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSaveCustomer = async (values) => {
    setLoading(true);
    if (isUpdateMode) {
      const { userName, email, phoneNumber, address } = values;
      await saveCustomer(
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
      await saveCustomer(
        { userName, password, confirmPassword, email },
        isUpdateMode
      );
    }
    loadCustomerData();
    handleCloseModal();
    setLoading(false);
  };

  const handleDeleteCustomer = async (userId) => {
    setLoading(true);
    await deleteCustomer(userId);
    loadCustomerData();
    setLoading(false);
  };

  const handleUpdateCustomerStatus = async (userId) => {
    setLoading(true);
    await updateCustomerStatus(userId);
    loadCustomerData();
    setLoading(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Typography.Title level={2}>Customer Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Customer
      </Button>
      <Search
        placeholder="Search by User Name"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20, paddingLeft: 20 }}
      />
      <Table
        columns={customerColumns(
          handleOpenModal,
          handleDeleteCustomer,
          handleUpdateCustomerStatus
        )}
        dataSource={filteredCustomers}
        loading={loading}
        rowKey="userId"
        scroll={{ x: 1500, y: 450 }}
      />
      <Modal
        title={isUpdateMode ? "Update Customer" : "Add Customer"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCustomer}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="User Name"
                rules={[
                  { required: true, message: "Please input the user name!" },
                ]}
              >
                <Input readOnly={isUpdateMode} />
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

export default CustomerManagement;
