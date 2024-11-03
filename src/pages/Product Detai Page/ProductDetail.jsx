import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Spin } from "antd";
import ImageGallery from "./../../components/Image Gallery/ImageGallery";
import ProductInfo from "./../../components/Product Detail/ProductDetail";
import RatingAndReview from "./../../components/Review&rating/RatingAndReview";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const productApi = `https://localhost:7285/api/Koi/${id}`;
  const feedbackApi = `https://localhost:7285/api/Feedback/getFeedbackbyKoiid/${id}`;
  const averageRatingApi = `https://localhost:7285/api/Feedback/average-rating-koi/${id}`;

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(productApi);
      const productData = response.data;
      // Parse the additionImage field into an array of image URLs
      productData.additionImage = productData.additionImage
        ? productData.additionImage.split(", ")
        : [];
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(feedbackApi);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(averageRatingApi);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching average rating data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchFeedbacks();
    fetchAverageRating();
  }, [id]);

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
          mainImage={product.imageKoi}
          additionalImages={product.additionImage}
        />

        {/* Right Section: Product Info */}
        <ProductInfo product={product} averageRating={averageRating} />
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
      <RatingAndReview product={product} feedbacks={feedbacks} />
    </div>
  );
};

export default ProductDetailPage;
