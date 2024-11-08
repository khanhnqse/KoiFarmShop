import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useAuth } from "../../../context/AuthContext";
import {
  deleteKoi,
  fetchKoiData,
  saveKoi,
  fetchKoiTypeData,
} from "../../../services/sevice";
import { koiColumns } from "../../../constant/menu-data";
import uploadFile from "../../../utils/file";

const { Option } = Select;

const KoiManagement = () => {
  const { token } = useAuth();
  const [kois, setKois] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentKoi, setCurrentKoi] = useState(null);
  const [koiTypes, setKoiTypes] = useState([]);
  const [form] = Form.useForm();
  const [fileListKoi, setFileListKoi] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchKoiData(token);
      setKois(data);
      setLoading(false);
    };

    fetchData();
    loadKoiTypes();
  }, [token]);

  const loadKoiTypes = async () => {
    setLoading(true);
    const data = await fetchKoiTypeData();
    setKoiTypes(data);
    setLoading(false);
  };

  const handleOpenModal = (koi) => {
    setCurrentKoi(koi);
    form.setFieldsValue(koi || {});
    if (koi && koi.imageFishes) {
      setFileListKoi([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: koi.imageFishes,
        },
      ]);
    } else {
      setFileListKoi([]);
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentKoi(null);
    form.resetFields();
    setFileListKoi([]);
  };

  const handleSaveKoi = async (values) => {
    if (fileListKoi.length > 0) {
      const file = fileListKoi[0];
      if (!file.url) {
        const url = await uploadFile(file.originFileObj);
        values.imageFishes = url;
      } else {
        values.imageFishes = file.url;
      }
    }

    if (currentKoi) {
      values.fishesId = currentKoi.fishesId;
    }

    setLoading(true);
    await saveKoi(values, !!currentKoi, token);
    const data = await fetchKoiData(token);
    setKois(data);
    setLoading(false);
    handleCloseModal();
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

  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      onSuccess(url);
    } catch (error) {
      onError(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleDeleteKoi = async (fishesId) => {
    setLoading(true);
    await deleteKoi(fishesId, token);
    const data = await fetchKoiData(token);
    setKois(data);
    setLoading(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => handleOpenModal(null)}
        style={{ marginBottom: 16 }}
      >
        Add Fish
      </Button>
      <Table
        columns={koiColumns(handleOpenModal, handleDeleteKoi)}
        dataSource={kois}
        loading={loading}
        rowKey="fishesId"
      />
      <Modal
        title={currentKoi ? "Edit Koi" : "Add Koi"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveKoi}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Koi Type ID"
                name="koiTypeId"
                rules={[
                  { required: true, message: "Please input the Koi Type ID!" },
                ]}
              >
                <Select>
                  {koiTypes.map((type) => (
                    <Option key={type.koiTypeId} value={type.koiTypeId}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
              >
                <Select>
                  <Option value="available">Available</Option>
                  <Option value="unavailable">Unavailable</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price!" },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject("Price must be a valid number!");
                      }
                      if (value < 0) {
                        return Promise.reject("Price cannot be negative!");
                      }
                      return Promise.resolve();
                    },
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
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please input the quantity!" },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject("Quantity must be a valid number!");
                      }
                      if (value < 0) {
                        return Promise.reject("Quantity cannot be negative!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Quantity In Stock"
                name="quantityInStock"
                rules={[
                  {
                    required: true,
                    message: "Please input the quantity in stock!",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject("Stock must be a valid number!");
                      }
                      if (value < 0) {
                        return Promise.reject("Stock cannot be negative!");
                      }
                      return Promise.resolve();
                    },
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
                label="Image Koi"
                name="imageFishes"
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
                  customRequest={customUpload}
                >
                  {fileListKoi.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Detail Description"
            name="detailDescription"
            rules={[
              {
                required: true,
                message: "Please input the detail description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {currentKoi ? "Update" : "Add"}
            </Button>
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

export default KoiManagement;
