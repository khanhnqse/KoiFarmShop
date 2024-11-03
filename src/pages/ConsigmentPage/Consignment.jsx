import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  Upload,
  message,
  DatePicker,
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

  useEffect(() => {
    if (location.state?.koiId) {
      console.log("koiId from location state:", location.state.koiId); // Log koiId
      setProductInfo((prev) => ({
        ...prev,
        koiID: location.state.koiId,
      }));
    }
  }, [location.state]);

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
    if (!productInfo.consignmentTitle || !productInfo.consignmentDetail) {
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
      setProductInfo({
        koiID: "",
        consignmentType: "",
        consignmentPrice: "",
        consignmentDateTo: "",
        consignmentTitle: "",
        consignmentDetail: "",
      });
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

          <form className="form-grid">
            <div className="form-group">
              <Title level={5} className="input-label">
                Koi ID
              </Title>
              <Input
                name="koiID"
                placeholder="Koi ID"
                value={productInfo.koiID}
                readOnly
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Consignment Type
              </Title>
              <Select
                placeholder="Consignment Type"
                value={productInfo.consignmentType}
                onChange={(value) =>
                  handleSelectChange(value, "consignmentType")
                }
                className="input-field"
                required
              >
                <Option value="online">Online</Option>
                <Option value="offline">Offline</Option>
              </Select>
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Consignment Price
              </Title>
              <Input
                name="consignmentPrice"
                placeholder="Consignment Price"
                value={productInfo.consignmentPrice}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Consignment Date To
              </Title>
              <DatePicker
                placeholder="Consignment Date To"
                onChange={handleDateChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Consignment Title
              </Title>
              <Input
                name="consignmentTitle"
                placeholder="Consignment Title"
                value={productInfo.consignmentTitle}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Consignment Detail
              </Title>
              <Input
                rules={[
                  {
                    type: "url",
                    required: true,
                    message:
                      "Please input a valid URL for the consignment contract!",
                  },
                ]}
                name="consignmentDetail"
                placeholder="Consignment Detail"
                value={productInfo.consignmentDetail}
                onChange={handleInputChange}
                className="input-field"
                rows={4}
                required
              />
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
              className="submit-btn"
            >
              Submit Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consignment;
