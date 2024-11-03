import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  Upload,
  message,
  DatePicker,
  Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./Consignment.css";

const { Option } = Select;
const { Title } = Typography;

const Consignment = () => {
  const { token } = useAuth();
  const location = useLocation();
  const [productInfo, setProductInfo] = useState({
    koiID: "",
    consignmentType: "",
    consignmentPrice: "",
    consignmentDateTo: "",
    consignmentTitle: "",
    consignmentDetail: "",
  });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (location.state?.koiId) {
      console.log("koiId from location state:", location.state.koiId); // Log koiId
      setProductInfo((prev) => ({
        ...prev,
        koiID: location.state.koiId,
      }));
      form.setFieldsValue({ koiID: location.state.koiId });
    }
  }, [location.state, form]);

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

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("koiID", productInfo.koiID);
    formData.append("consignmentType", productInfo.consignmentType);
    formData.append("consignmentPrice", productInfo.consignmentPrice);
    formData.append("consignmentDateTo", productInfo.consignmentDateTo);
    formData.append("consignmentTitle", productInfo.consignmentTitle);
    formData.append("consignmentDetail", productInfo.consignmentDetail);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      formData.append("userImage", file);
    }

    const url = `https://localhost:7285/api/Consignment/create-consignmentCustomer?koiID=${productInfo.koiID}&consignmentType=${productInfo.consignmentType}&consignmentPrice=${productInfo.consignmentPrice}&consignmentDateTo=${productInfo.consignmentDateTo}&consignmentTitle=${productInfo.consignmentTitle}&consignmentDetail=${productInfo.consignmentDetail}`;

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
        backgroundImage: "url('')", // Change the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px", // Adjust the padding as needed
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
        <Title level={3} className="form-title">
          Consignment Koi
        </Title>
        <Upload
          className="upload-section"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleUploadChange}
        >
          <Button icon={<UploadOutlined />}>Add Image/Video</Button>
        </Upload>

        <div className="consignment-form">
          <Title level={4} className="section-title">
            Detailed Information
          </Title>

          <div className="mt-4 text-right">
            <Button
              type="default"
              onClick={() =>
                window.open(
                  "https://docs.google.com/document/d/1xdbrSZMbdxcW5i8LMrqzJNXJ_8CrKdv9XobRaIeVWwY/edit?usp=sharing",
                  "_blank"
                )
              }
            >
              Consignment agreement
            </Button>
          </div>

          <Form form={form} layout="vertical" className="form-grid">
            <Form.Item
              label="Koi ID"
              name="koiID"
              rules={[{ required: true, message: "Please input the Koi ID!" }]}
            >
              <Input
                name="koiID"
                placeholder="Koi ID"
                value={productInfo.koiID}
                readOnly
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
                <Option value="online">Online</Option>
                <Option value="offline">Offline</Option>
              </Select>
            </Form.Item>

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
              />
            </Form.Item>

            <Form.Item
              label="Consignment Title"
              name="consignmentTitle"
              rules={[
                {
                  required: true,
                  message: "Please input the consignment title!",
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
              label="Consignment Detail"
              name="consignmentDetail"
              rules={[
                {
                  type: "url",
                  required: true,
                  message:
                    "Please input a valid URL for the consignment contract!",
                },
              ]}
            >
              <Input
                name="consignmentDetail"
                placeholder="Consignment Detail"
                value={productInfo.consignmentDetail}
                onChange={handleInputChange}
                className="input-field"
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
        </div>
      </div>
    </div>
  );
};

export default Consignment;
