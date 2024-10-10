/* eslint-disable react/prop-types */
import { Button, InputNumber, Divider } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CartPage = () => {
  const { cart, setCart } = useAuth();

  const handleQuantityChange = (index, value) => {
    // Update the quantity of the cart item
    const newCart = [...cart];
    newCart[index].quantity = value;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDelete = (index) => {
    // Remove the item from the cart
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      {/* Cart Table */}
      <div className="grid grid-cols-6 gap-4 font-bold text-gray-600 text-center border-b-2 pb-2 mb-4">
        <div className="col-span-2">PRODUCT NAME</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
        <div>ACTION</div>
      </div>

      {cart.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-4 items-center text-center mb-4"
        >
          <div className="flex col-span-2 items-center">
            <img
              src={item.image || "https://via.placeholder.com/100"}
              alt="Product"
              className="w-16 h-16 object-cover mr-4"
            />
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-gray-600">${item.price}.00</p>
            </div>
          </div>
          <div className="text-red-600 font-bold">${item.price}.00</div>
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => handleQuantityChange(index, value)}
          />
          <div className="font-bold">${item.price * item.quantity}.00</div>
          <Button type="danger" onClick={() => handleDelete(index)}>
            Delete
          </Button>
        </div>
      ))}

      <Divider />

      {/* Subtotal and Shipping */}
      <div className="flex justify-between mb-4">
        <p className="font-semibold">SUBTOTAL</p>
        <p className="font-bold">${calculateTotal()}.00</p>
      </div>

      <div className="flex justify-between mb-6">
        <p className="font-semibold">SHIPPING</p>
        <p className="text-gray-600">Free shipping</p>
      </div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold mb-6">
        <p>TOTAL</p>
        <p className="text-red-600">${calculateTotal()}.00</p>
      </div>

      {/* Checkout Button */}
      <div className="text-right">
        <Link to="/checkout">
          <Button
            type="primary"
            size="large"
            className="bg-red-600 hover:bg-red-500"
          >
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
