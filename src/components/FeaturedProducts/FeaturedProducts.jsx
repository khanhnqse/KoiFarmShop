import { Card, Button, Typography, Row, Col } from "antd";
import "./FeaturedProducts.css";

const { Title } = Typography;

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <Title level={2}>Featured Products</Title>
      <Row gutter={[10, 6]} className="product-grid">
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img
                src="https://img.freepik.com/free-psd/swimming-fish-isolated_23-2151359668.jpg"
                alt="Product 1"
              />
            }
          >
            <Card.Meta
              title="Product 1"
              description="Description of Product 1"
            />
            <Button type="primary" style={{ marginTop: "10px" }}>
              Add to Cart
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img
                src="https://www.nicepng.com/png/detail/410-4105844_fish-koi-japan-png.png"
                alt="Product 2"
              />
            }
          >
            <Card.Meta
              title="Product 2"
              description="Description of Product 2"
            />
            <Button type="primary" style={{ marginTop: "10px" }}>
              Add to Cart
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img
                src="https://www.pngitem.com/pimgs/m/139-1393070_japanese-koi-fish-png-png-download-koi-fish.png"
                alt="Product 3"
              />
            }
          >
            <Card.Meta
              title="Product 3"
              description="Description of Product 3"
            />
            <Button type="primary" style={{ marginTop: "10px" }}>
              Add to Cart
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img
                src="https://img.freepik.com/free-psd/swimming-fish-isolated_23-2151359680.jpg"
                alt="Product 3"
              />
            }
          >
            <Card.Meta
              title="Product 3"
              description="Description of Product 3"
            />
            <Button type="primary" style={{ marginTop: "10px" }}>
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default FeaturedProducts;
