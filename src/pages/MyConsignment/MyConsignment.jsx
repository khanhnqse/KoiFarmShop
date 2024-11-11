import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Descriptions,
  Image,
  Spin,
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;

const MyConsignment = () => {
  const { token, user } = useAuth();
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);

  useEffect(() => {
    if (user) {
      fetchConsignmentData(user.userId);
    }
  }, [user]);

  const fetchConsignmentData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/Consignment/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConsignments(response.data);
    } catch (error) {
      console.error("Failed to fetch consignment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetailModal = (record) => {
    setCurrentConsignment(record);
    setIsDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setCurrentConsignment(null);
  };

  const statusColors = {
    approved: "green",
    "pending payment": "orange",
    sold: "blue",
    cancelled: "red",
    rejected: "red",
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="viewDetails"
        onClick={() => handleOpenDetailModal(record)}
      >
        View Details
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
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
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
      render: (text) => <Tag color={statusColors[text]}>{text}</Tag>,
    },
    {
      title: "Consignment Price",
      dataIndex: "consignmentPrice",
      key: "consignmentPrice",
      render: (money) =>
        money === undefined || money === null
          ? "In progress"
          : `${money.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`,
    },
    {
      title: "Consignment Date From",
      dataIndex: "consignmentDateFrom",
      key: "consignmentDateFrom",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Consignment Date To",
      dataIndex: "consignmentDateTo",
      key: "consignmentDateTo",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
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
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "120px" }}>
      <Row justify="center">
        <Col span={24}>
          <Card style={{ overflow: "auto" }}>
            <Title className="text-center" level={2}>
              My Consignments
            </Title>
            {loading ? (
              <Spin size="large" />
            ) : (
              <Table
                columns={columns}
                dataSource={consignments}
                rowKey="consignmentId"
                pagination={{ pageSize: 10 }}
                style={{ marginTop: "20px" }}
                scroll={{ x: "max-content" }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="Koi Details"
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        width={"1200px"}
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseDetailModal}>
            OK
          </Button>,
        ]}
      >
        {currentConsignment && currentConsignment.koi && (
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
              {currentConsignment.koi.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <Image
                width={200}
                src={currentConsignment.koi.imageKoi}
                alt={currentConsignment.koi.name}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyConsignment;
