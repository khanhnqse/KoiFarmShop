import { Button, Input, Form, message, Spin } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import { PATHS } from "../../constant/path";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7285/api/User/register",
        {
          userName: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
          email: values.email,
        }
      );

      if (response.status === 200) {
        // Handle successful registration
        message.success("Registration successful! Please log in.");
        // Redirect to login page
        navigate(PATHS.LOGIN);
      } else {
        // Handle registration failure
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred during registration. Please try again.");
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
        {/* Left section (Register form) */}
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />{" "}
            {/* Replace with your logo */}
            <h2 className="text-3xl font-bold mb-2">
              Register to Buy your Koi
            </h2>
            <p className="text-gray-500">Register using social networks</p>
          </div>

          {/* Social register buttons */}
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

          {/* Username, Email, and Password Input */}
          <Form
            name="register"
            layout="vertical"
            onFinish={handleRegister}
            className="space-y-4"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
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
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>

            {/* Register Button */}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="w-full mt-6 bg-gradient-to-r from-[#3B7B7A] to-teal-500 "
                htmlType="submit"
              >
                Register <Spin spinning={loading} />
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right section (Login prompt) */}
        <div
          className="w-1/3 p-10 text-white text-center flex flex-col justify-center"
          style={{
            backgroundImage: "url('https://images')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Already Have an Account?</h2>
          <p className="mb-6">
            Log in and discover a great amount of new opportunities!
          </p>
          <Link to="/login">
            <Button
              type="ghost"
              size="large"
              className="bg-white text-teal-500 font-semibold"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
