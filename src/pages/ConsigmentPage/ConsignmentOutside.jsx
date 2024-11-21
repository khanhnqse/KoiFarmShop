/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Form,
  Spin,
  Input,
  Select,
  DatePicker,
  message,
  Image,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import UploadImage from "./../../components/UploadImage/UploadImage";

import "./Consignment.css";

const { Title } = Typography;
const { Option } = Select;

const ConsignmentOutside = () => {
  const { token } = useAuth();
  const [productInfo, setProductInfo] = useState({
    koiTypeID: "",
    name: "",
    origin: "",
    gender: "",
    age: "",
    size: "",
    breed: "",
    personality: "",
    feedingAmount: "",
    filterRate: "",
    healthStatus: "",
    awardCertificates: "",
    description: "",
    detailDescription: "",
    consignmentType: "",
    consignmentDateTo: "",
    consignmentTitle: "",
    consignmentDetail: "",
    consignmentPrice: "",
    imageKoi: "",
    imageCertificate: "",
    additionImage: "",
  });
  const [imageKoi, setImageKoi] = useState([]);
  const [imageCertificate, setImageCertificate] = useState([]);
  const [additionImage, setAdditionImage] = useState([]);
  const [consignmentDetailFile, setConsignmentDetailFile] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [koiTypeOptions, setKoiTypeOptions] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchKoiTypeOptions();
  }, []);

  const fetchKoiTypeOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/Koi/koitypes`
      );
      setKoiTypeOptions(
        response.data.map((type) => ({
          value: type.koiTypeId,
          label: type.name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch koi type options:", error);
      message.error("Failed to fetch koi type options.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value, name) => {
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(productInfo).forEach((key) => {
      formData.append(key, productInfo[key]);
    });

    let url;
    let payload;
    if (productInfo.consignmentType === "online") {
      url = `https://localhost:7285/api/Consignment/create-consignment-order-from-outside-shop`;
      payload = {
        koiTypeId: productInfo.koiTypeID,
        name: productInfo.name,
        origin: productInfo.origin,
        gender: productInfo.gender,
        age: productInfo.age,
        size: productInfo.size,
        breed: productInfo.breed,
        personality: productInfo.personality,
        feedingAmount: productInfo.feedingAmount,
        filterRate: productInfo.filterRate,
        healthStatus: productInfo.healthStatus,
        awardCertificates: productInfo.awardCertificates,
        description: productInfo.description,
        detailDescription: productInfo.detailDescription,
        imageKoi: productInfo.imageKoi,
        imageCertificate: productInfo.imageCertificate,
        additionImage: productInfo.additionImage,
        consignmentType: productInfo.consignmentType,
        consignmentPrice: productInfo.consignmentPrice,
        consignmentTitle: productInfo.consignmentTitle,
        consignmentDetail: productInfo.consignmentDetail,
      };
    } else {
      url = `https://localhost:7285/api/Consignment/create-consignment-take-care-outside-shop`;
      payload = {
        koiTypeId: productInfo.koiTypeID,
        name: productInfo.name,
        origin: productInfo.origin,
        gender: productInfo.gender,
        age: productInfo.age,
        size: productInfo.size,
        breed: productInfo.breed,
        personality: productInfo.personality,
        feedingAmount: productInfo.feedingAmount,
        filterRate: productInfo.filterRate,
        healthStatus: productInfo.healthStatus,
        awardCertificates: productInfo.awardCertificates,
        description: productInfo.description,
        detailDescription: productInfo.detailDescription,
        imageKoi: productInfo.imageKoi,
        imageCertificate: productInfo.imageCertificate,
        additionImage: productInfo.additionImage,
        consignmentType: productInfo.consignmentType,
        consignmentDateTo: productInfo.consignmentDateTo,
        consignmentTitle: productInfo.consignmentTitle,
        consignmentDetail: productInfo.consignmentDetail,
      };
    }

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      message.success("Product information submitted successfully!");
      form.resetFields();
      setImageKoi([]);
      setImageCertificate([]);
      setAdditionImage([]);
      setConsignmentDetailFile([]);
    } catch (error) {
      message.error("An error occurred while submitting product information.");
    }
  };

  return (
    <div
      className="consignment-background"
      style={{
        backgroundImage: "url('')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px",
      }}
    >
      <div
        className="consignment-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div className="consignment-form">
          <Title level={4} className="section-title">
            Detailed Information
          </Title>

          <Spin spinning={loading}>
            <Form form={form} layout="vertical" className="form-grid">
              <Form.Item
                label="Koi Type"
                name="koiTypeID"
                rules={[
                  { required: true, message: "Please select the Koi Type!" },
                ]}
              >
                <Select
                  placeholder="Select Koi Type"
                  value={productInfo.koiTypeID}
                  onChange={(value) => {
                    handleInputChange(value, "koiTypeID");
                    // Update the name to match the selected Koi Type's label
                    const selectedKoiType = koiTypeOptions.find(
                      (option) => option.value === value
                    );
                    handleInputChange(
                      selectedKoiType ? selectedKoiType.label : "",
                      "name"
                    );
                  }}
                  className="input-field"
                >
                  {koiTypeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input the name!" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Can only contain letters and spaces!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const selectedKoiTypeLabel = koiTypeOptions.find(
                        (option) => option.value === getFieldValue("koiTypeID")
                      )?.label;
                      if (value && value !== selectedKoiTypeLabel) {
                        return Promise.reject(
                          new Error(
                            `The name must match the selected Koi Type: ${selectedKoiTypeLabel}`
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  name="name"
                  value={productInfo.name}
                  onChange={(e) => handleInputChange(e.target.value, "name")}
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Origin"
                name="origin"
                rules={[
                  { required: true, message: "Please input the origin!" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Can only contain letters and spaces!",
                  },
                ]}
              >
                <Input
                  name="origin"
                  value={productInfo.origin}
                  onChange={(e) => handleInputChange(e.target.value, "origin")}
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select the gender!" },
                ]}
              >
                <Select
                  placeholder="Select Gender"
                  value={productInfo.gender}
                  onChange={(value) => handleInputChange(value, "gender")}
                  className="input-field"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Bisexual">Bisexual</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  { required: true, message: "Please input the age!" },
                  {
                    type: "number",
                    min: 0,
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
                <Input
                  name="age"
                  value={productInfo.age}
                  onChange={(e) => handleInputChange(e.target.value, "age")}
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Size (cm)"
                name="size"
                rules={[
                  { required: true, message: "Please input the size!" },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    message: "Size must be a positive integer!",
                    transform: (value) => Number(value),
                  },
                ]}
              >
                <Input
                  name="size"
                  value={productInfo.size}
                  onChange={(e) => handleInputChange(e.target.value, "size")}
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Breed"
                name="breed"
                rules={[{ required: true, message: "Please input the breed!" }]}
              >
                <Select
                  placeholder="Select Breed"
                  value={productInfo.breed}
                  onChange={(value) => handleInputChange(value, "breed")}
                  className="input-field"
                >
                  <Option value="F1 hybrid">F1 hybrid</Option>
                  <Option value="purebred">purebred</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Personality"
                name="personality"
                rules={[
                  { required: true, message: "Please input the personality!" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Personality can only contain letters and spaces!",
                  },
                ]}
              >
                <Input
                  name="personality"
                  value={productInfo.personality}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "personality")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Feeding Amount"
                name="feedingAmount"
                rules={[
                  {
                    required: true,
                    message: "Please input the feeding amount!",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Feeding Amount must be a positive integer!",
                    transform: (value) => Number(value),
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Feeding Amount must be a positive integer!",
                  },
                ]}
              >
                <Input
                  name="feedingAmount"
                  value={productInfo.feedingAmount}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "feedingAmount")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Filter Rate"
                name="filterRate"
                rules={[
                  { required: true, message: "Please input the filter rate!" },
                  {
                    type: "number",
                    min: 0,
                    message: "Filter Rate must be a positive integer!",
                    transform: (value) => Number(value),
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Filter Rate must be a positive integer!",
                  },
                ]}
              >
                <Input
                  name="filterRate"
                  value={productInfo.filterRate}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "filterRate")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Health Status"
                name="healthStatus"
                rules={[
                  {
                    required: true,
                    message: "Please input the health status!",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Can only contain letters and spaces!",
                  },
                ]}
              >
                <Input
                  name="healthStatus"
                  value={productInfo.healthStatus}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "healthStatus")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Award Certificates"
                name="awardCertificates"
                rules={[
                  {
                    required: true,
                    message: "Please input the award certificates!",
                  },
                ]}
              >
                <Select
                  placeholder="Select awardCertificates"
                  value={productInfo.awardCertificates}
                  onChange={(value) =>
                    handleInputChange(value, "awardCertificates")
                  }
                  className="input-field"
                >
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input
                  name="description"
                  value={productInfo.description}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "description")
                  }
                  className="input-field"
                />
              </Form.Item>
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
                <Input
                  name="detailDescription"
                  value={productInfo.detailDescription}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "detailDescription")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                label="Consignment Type"
                name="consignmentType"
                rules={[
                  {
                    required: true,
                    message: "Please select the consignment type!",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Can only contain letters and spaces!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Consignment Type"
                  value={productInfo.consignmentType}
                  onChange={(value) =>
                    handleInputChange(value, "consignmentType")
                  }
                  className="input-field"
                >
                  <Option value="offline">Offline</Option>
                  <Option value="online">Online</Option>
                </Select>
              </Form.Item>
              {productInfo.consignmentType === "online" && (
                <Form.Item
                  label="Consignment Price"
                  name="consignmentPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please input the consignment price!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Price must be a positive integer!",
                      transform: (value) => Number(value),
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Price must be a positive integer!",
                    },
                  ]}
                >
                  <Input
                    name="consignmentPrice"
                    value={productInfo.consignmentPrice}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "consignmentPrice")
                    }
                    className="input-field"
                  />
                </Form.Item>
              )}
              {productInfo.consignmentType !== "online" && (
                <Form.Item
                  label="Consignment Date To"
                  name="consignmentDateTo"
                  rules={[
                    {
                      required: true,
                      message: "Please select the consignment date!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Select Consignment Date To"
                    value={productInfo.consignmentDateTo}
                    onChange={(date, dateString) =>
                      handleInputChange(dateString, "consignmentDateTo")
                    }
                    className="input-field"
                    disabledDate={(current) => {
                      const today = new Date();
                      return (
                        current &&
                        (current < today.setHours(0, 0, 0, 0) ||
                          current < today.setDate(today.getDate() + 8))
                      );
                    }}
                  />
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
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Can only contain letters and spaces!",
                  },
                ]}
              >
                <Input
                  name="consignmentTitle"
                  value={productInfo.consignmentTitle}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "consignmentTitle")
                  }
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input the consignment title!",
                  },
                ]}
                label="Consignment Contract"
                name="consignmentDetail"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <UploadImage
                      fileList={consignmentDetailFile}
                      setFileList={setConsignmentDetailFile}
                      setUrl={(url) =>
                        handleInputChange(url, "consignmentDetail")
                      }
                      maxCount={1}
                      accept=".docx"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadImage
                      label="Image Koi"
                      fileList={imageKoi}
                      setFileList={setImageKoi}
                      setUrl={(url) => handleInputChange(url, "imageKoi")}
                      maxCount={1}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <UploadImage
                      label="Image Certificate"
                      fileList={imageCertificate}
                      setFileList={setImageCertificate}
                      setUrl={(url) =>
                        handleInputChange(url, "imageCertificate")
                      }
                      maxCount={1}
                    />
                  </Col>
                  <Col span={12}>
                    <UploadImage
                      label="Additional Image"
                      fileList={additionImage}
                      setFileList={setAdditionImage}
                      setUrl={(url) => handleInputChange(url, "additionImage")}
                      maxCount={1}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className="submit-btn"
                >
                  Submit Product
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
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

export default ConsignmentOutside;
