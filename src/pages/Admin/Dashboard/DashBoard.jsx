import { useState } from "react";
import {
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
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
  getItem("Overview", "/dashboard/overview", <PieChartOutlined />),
  getItem("Manage Koi", "/dashboard/koi", <MenuFoldOutlined />),
  getItem("Users", "/dashboard/users", <DesktopOutlined />),
  getItem("Settings", "/dashboard/settings", <UserOutlined />),
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
