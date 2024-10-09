import { Layout, Menu, Input, Badge, Avatar, Dropdown } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.css";
import { MenuItems } from "../../constant/menu-data";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>

      <Menu.Item key="logout" onClick={() => navigate("/logout")}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader style={{ backgroundColor: "#FFFFFF" }} className="header">
      <div className="logo">
        <img src={logo} alt="Exclusively Koi" style={{ width: "120px" }} />
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

      <div className="search-bar">
        <Input.Search
          className="p-8 w-[350px]"
          placeholder="Search"
          enterButton="Search"
        />
      </div>
      <div className="cart pt-3">
        <Link to="/cart">
          <Badge count={1} showZero className="pb-1">
            <ShoppingCartOutlined style={{ fontSize: "24px", color: "#000" }} />
          </Badge>
        </Link>
      </div>
      <div className="user-profile">
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Avatar
            style={{ cursor: "pointer", marginLeft: "20px" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
}

export default Header;
