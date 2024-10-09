/* eslint-disable react/prop-types */
import { Button, InputNumber, Divider } from "antd";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      {/* Cart Table */}
      <div className="grid grid-cols-5 gap-4 font-bold text-gray-600 text-center border-b-2 pb-2 mb-4">
        <div className="col-span-2">PRODUCT NAME</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
      </div>

      <div className="grid grid-cols-5 gap-4 items-center text-center mb-4">
        <div className="flex col-span-2 items-center">
          <img
            src="https://bizweb.dktcdn.net/100/004/358/products/d476ad40-f39b-4719-a81c-024c960ad094-jpeg.jpg?v=1561289502147"
            alt="Product"
            className="w-16 h-16 object-cover mr-4"
          />
          <div>
            <p className="font-bold">Hasuki</p>
            <p className="text-gray-600">$200.00</p>
          </div>
        </div>
        <div className="text-red-600 font-bold">$200.00</div>
        <InputNumber min={1} defaultValue={1} />
        <div className="font-bold">£{200 * 1}.00</div>
      </div>

      <Divider />

      {/* Subtotal and Shipping */}
      <div className="flex justify-between mb-4">
        <p className="font-semibold">SUBTOTAL</p>
        <p className="font-bold">$200.00</p>
      </div>

      <div className="flex justify-between mb-6">
        <p className="font-semibold">SHIPPING</p>
        <p className="text-gray-600">Free shipping</p>
      </div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold mb-6">
        <p>TOTAL</p>
        <p className="text-red-600">$200.00</p>
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

// Define prop types
CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

// Exporting CartPage as the default export
export default CartPage;
