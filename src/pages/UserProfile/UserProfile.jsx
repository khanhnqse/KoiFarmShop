import { Input, Button, Form, Modal } from "antd";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// Step 1: Define the data object
const defaultUserData = {
  name: "",
  email: "",
  phone: "",
  points: "",
  address: "",
  avatar: "https://via.placeholder.com/100",
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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.userName,
        email: user.email,
        phone: user.phone || "",
        points: user.totalPoints.toString(),
        address: user.address || "",
        avatar: user.avatar || "https://via.placeholder.com/100",
      });
    }
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

  const handleSave = () => {
    console.log("Updated Profile Data:", formData);
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    console.log("Password Data:", passwordData);
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg w-1/2">
      {/* User Info */}
      <div className="flex items-center">
        <img
          src={formData.avatar}
          alt="User"
          className="w-24 h-24 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{formData.name}</h2>
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
        <Form layout="vertical">
          <Form.Item label="User Name">
            <Input
              name="name"
              value={formData.name}
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
          <Form.Item label="Phone">
            <Input
              name="phone"
              value={formData.phone}
              placeholder="Your Phone Number"
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Item>
          <Form.Item label="Points">
            <Input
              name="points"
              value={formData.points}
              placeholder="Your Points"
              onChange={handleInputChange}
              disabled={true}
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
          {isEditing && (
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Form>
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
          <Form.Item label="Current Password">
            <Input.Password
              name="currentPassword"
              value={passwordData.currentPassword}
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
