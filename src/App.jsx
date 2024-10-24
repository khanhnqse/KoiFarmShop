import { Route, Routes, Navigate } from "react-router-dom";
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
import Dashboard from "./pages/Admin/Dashboard/DashBoard";
import ConsignmentManage from "./pages/Admin/Consignment/ConsignmentManagement";
import StaffManagement from "./pages/Admin/Staff/StaffManagement";
import CustomerManagement from "./pages/Admin/Customer/CustomerManagement";
import OrderKoiManagement from "./pages/Admin/Order/OrderKoiManagement";
import FishManagement from "./pages/Admin/KoiManagement/FishManagement";
import PromotionManagement from "./pages/Admin/Promotion Management/PromotionManagement";
import FeedbackManagement from "./pages/Admin/FeedbackManagement/FeedbackManagement";
import PurchaseHistoryManagement from "./pages/Admin/Purchase History Management/purchaseHistoryManagement"
import Overview from "./pages/Admin/Overview/Overview";
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
              index
              element={
                <Navigate to={PATHS.DASHBOARD.CHILDREN.OVERVIEW} replace />
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.KOI}
              element={<FishManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.CONSIGNMENT}
              element={<ConsignmentManage />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.CUSTOMER}
              element={<CustomerManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.STAFF}
              element={<StaffManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.ORDER}
              element={<OrderKoiManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.FEEDBACK}
              element={<FeedbackManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.PROMOTION}
              element={<PromotionManagement />}
            />
            <Route 
            path={PATHS.DASHBOARD.CHILDREN.PURCHASEHISTORY}
            element={<PurchaseHistoryManagement />} />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.OVERVIEW}
              element={<Overview />}
            />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
