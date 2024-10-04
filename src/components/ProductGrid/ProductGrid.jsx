import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PropTypes from "prop-types"; // Import PropTypes

const ProductGrid = ({ products }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleBuyNow = (id) => {
    // Redirect to the product detail page with the product ID
    navigate(`/products/${id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="text-center border p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" // Add hover scaling
        >
          <img
            src={product.image}
            alt={product.name}
            className="mb-4 h-64 w-full object-contain rounded"
          />
          <p className="text-sm text-gray-500">{product.id}</p>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-red-600 font-bold">${product.price}.00</p>

          {/* Buy Button */}
          <Button
            type="primary"
            onClick={() => handleBuyNow(product.id)}
            className="transition-colors duration-300 hover:bg-red-600 hover:text-white"
          >
            View Now
          </Button>
        </div>
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductGrid;
