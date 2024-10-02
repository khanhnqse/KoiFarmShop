import { Button, Typography } from "antd";
import "./HeroSection.css";

const { Title, Paragraph } = Typography;

function Hero() {
  return (
    <section className="hero">
      {/* <img
        src={heroImg}
        alt="Hero Image"
      /> */}
      <Title level={1}>Welcome to world of Koi</Title>
      <Paragraph
        className="east-sea-dokdo-regular"
        style={{ fontSize: "32px", color: "#fff" }}
      >
        Discover the beauty of koi fish
      </Paragraph>
      <Button type="primary" size="large">
        Shop Now
      </Button>
    </section>
  );
}

export default Hero;
