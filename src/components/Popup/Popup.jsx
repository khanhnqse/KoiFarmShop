/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";

const Popup = ({ title, description, onConfirm, children }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    onConfirm();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default Popup;
