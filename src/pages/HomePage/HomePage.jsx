import Banner from "../../components/Banner/Banner";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HeroSection/HeroSection";
import TopProducts from "../../components/TopProduct/TopProduct";
import banner2 from "../../assets/Banner2.png";
import Title from "antd/es/typography/Title";
import Subscribe from "../../components/Subscribe/Subscribe";

import Testimonials from "../../components/Feedback Section/Feedback";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Banner />

      <img
        src={banner2}
        alt="Untitled design"
        style={{ width: "100%", objectFit: "cover" }}
      />

      <Title className="pb-10 text-center pt-12" level={2}>
        Top Rated Koi for you
      </Title>

      <TopProducts />

      <Subscribe />
      <Title className="pb-10 text-center pt-12" level={2}>
        Our customer feedback
      </Title>

      <Testimonials />
    </>
  );
};

export default Home;
