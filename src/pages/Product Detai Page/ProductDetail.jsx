import { useParams } from "react-router-dom";
import ImageGallery from "../../components/Image Gallery/ImageGallery";
import ProductInfo from "../../components/Product Detail/ProductDetail";
import RatingAndReview from "../../components/Review&rating/RatingAndReview";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Spin } from "antd";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [fishs, setFishs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const api = "https://66fe0942699369308956d80c.mockapi.io/Koi";

  const fetchFishs = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(api);
      console.log("data", response.data);
      setFishs(response.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchFishs();
  }, []);

  const product = fishs.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex">
        {/* Left Section: Image Gallery */}
        <ImageGallery
          mainImage={product.image}
          additionalImages={product.additionalImages}
        />

        {/* Right Section: Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Product Specifications or Details */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Koi Details</h2>
        <Row>
          <Col span={12}>
            <p className="text-gray-600">{product.detailDescription}</p>
          </Col>
        </Row>
      </div>

      {/* Rating and Review Section */}
      <RatingAndReview product={product} />
    </div>
  );
};

export default ProductDetailPage;
