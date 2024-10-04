import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MainContextProvider } from "../../context/MainContext";

const MainLayout = () => {
  return (
    <>
      <MainContextProvider>
        <Layout style={{ overflowX: "hidden" }}>
          <Header />
          <Layout>
            <Content style={{ backgroundColor: "#fff" }}>
              <Outlet />
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
