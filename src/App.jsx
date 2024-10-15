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
import LoginPage from "./pages/LoginPage/LoginPage";
import Consignment from "./pages/ConsigmentPage/Consignment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import KoiManagement from "./pages/Admin/KoiManagement/KoiManagement";
import Dashboard from "./pages/Admin/Dashboard/DashBoard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.ABOUT_US.INDEX} element={<AboutUs />} />
          <Route path={PATHS.NEWS.INDEX} element={<NewsPage />} />
          <Route path={PATHS.CONTACT.INDEX} element={<ContactUsForm />} />
          <Route path={PATHS.PRODUCTS.INDEX} element={<ProductPage />} />
          <Route path={PATHS.PRODUCTS.DETAIL} element={<ProductDetailPage />} />
          <Route
            path={PATHS.CONSIGNMENT.INDEX}
            element={
              <PrivateRoute>
                <Consignment />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.CART.INDEX}
            element={
              <PrivateRoute restrictedToAdmin>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.NEWS.DETAIL} element={<ArticleDetail />} />
          <Route
            path={PATHS.PROFILE.INDEX}
            element={
              <PrivateRoute restrictedToAdmin>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.CHECKOUT.INDEX}
            element={
              <PrivateRoute restrictedToAdmin>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route
            path={PATHS.DASHBOARD.INDEX}
            element={
              <PrivateRoute requiredRole="admin">
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path={PATHS.DASHBOARD.CHILDREN.KOI}
              element={<KoiManagement />}
            />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
