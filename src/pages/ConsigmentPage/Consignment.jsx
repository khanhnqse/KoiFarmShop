import { useState } from "react";
import { Input, Button, Select, Typography, Upload, message } from "antd";
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
    careInstructions: "",
    userType: "individual",
    consignmentType: "sale",
    price: "",
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
    if (!productInfo.title || !productInfo.description) {
      message.error("Vui lòng điền tất cả các trường cần thiết.");
      return;
    }

    console.log("Product Info Submitted:", productInfo);
    message.success("Thông tin sản phẩm đã được gửi thành công!");
  };

  return (
    <div
      className="consignment-background"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522567659205-ee20ba167aaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Thay đổi đường dẫn tới hình ảnh của bạn
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px", // Điều chỉnh khoảng cách theo nhu cầu
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
          Ký Gửi Bán Cá Koi
        </Title>
        <Upload className="upload-section" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Thêm ảnh/video</Button>
        </Upload>

        <div className="consignment-form">
          <Title level={4} className="section-title">
            Thông tin chi tiết
          </Title>

          <form className="form-grid">
            <div className="form-group">
              <Title level={5} className="input-label">
                Nguồn gốc xuất xứ
              </Title>
              <Input
                name="origin"
                placeholder="Nguồn gốc xuất xứ"
                value={productInfo.origin}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Giới tính
              </Title>
              <Select
                placeholder="Giới tính"
                value={productInfo.gender}
                onChange={(value) => handleSelectChange(value, "gender")}
                className="input-field"
                required
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Tuổi
              </Title>
              <Input
                name="age"
                placeholder="Tuổi"
                value={productInfo.age}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Kích thước (cm)
              </Title>
              <Input
                name="size"
                placeholder="Kích thước"
                value={productInfo.size}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Giống cá Koi
              </Title>
              <Input
                name="breed"
                placeholder="Giống"
                value={productInfo.breed}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <Title level={4} className="section-title">
              Tiêu đề tin đăng và mô tả chi tiết
            </Title>

            <div className="form-group">
              <Title level={5} className="input-label">
                Tiêu đề tin đăng
              </Title>
              <Input
                name="title"
                placeholder="Tiêu đề tin đăng"
                value={productInfo.title}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <Title level={5} className="input-label">
                Mô tả chi tiết
              </Title>
              <Input.TextArea
                name="description"
                placeholder="Mô tả chi tiết về cá Koi"
                value={productInfo.description}
                onChange={handleInputChange}
                className="input-field"
                rows={4}
                required
              />
            </div>

            <Title level={4} className="section-title">
              Thông tin người bán
            </Title>

            <div className="form-group">
              <Title level={5} className="input-label">
                Loại ký gửi
              </Title>
              <Select
                placeholder="Loại ký gửi"
                value={productInfo.consignmentType}
                onChange={(value) =>
                  handleSelectChange(value, "consignmentType")
                }
                className="input-field"
                required
              >
                <Option value="sale">Bán</Option>
                <Option value="care">Chăm sóc</Option>
              </Select>
            </div>

            {productInfo.consignmentType === "sale" && (
              <div className="form-group">
                <Title level={5} className="input-label">
                  Giá bán mong muốn (VNĐ)
                </Title>
                <Input
                  name="price"
                  placeholder="Giá bán mong muốn"
                  value={productInfo.price}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            )}

            <Button
              type="primary"
              onClick={handleSubmit}
              className="submit-btn"
            >
              Đăng sản phẩm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consignment;
