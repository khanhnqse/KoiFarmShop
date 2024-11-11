/* eslint-disable react/prop-types */
import { Form, Input, Select, DatePicker } from "antd";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "input",
  options = [],
  rules = [],
}) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select
            placeholder={`Select ${label}`}
            value={value}
            onChange={(value) => onChange(value, name)}
            className="input-field"
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            placeholder={`Select ${label}`}
            onChange={(date, dateString) => onChange(dateString, name)}
            className="input-field"
          />
        );
      default:
        return (
          <Input
            name={name}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value, name)}
            className="input-field"
          />
        );
    }
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {renderField()}
    </Form.Item>
  );
};

export default FormField;
