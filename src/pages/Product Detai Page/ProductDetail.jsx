import { useParams } from "react-router-dom";
import { Button, Rate, Form, Input } from "antd";
import { useState } from "react";

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
      "https://daiphatkoifarm.vn/wp-content/uploads/2022/08/z3647025589657_1a7799fec49458a0942311208dd3b297.jpg",
      "https://daiphatkoifarm.vn/wp-content/uploads/2022/08/z3647025600262_b4ec938528d089f790f03dc7bb263917.jpg",
    ],
    reviews: [],
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
    reviews: [],
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
    reviews: [],
  },
];

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL

  // Find the product based on the ID
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const handleImageClick = (image) => {
    setSelectedImage(image); // Update selected image on click
  }; // State for the selected image
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && feedback) {
      product.reviews.push({ rating, feedback });
      setRating(0);
      setFeedback("");
      // Optionally, you can also trigger a state update or re-fetch the product to show the latest reviews
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex">
        {/* Left Section: Image Gallery */}
        <div className="w-1/2 pr-10">
          {/* Main Image Display */}
          <img
            src={selectedImage} // Use selected image for display
            alt={product.name}
            className="rounded-lg w-full mb-4 object-contain h-96"
          />

          {/* Additional Images Gallery */}
          <h3 className="text-xl font-semibold mb-4">More Images:</h3>
          <div className="pl-[95px] grid grid-cols-5 gap-2">
            {product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 1}`}
                className="h-32 object-cover rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200" // Adjusted height for better balance
                onClick={() => handleImageClick(image)} // Update selected image on click
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
      </div>

      {/* Product Specifications or Details */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Koi Details</h2>
        <p className="text-gray-600">
          The Hi Utsuri variety is one of the most popular types of Koi due to
          its distinctive and vivid red and black pattern...
        </p>
      </div>

      {/* Rating and Feedback Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Rate and Review</h2>
        <Form onFinish={handleSubmit}>
          <Form.Item>
            <Rate value={rating} onChange={setRating} />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
              maxLength={200}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Review
            </Button>
          </Form.Item>
        </Form>

        {/* Display Existing Reviews */}
        <h3 className="text-xl font-semibold mt-6">Existing Reviews:</h3>
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 mb-4 pb-2">
              <Rate value={review.rating} disabled allowHalf />
              <p className="text-gray-600">{review.feedback}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
