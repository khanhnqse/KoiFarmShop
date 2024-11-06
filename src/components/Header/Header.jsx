import {
  Layout,
  Menu,
  Badge,
  Avatar,
  Dropdown,
  Button,
  message,
  Typography,
} from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.css";
import { MenuItems } from "../../constant/menu-data";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, cart, user } = useAuth(); // Added user to destructuring
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    message.success("You have successfully logged out.");
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="purchase-history" onClick={() => navigate("/history")}>
        Purchase History
      </Menu.Item>
      <Menu.Item key="my-order" onClick={() => navigate("/orders")}>
        My Orders
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Conditionally create menu items for manager or staff
  const adminMenuItems =
    user?.role === "staff"
      ? [
          {
            key: "/dashboard/koi",
            label: "Dashboard",
          },
        ]
      : [
          {
            key: "/dashboard",
            label: "Dashboard",
          },
        ];

  return (
    <AntHeader style={{ backgroundColor: "#FFFFFF" }} className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Exclusively Koi" style={{ width: "120px" }} />
        </Link>
      </div>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        theme="light"
        mode="horizontal"
        style={{
          backgroundColor: "#fff ",
          color: "#000",
          width: "100%",
          paddingLeft: "120px",
        }}
        items={
          user?.role === "manager" || user?.role === "staff"
            ? adminMenuItems
            : MenuItems
        } // Conditionally render menu items
      />

      <div className="cart pt-3">
        {user?.role === "manager" || user?.role === "staff" ? (
          <Typography>
            Welcome {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Typography>
        ) : (
          <Link to="/cart">
            <Badge count={cart.length} showZero className="pb-1">
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "#000" }}
              />
            </Badge>
          </Link>
        )}
      </div>
      <div className="user-profile">
        {isAuthenticated ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar
              style={{ cursor: "pointer", marginLeft: "20px" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        ) : (
          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
}

export default Header;
