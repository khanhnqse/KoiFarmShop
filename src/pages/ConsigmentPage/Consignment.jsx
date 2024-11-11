import { useState } from "react";
import { Button, Typography, Modal, Tabs } from "antd";
import ConsignmentOutside from "./ConsignmentOutside";
import ConsignmentInside from "./ConsignmentInside";
import "./Consignment.css";
import Policy from "../../components/Policy/Policy";

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

  return (
    <div
      className="consignment-background"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/reserve/SeDltunFRnuGnH2lxTKQ_14554993045_1ce7788ca8_o.jpg?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Change the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px", // Adjust the padding as needed
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
          maxWidth: "1000px", // Set the maximum width of the form
          width: "100%",
        }}
      >
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

        <div className="mt-4 text-right">
          <Button
            type="default"
            onClick={() =>
              window.open(
                "https://docs.google.com/document/d/1xdbrSZMbdxcW5i8LMrqzJNXJ_8CrKdv9XobRaIeVWwY/edit?usp=sharing",
                "_blank"
              )
            }
          >
            Consignment agreement
          </Button>
          <Button
            type="default"
            onClick={showPolicyModal}
            style={{ marginLeft: "10px" }}
          >
            View Policy
          </Button>
        </div>
      </div>

      {/* Policy Modal */}
      <Modal
        title="Consignment Policy"
        visible={isPolicyModalVisible}
        onOk={handlePolicyModalOk}
        onCancel={handlePolicyModalCancel}
        width={800} // Set the width of the modal
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
