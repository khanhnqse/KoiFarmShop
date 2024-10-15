import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Col,
  Table,
  Typography,
  Upload,
  Tag,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";
import Popup from "../../../components/Popup/Popup";
// Import the custom Popup component

function KoiManagement() {
  const [kois, setKoi] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileListKoi, setFileListKoi] = useState([]);
  const [fileListCertificate, setFileListCertificate] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const api = "http://localhost:5090/api/Koi";
  const fetchKoi = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setKoi(response.data);
  };

  useEffect(() => {
    fetchKoi();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "koiId",
      key: "koiId",
      sorter: {
        compare: (a, b) => a.koiId - b.koiId,
      },
      defaultSortOrder: "ascend",
      fixed: "left",
    },
    {
      title: "Image",
      dataIndex: "imageKoi",
      key: "imageKoi",
      render: (imageKoi) => {
        return <Image src={imageKoi} width={50} height={50} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Personality",
      dataIndex: "personality",
      key: "personality",
    },
    {
      title: "Feeding Amount",
      dataIndex: "feedingAmount",
      key: "feedingAmount",
    },
    {
      title: "Filter Rate",
      dataIndex: "filterRate",
      key: "filterRate",
    },
    {
      title: "Health Status",
      dataIndex: "healthStatus",
      key: "healthStatus",
    },
    {
      title: "Award Certificates",
      dataIndex: "awardCertificates",
      key: "awardCertificates",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag style={{ color: status === "available" ? "green" : "red" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image Certificate",
      dataIndex: "imageCertificate",
      key: "imageCertificate",
      render: (imageCertificate) => {
        return <Image src={imageCertificate} width={50} height={50} />;
      },
    },
    {
      title: "Action",
      dataIndex: "koiId",
      key: "koiId",
      fixed: "right",
      render: (koiId, record) => {
        return (
          <>
            <Popup
              title="Delete"
              description="Are you sure to delete this koi?"
              onConfirm={() => handleDeleteKoi(koiId)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popup>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={() => handleOpenUpdateModal(record)}
            >
              Update
            </Button>
          </>
        );
      },
    },
  ];
  const handleOpenUpdateModal = (koi) => {
    setSelectedKoi(koi);
    setUpdateModalOpen(true);
    form.setFieldsValue(koi); // Set form values to the selected koi's details
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSubmitKoi = async (koi) => {
    if (fileListKoi.length > 0) {
      const file = fileListKoi[0];
      console.log("file", file);
      const url = await uploadFile(file.originFileObj);
      console.log("url", url);
      koi.imageKoi = url;
    }
    if (fileListCertificate.length > 0) {
      const file = fileListCertificate[0];
      console.log("file", file);
      const url = await uploadFile(file.originFileObj);
      console.log("url", url);
      koi.imageCertificate = url;
    }
    console.log("koiData", koi);

    try {
      setSubmitting(true);
      const response = await axios.post(api, koi);

      message.success("Create koi successfully");

      setOpenModal(false);
      fetchKoi();
      form.resetFields();
      console.log("data", response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteKoi = async (koiId) => {
    try {
      await axios.delete(`${api}/${koiId}`);
      message.success("Delete koi successfully");
      fetchKoi();
    } catch (error) {
      message.error("Delete koi failed");
      console.error("Delete koi error:", error);
    }
    console.log("koi", koiId);
  };

  const handleUpdateKoi = async (koi) => {
    if (fileListKoi.length > 0) {
      const file = fileListKoi[0];
      const url = await uploadFile(file.originFileObj);
      koi.imageKoi = url;
    }
    if (fileListCertificate.length > 0) {
      const file = fileListCertificate[0];
      const url = await uploadFile(file.originFileObj);
      koi.imageCertificate = url;
    }

    try {
      setSubmitting(true);
      await axios.put(`${api}/${selectedKoi.koiId}`, koi);
      message.success("Update koi successfully");
      setUpdateModalOpen(false);
      fetchKoi();
      form.resetFields();
    } catch (error) {
      console.error("Update koi error:", error);
      message.error("Update koi failed");
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div>
      <Typography.Title level={2}>Koi Management</Typography.Title>
      <Button onClick={handleOpenModal}>
        <PlusOutlined /> Create new Koi
      </Button>
      <Table columns={columns} dataSource={kois} scroll={{ x: 1500, y: 450 }} />
      <Modal
        confirmLoading={submitting}
        title="Update Koi"
        open={updateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form onFinish={handleUpdateKoi} form={form} layout="vertical">
          {/* Form fields same as in the create modal */}
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="koiId"
                name="koiId"
                rules={[
                  {
                    required: true,
                    message: "Please input koi type",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Type ID must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
              <FormItem
                label="Type of Koi"
                name="koiTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please input koi type",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Type ID must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input koi name",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Origin"
                name="origin"
                rules={[
                  {
                    required: true,
                    message: "Please input koi origin",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input koi gender",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="male" />
                  <Select.Option value="female" />
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input koi age",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Age must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Size"
                name="size"
                rules={[
                  {
                    required: true,
                    message: "Please input koi size",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Size must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Breed"
                name="breed"
                rules={[
                  {
                    required: true,
                    message: "Please input koi breed",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="F1 hybrid" />
                  <Select.Option value="Purebred" />
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Personality"
                name="personality"
                rules={[
                  {
                    required: true,
                    message: "Please input koi personality",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Feeding Amount"
                name="feedingAmount"
                rules={[
                  {
                    required: true,
                    message: "Please input feeding amount",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Feeding amount must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Filter Rate"
                name="filterRate"
                rules={[
                  {
                    required: true,
                    message: "Please input filter rate",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Filter rate must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Health Status"
                name="healthStatus"
                rules={[
                  {
                    required: true,
                    message: "Please input health status",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Award Certificates"
                name="awardCertificates"
                rules={[
                  {
                    required: true,
                    message: "Please input award certificates",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please input status",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="available" label="Available" />
                  <Select.Option value="unavailable" />
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Price must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Image Koi" name="imageKoi">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileListKoi}
                  onPreview={handlePreview}
                  onChange={handleChangeKoi}
                >
                  {fileListKoi.length >= 8 ? null : uploadButton}
                </Upload>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Image Certificate" name="imageCertificate">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileListCertificate}
                  onPreview={handlePreview}
                  onChange={handleChangeCertificate}
                >
                  {fileListCertificate.length >= 8 ? null : uploadButton}
                </Upload>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        confirmLoading={submitting}
        title="Create new Koi"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form onFinish={handleSubmitKoi} form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Type of Koi"
                name="koiTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please input koi type",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Type ID must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input koi name",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Origin"
                name="origin"
                rules={[
                  {
                    required: true,
                    message: "Please input koi origin",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input koi gender",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="male" />
                  <Select.Option value="female" />
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input koi age",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Age must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Size"
                name="size"
                rules={[
                  {
                    required: true,
                    message: "Please input koi size",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Size must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Breed"
                name="breed"
                rules={[
                  {
                    required: true,
                    message: "Please input koi breed",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Purebred" />
                  <Select.Option value="F1 hybrid" />
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Personality"
                name="personality"
                rules={[
                  {
                    required: true,
                    message: "Please input koi personality",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Feeding Amount"
                name="feedingAmount"
                rules={[
                  {
                    required: true,
                    message: "Please input feeding amount",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Feeding amount must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Filter Rate"
                name="filterRate"
                rules={[
                  {
                    required: true,
                    message: "Please input filter rate",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Filter rate must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Health Status"
                name="healthStatus"
                rules={[
                  {
                    required: true,
                    message: "Please input health status",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Award Certificates"
                name="awardCertificates"
                rules={[
                  {
                    required: true,
                    message: "Please input award certificates",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please input status",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Available" />
                  <Select.Option value="Unavailable" />
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Price must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Image Koi" name="imageKoi">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileListKoi}
                  onPreview={handlePreview}
                  onChange={handleChangeKoi}
                >
                  {fileListKoi.length >= 8 ? null : uploadButton}
                </Upload>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Image Certificate" name="imageCertificate">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileListCertificate}
                  onPreview={handlePreview}
                  onChange={handleChangeCertificate}
                >
                  {fileListCertificate.length >= 8 ? null : uploadButton}
                </Upload>
              </FormItem>
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
}

export default KoiManagement;
