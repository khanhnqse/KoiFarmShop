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
  Spin,
  notification,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { useAuth } from "../../../context/AuthContext";
import {
  deleteConsignment,
  fetchConsignmentData,
  saveConsignment,
  updateConsignmentStatus,
} from "../../../services/sevice";

import axios from "axios";
import UploadImage from "../../../components/UploadImage/UploadImage";
import Title from "antd/es/skeleton/Title";

const { Option } = Select;

const ConsignmentManagement = () => {
  const { token } = useAuth();
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [fileList, setFileList] = useState([]);
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
    setFileList([]);
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

  const handleOpenDetailModal = async (consignmentId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/Consignment/get-consignment/${consignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentConsignment(response.data);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch consignment details:", error);
      notification.error({
        message: "Failed to fetch consignment details",
        description: "There was an error fetching the consignment details.",
      });
    } finally {
      setLoading(false);
    }
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

  const handleUpdateConsignment = async (values) => {
    setLoading(true);
    try {
      const { consignmentPrice, consignmentTitle, consignmentDetail } = values;
      const requestBody = {
        consignmentPrice,
        consignmentTitle,
        consignmentDetail,
      };

      await axios.put(
        `https://localhost:7285/api/Consignment/update-order-consignment/${currentConsignment.consignmentId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notification.success({
        message: "Consignment Updated",
        description: "Consignment details updated successfully!",
      });

      const data = await fetchConsignmentData(token);
      setConsignments(data);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update consignment:", error);
      notification.error({
        message: "Update Failed",
        description:
          "There was an error updating the consignment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
        onClick={() => handleOpenDetailModal(record.consignmentId)}
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
        <Menu.Item
          key="completed"
          onClick={() => handleUpdateStatus(record.consignmentId, "completed")}
        >
          Completed
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
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      ...getColumnSearchProps("userName"),
    },
    // {
    //   title: "Koi Type ID",
    //   dataIndex: "koiTypeId",
    //   key: "koiTypeId",
    // },
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
      <Typography.Title level={2}>Consignment Management</Typography.Title>
      <Table
        columns={columns}
        dataSource={consignments}
        loading={loading}
        rowKey="consignmentId"
        scroll={{ x: 500, y: 600 }}
      />
      <Modal
        title={currentConsignment ? "Edit Consignment" : "Add Consignment"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="update"
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            {currentConsignment ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateConsignment}
          >
            {currentConsignment?.consignmentType !== "offline" && (
              <Form.Item
                label="Consignment Price"
                name="consignmentPrice"
                rules={[
                  {
                    required: true,
                    message: "Please input the consignment price!",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject("Price must be a valid number!");
                      }
                      if (value < 1) {
                        return Promise.reject("Price cannot be negative!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Consignment Price" />
              </Form.Item>
            )}
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
              <Input placeholder="Consignment Title" />
            </Form.Item>
            <Form.Item
              label="Consignment Detail"
              name="consignmentDetail"
              rules={[
                {
                  required: true,
                  message: "Please upload the consignment detail!",
                },
              ]}
            >
              <UploadImage
                fileList={fileList}
                setFileList={setFileList}
                setUrl={(url) =>
                  form.setFieldsValue({ consignmentDetail: url })
                }
                maxCount={1}
                accept=".docx"
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Modal
        title="Consignment Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        width={1200} // Set the width of the modal
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseDetailModal}>
            OK
          </Button>,
        ]}
      >
        {currentConsignment && (
          <Card bordered={false}>
            <Descriptions bordered>
              <Descriptions.Item label="Consignment ID">
                {currentConsignment.consignmentId}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                {currentConsignment.userId}
              </Descriptions.Item>
              <Descriptions.Item label="Koi Type ID">
                {currentConsignment.koiTypeId}
              </Descriptions.Item>
              <Descriptions.Item label="Koi ID">
                {currentConsignment.koiId}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Type">
                {currentConsignment.consignmentType}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {currentConsignment.status}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Price">
                {currentConsignment.consignmentPrice != null
                  ? currentConsignment.consignmentPrice.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )
                  : "None"}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Date From">
                {moment(currentConsignment.consignmentDateFrom).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Date To">
                {moment(currentConsignment.consignmentDateTo).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Title">
                {currentConsignment.consignmentTitle}
              </Descriptions.Item>
              <Descriptions.Item label="Consignment Detail">
                <a
                  href={currentConsignment.consignmentDetail}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Detail <DownloadOutlined />
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Take Care Fee">
                {currentConsignment.takeCareFee != null
                  ? currentConsignment.takeCareFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "None"}
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} className="mt-4">
              Koi Details
            </Title>
            {currentConsignment.koi && (
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
                        {currentConsignment.koi.price != null
                          ? currentConsignment.koi.price.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )
                          : "None"}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            )}
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default ConsignmentManagement;
