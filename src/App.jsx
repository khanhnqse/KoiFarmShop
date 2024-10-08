import { Route, Routes } from "react-router-dom";

import Home from "./pages/HomePage/HomePage";
import MainLayout from "./Layout/MainLayout/MainLayout";
import { PATHS } from "./constant/path";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AboutUs from "./pages/AboutUsPage/AboutUsPage";
import NewsPage from "./pages/News Page/NewsPage";

import ContactUsForm from "./pages/Contact/Contact";
import ProductPage from "./pages/ProductPage/Product";
import ProductDetailPage from "./pages/Product Detai Page/ProductDetail";
import CartPage from "./pages/CartPage/CartPage";
import ArticleDetail from "./pages/NewsDetailPage/NewsDetail";
import UserProfile from "./pages/UserProfile/UserProfile";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.ABOUT_US.INDEX} element={<AboutUs />} />
        <Route path={PATHS.NEWS.INDEX} element={<NewsPage />} />
        <Route path={PATHS.CONTACT.INDEX} element={<ContactUsForm />} />
        <Route path={PATHS.PRODUCTS.INDEX} element={<ProductPage />} />
        <Route path={PATHS.PRODUCTS.DETAIL} element={<ProductDetailPage />} />
        <Route path={PATHS.CART.INDEX} element={<CartPage />} />
        <Route path={PATHS.NEWS.DETAIL} element={<ArticleDetail />} />
        <Route path={PATHS.PROFILE.INDEX} element={<UserProfile />} />
        <Route path={PATHS.CHECKOUT.INDEX} element={<CheckoutPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
