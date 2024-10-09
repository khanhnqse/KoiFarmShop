import { Layout, Menu, Badge, Avatar, Dropdown, Button, message } from "antd";
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
  const { isAuthenticated, logout } = useAuth();
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

      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
        items={MenuItems}
      />

      {/* <div className="search-bar">
        <Input.Search
          className="p-8 w-[350px]"
          placeholder="Search"
          enterButton="Search"
        />
      </div> */}
      <div className="cart pt-3">
        <Link to="/cart">
          <Badge count={1} showZero className="pb-1">
            <ShoppingCartOutlined style={{ fontSize: "24px", color: "#000" }} />
          </Badge>
        </Link>
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
