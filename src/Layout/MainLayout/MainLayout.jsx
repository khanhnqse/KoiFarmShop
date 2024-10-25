import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MainContextProvider } from "../../context/MainContext";
import { PATHS } from "../../constant/path";

const MainLayout = () => {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith(PATHS.DASHBOARD.INDEX);

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
          {!isDashboardPath && <Footer />}
        </Layout>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
