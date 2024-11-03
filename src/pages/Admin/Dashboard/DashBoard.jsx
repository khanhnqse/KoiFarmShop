import { useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  ProductOutlined,
  TagOutlined,
  UnorderedListOutlined,
  PercentageOutlined,
  CommentOutlined,
  PayCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const staffItems = [
  getItem("Koi Management", "/dashboard/sub2", <ProductOutlined />, [
    getItem("Fish Management", "/dashboard/koi"),
    getItem("Koi Management", "/dashboard/fish"),
  ]),
  getItem("Koi Type Management", "/dashboard/koitype", <SmileOutlined />),
  getItem("Consign Management", "/dashboard/consignment", <TagOutlined />),
  getItem("Users Management", "sub1", <UserOutlined />, [
    getItem("Customer Management", "/dashboard/customer"),
  ]),
  getItem("Orders Management", "/dashboard/order", <UnorderedListOutlined />),

  getItem("Feedback Management", "/dashboard/feedback", <CommentOutlined />),
  getItem(
    "Purchase History Management",
    "/dashboard/purchasehistory",
    <PayCircleOutlined />
  ),
];

const managerItems = [
  getItem("Dashboard", "/dashboard/overview", <PieChartOutlined />),
  getItem("Users Management", "sub1", <UserOutlined />, [
    getItem("Customer Management", "/dashboard/customer"),
    getItem("Staff Management", "/dashboard/staff"),
  ]),
  getItem("Promotion ", "/dashboard/promotion", <PercentageOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const items = user.role === "manager" ? managerItems : staffItems;

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
