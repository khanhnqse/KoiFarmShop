import { useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  ProductOutlined,
  TagOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Koi Management", "/dashboard/koi", <ProductOutlined />),
  getItem("Consign Management", "/dashboard/consignment", <TagOutlined />),
  getItem("Users Management", "sub1", <UserOutlined />, [
    getItem("Customer Management", "/dashboard/customer"),
    getItem("Staff Management", "/dashboard/staff"),
  ]),
  getItem("Orders Management", "/dashboard/order", <UnorderedListOutlined />),
  getItem("Promotion ", "/dashboard/promotion", <PercentageOutlined />),
  getItem("Setting", "6", <LogoutOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["/dashboard/overview"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
