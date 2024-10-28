import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <Result
        status="success"
        title="Payment Successful"
        subTitle="Thank you for your payment. Your transaction has been completed successfully."
        extra={[
          <Button type="primary" key="home" onClick={handleBackToHome}>
            Back to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
