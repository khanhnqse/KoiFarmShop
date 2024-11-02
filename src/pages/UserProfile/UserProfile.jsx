import { Input, Button, Form, Modal, message, Spin } from "antd";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// Step 1: Define the data object
const defaultUserData = {
  userName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const UserProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Step 2: Fetch user data from the API
  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7285/api/User/${user.userId}`
      );
      const userData = response.data;
      setFormData({
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
        point: userData.totalPoints,
      });
    } catch (error) {
      message.error("Failed to fetch user data");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Use useEffect to fetch data on mount and when user changes
  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:7285/api/User/updateProfile${user.userId}`,
        formData
      );
      message.success("Profile updated successfully");
      console.log("Updated Profile Data:", response.data);
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Update handlePasswordSave to call the change password API
  const handlePasswordSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7285/api/User/ChangePassword",
        {
          userName: formData.userName,

          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        }
      );
      message.success("Password changed successfully");
      console.log("Password Change Response:", response.data);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to change password");
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg w-1/2">
      {/* User Info */}
      <div className="flex items-center">
        <img
          src={"https://via.placeholder.com/100"}
          alt="User"
          className="w-24 h-24 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{formData.userName}</h2>
          <p className="text-gray-600">{formData.email}</p>
        </div>
        <Button
          className="ml-auto"
          type="primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Form */}
      <div className="mt-8">
        <Spin spinning={loading}>
          <Form layout="vertical">
            <Form.Item label="User Name">
              <Input
                name="userName"
                value={formData.userName}
                placeholder="Your Name"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formData.email}
                placeholder="youremail@gmail.com"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Your Phone Number"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                name="address"
                value={formData.address}
                placeholder="Your Address"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Item>
            <Form.Item label="Point">
              <Input
                name="point"
                value={formData.point}
                placeholder="Your point"
                disabled={true}
              />
            </Form.Item>
            {isEditing && (
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </Form>
        </Spin>
        <div className="mt-4 flex justify-between">
          <Button type="default" onClick={() => setIsModalVisible(true)}>
            Change Password
          </Button>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handlePasswordSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="User Name">
            <Input
              name="userName"
              value={formData.userName}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item label="New Password">
            <Input.Password
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item label="Confirm New Password">
            <Input.Password
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;
