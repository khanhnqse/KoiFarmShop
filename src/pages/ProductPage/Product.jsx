import { Slider, Radio, Select, Spin, Pagination } from "antd";
import "antd/dist/reset.css";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;
const ProductPage = () => {
  const [fishs, setFishs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const api = "https://66fe0942699369308956d80c.mockapi.io/Koi";

  const fetchFishs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      console.log("data", response.data);
      setFishs(response.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFishs();
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedFishs = fishs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
          <Select
            defaultValue="3 Products Per Page"
            className="w-1/4"
            onChange={(value) => setPageSize(value)}
          >
            <Option value="3">3 Products Per Page</Option>
            <Option value="6">6 Products Per Page</Option>
            <Option value="12">12 Products Per Page</Option>
          </Select>
        </div>

        {/* Step 3: Add loading indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <ProductGrid products={paginatedFishs} />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={fishs.length}
              onChange={handlePageChange}
              className="mt-6 text-center"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
