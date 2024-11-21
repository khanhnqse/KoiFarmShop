import { useState } from "react";
import { Button, Typography, Modal, Tabs } from "antd";
import ConsignmentOutside from "./ConsignmentOutside";
import ConsignmentInside from "./ConsignmentInside";
import "./Consignment.css";
import Policy from "../../components/Policy/Policy";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

const Consignment = () => {
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);

  const showPolicyModal = () => {
    setIsPolicyModalVisible(true);
  };

  const handlePolicyModalOk = () => {
    setIsPolicyModalVisible(false);
  };

  const handlePolicyModalCancel = () => {
    setIsPolicyModalVisible(false);
  };

  const handleDownloadAgreement = () => {
    const link = document.createElement("a");
    link.href =
      "https://firebasestorage.googleapis.com/v0/b/student-management-c2fb4.appspot.com/o/H%E1%BB%A2P%20%C4%90%E1%BB%92NG%20K%C3%9D%20G%E1%BB%ACI%20C%C3%81%20KOI.docx?alt=media&token=6155ff35-1061-42d0-91f2-7438db8e1100";
    link.download = "Consignment_Agreement.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="consignment-background"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/reserve/SeDltunFRnuGnH2lxTKQ_14554993045_1ce7788ca8_o.jpg?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Change the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="consignment-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div className="mt-4 text-right">
          <Button type="default" onClick={handleDownloadAgreement}>
            Download Contract <DownloadOutlined />
          </Button>
          <Button
            type="primary"
            onClick={showPolicyModal}
            style={{ marginLeft: "10px" }}
          >
            View Policy
          </Button>
        </div>
        <Title level={3} className="form-title">
          Consignment Koi
        </Title>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Consignment Outside" key="1">
            <ConsignmentOutside />
          </TabPane>
          <TabPane tab="Consignment Inside" key="2">
            <ConsignmentInside />
          </TabPane>
        </Tabs>
      </div>

      {/* Policy Modal */}
      <Modal
        title="Consignment Policy"
        visible={isPolicyModalVisible}
        onOk={handlePolicyModalOk}
        onCancel={handlePolicyModalCancel}
        width={800}
        footer={[
          <Button key="ok" type="primary" onClick={handlePolicyModalOk}>
            OK
          </Button>,
        ]}
      >
        <Policy />
      </Modal>
    </div>
  );
};

export default Consignment;
