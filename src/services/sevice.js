import axios from "axios";
import { message } from "antd";

const fishApi = "https://localhost:7285/api/koi";

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

const koiApi = "https://localhost:7285/api/Fish";

// Koi management service
export const fetchKoiData = async (token) => {
  try {
    const response = await axios.get(koiApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    message.error("Failed to fetch Koi data");
    console.error("Error fetching Koi data:", error);
    return [];
  }
};

export const saveKoi = async (koi, isUpdateMode, token) => {
  try {
    if (isUpdateMode) {
      await axios.put(`${koiApi}/${koi.fishesId}`, koi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Koi updated successfully");
    } else {
      await axios.post(koiApi, koi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Koi created successfully");
    }
  } catch (error) {
    message.error("Failed to save Koi data");
    console.error("Error saving Koi data:", error);
  }
};

export const deleteKoi = async (fishesId, token) => {
  try {
    await axios.delete(`${koiApi}/${fishesId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("Koi deleted successfully");
  } catch (error) {
    message.error("Failed to delete Koi");
    console.error("Error deleting Koi:", error);
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

export const updateCustomerStatus = async (userId) => {
  try {
    await axios.put(`https://localhost:7285/api/User/restore/${userId}`);
    message.success("Customer status updated successfully");
  } catch (error) {
    message.error("Failed to update customer status");
    console.error("Error updating customer status:", error);
  }
};

// Staff management service
export const fetchStaffData = async () => {
  try {
    const response = await axios.get(userApi);
    const staffData = response.data.filter((user) => user.role === "manager" || user.role === "staff");
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

export const updateStaffStatus = async (userId) => {
  try {
    await axios.put(`https://localhost:7285/api/User/restore/${userId}`);
    message.success("Staff status updated successfully");
  } catch (error) {
    message.error("Failed to update staff status");
    console.error("Error updating staff status:", error);
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
    await axios.delete(`${feedbackApi}/delete/${feedbackId}`);
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


const orderApi = "https://localhost:7285/api/Order";

// Order management service
// Order management service
export const fetchOrderData = async (token) => {
  try {
    const response = await axios.get(orderApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    message.error("Failed to fetch order data");
    console.error("Error fetching order data:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, newStatus, token) => {
  try {
    await axios.put(
      `${orderApi}/${orderId}/update-status-staff&manager?newStatus=${newStatus}`,
      
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.success("Order status updated successfully");
  } catch (error) {
    message.error("Failed to update order status");
    console.error("Error updating order status:", error);
  }
};
// export const fetchOrderData = async (token) => {
//   try {
//     const response = await axios.get(orderApi, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     message.error("Failed to fetch order data");
//     console.error("Error fetching order data:", error);
//     return [];
//   }
// };

// export const saveOrder = async (order, isUpdateMode, token) => {
//   try {
//     if (isUpdateMode) {
//       await axios.put(`${orderApi}/${order.orderId}`, order, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       message.success("Order updated successfully");
//     } else {
//       await axios.post(orderApi, order, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       message.success("Order created successfully");
//     }
//   } catch (error) {
//     message.error("Failed to save order data");
//     console.error("Error saving order data:", error);
//   }
// };

// export const deleteOrder = async (orderId, token) => {
//   try {
//     await axios.delete(`${orderApi}/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     message.success("Order deleted successfully");
//   } catch (error) {
//     message.error("Failed to delete order");
//     console.error("Error deleting order:", error);
//   }
// };
const consignmentApi = "https://localhost:7285/api/Consignment";

// Consignment management service
export const fetchConsignmentData = async (token) => {
  try {
    const response = await axios.get(`${consignmentApi}/get-consignments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    message.error("Failed to fetch consignment data");
    console.error("Error fetching consignment data:", error);
    return [];
  }
};

export const saveConsignment = async (consignment, isUpdateMode, token) => {
  const payload = {
    consignmentId: consignment.consignmentId,
    koiId: consignment.koiId,
    consignmentType: consignment.consignmentType,
    consignmentPrice: consignment.consignmentPrice,
    consignmentDateTo: consignment.consignmentDateTo,
    consignmentTitle: consignment.consignmentTitle,
    consignmentDetail: consignment.consignmentDetail,
    status: consignment.status,
  };

  try {
    if (isUpdateMode) {
      const url = `${consignmentApi}/update-consignmentByAdmin_Staff/${consignment.consignmentId}?koiID=${payload.koiId}&consignmentType=${payload.consignmentType}&consignmentPrice=${payload.consignmentPrice}&consignmentDateTo=${payload.consignmentDateTo}&consignmentTitle=${payload.consignmentTitle}&consignmentDetail=${payload.consignmentDetail}&status=${payload.status}`;
      await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Consignment updated successfully");
    } else {
      await axios.post(consignmentApi, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Consignment created successfully");
    }
  } catch (error) {
    message.error("Failed to save consignment data");
    console.error("Error saving consignment data:", error);
  }
};

export const deleteConsignment = async (consignmentId, token) => {
  try {
    await axios.delete(`${consignmentApi}/delete-consignment/${consignmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("Consignment deleted successfully");
  } catch (error) {
    message.error("Failed to delete consignment");
    console.error("Error deleting consignment:", error);
  }
};

const koiTypeApi = "https://localhost:7285/api/Koi/koitypes";

// KoiType management service
export const fetchKoiTypeData = async (token) => {
  try {
    const response = await axios.get(koiTypeApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    message.error("Failed to fetch KoiType data");
    console.error("Error fetching KoiType data:", error);
    return [];
  }
};

export const saveKoiType = async (koiType, token) => {
  try {
    await axios.post(`https://localhost:7285/api/Koi/createKoiType`, koiType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("KoiType created successfully");
  } catch (error) {
    message.error("Failed to save KoiType data");
    console.error("Error saving KoiType data:", error);
  }
};