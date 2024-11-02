/* eslint-disable react/prop-types */
import { Button, Divider, Input, Rate, notification, Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProductInfo = ({ product, averageRating }) => {
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated, cart, setCart } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      notification.warning({
        message: "Not Logged In",
        description: "Please log in to add items to your cart.",
        placement: "bottomRight",
      });
      return;
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.koiId
    );

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product in the cart
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += quantity;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      // Add the new product to the cart
      const cartItem = {
        KoiId: product.koiId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.imageKoi,
      };

      const newCart = [...cart, cartItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    // Trigger a notification for feedback
    notification.success({
      message: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      placement: "bottomRight",
    });

    console.log("Product added to cart: ", product);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      notification.warning({
        message: "Not Logged In",
        description: "Please log in to proceed with the purchase.",
        placement: "bottomRight",
      });
      return;
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.koiId
    );

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product in the cart
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += quantity;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      // Add the new product to the cart
      const cartItem = {
        KoiId: product.koiId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.imageKoi,
      };

      const newCart = [...cart, cartItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    // Navigate to the cart page
    navigate("/cart");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* Product Rating */}
      <div className="flex items-center mb-4">
        <Rate defaultValue={averageRating} disabled allowHalf />
        <span className="ml-2 text-gray-600">{averageRating}/5</span>
      </div>

      {/* Product Price */}
      <p className="text-xl text-red-600 font-semibold mb-4">
        {product.price}VND
      </p>

      {/* Product Description */}
      <p className="text-gray-600 mb-6">{product.description}</p>

      <Divider />

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Column 1: Breeder, Gender, Age, Personality */}
        <div>
          <div className="mb-4">
            <p className="font-semibold">Breed:</p>
            <p>{product.breed}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Gender:</p>
            <p>{product.gender}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Age:</p>
            <p>{product.age}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Personality:</p>
            <p>{product.personality}</p>
          </div>
        </div>

        {/* Column 2: Size, Feeding Amount, Health Status, Award Certificate */}
        <div>
          <div className="mb-4">
            <p className="font-semibold">Size:</p>
            <p>{product.size} cm</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Feeding Amount:</p>
            <p>{product.feedingAmount} kg/day</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Health Status:</p>
            <p>{product.healthStatus}</p>
          </div>

          <div className="mb-4 flex items-center">
            <p className="font-semibold">Award Certificate:</p>
            <p className="ml-2">
              {product.awardCertificates ? (
                <>
                  <CheckOutlined className="text-green-600" />
                  <Button
                    type="default"
                    onClick={showModal}
                    className="ml-2 p-1"
                  >
                    View Certificate
                  </Button>
                </>
              ) : (
                <CloseOutlined className="text-red-600" />
              )}
            </p>
          </div>
        </div>
      </div>
      <Divider />

      {/* Quantity Selection */}
      <div className="mb-6 mt-4">
        <p className="font-semibold">Quantity:</p>
        <Input
          type="number"
          className="w-1/4"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min={1}
        />
      </div>

      {/* Buy Now & Add to Cart Buttons */}
      <div className="flex space-x-4">
        <Button
          type="primary"
          size="large"
          className="hover:bg-green-600 transition-colors duration-300"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>

        <Button
          type="default"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* Modal for Certificate Image */}
      <Modal
        title="Award Certificate"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <img
          src={product.imageCertificate}
          alt="Certificate"
          className="w-full h-auto"
        />
      </Modal>
    </div>
  );
};

export default ProductInfo;
