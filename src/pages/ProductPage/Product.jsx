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
  const [priceRange, setPriceRange] = useState([0, 2250]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBreeder, setSelectedBreeder] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFishOnly, setShowFishOnly] = useState(false); // New state for checkbox
  const api = "https://localhost:7285/api/Koi";
  const fishApi = "https://localhost:7285/api/Fish";

  const fetchFishs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(showFishOnly ? fishApi : api);
      const data = response.data;
  
      // Kiểm tra nếu dữ liệu là cá hay koi và lưu trữ
      if (showFishOnly) {
        setFishs(data.map(fish => ({ ...fish, type: 'fish' }))); // Đánh dấu dữ liệu là cá
      } else {
        setFishs(data.map(koi => ({ ...koi, type: 'koi' }))); // Đánh dấu dữ liệu là koi
      }
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchFishs();
  }, [showFishOnly]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value === "All" ? null : value);
  };

  const handleBreederChange = (value) => {
    setSelectedBreeder(value === "All" ? null : value);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value === "All" ? null : value);
  };

  const handleAgeChange = (value) => {
    setSelectedAge(value === "All" ? null : value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFishs = fishs.filter((fish) => {
    return (
      fish.price >= priceRange[0] &&
      fish.price <= priceRange[1] &&
      (selectedCategory ? fish.name === selectedCategory : true) &&
      (selectedBreeder ? fish.breed === selectedBreeder : true) &&
      (selectedGender ? fish.gender === selectedGender : true) &&
      (selectedAge ? fish.age === selectedAge : true) &&
      (searchQuery
        ? fish.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
    );
  });
  const sortedFishs = [...filteredFishs].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOption === "priceHigh") {
      return b.price - a.price;
    } else if (sortOption === "priceLow") {
      return a.price - b.price;
    }
    return 0;
  });

  const paginatedFishs = sortedFishs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Extract unique values for filters
  const uniqueCategories = [...new Set(fishs.map((fish) => fish.name))];
  const uniqueBreeders = [...new Set(fishs.map((fish) => fish.breed))];
  const uniqueGenders = [...new Set(fishs.map((fish) => fish.gender))];
  const uniqueAges = [...new Set(fishs.map((fish) => fish.age))];

  return (
    <div className="flex px-10 py-5">
      {/* Sidebar */}
      <div className="w-1/4 pr-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY PRICE</h2>
          <Slider
            range
            defaultValue={[0, 500]}
            max={500}
            onChange={handlePriceChange}
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">CATEGORIES</h2>
          <Radio.Group onChange={handleCategoryChange}>
            <Radio value="All">All</Radio>
            {uniqueCategories.map((name) => (
              <Radio key={name} value={name}>
                {name}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY BREEDER</h2>
          <Select
            placeholder="Select Breeder"
            className="w-full"
            onChange={handleBreederChange}
          >
            <Option value="All">All</Option>
            {uniqueBreeders.map((breeder) => (
              <Option key={breeder} value={breeder}>
                {breeder}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY GENDER</h2>
          <Select
            placeholder="Select Gender"
            className="w-full"
            onChange={handleGenderChange}
          >
            <Option value="All">All</Option>
            {uniqueGenders.map((gender) => (
              <Option key={gender} value={gender}>
                {gender}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">FILTER BY AGE</h2>
          <Select
            placeholder="Select Age"
            className="w-full"
            onChange={handleAgeChange}
          >
            <Option value="All">All</Option>
            {uniqueAges.map((age) => (
              <Option key={age} value={age}>
                {age}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Product List */}
      <div className="w-3/4">
        <div className="flex justify-between mb-6">
          <Select
            defaultValue="priceHigh"
            className="w-1/4"
            onChange={handleSortChange}
          >
            <Option value="priceHigh">Price: High to Low</Option>
            <Option value="priceLow">Price: Low to High</Option>
          </Select>

          <label>
            <input
              type="checkbox"
              checked={showFishOnly}
              onChange={(e) => setShowFishOnly(e.target.checked)}
            />
            Fish only
          </label>

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
              total={filteredFishs.length}
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
