import { Link } from "react-router-dom";
import Img1 from "../../assets/fish.png";
import Img2 from "../../assets/fish2.png";
import Img3 from "../../assets/fish3.png";

import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Kohaku",
    description:
      " Recently purchased a beautiful Kohaku koi from your farm, and I couldn't be happier! The fish arrived in excellent condition, and its vibrant red and white colors really stand out in my pond.",
  },
  {
    id: 2,
    img: Img2,
    title: "Asagi",
    description:
      "I ordered a Doitsu koi, and it arrived earlier than expected! The packaging was secure, and the fish was in excellent health",
  },
  {
    id: 3,
    img: Img3,
    title: "Sanke",
    description:
      "The Sanke koi I received is absolutely gorgeous, though it was a bit smaller than I expected.",
  },
];
const TopProducts = () => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24"></div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white  hover:bg-black/80  hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <Link to="/products">
                  <button className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
