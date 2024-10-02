import { useParams } from "react-router-dom";
import { Button, Rate, Select } from "antd";

const { Option } = Select;

const products = [
  {
    id: "EXK-K2175",
    name: "Hi Utsuri",
    price: 200,
    image:
      "https://bizweb.dktcdn.net/100/307/111/files/ca-koi-showa-sankoku1.jpg?v=1534352487117",
    breeder: "Breeder 1",
    gender: "Male",
    age: "2 Years",
    rating: 4.5,
    description: "A vivid red and black koi fish of the Hi Utsuri variety.",
    additionalImages: [
      "https://askoi.vn/wp-content/uploads/2016/01/ca-koi-sanke1-1.jpg",
      "https://minhxuankoifarm.com/wp-content/uploads/2020/09/ca-koi-san-ke2-600x800-1.jpg",
    ],
  },
  {
    id: "EXK-K2174",
    name: "Hi Utsuri",
    price: 200,
    image:
      "https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg",
    breeder: "Breeder 2",
    gender: "Female",
    age: "1 Year",
    rating: 4.0,
    description: "A striking red and black Hi Utsuri koi.",
    additionalImages: [
      "https://d2e07cbkdk0gwy.cloudfront.net/wp-content/uploads/2013/07/page/Yamatonishiki_03.18.2024-scaled.jpg",
      "https://bizweb.dktcdn.net/100/004/358/products/d476ad40-f39b-4719-a81c-024c960ad094-jpeg.jpg?v=1561289502147",
    ],
  },
  {
    id: "EXK-K2173",
    name: "Kohaku",
    price: 225,
    image:
      "https://minhxuankoifarm.com/wp-content/uploads/2020/09/b3a2af58d86358b43bcbef7c409ca396.jpg",
    breeder: "Breeder 3",
    gender: "Male",
    age: "3 Years",
    rating: 4.8,
    description:
      "A classic Kohaku koi fish with a beautiful red and white pattern.",
    additionalImages: [
      "https://daiphatkoifarm.vn/wp-content/uploads/2022/08/z3647025589657_1a7799fec49458a0942311208dd3b297.jpg",
      "https://daiphatkoifarm.vn/wp-content/uploads/2022/08/z3647025600262_b4ec938528d089f790f03dc7bb263917.jpg",
    ],
  },
];
const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL

  // Find the product based on the ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex">
        {/* Left Section: Image Gallery */}
        <div className="w-1/2 pr-10">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full mb-4 object-contain h-96"
          />
          <div className="grid grid-cols-3 gap-4">
            {product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 1}`}
                className="h-24 object-cover rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Info */}
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
            <Select title="Quantity" defaultValue="1" className="w-1/4">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
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
      </div>

      {/* Product Specifications or Details */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Koi Details</h2>
        <p className="text-gray-600">
          The Hi Utsuri variety is one of the most popular types of Koi due to
          its distinctive and vivid red and black pattern...
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
