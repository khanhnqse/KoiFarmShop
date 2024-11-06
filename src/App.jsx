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
import KoiManagement from "./pages/Admin/KoiManagement/KoiManagement";
import KoiTypeMangement from "./pages/Admin/Koi Type Mangement/KoiTypeManagement";
import PromotionManagement from "./pages/Admin/Promotion Management/PromotionManagement";
import FeedbackManagement from "./pages/Admin/FeedbackManagement/FeedbackManagement";
import PurchaseHistoryManagement from "./pages/Admin/Purchase History Management/purchaseHistoryManagement";
import Overview from "./pages/Admin/Overview/Overview";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import FishProductPage from "./pages/FishPage/FishPage";
import FishDetailPage from "./pages/FishDetailPage/FishDetailPage";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentUnsuccess from "./pages/PaymenntUnsuccess/PaymentUnsuccess";
import OrdersPage from "./pages/OrderPage/OrderPage";

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
          <Route path={PATHS.FISH.INDEX} element={<FishProductPage />} />
          <Route path={PATHS.FISH.DETAIL} element={<FishDetailPage />} />
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
              <PrivateRoute requiredRole="customer">
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.NEWS.DETAIL} element={<ArticleDetail />} />
          <Route
            path={PATHS.PROFILE.INDEX}
            element={
              <PrivateRoute allowedRoles={["customer", "manager", "staff"]}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.CHECKOUT.INDEX}
            element={
              <PrivateRoute requiredRole="customer">
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route path={PATHS.HISTORY} element={<OrderHistoryPage />} />
          <Route path={PATHS.ORDER} element={<OrdersPage />} />
          <Route
            path={PATHS.DASHBOARD.INDEX}
            element={
              <PrivateRoute restrictedToManagerOrStaff>
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
              element={
                <PrivateRoute restrictedToStaff>
                  <KoiManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.FISH}
              element={
                <PrivateRoute restrictedToStaff>
                  <FishManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.KOITYPE}
              element={
                <PrivateRoute restrictedToStaff>
                  <KoiTypeMangement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.CONSIGNMENT}
              element={
                <PrivateRoute restrictedToStaff>
                  <ConsignmentManage />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.CUSTOMER}
              element={
                <PrivateRoute restrictedToManagerOrStaff>
                  <CustomerManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.STAFF}
              element={
                <PrivateRoute restrictedToManager>
                  <StaffManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.ORDER}
              element={
                <PrivateRoute restrictedToStaff>
                  <OrderKoiManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.FEEDBACK}
              element={
                <PrivateRoute restrictedToStaff>
                  <FeedbackManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.PROMOTION}
              element={
                <PrivateRoute restrictedToManager>
                  <PromotionManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.PURCHASEHISTORY}
              element={
                <PrivateRoute restrictedToStaff>
                  <PurchaseHistoryManagement />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.OVERVIEW}
              element={
                <PrivateRoute restrictedToManager>
                  <Overview />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path={PATHS.SUCCESS} element={<PaymentSuccess />} />
        <Route path={PATHS.UNSUCCESS} element={<PaymentUnsuccess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
