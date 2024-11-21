/* eslint-disable react/prop-types */
import { Button, Divider, Rate, notification, Modal, Tag } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProductInfo = ({ product, averageRating }) => {
  const [quantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated, cart, setCart } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product.status === "unavailable") {
      notification.warning({
        message: "Product Unavailable",
        description: "This product is currently unavailable.",
        placement: "bottomRight",
      });
      return;
    }

    if (!isAuthenticated) {
      notification.warning({
        message: "Not Logged In",
        description: "Please log in to add items to your cart.",
        placement: "bottomRight",
      });
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.KoiId === product.koiId
    );

    if (existingProductIndex !== -1) {
      notification.warning({
        message: "Product Already in Cart",
        description: "This product is already in your cart.",
        placement: "bottomRight",
      });
      return;
    }

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

    notification.success({
      message: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      placement: "bottomRight",
    });

    console.log("Product added to cart: ", product);
  };

  const handleBuyNow = () => {
    if (product.status === "unavailable") {
      notification.warning({
        message: "Product Unavailable",
        description: "This product is currently unavailable.",
        placement: "bottomRight",
      });
      return;
    }

    if (!isAuthenticated) {
      notification.warning({
        message: "Not Logged In",
        description: "Please log in to proceed with the purchase.",
        placement: "bottomRight",
      });
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.KoiId === product.koiId
    );

    if (existingProductIndex !== -1) {
      notification.warning({
        message: "Product Already in Cart",
        description: "This product is already in your cart.",
        placement: "bottomRight",
      });
      return;
    }

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="flex items-center mb-4">
        {averageRating > 0 && (
          <>
            <Rate defaultValue={averageRating} disabled allowHalf />
            <span className="ml-2 text-gray-600">{averageRating}/5</span>
          </>
        )}
      </div>

      <p className="text-xl text-red-600 font-semibold mb-4">
        {formatPrice(product.price)}
      </p>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <Divider />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="font-semibold">ID:</p>
            <p>{product.koiId}</p>
          </div>
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

          <div className="mb-4">
            <p className="font-semibold">Consign:</p>

            <Tag color={product.isConsigned ? "green" : "blue"}>
              {product.isConsigned ? "Yes" : "No"}
            </Tag>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <p className="font-semibold">In Stock:</p>
            <p>{product.quantityInStock} left</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Size:</p>
            <p>{product.size} cm</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Feeding Amount:</p>
            <p>{product.feedingAmount} feedings per day</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Health Status:</p>
            <p>{product.healthStatus}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Status:</p>
            <Tag color={product.status === "available" ? "green" : "red"}>
              {product.status}
            </Tag>
          </div>

          <div className="mb-4 flex items-center">
            <p className="font-semibold">Award Certificate:</p>
            <p className="ml-2">
              {product.awardCertificates === "yes" ? (
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

      {/* <div className="mb-6 mt-4">
        <p className="font-semibold">Quantity:</p>
        <Input
          type="number"
          className="w-1/4"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min={1}
          readOnly
        />
      </div> */}

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
