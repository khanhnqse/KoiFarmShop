import axios from "axios";
import { message } from "antd";

const fishApi = "https://localhost:7285/api/Koi";
const userApi = "https://localhost:7285/api/User";
const addUserApi = "https://localhost:7285/api/User/register";

// Fish management service
export const fetchFishData = async () => {
  try {
    const response = await axios.get(fishApi);
    message.success("Fish data fetched successfully");
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
    const customerData = response.data.filter((user) => user.role === "customer");
    message.success("Customer data fetched successfully");
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
      await axios.put(`${userApi}/updateProfile${customer.userId}`, { userName, email, phoneNumber, address });
      message.success("Customer updated successfully");
    } else {
      const { userName, password, confirmPassword, email } = customer;
      await axios.post(addUserApi, { userName, password, confirmPassword, email });
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