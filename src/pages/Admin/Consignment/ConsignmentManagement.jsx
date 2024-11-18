/* eslint-disable no-unused-vars */
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
  Descriptions,
  Image,
  Card,
  Row,
  Col,
  Tag,
  Typography,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { useAuth } from "../../../context/AuthContext";
import {
  deleteConsignment,
  fetchConsignmentData,
  saveConsignment,
  updateConsignmentStatus,
} from "../../../services/sevice";

const { Option } = Select;

const ConsignmentManagement = () => {
  const { token } = useAuth();
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null);
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

  const handleOpenDetailModal = (record) => {
    setCurrentConsignment(record);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setCurrentConsignment(null);
  };

  const handleUpdateStatus = async (consignmentId, status) => {
    setLoading(true);
    await updateConsignmentStatus(consignmentId, status, token);
    const data = await fetchConsignmentData(token);
    setConsignments(data);
    setLoading(false);
    setEditingStatusId(null);
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
      <Menu.Item
        key="detail"
        icon={<MoreOutlined />}
        onClick={() => handleOpenDetailModal(record)}
      >
        View Detail
      </Menu.Item>
      <Menu.SubMenu key="status" title="Update Status">
        <Menu.Item
          key="approved"
          onClick={() => handleUpdateStatus(record.consignmentId, "approved")}
        >
          Approved
        </Menu.Item>
        <Menu.Item
          key="pending payment"
          onClick={() =>
            handleUpdateStatus(record.consignmentId, "pending payment")
          }
        >
          Pending Payment
        </Menu.Item>
        <Menu.Item
          key="sold"
          onClick={() => handleUpdateStatus(record.consignmentId, "sold")}
        >
          Sold
        </Menu.Item>
        <Menu.Item
          key="cancelled"
          onClick={() => handleUpdateStatus(record.consignmentId, "cancelled")}
        >
          Cancelled
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const statusColors = {
    approved: "green",
    "pending payment": "orange",
    sold: "blue",
    cancelled: "red",
    rejected: "red",
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters()}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const getStatusFilterProps = () => ({
    filters: [
      { text: "Approved", value: "approved" },
      { text: "Pending Payment", value: "pending payment" },
      { text: "Sold", value: "sold" },
      { text: "Cancelled", value: "cancelled" },
      { text: "Rejected", value: "rejected" },
    ],
    onFilter: (value, record) => record.status === value,
  });

  const columns = [
    {
      title: "Consignment ID",
      dataIndex: "consignmentId",
      key: "consignmentId",
      fixed: "left",
      sorter: {
        compare: (a, b) => a.consignmentId - b.consignmentId,
      },
      defaultSortOrder: "descend",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Koi Type ID",
      dataIndex: "koiTypeId",
      key: "koiTypeId",
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
      render: (text) => (
        <Tag color={text === "online" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Tag color={statusColors[text]}>{text}</Tag>,
      ...getStatusFilterProps(),
    },
    {
      title: "Consignment Date From",
      dataIndex: "consignmentDateFrom",
      key: "consignmentDateFrom",
      render: (date) => moment(date).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Consignment Date To",
      dataIndex: "consignmentDateTo",
      key: "consignmentDateTo",
      render: (date) => moment(date).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Sale Price",
      dataIndex: "consignmentPrice",
      key: "consignmentPrice",
      render: (money) =>
        money === undefined || money === 0
          ? "None"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
    },
    {
      title: "Care Price",
      dataIndex: "takeCareFee",
      key: "takeCareFee",
      render: (money) =>
        money === undefined || money === 0
          ? "None"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
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
      render: (text) =>
        isValidUrl(text) ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            View Detail
          </a>
        ) : (
          text
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Dropdown overlay={consignmentMenu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* <Button
        type="primary"
        onClick={() => handleOpenModal(null)}
        style={{ marginBottom: 16 }}
      >
        Add Consignment
      </Button> */}
      <Typography.Title level={2}>Consignment Management</Typography.Title>
      <Table
        columns={columns}
        dataSource={consignments}
        loading={loading}
        rowKey="consignmentId"
        scroll={{ x: 2000, y: 600 }}
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
      <Modal
        title="Koi Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        width={1200} // Set the width of the modal
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseDetailModal}>
            OK
          </Button>,
        ]}
      >
        {currentConsignment && currentConsignment.koi && (
          <Card bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Image
                  width={200}
                  src={currentConsignment.koi.imageKoi}
                  alt={currentConsignment.koi.name}
                />
              </Col>
              <Col span={16}>
                <Descriptions bordered>
                  <Descriptions.Item label="Koi ID">
                    {currentConsignment.koi.koiId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {currentConsignment.koi.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Origin">
                    {currentConsignment.koi.origin}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {currentConsignment.koi.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Age">
                    {currentConsignment.koi.age}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {currentConsignment.koi.size}
                  </Descriptions.Item>
                  <Descriptions.Item label="Breed">
                    {currentConsignment.koi.breed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Personality">
                    {currentConsignment.koi.personality}
                  </Descriptions.Item>
                  <Descriptions.Item label="Health Status">
                    {currentConsignment.koi.healthStatus}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {currentConsignment.koi.price
                      ? currentConsignment.koi.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "N/A"}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default ConsignmentManagement;
