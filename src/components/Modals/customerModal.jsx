import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import PropTypes from "prop-types";

const CustomerModal = ({
  visible,
  onCancel,
  onOk,
  form,
  submitting,
  title,
}) => (
  <Modal
    confirmLoading={submitting}
    title={title}
    open={visible}
    onCancel={onCancel}
    onOk={() => form.submit()}
  >
    <Form onFinish={onOk} form={form} layout="vertical">
      {/* Form fields go here */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Please input user name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email" }]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input phone number" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="staff">Staff</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="locked">Locked</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Address" name="address">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Register Date" name="registerDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Total Points"
            name="totalPoints"
            rules={[{ required: true, message: "Please input total points" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
);

// Add PropTypes for validation
CustomerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default CustomerModal;
