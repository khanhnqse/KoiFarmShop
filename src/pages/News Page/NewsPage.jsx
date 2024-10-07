import { Button } from "antd";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaPinterest, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const handleReadNews = (id) => {
    const article = newsArticles.find((article) => article.id === id);
    navigate(`/article/${id}`, { state: { article } });
  };

  const newsArticles = [
    {
      id: 1,
      title: "New Koi Variety Discovered in Japan",
      summary:
        "Researchers have identified a previously unknown variety of koi fish in a remote pond in Japan.",
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2021/04/ca3f5481-ca-koi.jpeg",
      category: "Varieties",
      author: "Dr. Hiroshi Tanaka",
      publishDate: "2024-10-01",
      tags: ["Koi", "Varieties", "Discovery"],
      content:
        "In a groundbreaking discovery, researchers from the Koi Research Institute have identified a new variety of koi fish in a secluded pond in Japan. This particular koi showcases vibrant colors and unique patterns that have not been documented in existing koi varieties. The discovery highlights not only the rich biodiversity of koi but also emphasizes the importance of conserving natural habitats where these fish can thrive. As we continue to explore the depths of nature, we uncover hidden treasures that remind us of the delicate balance of our ecosystems. Scientists are now studying the genetic makeup of this new variety to understand its traits and the environmental conditions that led to its unique development.",
      detailDescription:
        "This koi variety features an intricate blend of colors, showcasing a stunning contrast that captivates koi enthusiasts. Its patterns are reminiscent of traditional Japanese art, embodying the spirit of harmony and tranquility often associated with koi fish. The research team plans to monitor the population of this variety in its natural habitat and may eventually bring them into captivity for breeding purposes, allowing koi lovers worldwide to enjoy this extraordinary discovery.",
    },
    {
      id: 2,
      title: "Koi Breeding Techniques for Beginners",
      summary:
        "Learn the basics of koi breeding with our comprehensive guide for novice enthusiasts.",
      image: "https://jpkoi.vn/wp-content/uploads/2020/04/ca-chep-koi-dep.jpg",
      category: "Breeding",
      author: "Emily Wong",
      publishDate: "2024-10-04",
      tags: ["Koi", "Breeding", "Guide"],
      content:
        "Breeding koi fish is an exciting and rewarding experience for hobbyists looking to expand their koi collection. This article provides a comprehensive guide to the basics of koi breeding, including essential tips on selecting the right parent fish, creating optimal spawning environments, and caring for the fry once they hatch. Understanding the breeding cycle of koi and the specific conditions they require for successful reproduction is crucial for any enthusiast. From water quality to temperature and lighting, each factor plays a vital role in the health and viability of the offspring. With the right knowledge and techniques, anyone can embark on this rewarding journey, fostering a deeper appreciation for these beautiful creatures.",
      detailDescription:
        "The article will delve into the various breeding methods, including natural spawning and artificial spawning techniques. Readers will learn about the importance of genetics in koi breeding, how to select fish with desirable traits, and the best practices for raising healthy fry. Additionally, tips on common challenges faced during the breeding process will be addressed, ensuring that beginners feel confident and prepared as they take their first steps into the world of koi breeding.",
    },
    {
      id: 3,
      title: "Creating the Perfect Koi Pond Habitat",
      summary:
        "Discover the essential elements for designing and maintaining an ideal koi pond environment.",
      image:
        "https://greenmore.vn/wp-content/uploads/2019/07/thiet-ke-san-vuon-ho-ca-koi-dep-greenmore-07.jpg",
      category: "Habitat",
      author: "John Smith",
      publishDate: "2024-10-06",
      tags: ["Koi", "Pond", "Habitat"],
      content:
        "A well-designed koi pond is crucial for the health and happiness of your koi fish. This article outlines the key elements necessary for creating an ideal koi pond environment, from water quality and pond depth to filtration systems and landscaping. Each of these components contributes to the overall well-being of your koi. Proper water management is essential; koi thrive in clean, well-oxygenated water. The article provides detailed instructions on setting up an efficient filtration system that removes waste while maintaining optimal water quality. Furthermore, considerations for depth and surface area are discussed to ensure koi have ample space to swim and thrive.",
      detailDescription:
        "In addition to practical advice, the article also explores aesthetic elements, including how to incorporate natural features like plants and rocks into your pond design. These features not only enhance the beauty of your pond but also provide hiding spots for koi, reducing stress. Readers will find guidance on maintaining pond health throughout the seasons and learn about common challenges and solutions. By the end of the article, readers will be equipped with the knowledge to design a picturesque and functional koi pond that enhances their outdoor space and provides a nurturing environment for their beloved fish.",
    },
    {
      id: 4,
      title: "Top 5 Koi Varieties for Your Pond",
      summary:
        "Explore the most popular koi varieties and their unique characteristics to help you choose the right one for your pond.",
      image:
        "https://images.unsplash.com/photo-1515986821211-0443679c2c9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Varieties",
      author: "Sarah Lee",
      publishDate: "2024-10-08",
      tags: ["Koi", "Varieties", "Guide"],
      content:
        "Choosing the right koi for your pond can significantly impact the aesthetic appeal and ecological balance of your garden. This article explores five of the most popular koi varieties, detailing their unique characteristics and suitability for different pond environments. From the striking colors of the Kohaku to the fascinating patterns of the Showa, understanding these varieties will help you make an informed decision. Each koi has its own set of requirements regarding space, water conditions, and companionship, and this article aims to educate readers on how to provide the best care for their chosen fish.",
      detailDescription:
        "The article includes a comprehensive comparison of each variety, highlighting their distinctive traits, such as color patterns, size, and temperament. Readers will gain insights into the historical significance of each variety in Japanese culture and their popularity among koi enthusiasts worldwide. Additionally, practical tips on how to introduce new koi to an existing pond and ensure compatibility with other fish will be provided. This informative guide will empower readers to select koi that not only beautify their pond but also thrive in harmony with their environment.",
    },
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
                  <Button
                    onClick={() => handleReadNews(article.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Read More
                  </Button>
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
