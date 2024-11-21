/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  message,
  DatePicker,
  Form,
  Spin,
} from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import UploadImage from "../../components/UploadImage/UploadImage";
import "./Consignment.css";

const { Option } = Select;
const { Title } = Typography;

const ConsignmentInside = () => {
  const { token, user } = useAuth();
  const [productInfo, setProductInfo] = useState({
    koiID: "",
    koiTypeID: "",
    consignmentType: "",
    consignmentDateTo: "",
    consignmentTitle: "",
    consignmentDetail: "",
    consignmentPrice: "",
  });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [koiOptions, setKoiOptions] = useState([]);
  const [koiTypeOptions, setKoiTypeOptions] = useState([]);
  const [selectedKoiName, setSelectedKoiName] = useState("");

  useEffect(() => {
    if (user) {
      fetchKoiOptions(user.userId);
      fetchKoiTypeOptions();
    }
  }, [user]);

  const fetchKoiOptions = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/PurchaseHistory/getPurchaseHistoryByUserID/${userId}`
      );
      const koiDetails = response.data.flatMap((order) =>
        order.koiDetails.map((koi) => ({
          ...koi,
          orderId: order.orderId,
        }))
      );
      setKoiOptions(koiDetails);
    } catch (error) {
      console.error("Failed to fetch koi options:", error);
      message.error("Failed to fetch koi options.");
    } finally {
      setLoading(false);
    }
  };

  const fetchKoiTypeOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/Koi/koitypes`
      );
      setKoiTypeOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch koi type options:", error);
      message.error("Failed to fetch koi type options.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setProductInfo((prev) => ({
      ...prev,
      consignmentDateTo: dateString,
    }));
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      if (fileList.length === 0) {
        message.error("Please upload the consignment contract.");
        return;
      }
    } catch (error) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("koiID", productInfo.koiID);
    formData.append("koiTypeID", productInfo.koiTypeID);
    formData.append("consignmentType", productInfo.consignmentType);
    formData.append("consignmentTitle", productInfo.consignmentTitle);
    formData.append("consignmentDetail", productInfo.consignmentDetail);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      formData.append("userImage", file);
    }

    let url;
    if (productInfo.consignmentType === "online") {
      formData.append("consignmentPrice", productInfo.consignmentPrice);
      url = `https://localhost:7285/api/Consignment/create-consignment-order-inside-shop?koiTypeId=${productInfo.koiTypeID}&koiId=${productInfo.koiID}&consignmentType=${productInfo.consignmentType}&consignmentPrice=${productInfo.consignmentPrice}&consignmentTitle=${productInfo.consignmentTitle}&consignmentDetail=${productInfo.consignmentDetail}`;
    } else {
      formData.append("consignmentDateTo", productInfo.consignmentDateTo);
      url = `https://localhost:7285/api/Consignment/create-consignment-take-care-inside-shop?koiTypeId=${productInfo.koiTypeID}&koiId=${productInfo.koiID}&consignmentType=${productInfo.consignmentType}&consignmentDateTo=${productInfo.consignmentDateTo}&consignmentTitle=${productInfo.consignmentTitle}&consignmentDetail=${productInfo.consignmentDetail}`;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product Info Submitted:", response.data);
      message.success("Product information submitted successfully!");
      // Reset form
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Error submitting product info:", error);
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
                label="Select your Koi"
                name="koiID"
                rules={[
                  { required: true, message: "Please select the Koi ID!" },
                ]}
              >
                <Select
                  placeholder="Select Koi ID"
                  value={productInfo.koiID}
                  onChange={(value) => {
                    handleSelectChange(value, "koiID");
                    const selectedKoi = koiOptions.find(
                      (koi) => koi.koiId === value
                    );
                    if (selectedKoi) {
                      setSelectedKoiName(selectedKoi.name);
                    }
                  }}
                  className="input-field"
                >
                  {koiOptions.map((koi) => (
                    <Option
                      key={`${koi.orderId}-${koi.koiId}`}
                      value={koi.koiId}
                    >
                      Order {koi.orderId} - Koi ID {koi.koiId} - {koi.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Koi Type"
                name="koiTypeID"
                rules={[
                  { required: true, message: "Please select the Koi Type!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const selectedType = koiTypeOptions.find(
                        (type) => type.koiTypeId === value
                      );
                      if (
                        selectedType &&
                        selectedType.name !== selectedKoiName
                      ) {
                        return Promise.reject(
                          new Error(
                            `Koi Type name should be the same as ${selectedKoiName}`
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Select
                  placeholder="Select Koi Type"
                  value={productInfo.koiTypeID}
                  onChange={(value) => handleSelectChange(value, "koiTypeID")}
                  className="input-field"
                >
                  {koiTypeOptions.map((type) => (
                    <Option key={type.koiTypeId} value={type.koiTypeId}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Consignment Type"
                name="consignmentType"
                rules={[
                  {
                    required: true,
                    message: "Please select the consignment type!",
                  },
                ]}
              >
                <Select
                  placeholder="Consignment Type"
                  value={productInfo.consignmentType}
                  onChange={(value) =>
                    handleSelectChange(value, "consignmentType")
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
                  ]}
                >
                  <Input
                    name="consignmentPrice"
                    placeholder="Consignment Price"
                    value={productInfo.consignmentPrice}
                    onChange={handleInputChange}
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
                    placeholder="Consignment Date To"
                    onChange={handleDateChange}
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
                  placeholder="Consignment Title"
                  value={productInfo.consignmentTitle}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </Form.Item>

              <Form.Item
                label="Consignment Contract"
                name="consignmentDetail"
                rules={[
                  {
                    validator: (_, value) =>
                      fileList.length > 0
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Please upload the consignment contract!")
                          ),
                  },
                ]}
              >
                <UploadImage
                  fileList={fileList}
                  setFileList={setFileList}
                  setUrl={(url) =>
                    handleInputChange({
                      target: { name: "consignmentDetail", value: url },
                    })
                  }
                  maxCount={1}
                  accept=".docx"
                />
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
    </div>
  );
};

export default ConsignmentInside;
