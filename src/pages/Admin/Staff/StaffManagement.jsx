import moment from "moment";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Col,
  Table,
  Typography,
  Select,
  DatePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

function StaffManagement() {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const api = "http://localhost:5090/api/User";

  const fetchCustomers = async () => {
    const response = await axios.get(api);
    setCustomers(response.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => customer.role === "admin"||customer.role === "staff");

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      sorter: {
        compare: (a, b) => a.userID - b.userID,
      },
      defaultSortOrder: "ascend",
      fixed: "left",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span style={{ color: role === "admin" ? "red" : "blue" }}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Register Date",
      dataIndex: "registerDate",
      key: "registerDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Total Points",
      dataIndex: "totalPoints",
      key: "totalPoints",
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitCustomer = async (customer) => {
    customer.registerDate = customer.registerDate
      ? customer.registerDate.format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"); // Default to current date if not provided

    try {
      setSubmitting(true);
      const response = await axios.post(api, customer);
      message.success("Customer created successfully");
      setOpenModal(false);
      fetchCustomers();
      form.resetFields();
      console.log("data", response.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Customer Management</Typography.Title>
      <Button onClick={handleOpenModal}>
        <PlusOutlined /> Add New Customer
      </Button>
      <Table columns={columns} dataSource={filteredCustomers} scroll={{ x: 1500, y: 450 }} />
      <Modal
        confirmLoading={submitting}
        title="Add New Customer"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form onFinish={handleSubmitCustomer} form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="User Name"
                name="userName"
                rules={[{ required: true, message: "Please input user name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input email" }]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input password" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Please input phone number" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select>
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="staff">Staff</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="locked">Locked</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Register Date"
                name="registerDate"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Total Points"
                name="totalPoints"
                rules={[{ required: true, message: "Please input total points" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffManagement;
