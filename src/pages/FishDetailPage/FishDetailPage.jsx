import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import ImageGallery from "./../../components/Image Gallery/ImageGallery";
import FishInfo from "./../../components/FishInfo/FishInfo";
import RatingAndReview from "./../../components/Review&rating/RatingAndReview";

const FishDetailPage = () => {
  const { id } = useParams();
  const [fish, setFish] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const fishApi = `https://localhost:7285/api/Fish/${id}`;
  const feedbackApi = `https://localhost:7285/api/Feedback/getfeedbackbyfishid/${id}`;
  const averageRatingApi = `https://localhost:7285/api/Feedback/average-rating-fish/${id}`;

  const fetchFish = async () => {
    setLoading(true);
    try {
      const response = await axios.get(fishApi);
      setFish(response.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
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
    fetchFish();
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

  if (!fish) {
    return <p>Fish not found</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex">
        {/* Left Section: Image Gallery */}
        <ImageGallery mainImage={fish.imageFishes} additionalImages={[]} />

        {/* Right Section: Fish Info */}
        <FishInfo fish={fish} averageRating={averageRating} />
      </div>

      {/* Product Specifications or Details */}

      {/* Rating and Review Section */}
      <RatingAndReview product={fish} feedbacks={feedbacks} />
    </div>
  );
};

export default FishDetailPage;
