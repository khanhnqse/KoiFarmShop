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
import { deleteFish, fetchFishData, saveFish } from "../../../services/sevice";
import { detailColumns, generalColumns } from "../../../constant/menu-data";
import uploadFile from "../../../utils/file";

const FishManagement = () => {
  const [fishData, setFishData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentFish, setCurrentFish] = useState(null);
  const [form] = Form.useForm();
  const [fileListKoi, setFileListKoi] = useState([]);
  const [fileListCertificate, setFileListCertificate] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    loadFishData();
  }, []);

  const loadFishData = async () => {
    setLoading(true);
    const data = await fetchFishData();
    setFishData(data);
    setLoading(false);
  };

  const handleOpenModal = (fish = null) => {
    setIsUpdateMode(!!fish);
    setCurrentFish(fish);
    setIsModalVisible(true);
    if (fish) {
      form.setFieldsValue(fish);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentFish(null);
    form.resetFields();
  };

  const handleSaveFish = async (values) => {
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

    if (isUpdateMode && currentFish) {
      values.koiId = currentFish.koiId; // Ensure koiId is set
    }

    console.log("Fish data to be saved:", values); // Log the fish object

    setLoading(true);
    await saveFish(values, isUpdateMode);
    loadFishData();
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

  const handleDeleteFish = async (koiId) => {
    setLoading(true);
    await deleteFish(koiId);
    loadFishData();
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
        columns={generalColumns(handleOpenModal, handleDeleteFish)}
        dataSource={fishData}
        loading={loading}
        rowKey="koiId"
        scroll={{ x: 1500, y: 450 }}
        title={() => "General Information"}
      />
      <Table
        columns={detailColumns}
        dataSource={fishData}
        loading={loading}
        rowKey="koiId"
        scroll={{ x: 1500, y: 450 }}
        title={() => "Detailed Information"}
      />
      <Modal
        title={isUpdateMode ? "Update Fish" : "Add Fish"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveFish}>
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
                rules={[
                  { required: true, message: "Please input the origin!" },
                ]}
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
                rules={[
                  { required: true, message: "Please input the gender!" },
                ]}
              >
                <Select>
                  <Select.Option value="Male" />
                  <Select.Option value="Female" />
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
                  <Select.Option value="F1 hybrid" />
                  <Select.Option value="Purebred" />
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="personality"
                label="Personality"
                rules={[
                  { required: true, message: "Please input the personality!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="feedingAmount"
                label="Feeding Amount"
                rules={[
                  {
                    required: true,
                    message: "Please input the feeding amount!",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please input the filter rate!" },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="healthStatus"
                label="Health Status"
                rules={[
                  {
                    required: true,
                    message: "Please input the health status!",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please input the award certificates!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please input the status!" },
                ]}
              >
                <Select>
                  <Select.Option value="Available" />
                  <Select.Option value="Unavailable" />
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
              <Form.Item
                name="koiTypeId"
                label="Koi Type ID"
                rules={[
                  { required: true, message: "Please input the koi type ID!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="imageKoi"
                label="Image Koi"
                rules={[
                  {
                    required: true,
                    message: "Please input the image koi URL!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileListKoi}
                  onPreview={handlePreview}
                  onChange={handleChangeKoi}
                >
                  {fileListKoi.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="imageCertificate"
                label="Image Certificate"
                rules={[
                  {
                    required: true,
                    message: "Please input the image certificate URL!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileListCertificate}
                  onPreview={handlePreview}
                  onChange={handleChangeCertificate}
                >
                  {fileListCertificate.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="detailDescription" label="Detail Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default FishManagement;
