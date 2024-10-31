import { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button } from "antd";

import { useAuth } from "../../../context/AuthContext";
import { fetchKoiTypeData, saveKoiType } from "../../../services/sevice";

const KoiTypeManagement = () => {
  const { token } = useAuth();
  const [koiTypes, setKoiTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchKoiTypeData(token);
      setKoiTypes(data);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const handleOpenModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSaveKoiType = async (values) => {
    setLoading(true);
    await saveKoiType(values, token);
    const data = await fetchKoiTypeData(token);
    setKoiTypes(data);
    setLoading(false);
    handleCloseModal();
  };

  const columns = [
    {
      title: "KoiType ID",
      dataIndex: "koiTypeId",
      key: "koiTypeId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: 16 }}
      >
        Add KoiType
      </Button>
      <Table
        columns={columns}
        dataSource={koiTypes}
        loading={loading}
        rowKey="koiTypeId"
      />
      <Modal
        title="Add KoiType"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveKoiType}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KoiTypeManagement;
