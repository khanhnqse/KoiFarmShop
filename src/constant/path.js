const ABOUT_US = "/about-us";
const PRODUCTS = "/products";
const NEWS = "/news";
const CONSIGNMENT = "/consignment";
const CONTACT = "/contact-us";
const CART = "/cart";
const PROFILE = "/profile";
const CHECKOUT = "/checkout";
export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: {
    INDEX: "/dashboard",
    CHILDREN: {
      OVERVIEW: "/dashboard/overview",
      KOI: "/dashboard/koi",
      CONSIGNMENT: "/dashboard/consignment",
      CUSTOMER: "/dashboard/customer",
      STAFF: "/dashboard/staff",
      ORDER: "/dashboard/order",
      PROMOTION: "/dashboard/promotion",
      FEEDBACK: "/dashboard/feedback",
      PURCHASEHISTORY: "/dashboard/purchasehistory",
      SETTING: "/dashboard/setting,"
    },
  },
  PRODUCTS: {
    INDEX: PRODUCTS,
    DETAIL: `products/:id`,
  },
  ABOUT_US: {
    INDEX: ABOUT_US,
  },
  NEWS: {
    INDEX: NEWS,
    DETAIL: `article/:id`,
  },
  CONSIGNMENT: {
    INDEX: CONSIGNMENT,
  },
  CONTACT: {
    INDEX: CONTACT,
  },
  CART: {
    INDEX: CART,
  },
  PROFILE: {
    INDEX: PROFILE,
  },
  CHECKOUT: {
    INDEX: CHECKOUT,
  },
};
