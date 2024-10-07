/* eslint-disable react/prop-types */
import { Button, Input, Rate } from "antd";

const ProductInfo = ({ product }) => {
  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex items-center mb-4">
        <Rate defaultValue={product.rating} disabled allowHalf />
        <span className="ml-2 text-gray-600">{product.rating}/5</span>
      </div>
      <p className="text-xl text-red-600 font-semibold mb-4">
        ${product.price}.00
      </p>
      <p className="text-gray-600 mb-6">{product.description}</p>

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

      {/* Quantity Selection */}
      <div className="mb-6">
        <p className="font-semibold">Quantity:</p>
        <Input type="number" className="w-1/4" defaultValue={1} />
      </div>

      {/* Buy Now Button */}
      <Button
        type="primary"
        size="large"
        className="hover:bg-green-600 transition-colors duration-300"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductInfo;
