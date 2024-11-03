import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const [selectedKoi, setSelectedKoi] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBuyNow = (koiId) => {
    navigate(`/products/${koiId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSelectKoi = (koi) => {
    setSelectedKoi((prevSelectedKoi) => {
      if (prevSelectedKoi.includes(koi)) {
        return prevSelectedKoi.filter((item) => item !== koi);
      } else if (prevSelectedKoi.length < 3) {
        return [...prevSelectedKoi, koi];
      } else {
        notification.warning({
          message: "Selection Limit Reached",
          description: "You can only compare up to 3 Koi fish.",
        });
        return prevSelectedKoi;
      }
    });
  };

  const handleCompare = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedKoi([]); // Reset selected Koi fish
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        {selectedKoi.length >= 2 && (
          <Button type="primary" onClick={handleCompare}>
            Compare Selected Koi
          </Button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.koiId}
            className="text-center border p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.imageKoi}
              alt={product.name}
              className="mb-4 h-64 w-full object-contain rounded"
            />

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 pb-3">
              {product.description.slice(0, 100)}...
            </p>
            <p className="text-red-600 font-bold pb-3">
              {formatPrice(product.price)}
            </p>

            <Button
              type="primary"
              onClick={() => handleBuyNow(product.koiId)}
              className="transition-colors duration-300 hover:bg-red-600 hover:text-white mb-2"
            >
              View Now
            </Button>
            <Button
              className="ml-3"
              type={selectedKoi.includes(product) ? "primary" : "default"}
              onClick={() => handleSelectKoi(product)}
            >
              {selectedKoi.includes(product) ? "Selected" : "Select to compare"}
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Compare Koi Fish"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={1000}
      >
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Attribute</th>
              {selectedKoi.map((koi) => (
                <th key={koi.koiId} className="px-4 py-2">
                  {koi.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Price</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {formatPrice(koi.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Size</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.size} cm
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Age</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.age}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Gender</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.gender}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Breed</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.breed}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Personality</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.personality}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">Award Certificate</td>
              {selectedKoi.map((koi) => (
                <td key={koi.koiId} className="border px-4 py-2">
                  {koi.awardCertificates ? "Yes" : "No"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      koiId: PropTypes.number.isRequired,
      imageKoi: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      personality: PropTypes.string.isRequired,
      awardCertificates: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default ProductGrid;
