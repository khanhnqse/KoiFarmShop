/* eslint-disable react/prop-types */
import { Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

// eslint-disable-next-line no-unused-vars
const RatingAndReview = ({ product, feedbacks }) => {
  return (
    <div className="mt-10">
      {/* Display Existing Reviews */}
      <h3 className="text-2xl font-bold mt-6 mb-5">Customer Reviews</h3>
      {feedbacks.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        feedbacks.map((review, index) => (
          <div
            key={index}
            className="border border-gray-300 mb-4 pb-4 pt-4 px-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center mb-2">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="mr-4 bg-gray-200"
              />
              <div>
                <p className="font-semibold text-lg">{review.userName}</p>
                <Rate value={review.rating} disabled allowHalf />
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.content}</p>
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
