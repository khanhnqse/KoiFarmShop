import { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Pagination } from "antd";
import FishGrid from "../../components/FishGrid/FishGrid";

const FishProductPage = () => {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const fishApi = "https://localhost:7285/api/Fish";

  const fetchFishes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(fishApi);
      setFishes(response.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedFishes = fishes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Fish Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <FishGrid fishes={paginatedFishes} />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={fishes.length}
            onChange={handlePageChange}
            className="mt-6 text-center"
          />
        </>
      )}
    </div>
  );
};

export default FishProductPage;
