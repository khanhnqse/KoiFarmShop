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
  const [fileListFishes, setFileListFishes] = useState([]);
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
    if (fileListFishes.length > 0) {
      const file = fileListFishes[0];
      const url = await uploadFile(file.originFileObj);
      values.imageFishes = url; // Update to use imageFishes
    }

    if (isUpdateMode && currentFish) {
      values.fishesId = currentFish.fishesId; // Ensure fishesId is set
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

  const handleChangeFishes = ({ fileList: newFileList }) =>
    setFileListFishes(newFileList);

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

  const handleDeleteFish = async (fishesId) => {
    setLoading(true);
    await deleteFish(fishesId);
    loadFishData();
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Fish Management</Typography.Title>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Fish
      </Button>
      <Table
        columns={generalColumns(handleOpenModal, handleDeleteFish)}
        dataSource={fishData}
        loading={loading}
        rowKey="fishesId" // Update to fishesId
        scroll={{ x: 1500, y: 450 }}
        title={() => "General Information"}
      />
      <Table
        columns={detailColumns}
        dataSource={fishData}
        loading={loading}
        rowKey="fishesId" // Update to fishesId
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
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please input the quantity!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="koiTypeId"
                label="Koi Type ID"
                rules={[{ required: true, message: "Please input the koi type ID!" }]}
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
                  <Select.Option value="available">Available</Select.Option>
                  <Select.Option value="unavailable">Unavailable</Select.Option>
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
                name="quantityInStock"
                label="Quantity In Stock"
                rules={[{ required: true, message: "Please input the quantity in stock!" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="imageFishes"
                label="Image Fishes"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileListFishes}
                  onPreview={handlePreview}
                  onChange={handleChangeFishes}
                >
                  {fileListFishes.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
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
