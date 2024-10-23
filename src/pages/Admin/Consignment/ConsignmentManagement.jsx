import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Col,
  Table,
  Typography,
  Upload,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";

function Consignment() {
  const [consignments, setConsignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [fileListConsignment, setFileListConsignment] = useState([]);
  const api = "https://localhost:7285/api/Consignment";

  const fetchConsignment = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setConsignments(response.data);
  };

  useEffect(() => {
    fetchConsignment();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "consignmentID",
      key: "consignmentID",
      sorter: {
        compare: (a, b) => a.consignmentID - b.consignmentID,
      },
      defaultSortOrder: "ascend",
      fixed: "left",
    },
    {
      title: "User Image",
      dataIndex: "userImage",
      key: "userImage",
      render: (userImage) => {
        return <img src={userImage} width={50} height={50} alt="user" />;
      },
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Consignment Type",
      dataIndex: "consignmentType",
      key: "consignmentType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Consignment Price",
      dataIndex: "consignmentPrice",
      key: "consignmentPrice",
    },
    {
      title: "Consignment Date",
      dataIndex: "consignmentDate",
      key: "consignmentDate",
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitConsignment = async (consignment) => {
    consignment.consignmentDate = new Date().toISOString();
    if (fileListConsignment.length > 0) {
      const file = fileListConsignment[0];
      const url = await uploadFile(file.originFileObj);
      consignment.imageConsignment = url;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(api, consignment);
      message.success("Created consignment successfully");
      setOpenModal(false);
      fetchConsignment();
      form.resetFields();
      console.log("data", response.data);
    } catch (error) {
      console.log("error", error);
      message.error("Failed to create consignment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeConsignmentImage = ({ fileList: newFileList }) =>
    setFileListConsignment(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Typography.Title level={2}>Consignment Management</Typography.Title>
      <Button onClick={handleOpenModal}>
        <PlusOutlined /> Create new Consignment
      </Button>
      <Table
        columns={columns}
        dataSource={consignments}
        scroll={{ x: 1500, y: 450 }}
      />
      <Modal
        confirmLoading={submitting}
        title="Create new Consignment"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form onFinish={handleSubmitConsignment} form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Type of Consignment"
                name="consignmentType"
                rules={[
                  { required: true, message: "Please input consignment type" },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Price"
                name="consignmentPrice"
                rules={[
                  { required: true, message: "Please input consignment price" },
                ]}
              >
                <InputNumber min={0} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="User ID"
                name="userID"
                rules={[{ required: true, message: "Please input User ID" }]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Select.Option value="available">Available</Select.Option>
                  <Select.Option value="unavailable">Unavailable</Select.Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="User Image" name="userImage">
                <Upload
                  action="https://localhost:7285/api/upload"
                  listType="picture-card"
                  fileList={fileListConsignment}
                  onChange={handleChangeConsignmentImage}
                >
                  {fileListConsignment.length >= 8 ? null : uploadButton}
                </Upload>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default Consignment;
