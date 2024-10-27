import axios from "axios";
import { message } from "antd";

const fishApi = "https://localhost:7285/api/Koi";
const userApi = "https://localhost:7285/api/User";
const addUserApi = "https://localhost:7285/api/User/register";
const addStaffApi = "https://localhost:7285/api/User/registerForStaff"; // New API endpoint for creating staff
const promotionApi = "https://localhost:7285/api/Promotion";
const purchasehistoryApi = "https://localhost:7285/api/PurchaseHistory"; // Updated API endpoint for purchase history
const feedbackApi = "https://localhost:7285/api/Feedback"; // Updated API endpoint for feedback


// Fish management service
export const fetchFishData = async () => {
  try {
    const response = await axios.get(fishApi);
    return response.data;
  } catch (error) {
    message.error("Failed to fetch fish data");
    console.error("Error fetching fish data:", error);
    return [];
  }
};

export const saveFish = async (fish, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      await axios.put(`${fishApi}/${fish.koiId}`, fish);
      message.success("Fish updated successfully");
    } else {
      await axios.post(fishApi, fish);
      message.success("Fish created successfully");
    }
  } catch (error) {
    message.error("Failed to save fish data");
    console.error("Error saving fish data:", error);
  }
};

export const deleteFish = async (koiId) => {
  try {
    await axios.delete(`${fishApi}/${koiId}`);
    message.success("Fish deleted successfully");
  } catch (error) {
    message.error("Failed to delete fish");
    console.error("Error deleting fish:", error);
  }
};

// Customer management service
export const fetchCustomerData = async () => {
  try {
    const response = await axios.get(userApi);
    const customerData = response.data.filter(
      (user) => user.role === "customer"
    );
    return customerData;
  } catch (error) {
    message.error("Failed to fetch customer data");
    console.error("Error fetching customer data:", error);
    return [];
  }
};

export const saveCustomer = async (customer, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      const { userName, email, phoneNumber, address } = customer;
      await axios.put(`${userApi}/updateProfile${customer.userId}`, {
        userName,
        email,
        phoneNumber,
        address,
      });
      message.success("Customer updated successfully");
    } else {
      const { userName, password, confirmPassword, email } = customer;
      await axios.post(addUserApi, {
        userName,
        password,
        confirmPassword,
        email,
      });
      message.success("Customer created successfully");
    }
  } catch (error) {
    message.error("Failed to save customer data");
    console.error("Error saving customer data:", error);
  }
};

export const deleteCustomer = async (userId) => {
  try {
    await axios.delete(`${userApi}/${userId}`);
    message.success("Customer deleted successfully");
  } catch (error) {
    message.error("Failed to delete customer");
    console.error("Error deleting customer:", error);
  }
};

// Staff management service
export const fetchStaffData = async () => {
  try {
    const response = await axios.get(userApi);
    const staffData = response.data.filter(
      (user) => user.role === "admin" || user.role === "staff"
    );
    return staffData;
  } catch (error) {
    message.error("Failed to fetch staff data");
    console.error("Error fetching staff data:", error);
    return [];
  }
};

export const saveStaff = async (staff, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      const { userName, email, phoneNumber, address } = staff;
      await axios.put(`${userApi}/updateProfile${staff.userId}`, {
        userName,
        email,
        phoneNumber,
        address,
      });
      message.success("Staff updated successfully");
    } else {
      const { userName, password, confirmPassword, email } = staff;
      await axios.post(addStaffApi, {
        userName,
        password,
        confirmPassword,
        email,
      }); // Use the new API endpoint for creating staff
      message.success("Staff created successfully");
    }
  } catch (error) {
    message.error("Failed to save staff data");
    console.error("Error saving staff data:", error);
  }
};

export const deleteStaff = async (userId) => {
  try {
    await axios.delete(`${userApi}/${userId}`);
    message.success("Staff deleted successfully");
  } catch (error) {
    message.error("Failed to delete staff");
    console.error("Error deleting staff:", error);
  }
};

// Promotion management service
export const fetchPromotionData = async () => {
  try {
    const response = await axios.get(promotionApi);
    return response.data;
  } catch (error) {
    message.error("Failed to fetch promotion data");
    console.error("Error fetching promotion data:", error);
    return [];
  }
};

export const savePromotion = async (promotion, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      await axios.put(`${promotionApi}/${promotion.promotionId}`, promotion);
      message.success("Promotion updated successfully");
    } else {
      await axios.post(promotionApi, promotion);
      message.success("Promotion created successfully");
    }
  } catch (error) {
    message.error("Failed to save promotion data");
    console.error("Error saving promotion data:", error);
  }
};

export const deletePromotion = async (promotionId) => {
  try {
    await axios.delete(`${promotionApi}/${promotionId}`);
    message.success("Promotion deleted successfully");
  } catch (error) {
    message.error("Failed to delete promotion");
    console.error("Error deleting promotion:", error);
  }
};

// Feedback Management services
export const fetchFeedbackData = async () => {
  try {
    const response = await axios.get(feedbackApi);
    return response.data;
  } catch (error) {
    message.error("Failed to fetch feedback data");
    console.error("Error fetching feedback data:", error);
    return [];
  }
};

// Save Feedback (Create or Update)
export const saveFeedback = async (feedback, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      await axios.put(`${feedbackApi}/${feedback.feedbackId}`, feedback);
      message.success("Feedback updated successfully");
    } else {
      await axios.post(feedbackApi, feedback);
      message.success("Feedback created successfully");
    }
  } catch (error) {
    message.error("Failed to save feedback data");
    console.error("Error saving feedback data:", error);
  }
};

// Delete Feedback
export const deleteFeedback = async (feedbackId) => {
  try {
    await axios.delete(`${feedbackApi}/${feedbackId}`);
    message.success("Feedback deleted successfully");
  } catch (error) {
    message.error("Failed to delete feedback");
    console.error("Error deleting feedback:", error);
  }
};

// Purchase History Management services
// Fetch Purchase History Data
export const fetchPurchaseHistoryData = async () => {
  try {
    const response = await axios.get(purchasehistoryApi);
    return response.data;
  } catch (error) {
    message.error("Failed to fetch purchase history data");
    console.error("Error fetching purchase history data:", error);
    return [];
  }
};

// Save Purchase History (Create or Update)
export const savePurchaseHistory = async (purchaseHistory, isUpdateMode) => {
  try {
    if (isUpdateMode) {
      await axios.put(
        `${purchasehistoryApi}/${purchaseHistory.orderId}`,
        purchaseHistory
      );
      message.success("Purchase history updated successfully");
    } else {
      await axios.post(purchasehistoryApi, purchaseHistory);
      message.success("Purchase history created successfully");
    }
  } catch (error) {
    message.error("Failed to save purchase history data");
    console.error("Error saving purchase history data:", error);
  }
};

// Delete Purchase History
export const deletePurchaseHistory = async (orderId) => {
  try {
    await axios.delete(`${purchasehistoryApi}/${orderId}`);
    message.success("Purchase history deleted successfully");
  } catch (error) {
    message.error("Failed to delete purchase history");
    console.error("Error deleting purchase history:", error);
  }
};

// Dashboard Services
