import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Upload,
  Image,
  Select,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { deleteFish, fetchKoiData, saveFish } from "../../../services/sevice"; // Ensure 'saveKoi' is correctly imported if defined
import { detailColumns, generalColumns } from "../../../constant/menu-data";
import uploadFile from "../../../utils/file";

const KoiManagement = () => {
  const [koiData, setKoiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentKoi, setCurrentKoi] = useState(null);
  const [form] = Form.useForm();
  const [fileListKoi, setFileListKoi] = useState([]);
  const [fileListCertificate, setFileListCertificate] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    loadKoiData();
  }, []);

  const loadKoiData = async () => {
    setLoading(true);
    const data = await fetchKoiData(); // Fetch data from the koi API
    setKoiData(data);
    setLoading(false);
  };

  const handleOpenModal = (koi = null) => {
    setIsUpdateMode(!!koi);
    setCurrentKoi(koi);
    setIsModalVisible(true);
    if (koi) {
      form.setFieldsValue(koi);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentKoi(null);
    form.resetFields();
  };

  const handleSaveKoi = async (values) => {
    if (fileListKoi.length > 0) {
      const file = fileListKoi[0];
      const url = await uploadFile(file.originFileObj);
      values.imageKoi = url;
    }
    if (fileListCertificate.length > 0) {
      const file = fileListCertificate[0];
      const url = await uploadFile(file.originFileObj);
      values.imageCertificate = url;
    }

    if (isUpdateMode && currentKoi) {
      values.koiId = currentKoi.koiId; // Ensure koiId is set
    }

    console.log("Koi data to be saved:", values); // Log the koi object

    setLoading(true);
    await saveFish(values, isUpdateMode); // Ensure saveFish is defined for saving koi data
    loadKoiData();
    handleCloseModal();
    setLoading(false);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeKoi = ({ fileList: newFileList }) =>
    setFileListKoi(newFileList);
  const handleChangeCertificate = ({ fileList: newFileList }) =>
    setFileListCertificate(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleDeleteKoi = async (koiId) => {
    setLoading(true);
    await deleteFish(koiId); // Delete function should work with koiId
    loadKoiData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Koi Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Koi
      </Button>
      <Table
        columns={generalColumns(handleOpenModal, handleDeleteKoi)}
        dataSource={koiData}
        loading={loading}
        rowKey="koiId"
        scroll={{ x: 1500, y: 450 }}
        title={() => "General Information"}
      />
      <Table
        columns={detailColumns}
        dataSource={koiData}
        loading={loading}
        rowKey="koiId"
        scroll={{ x: 1500, y: 450 }}
        title={() => "Detailed Information"}
      />
      <Modal
        title={isUpdateMode ? "Update Koi" : "Add Koi"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveKoi}>
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
            <Col span={12}>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[{ required: true, message: "Please input the origin!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please input the gender!" }]}
              >
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please input the age!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="size"
                label="Size"
                rules={[{ required: true, message: "Please input the size!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="breed"
                label="Breed"
                rules={[{ required: true, message: "Please input the breed!" }]}
              >
                <Select>
                  <Select.Option value="F1 hybrid">F1 hybrid</Select.Option>
                  <Select.Option value="Purebred">Purebred</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="personality"
                label="Personality"
                rules={[{ required: true, message: "Please input the personality!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="feedingAmount"
                label="Feeding Amount"
                rules={[{ required: true, message: "Please input the feeding amount!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="filterRate"
                label="Filter Rate"
                rules={[{ required: true, message: "Please input the filter rate!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="healthStatus"
                label="Health Status"
                rules={[{ required: true, message: "Please input the health status!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="awardCertificates"
                label="Award Certificates"
                rules={[{ required: true, message: "Please input the award certificates!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please input the status!" }]}
              >
                <Select>
                  <Select.Option value="Available">Available</Select.Option>
                  <Select.Option value="Sold">Sold</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quantityInStock" label="Quantity In Stock">
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Koi Image">
                <Upload
                  listType="picture-card"
                  fileList={fileListKoi}
                  onChange={handleChangeKoi}
                  onPreview={handlePreview}
                >
                  {fileListKoi.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Certificate Image">
                <Upload
                  listType="picture-card"
                  fileList={fileListCertificate}
                  onChange={handleChangeCertificate}
                  onPreview={handlePreview}
                >
                  {fileListCertificate.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default KoiManagement;
