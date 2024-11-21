import { Button, Input, Form, message, Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import { PATHS } from "../../constant/path";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginWithGoogle from "./LoginWithGoogle";

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
        const { token, user } = response.data;

        message.success("Login successful!");
        login(token, user);
        console.log("Logged in user:", user);

        if (user.role === "manager") {
          navigate(PATHS.DASHBOARD.CHILDREN.OVERVIEW);
        } else if (user.role === "staff") {
          navigate(PATHS.DASHBOARD.CHILDREN.KOI);
        } else {
          navigate(PATHS.HOME);
        }
      } else {
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
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />{" "}
            <h2 className="text-3xl font-bold mb-2">Login to Buy your Koi</h2>
            <p className="text-gray-500">Login using social networks</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <LoginWithGoogle />
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

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

        <div
          className="w-1/3 p-10 text-white text-center flex flex-col justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1641374446184-45be9cce898c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
