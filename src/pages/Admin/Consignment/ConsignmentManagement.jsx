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
} from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useAuth } from "../../../context/AuthContext";
import {
  deleteConsignment,
  fetchConsignmentData,
  saveConsignment,
} from "../../../services/sevice";

const { Option } = Select;

const ConsignmentManagement = () => {
  const { token } = useAuth();
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchConsignmentData(token);
      setConsignments(data);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const handleOpenModal = (consignment) => {
    setCurrentConsignment(consignment);
    form.setFieldsValue(consignment || {});
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentConsignment(null);
    form.resetFields();
  };

  const handleSaveConsignment = async (values) => {
    setLoading(true);
    const consignmentData = {
      ...values,
      consignmentId: currentConsignment
        ? currentConsignment.consignmentId
        : undefined,
    };
    await saveConsignment(consignmentData, !!currentConsignment, token);
    const data = await fetchConsignmentData(token);
    setConsignments(data);
    setLoading(false);
    handleCloseModal();
  };

  const handleDeleteConsignment = async (consignmentId) => {
    setLoading(true);
    await deleteConsignment(consignmentId, token);
    const data = await fetchConsignmentData(token);
    setConsignments(data);
    setLoading(false);
  };

  const consignmentMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleOpenModal(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteConsignment(record.consignmentId)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Consignment ID",
      dataIndex: "consignmentId",
      key: "consignmentId",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Koi ID",
      dataIndex: "koiId",
      key: "koiId",
    },
    {
      title: "Consignment Type",
      dataIndex: "consignmentType",
      key: "consignmentType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Consignment Price",
      dataIndex: "consignmentPrice",
      key: "consignmentPrice",
    },
    {
      title: "Consignment Date From",
      dataIndex: "consignmentDateFrom",
      key: "consignmentDateFrom",
    },
    {
      title: "Consignment Date To",
      dataIndex: "consignmentDateTo",
      key: "consignmentDateTo",
    },
    {
      title: "Consignment Title",
      dataIndex: "consignmentTitle",
      key: "consignmentTitle",
    },
    {
      title: "Consignment Detail",
      dataIndex: "consignmentDetail",
      key: "consignmentDetail",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown overlay={consignmentMenu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => handleOpenModal(null)}
        style={{ marginBottom: 16 }}
      >
        Add Consignment
      </Button>
      <Table
        columns={columns}
        dataSource={consignments}
        loading={loading}
        rowKey="consignmentId"
      />
      <Modal
        title={currentConsignment ? "Edit Consignment" : "Add Consignment"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveConsignment}>
          <Form.Item
            label="User ID"
            name="userId"
            rules={[{ required: true, message: "Please input the user ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Koi ID"
            name="koiId"
            rules={[{ required: true, message: "Please input the koi ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Consignment Type"
            name="consignmentType"
            rules={[
              {
                required: true,
                message: "Please select the consignment type!",
              },
            ]}
          >
            <Select>
              <Option value="online">Online</Option>
              <Option value="offline">Offline</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Option value="awaiting inspection">Awaiting Inspection</Option>
              <Option value="consigned">Consigned</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Consignment Price"
            name="consignmentPrice"
            rules={[
              {
                required: true,
                message: "Please input the consignment price!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Consignment Date From"
            name="consignmentDateFrom"
            rules={[
              {
                required: true,
                message: "Please input the consignment date from!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Consignment Date To"
            name="consignmentDateTo"
            rules={[
              {
                required: true,
                message: "Please input the consignment date to!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Consignment Title"
            name="consignmentTitle"
            rules={[
              {
                required: true,
                message: "Please input the consignment title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Consignment Detail"
            name="consignmentDetail"
            rules={[
              {
                required: true,
                message: "Please input the consignment detail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {currentConsignment ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConsignmentManagement;
