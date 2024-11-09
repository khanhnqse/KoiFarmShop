import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentUnsuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <Result
        status="error"
        title="Payment Unsuccessful"
        subTitle="Your transaction has not been completed successfully."
        extra={[
          <Button type="primary" key="home" onClick={handleBackToHome}>
            Back to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentUnsuccess;
