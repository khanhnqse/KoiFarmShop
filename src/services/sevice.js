import axios from "axios";
import { message } from "antd";

const api = "https://localhost:7285/api/Koi";

export const fetchFishData = async () => {
  try {
    const response = await axios.get(api);
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
      await axios.put(`${api}/${fish.koiId}`, fish);
      message.success("Fish updated successfully");
    } else {
      await axios.post(api, fish);
      message.success("Fish created successfully");
    }
  } catch (error) {
    message.error("Failed to save fish data");
    console.error("Error saving fish data:", error);
  }
};

export const deleteFish = async (koiId) => {
  try {
    await axios.delete(`${api}/${koiId}`);
    message.success("Fish deleted successfully");
  } catch (error) {
    message.error("Failed to delete fish");
    console.error("Error deleting fish:", error);
  }
};