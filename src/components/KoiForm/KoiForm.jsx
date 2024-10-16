/* eslint-disable react/prop-types */
import { Form, Input, InputNumber, Row, Col, Upload, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { PlusOutlined } from "@ant-design/icons";

const KoiForm = ({
  form,
  fileListKoi,
  fileListCertificate,
  handleChangeKoi,
  handleChangeCertificate,
  handlePreview,
}) => {
  const uploadButton = (
    <Button
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
    </Button>
  );

  return (
    <Form form={form} layout="vertical">
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
            <Input />
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
            <Input />
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
            <Input />
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
  );
};

export default KoiForm;
