import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FishGrid = ({ fishes }) => {
  const navigate = useNavigate();

  const handleViewNow = (fishesId) => {
    navigate(`/fish/${fishesId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {fishes.map((fish) => (
        <div
          key={fish.fishesId}
          className="text-center border p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            src={fish.imageFishes}
            alt={fish.name}
            className="mb-4 h-64 w-full object-contain rounded"
          />
          <h3 className="text-lg font-semibold">{fish.name}</h3>
          <h5 className="text-lg font-semibold">FI{fish.fishesId}</h5>
          <p className="text-red-600 font-bold">{formatPrice(fish.price)}</p>
          <p className="text-gray-600">Quantity: {fish.quantity}</p>
          <Button
            type="primary"
            onClick={() => handleViewNow(fish.fishesId)}
            className="transition-colors duration-300 hover:bg-red-600 hover:text-white"
          >
            View Now
          </Button>
        </div>
      ))}
    </div>
  );
};

FishGrid.propTypes = {
  fishes: PropTypes.arrayOf(
    PropTypes.shape({
      fishesId: PropTypes.number.isRequired,
      imageFishes: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FishGrid;
