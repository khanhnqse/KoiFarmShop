import { Button, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <div
      style={{
        height: "60vh",
        backgroundImage: `url("https://exclusivelykoi.co.uk/themes/exclusively-koi/assets/img/landing-page-intro.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ height: "100%", color: "#fff" }}
      >
        <Col xs={24} className="text-center ">
          <Title level={2}>
            <span className="text-white">ABOUT US</span>
          </Title>
          <Paragraph className="text-white">
            We offer a wide selection of high-quality koi, expert advice, and
            exceptional customer service.
          </Paragraph>
          <Link to="/products">
            <Button
              style={{
                backgroundColor: "black",
                border: "1px solid white",
                borderColor: "white",
              }}
              type="primary"
              size="large"
            >
              Browse Our Koi
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsSection;
