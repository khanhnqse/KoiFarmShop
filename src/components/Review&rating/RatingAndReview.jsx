/* eslint-disable react/prop-types */
import { Rate } from "antd";
// eslint-disable-next-line no-unused-vars
const RatingAndReview = ({ product, feedbacks }) => {
  return (
    <div className="mt-10">
      {/* Display Existing Reviews */}
      <h3 className="text-xl font-semibold mt-6 mb-5">Existing Reviews:</h3>
      {feedbacks.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        feedbacks.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-300 mb-4 pb-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-lg p-4"
          >
            <Rate value={review.rating} disabled allowHalf />
            <p className="text-gray-600">{review.content}</p>
            <p className="text-sm text-gray-500">
              Reviewed on {new Date(review.feedbackDate).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RatingAndReview;
