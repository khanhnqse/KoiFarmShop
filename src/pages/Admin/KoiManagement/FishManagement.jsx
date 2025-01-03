import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Upload,
  Image,
  Select,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { detailColumns, generalColumns } from "../../../constant/menu-data";
import uploadFile from "../../../utils/file";
import {
  deleteFish,
  fetchFishData,
  fetchKoiTypeData,
  saveFish,
} from "../../../services/sevice";

const { Option } = Select;

const FishManagement = () => {
  const [fishData, setFishData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentFish, setCurrentFish] = useState(null);
  const [koiTypes, setKoiTypes] = useState([]);
  const [form] = Form.useForm();
  const [fileListKoi, setFileListKoi] = useState([]);
  const [fileListCertificate, setFileListCertificate] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKoiId, setSearchKoiId] = useState("");

  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    loadFishData();
    loadKoiTypes();
  }, []);

  const loadFishData = async () => {
    setLoading(true);
    const data = await fetchFishData();
    setFishData(data);
    setLoading(false);
  };

  const loadKoiTypes = async () => {
    setLoading(true);
    const data = await fetchKoiTypeData();
    setKoiTypes(data);
    setLoading(false);
  };

  const handleOpenModal = (fish = null) => {
    setIsUpdateMode(!!fish);
    setCurrentFish(fish);
    setIsModalVisible(true);
    if (fish) {
      form.setFieldsValue(fish);
      if (fish.imageKoi) {
        setFileListKoi([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: fish.imageKoi,
          },
        ]);
      } else {
        setFileListKoi([]);
      }
      if (fish.imageCertificate) {
        setFileListCertificate([
          {
            uid: "-1",
            name: "certificate.png",
            status: "done",
            url: fish.imageCertificate,
          },
        ]);
      } else {
        setFileListCertificate([]);
      }
    } else {
      form.resetFields();
      setFileListKoi([]);
      setFileListCertificate([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentFish(null);
    form.resetFields();
    setFileListKoi([]);
    setFileListCertificate([]);
  };

  const handleSaveFish = async (values) => {
    if (fileListKoi.length > 0) {
      const file = fileListKoi[0];
      if (!file.url) {
        const url = await uploadFile(file.originFileObj);
        values.imageKoi = url;
      } else {
        values.imageKoi = file.url;
      }
    }
    if (fileListCertificate.length > 0) {
      const file = fileListCertificate[0];
      if (!file.url) {
        const url = await uploadFile(file.originFileObj);
        values.imageCertificate = url;
      } else {
        values.imageCertificate = file.url;
      }
    }

    if (isUpdateMode && currentFish) {
      values.koiId = currentFish.koiId;
    }

    console.log("Fish data to be saved:", values);

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

  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      onSuccess(url);
    } catch (error) {
      onError(error);
    }
  };

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

  const filteredFishData = fishData.filter((fish) => {
    return (
      (searchQuery
        ? fish.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true) &&
      (searchKoiId ? fish.koiId.toString().includes(searchKoiId) : true) &&
      (statusFilter ? fish.status === statusFilter : true)
    );
  });

  return (
    <div>
      <Typography.Title level={2}>Koi Management</Typography.Title>
      <div className="justify-between mb-4 ">
        <Input
          className="mr-4"
          placeholder="Search by Koi ID"
          value={searchKoiId}
          onChange={(e) => setSearchKoiId(e.target.value)}
          style={{ width: "30%" }}
        />
        <Input
          className="mr-4"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "30%" }}
        />

        <Select
          placeholder="Filter by Status"
          onChange={(value) => setStatusFilter(value)}
          style={{ width: "30%" }}
          allowClear
        >
          <Option value="available">Available</Option>
          <Option value="unavailable">Unavailable</Option>
        </Select>
      </div>
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        <PlusOutlined /> Add Koi
      </Button>
      <Table
        columns={generalColumns(handleOpenModal, handleDeleteFish)}
        dataSource={filteredFishData}
        loading={loading}
        rowKey="koiId"
        scroll={{ x: 2000, y: 600 }}
        title={() => "General Information"}
      />
      <Table
        columns={detailColumns}
        dataSource={filteredFishData}
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
                name="koiTypeId"
                label="Koi Type ID"
                rules={[
                  { required: true, message: "Please select the koi type ID!" },
                ]}
              >
                <Select>
                  {koiTypes.map((type) => (
                    <Select.Option key={type.koiTypeId} value={type.koiTypeId}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input the name!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const selectedType = koiTypes.find(
                        (type) => type.koiTypeId === getFieldValue("koiTypeId")
                      );
                      if (selectedType && value !== selectedType.name) {
                        return Promise.reject(
                          new Error(
                            `Name should be the same as ${selectedType.name}`
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
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
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Bisexual">Bisexual</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  { required: true, message: "Please input the age!" },
                  {
                    type: "number",
                    min: 1,
                    max: 100,
                    message: "Age must be a positive integer!",
                    transform: (value) => Number(value),
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Age must be a positive integer!",
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
                name="size"
                label="Size"
                rules={[
                  { required: true, message: "Please input the size!" },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject("Size must be a valid number!");
                      }
                      if (value < 0) {
                        return Promise.reject("Size cannot be negative!");
                      }
                      if (value > 1000) {
                        return Promise.reject("Size cannot be more than 1000!");
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
                name="breed"
                label="Breed"
                rules={[{ required: true, message: "Please input the breed!" }]}
              >
                <Select>
                  <Select.Option value="F1 hybrid">F1 hybrid</Select.Option>
                  <Select.Option value="purebred">Purebred</Select.Option>
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
                  {
                    validator: (_, value) => {
                      const regex = /^[A-Za-z\s]+$/;
                      if (!value || regex.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Personality cannot contain numbers or special characters!"
                      );
                    },
                  },
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
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject(
                          "Feeding amount must be a valid number!"
                        );
                      }
                      if (value < 0) {
                        return Promise.reject(
                          "Feeding amount cannot be negative!"
                        );
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
                name="filterRate"
                label="Filter Rate"
                rules={[
                  { required: true, message: "Please input the filter rate!" },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject(
                          "Filter rate must be a valid number!"
                        );
                      }
                      if (value < 0) {
                        return Promise.reject(
                          "Filter rate cannot be negative!"
                        );
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
                name="healthStatus"
                label="Health Status"
                rules={[
                  {
                    required: true,
                    message: "Please input the Health Status!",
                  },
                  {
                    validator: (_, value) => {
                      const regex = /^[A-Za-z\s]+$/;
                      if (!value || regex.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Health Status cannot contain numbers or special characters!"
                      );
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
                name="awardCertificates"
                label="Award Certificates"
                rules={[
                  {
                    required: true,
                    message: "Please input the award certificates!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
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
                rules={[
                  { required: true, message: "Please input the price!" },
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantityInStock"
                label="Quantity In Stock"
                rules={[
                  { required: true, message: "Please input the quantity!" },
                  {
                    validator: (_, value) => {
                      if (
                        value === undefined ||
                        value === null ||
                        isNaN(value)
                      ) {
                        return Promise.reject(
                          "Quantity in stock must be a valid number!"
                        );
                      }
                      if (value < 1) {
                        return Promise.reject(
                          "Quantity in stock should be more than 1!"
                        );
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
          <Row gutter={16}></Row>
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
                  customRequest={customUpload}
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
                  customRequest={customUpload}
                >
                  {fileListCertificate.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="detailDescription"
                label="Detail Description"
                rules={[
                  {
                    required: true,
                    message: "Please input the detail description!",
                  },
                ]}
              >
                <Input.TextArea />
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
