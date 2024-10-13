import { useState } from "react";
import { Input, Button, Select, Typography, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Consignment.css";

const { Option } = Select;
const { Title } = Typography;

const Consignment = () => {
  const [productInfo, setProductInfo] = useState({
    origin: "",
    gender: "",
    age: "",
    size: "",
    breed: "",
    title: "",
    description: "",
    userType: "individual",
  });

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

  const handleSubmit = () => {
    console.log("Product Info Submitted:", productInfo);
  };

  return (
    <div className="consignment-container">
      <Upload className="upload-section">
        <Button icon={<UploadOutlined />}>Add Photos/Videos</Button>
      </Upload>
      

      <div className="consignment-form">
        <Title level={4} className="section-title">
          Thông tin chi tiết
        </Title>

        <form>
          <Input
            name="origin"
            placeholder="Nguồn gốc xuất xứ"
            value={productInfo.origin}
            onChange={handleInputChange}
            className="input-field"
          />
          <Select
            placeholder="Giới tính"
            value={productInfo.gender}
            onChange={(value) => handleSelectChange(value, "gender")}
            className="input-field"
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Input
            name="age"
            placeholder="Tuổi"
            value={productInfo.age}
            onChange={handleInputChange}
            className="input-field"
          />
          <Input
            name="size"
            placeholder="Kích thước"
            value={productInfo.size}
            onChange={handleInputChange}
            className="input-field"
          />
          <Input
            name="breed"
            placeholder="Giống"
            value={productInfo.breed}
            onChange={handleInputChange}
            className="input-field"
          />

          <Title level={4} className="section-title">
            Tiêu đề tin đăng và mô tả chi tiết
          </Title>

          <Input
            name="title"
            placeholder="Tiêu đề tin đăng"
            value={productInfo.title}
            onChange={handleInputChange}
            className="input-field"
          />
          <Input.TextArea
            name="description"
            placeholder="Mô tả chi tiết"
            value={productInfo.description}
            onChange={handleInputChange}
            className="input-field"
          />

          <Title level={4} className="section-title">
            Thông tin người bán
          </Title>

          <Radio.Group
            onChange={(e) => handleSelectChange(e.target.value, "userType")}
            value={productInfo.userType}
            className="input-field"
          >
            <Radio value="individual">Cá nhân</Radio>
            <Radio value="professional">Bán chuyên</Radio>
          </Radio.Group>

          <Button type="primary" onClick={handleSubmit} className="submit-btn">
            Đăng sản phẩm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Consignment;