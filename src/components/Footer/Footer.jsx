import { Button, Col, Input, Row, Typography, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";

import "./Footer.css";
import { Link } from "react-router-dom";

const { Paragraph, Title } = Typography;

export default function Footer() {
  return (
    <div className="footer-container">
      <Row justify="center" align="top" gutter={[32, 32]}>
        <Col xs={24} md={8} lg={6}>
          <img src={logo} alt="Logo" className="footer-logo" />
          <Paragraph className="footer-paragraph">
            Subscribe for more deals and updates
          </Paragraph>
          <Input
            placeholder="Enter your email"
            suffix={
              <Button className="send-button" type="primary">
                Send
              </Button>
            }
            className="email-input"
          />
        </Col>

        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title pl-7">
            Contact Us
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph className="footer-paragraph">
              <MailOutlined /> koike.officialvn@gmail.com
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <PhoneOutlined /> (+84) 000 000 0000
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <FacebookOutlined /> Koi Ke
            </Paragraph>
          </Typography>
        </Col>

        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title pl-7">
            Quick Links
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph className="footer-paragraph">
              <Link to="/" className="footer-link">
                Home
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="about-us" className="footer-link">
                About Us
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="products" className="footer-link">
                Products
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="contact-us" className="footer-link">
                Contact
              </Link>
            </Paragraph>
          </Typography>
        </Col>

        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title">
            Follow Us
          </Title>
          <Space size="large">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <LinkedinOutlined />
            </a>
          </Space>
        </Col>
      </Row>

      <Row justify="center" className="footer-bottom">
        <Col span={24}>
          <Paragraph style={{ color: "#fff" }}>
            © 2024 Koi Ke. All rights reserved.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
