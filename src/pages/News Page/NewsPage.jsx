import { useState } from "react";
import { FaFacebook, FaTwitter, FaPinterest, FaSearch } from "react-icons/fa";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const newsArticles = [
    {
      id: 1,
      title: "New Koi Variety Discovered in Japan",
      summary:
        "Researchers have identified a previously unknown variety of koi fish in a remote pond in Japan.",
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2021/04/ca3f5481-ca-koi.jpeg",
      category: "Varieties",
    },
    {
      id: 2,
      title: "Koi Breeding Techniques for Beginners",
      summary:
        "Learn the basics of koi breeding with our comprehensive guide for novice enthusiasts.",
      image: "https://jpkoi.vn/wp-content/uploads/2020/04/ca-chep-koi-dep.jpg",
      category: "Breeding",
    },
    {
      id: 3,
      title: "Creating the Perfect Koi Pond Habitat",
      summary:
        "Discover the essential elements for designing and maintaining an ideal koi pond environment.",
      image:
        "https://greenmore.vn/wp-content/uploads/2019/07/thiet-ke-san-vuon-ho-ca-koi-dep-greenmore-07.jpg",
      category: "Habitat",
    },
    // Add more articles as needed
  ];

  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "All" || article.category === selectedFilter)
  );

  return (
    <div className=" bg-white min-h-screen">
      <header
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://jgarden.vn/wp-content/uploads/2020/06/20200612.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Koi Fish News
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            {["All", "Breeding", "Habitat", "Varieties"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                    Read More
                  </button>
                  <div className="flex space-x-2">
                    <FaFacebook className="text-blue-600 cursor-pointer" />
                    <FaTwitter className="text-blue-400 cursor-pointer" />
                    <FaPinterest className="text-red-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No articles found matching your search criteria.
          </p>
        )}

        {filteredArticles.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300">
              Load More
            </button>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newsArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="bg-gray-700 rounded-lg p-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold">{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
