/* eslint-disable react/prop-types */
import { Button, Divider, Input, Rate, notification } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Handle adding the product to the cart
    // Example: Add product to cart with selected quantity
    const cartItem = {
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    // Trigger a notification for feedback
    notification.success({
      message: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      placement: "bottomRight",
    });

    // You can now add this cartItem to a cart state or dispatch it to your store
    console.log("Product added to cart: ", cartItem);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* Product Rating */}
      <div className="flex items-center mb-4">
        <Rate defaultValue={product.rating} disabled allowHalf />
        <span className="ml-2 text-gray-600">{product.rating}/5</span>
      </div>

      {/* Product Price */}
      <p className="text-xl text-red-600 font-semibold mb-4">
        ${product.price}.00
      </p>

      {/* Product Description */}
      <p className="text-gray-600 mb-6">{product.description}</p>

      <Divider />

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Column 1: Breeder, Gender, Age, Personality */}
        <div>
          <div className="mb-4">
            <p className="font-semibold">Breeder:</p>
            <p>{product.breeder}</p>
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
            <p>{product.size}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Feeding Amount:</p>
            <p>{product.feedingAmount}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Health Status:</p>
            <p>{product.healthStatus}</p>
          </div>

          <div className="mb-4 flex items-center">
            <p className="font-semibold">Award Certificate:</p>
            <p className="ml-2">
              {product.awardCertificate ? (
                <CheckOutlined className="text-green-600" />
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
        <Link to="/cart">
          <Button
            type="primary"
            size="large"
            className="hover:bg-green-600 transition-colors duration-300"
          >
            Buy Now
          </Button>
        </Link>

        <Button
          type="default"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
