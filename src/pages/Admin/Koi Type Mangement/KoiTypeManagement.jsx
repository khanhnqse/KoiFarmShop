import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const KoiTypeManagement = () => {
  const [koiTypeData, setKoiTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentKoiType, setCurrentKoiType] = useState(null);

  // Fetch Koi Types from the API
  useEffect(() => {
    fetchKoiTypes();
  }, []);

  const fetchKoiTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7285/api/Koi/koitypes'); // Update with your API endpoint
      const data = await response.json();
      setKoiTypeData(data);
    } catch (error) {
      console.error("Failed to fetch koi types", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setIsUpdateMode(false);
    form.resetFields();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentKoiType(null);
  };

  const handleSaveKoiType = async (values) => {
    try {
      if (isUpdateMode) {
        // Update Koi Type
        await fetch(`https://localhost:7285/api/Koi/createKoiType${currentKoiType.koiTypeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
        // Create Koi Type
        await fetch('https://localhost:7285/api/Koi/createKoiType', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      }
      fetchKoiTypes(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save koi type", error);
    }
  };

  const handleEditKoiType = (record) => {
    setCurrentKoiType(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
    setIsUpdateMode(true);
  };

  const handleDeleteKoiType = async (koiTypeId) => {
    try {
      await fetch(`/api/koi-types/${koiTypeId}`, {
        method: 'DELETE',
      });
      fetchKoiTypes(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete koi type", error);
    }
  };

  const columns = [
    {
      title: 'Koi Type ID',
      dataIndex: 'koiTypeId',
      key: 'koiTypeId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEditKoiType(record)}>Edit</Button>
          <Button onClick={() => handleDeleteKoiType(record.koiTypeId)} danger style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>Koi Type Management</Typography.Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Koi Type
      </Button>
      <Table
        columns={columns}
        dataSource={koiTypeData}
        loading={loading}
        rowKey="koiTypeId"
        scroll={{ x: 800 }}
        title={() => "Koi Type Information"}
      />
      <Modal
        title={isUpdateMode ? "Update Koi Type" : "Add Koi Type"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveKoiType}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input the name!" }]}
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

export default KoiTypeManagement;
