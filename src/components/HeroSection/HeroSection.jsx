import { Button, Typography } from "antd";
import "./HeroSection.css";
import { Link } from "react-router-dom";

import heroImg from "../../assets/home.jpg";
const { Title, Paragraph } = Typography;

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Title
        className=".east-sea-dokdo-regular"
        level={1}
        style={{ fontSize: "32px", color: "#fff" }}
      >
        Welcome to world of Koi
      </Title>
      <Paragraph
        className="east-sea-dokdo-regular"
        style={{ fontSize: "32px", color: "#fff" }}
      >
        Discover the beauty of koi fish
      </Paragraph>
      <Link to="/products">
        <Button type="primary" size="large">
          Shop Now
        </Button>
      </Link>
    </section>
  );
}

export default Hero;
