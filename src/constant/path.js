const ABOUT_US = '/about-us';
const PRODUCTS = '/products';
const NEWS = '/news';
const CONSIGNMENT = '/consignment';
const CONTACT = '/contact-us';

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  PRODUCTS: {
    INDEX: PRODUCTS,
    DETAIL: `products/:id`,
  },
  ABOUT_US: {
    INDEX: ABOUT_US,
  },
  NEWS: {
    INDEX: NEWS,
  },
  CONSIGNMENT: {
    INDEX: CONSIGNMENT,
  },
  CONTACT: {
    INDEX: CONTACT,
  },

};
