import { Slider, Radio, Select } from "antd";
import "antd/dist/reset.css";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const { Option } = Select;
const ProductPage = () => {
  const products = [
    {
      id: "EXK-K2175",
      name: "Hi Utsuri",
      price: 200,
      image:
        "https://bizweb.dktcdn.net/100/307/111/files/ca-koi-showa-sankoku1.jpg?v=1534352487117",
    },
    {
      id: "EXK-K2174",
      name: "Hi Utsuri",
      price: 200,
      image:
        "https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg",
    },
    {
      id: "EXK-K2173",
      name: "Kohaku",
      price: 225,
      image:
        "https://minhxuankoifarm.com/wp-content/uploads/2020/09/b3a2af58d86358b43bcbef7c409ca396.jpg",
    },
    {
      id: "EXK-K2173",
      name: "Kohaku",
      price: 225,
      image:
        "https://minhxuankoifarm.com/wp-content/uploads/2020/09/b3a2af58d86358b43bcbef7c409ca396.jpg",
    },
    {
      id: "EXK-K2173",
      name: "Kohaku",
      price: 225,
      image:
        "https://minhxuankoifarm.com/wp-content/uploads/2020/09/b3a2af58d86358b43bcbef7c409ca396.jpg",
    },
    {
      id: "EXK-K2173",
      name: "Kohaku",
      price: 225,
      image:
        "https://minhxuankoifarm.com/wp-content/uploads/2020/09/b3a2af58d86358b43bcbef7c409ca396.jpg",
    },
  ];

  return (
    <div className="flex px-10 py-5">
      {/* Sidebar */}
      <div className="w-1/4 pr-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY PRICE</h2>
          <Slider range defaultValue={[0, 2250]} max={2250} />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">CATEGORIES</h2>
          <Radio.Group>
            <Radio value={1}>Tosai</Radio>
            <Radio value={2}>Nisai</Radio>
            <Radio value={3}>Sansai</Radio>
            <Radio value={4}>Special Offers</Radio>
            <Radio value={5}>Autumn Harvest 2024</Radio>
          </Radio.Group>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY BREEDER</h2>
          <Select placeholder="Select Breeder" className="w-full">
            <Option value="breeder1">Breeder 1</Option>
            <Option value="breeder2">Breeder 2</Option>
            <Option value="breeder3">Breeder 3</Option>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY GENDER</h2>
          <Select placeholder="Select Gender" className="w-full">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY AGE</h2>
          <Select placeholder="Select Age" className="w-full">
            <Option value="1">1 Year</Option>
            <Option value="2">2 Years</Option>
            <Option value="3">3 Years</Option>
          </Select>
        </div>
      </div>

      {/* Product List */}
      <div className="w-3/4">
        <div className="flex justify-between mb-6">
          <Select defaultValue="Newest First" className="w-1/4">
            <Option value="newest">Newest First</Option>
            <Option value="oldest">Oldest First</Option>
            <Option value="priceHigh">Price: High to Low</Option>
            <Option value="priceLow">Price: Low to High</Option>
          </Select>
          <Select defaultValue="12 Products Per Page" className="w-1/4">
            <Option value="12">12 Products Per Page</Option>
            <Option value="24">24 Products Per Page</Option>
            <Option value="48">48 Products Per Page</Option>
          </Select>
        </div>

        {/* Use ProductGrid Component */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
