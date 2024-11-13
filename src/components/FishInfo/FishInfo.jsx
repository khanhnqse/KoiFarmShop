/* eslint-disable react/prop-types */
import { Button, Divider, Input, Rate, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FishInfo = ({ fish, averageRating }) => {
  const [quantity, setQuantity] = useState(1);
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

    const existingFishIndex = cart.findIndex(
      (item) => item.id === fish.fishesId
    );

    if (existingFishIndex !== -1) {
      const newCart = [...cart];
      newCart[existingFishIndex].quantity += quantity;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const cartItem = {
        fishesId: fish.fishesId,
        name: fish.name,
        price: fish.price,
        quantity: quantity,
        image: fish.imageFishes,
      };

      const newCart = [...cart, cartItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    notification.success({
      message: "Added to Cart",
      description: `${fish.name} has been added to your cart.`,
      placement: "bottomRight",
    });

    console.log("Fish added to cart: ", fish);
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

    const existingProductIndex = cart.findIndex(
      (item) => item.id === fish.fishesId
    );

    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += quantity;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const cartItem = {
        fishesId: fish.fishesId,
        name: fish.name,
        price: fish.price,
        quantity: quantity,
        image: fish.imageFishes,
      };

      const newCart = [...cart, cartItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    navigate("/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-bold mb-4">{fish.name}</h1>

      <div className="flex items-center mb-4">
        <Rate defaultValue={averageRating} disabled allowHalf />
        <span className="ml-2 text-gray-600">{averageRating}/5</span>
      </div>

      <p className="text-xl text-red-600 font-semibold mb-4">
        {formatPrice(fish.price)}
      </p>

      <Divider />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="font-semibold">Quantity:</p>
            <p>{fish.quantity}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Koi Type ID:</p>
            <p>{fish.koiTypeId}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Name:</p>
            <p>{fish.name}</p>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <p className="font-semibold">Status:</p>
            <p>{fish.status}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Price:</p>
            <p>{formatPrice(fish.price)}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Quantity in Stock:</p>
            <p>{fish.quantityInStock}</p>
          </div>
        </div>
      </div>
      <Divider />

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
    </div>
  );
};

export default FishInfo;
