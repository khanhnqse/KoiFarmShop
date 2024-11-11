/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Typography, Form, Spin, Image, message } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import "./Consignment.css";
import FormField from "./../../components/FormField/FormField";
import UploadImage from "./../../components/UploadImage/UploadImage";

const { Title } = Typography;

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

  const handleUploadChange = async (info, setFileList, fieldName) => {
    setFileList(info.fileList);
    if (info.file.status === "done") {
      const url = info.file.response;
      setProductInfo((prev) => ({
        ...prev,
        [fieldName]: url,
      }));
    }
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
    if (productInfo.consignmentType === "online") {
      url = `https://localhost:7285/api/Consignment/create-consignment-order-from-outside-shop?koiTypeId=${productInfo.koiTypeID}&name=${productInfo.name}&origin=${productInfo.origin}&gender=${productInfo.gender}&age=${productInfo.age}&size=${productInfo.size}&breed=${productInfo.breed}&personality=${productInfo.personality}&feedingAmount=${productInfo.feedingAmount}&filterRate=${productInfo.filterRate}&healthStatus=${productInfo.healthStatus}&awardCertificates=${productInfo.awardCertificates}&description=${productInfo.description}&detailDescription=${productInfo.detailDescription}&imageKoi=${productInfo.imageKoi}&imageCertificate=${productInfo.imageCertificate}&additionImage=${productInfo.additionImage}&consignmentType=${productInfo.consignmentType}&consignmentPrice=${productInfo.consignmentPrice}&consignmentTitle=${productInfo.consignmentTitle}&consignmentDetail=${productInfo.consignmentDetail}`;
    } else {
      url = `https://localhost:7285/api/Consignment/create-consignment-take-care-outside-shop?koiTypeId=${productInfo.koiTypeID}&name=${productInfo.name}&origin=${productInfo.origin}&gender=${productInfo.gender}&age=${productInfo.age}&size=${productInfo.size}&breed=${productInfo.breed}&personality=${productInfo.personality}&feedingAmount=${productInfo.feedingAmount}&filterRate=${productInfo.filterRate}&healthStatus=${productInfo.healthStatus}&awardCertificates=${productInfo.awardCertificates}&description=${productInfo.description}&detailDescription=${productInfo.detailDescription}&imageKoi=${productInfo.imageKoi}&imageCertificate=${productInfo.imageCertificate}&additionImage=${productInfo.additionImage}&consignmentType=${productInfo.consignmentType}&consignmentDateTo=${productInfo.consignmentDateTo}&consignmentTitle=${productInfo.consignmentTitle}&consignmentDetail=${productInfo.consignmentDetail}`;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Product information submitted successfully!");
      form.resetFields();
      setImageKoi([]);
      setImageCertificate([]);
      setAdditionImage([]);
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
              <FormField
                label="Koi Type ID"
                name="koiTypeID"
                value={productInfo.koiTypeID}
                onChange={handleInputChange}
                type="select"
                options={koiTypeOptions}
                rules={[
                  { required: true, message: "Please select the Koi Type!" },
                ]}
              />
              <FormField
                label="Name"
                name="name"
                value={productInfo.name}
                onChange={handleInputChange}
                rules={[{ required: true, message: "Please input the name!" }]}
              />
              <FormField
                label="Origin"
                name="origin"
                value={productInfo.origin}
                onChange={handleInputChange}
                rules={[
                  { required: true, message: "Please input the origin!" },
                ]}
              />
              <FormField
                label="Gender"
                name="gender"
                value={productInfo.gender}
                onChange={handleInputChange}
                type="select"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                rules={[
                  { required: true, message: "Please select the gender!" },
                ]}
              />
              <FormField
                label="Age"
                name="age"
                value={productInfo.age}
                onChange={handleInputChange}
                rules={[{ required: true, message: "Please input the age!" }]}
              />
              <FormField
                label="Size"
                name="size"
                value={productInfo.size}
                onChange={handleInputChange}
                rules={[{ required: true, message: "Please input the size!" }]}
              />
              <FormField
                label="Breed"
                name="breed"
                value={productInfo.breed}
                onChange={handleInputChange}
                rules={[{ required: true, message: "Please input the breed!" }]}
              />
              <FormField
                label="Personality"
                name="personality"
                value={productInfo.personality}
                onChange={handleInputChange}
                rules={[
                  { required: true, message: "Please input the personality!" },
                ]}
              />
              <FormField
                label="Feeding Amount"
                name="feedingAmount"
                value={productInfo.feedingAmount}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the feeding amount!",
                  },
                ]}
              />
              <FormField
                label="Filter Rate"
                name="filterRate"
                value={productInfo.filterRate}
                onChange={handleInputChange}
                rules={[
                  { required: true, message: "Please input the filter rate!" },
                ]}
              />
              <FormField
                label="Health Status"
                name="healthStatus"
                value={productInfo.healthStatus}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the health status!",
                  },
                ]}
              />
              <FormField
                label="Award Certificates"
                name="awardCertificates"
                value={productInfo.awardCertificates}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the award certificates!",
                  },
                ]}
              />
              <FormField
                label="Description"
                name="description"
                value={productInfo.description}
                onChange={handleInputChange}
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              />
              <FormField
                label="Detail Description"
                name="detailDescription"
                value={productInfo.detailDescription}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the detail description!",
                  },
                ]}
              />
              <FormField
                label="Consignment Type"
                name="consignmentType"
                value={productInfo.consignmentType}
                onChange={handleInputChange}
                type="select"
                options={[
                  { value: "offline", label: "Offline" },
                  { value: "online", label: "Online" },
                ]}
                rules={[
                  {
                    required: true,
                    message: "Please select the consignment type!",
                  },
                ]}
              />
              {productInfo.consignmentType === "online" && (
                <FormField
                  label="Consignment Price"
                  name="consignmentPrice"
                  value={productInfo.consignmentPrice}
                  onChange={handleInputChange}
                  rules={[
                    {
                      required: true,
                      message: "Please input the consignment price!",
                    },
                  ]}
                />
              )}
              {productInfo.consignmentType !== "online" && (
                <FormField
                  label="Consignment Date To"
                  name="consignmentDateTo"
                  value={productInfo.consignmentDateTo}
                  onChange={handleInputChange}
                  type="date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the consignment date!",
                    },
                  ]}
                />
              )}
              <FormField
                label="Consignment Title"
                name="consignmentTitle"
                value={productInfo.consignmentTitle}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the consignment title!",
                  },
                ]}
              />
              <FormField
                label="Consignment Detail"
                name="consignmentDetail"
                value={productInfo.consignmentDetail}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Please input the consignment detail!",
                  },
                ]}
              />
              <UploadImage
                label="Image Koi"
                fileList={imageKoi}
                setFileList={setImageKoi}
                setUrl={(url) => handleInputChange(url, "imageKoi")}
                maxCount={1}
              />
              <UploadImage
                label="Image Certificate"
                fileList={imageCertificate}
                setFileList={setImageCertificate}
                setUrl={(url) => handleInputChange(url, "imageCertificate")}
                maxCount={1}
              />
              <UploadImage
                label="Additional Image"
                fileList={additionImage}
                setFileList={setAdditionImage}
                setUrl={(url) => handleInputChange(url, "additionImage")}
                maxCount={1}
              />
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
