/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Rate, Form, Input } from "antd";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const RatingAndReview = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const { isAuthenticated } = useAuth();

  const handleSubmit = () => {
    if (rating > 0 && feedback && username) {
      const feedbackDate = new Date().toISOString(); // Capture the current date
      product.reviews.push({ rating, feedback, username, feedbackDate });
      setRating(0);
      setFeedback("");
      setUsername(""); // Reset username after submission
      // Optionally, trigger a state update or re-fetch product to show the latest reviews
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Rate and Review</h2>
      {isAuthenticated ? (
        <div className="flex ">
          <div className="w-1/2">
            <Form onFinish={handleSubmit}>
              <Form.Item>
                <Rate value={rating} onChange={setRating} />
              </Form.Item>
              <Form.Item>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Capture username input
                  placeholder="Enter your username..."
                  className="border-gray-300 rounded-md"
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback here..."
                  rows={4}
                  maxLength={200}
                  className="border-gray-300 rounded-md"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Review
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <p className="text-red-500">
          Please{" "}
          <Link className="bold" to="/login">
            login
          </Link>{" "}
          to rate and review this product.
        </p>
      )}

      {/* Display Existing Reviews */}
      <h3 className="text-xl font-semibold mt-6 mb-5">Existing Reviews:</h3>
      {product.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        product.reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-300 mb-4 pb-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-lg p-4"
          >
            <Rate value={review.rating} disabled allowHalf />
            <p className="text-gray-600">{review.feedback}</p>
            <p className="text-sm text-gray-500">
              Reviewed by: <strong>{review.username}</strong> on{" "}
              {new Date(review.feedbackDate).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RatingAndReview;
