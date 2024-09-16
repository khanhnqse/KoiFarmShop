import ProductCategories from "./components/Categories/Categories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/header";
import Hero from "./components/HeroSection/heroSection";
import AboutUs from "./pages/AboutUsPage/AboutUsPage";
function App() {
  return (
    <div>
      <Header />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <Footer />
      <AboutUs />

      {/* Rest of your app content */}
    </div>
  );
}

export default App;
