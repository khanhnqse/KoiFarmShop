/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Rate, Form, Input } from "antd";

const RatingAndReview = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && feedback) {
      product.reviews.push({ rating, feedback });
      setRating(0);
      setFeedback("");
      // Optionally, trigger a state update or re-fetch product to show the latest reviews
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Rate and Review</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Rate value={rating} onChange={setRating} />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            rows={4}
            maxLength={200}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Review
          </Button>
        </Form.Item>
      </Form>

      {/* Display Existing Reviews */}
      <h3 className="text-xl font-semibold mt-6">Existing Reviews:</h3>
      {product.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        product.reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-300 mb-4 pb-2">
            <Rate value={review.rating} disabled allowHalf />
            <p className="text-gray-600">{review.feedback}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RatingAndReview;
