import { Layout, Menu, Input, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.css";

const { Header: AntHeader } = Layout;

function Header() {
  return (
    <AntHeader style={{ backgroundColor: "#FFFFFF" }} className="header">
      <div className="logo">
        <img
          src="https://exclusivelykoi.co.uk/themes/exclusively-koi/assets/img/logo-black.svg"
          alt="Exclusively Koi"
          style={{ width: "120px" }}
        />
      </div>
      <Menu
        style={{ backgroundColor: "transparent" }}
        theme="dark"
        mode="horizontal"
        className="Menu"
      >
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </Menu>
      <div className="search-bar">
        <Input.Search
          placeholder="Search"
          enterButton="Search"
          style={{ maxWidth: 300 }}
        />
      </div>
      <div className="cart">
        <Badge count={0} showZero>
          <ShoppingCartOutlined style={{ fontSize: "24px", color: "#000" }} />
        </Badge>
      </div>
    </AntHeader>
  );
}

export default Header;
