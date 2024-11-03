import { Typography, Spin } from "antd";
import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../ProductGrid/ProductGrid";

const { Title } = Typography;

function FeaturedProducts() {
  const [fishs, setFishs] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = "https://localhost:7285/api/Koi";

  const fetchFishs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      console.log("data", response.data);
      setFishs(response.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFishs();
  }, []);

  return (
    <section className="featured-products">
      <Title className="pb-10" level={2}>
        Featured Products
      </Title>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        // Use slice to limit the number of items to 3
        <ProductGrid products={fishs.slice(0, 3)} />
      )}
    </section>
  );
}

export default FeaturedProducts;
