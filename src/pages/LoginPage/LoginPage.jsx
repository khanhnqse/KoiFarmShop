import { Button, Input, Form, message, Spin } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import { PATHS } from "../../constant/path";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7285/api/User/login",
        {
          userName: values.username,
          password: values.password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        // Handle successful login
        message.success("Login successful!");
        login(token); // Update auth context with token
        // Redirect to home page or another page
        navigate(PATHS.HOME);
      } else {
        // Handle login failure
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Wrong User name or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-lg flex overflow-hidden"
        style={{ width: "900px" }}
      >
        {/* Left section (Login form) */}
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />{" "}
            {/* Replace with your logo */}
            <h2 className="text-3xl font-bold mb-2">Login to Buy your Koi</h2>
            <p className="text-gray-500">Login using social networks</p>
          </div>

          {/* Social login buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              icon={<FacebookOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: "#3b5998", color: "#fff" }}
            >
              Facebook
            </Button>
            <Button
              icon={<GoogleOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: "#db4437", color: "#fff" }}
            >
              Google
            </Button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email and Password Input */}
          <Form
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            className="space-y-4"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="User name"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>

            {/* Sign In Button */}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="w-full mt-6 bg-gradient-to-r from-[#3B7B7A] to-teal-500 "
                htmlType="submit"
              >
                <Spin spinning={loading} />
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right section (Sign up prompt) */}
        <div
          className="w-1/3 p-10 text-white text-center flex flex-col justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1716787277130-dedef0bc94ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">New Here?</h2>
          <p className="mb-6">
            Sign up and discover a great amount of new opportunities!
          </p>
          <Link to="/register">
            <Button
              type="ghost"
              size="large"
              className="bg-white text-teal-500 font-semibold"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
