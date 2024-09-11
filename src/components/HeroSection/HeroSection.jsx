import { Button, Typography } from "antd";
import "./HeroSection.css";

const { Title, Paragraph } = Typography;

function Hero() {
  return (
    <section className="hero">
      {/* <img
        src="https://png.pngtree.com/png-vector/20200424/ourmid/pngtree-hand-drawn-cartoon-koi-fish-ink-border-vector-illustration-png-image_2193167.jpg"
        alt="Hero Image"
      /> */}
      <Title level={1}>Welcome to Exclusively Koi</Title>
      <Paragraph style={{ fontSize: "24px", color: "#000" }}>
        Discover the beauty of koi fish
      </Paragraph>
      <Button type="primary" size="large">
        Shop Now
      </Button>
    </section>
  );
}

export default Hero;
