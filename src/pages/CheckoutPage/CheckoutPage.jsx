import { Tabs, Form, Input, Button, Select } from "antd";
import { useState } from "react";

const { TabPane } = Tabs;
const { Option } = Select;

const CheckoutTabs = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleSubmit = (values) => {
    console.log("Form data:", values);
    // Move to the next tab
    if (activeTabKey === "1") {
      setActiveTabKey("2");
    } else if (activeTabKey === "2") {
      setActiveTabKey("3");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="flex justify-between">
        {/* Left side - Checkout Form */}
        <div className="w-2/4">
          <Tabs activeKey={activeTabKey} onChange={setActiveTabKey}>
            {/* Shipping Tab */}
            <TabPane tab="1. Shipping" key="1">
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Email address"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="youremail@gmail.com" />
                </Form.Item>
                <div className="flex space-x-4">
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Street address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input placeholder="Street Address" />
                </Form.Item>
                <Form.Item
                  label="Apartment, Building, Floor (optional)"
                  name="apartment"
                >
                  <Input placeholder="Apartment, Building, Floor" />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please select your country!" },
                  ]}
                >
                  <Select placeholder="Select Country">
                    <Option value="USA">USA</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="UK">UK</Option>
                    {/* Add more countries as options */}
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Continue to Delivery
                </Button>
              </Form>
            </TabPane>

            {/* Delivery Tab */}
            <TabPane tab="2. Delivery" key="2">
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Delivery Option"
                  name="deliveryOption"
                  rules={[
                    {
                      required: true,
                      message: "Please select a delivery option!",
                    },
                  ]}
                >
                  <Select placeholder="Select Delivery Option">
                    <Option value="standard">
                      Standard Delivery (3-5 days)
                    </Option>
                    <Option value="express">Express Delivery (1-2 days)</Option>
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Continue to Payment
                </Button>
              </Form>
            </TabPane>

            {/* Payment Tab */}
            <TabPane tab="3. Payment" key="3">
              <Tabs defaultActiveKey="1">
                {/* Credit Card Tab */}
                <TabPane tab="Credit Card" key="1">
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      label="Card Number"
                      name="cardNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your card number!",
                        },
                      ]}
                    >
                      <Input placeholder="XXXX XXXX XXXX XXXX" />
                    </Form.Item>
                    <div className="flex space-x-4">
                      <Form.Item
                        label="Expiry Date"
                        name="expiryDate"
                        className="flex-1"
                        rules={[
                          {
                            required: true,
                            message: "Please input expiry date!",
                          },
                        ]}
                      >
                        <Input placeholder="MM/YY" />
                      </Form.Item>
                      <Form.Item
                        label="CVV"
                        name="cvv"
                        className="flex-1"
                        rules={[
                          { required: true, message: "Please input CVV!" },
                        ]}
                      >
                        <Input placeholder="XXX" />
                      </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit" block>
                      Pay with Credit Card
                    </Button>
                  </Form>
                </TabPane>

                {/* PayPal Tab */}
                <TabPane tab="PayPal" key="2">
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      label="PayPal Email"
                      name="paypalEmail"
                      rules={[
                        {
                          required: true,
                          message: "Please input your PayPal email!",
                        },
                      ]}
                    >
                      <Input placeholder="youremail@paypal.com" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Pay with PayPal
                    </Button>
                  </Form>
                </TabPane>

                {/* Bank Transfer Tab */}
                <TabPane tab="Bank Transfer" key="3">
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      label="Bank Name"
                      name="bankName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your bank name!",
                        },
                      ]}
                    >
                      <Input placeholder="Your Bank Name" />
                    </Form.Item>
                    <Form.Item
                      label="Account Number"
                      name="accountNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your account number!",
                        },
                      ]}
                    >
                      <Input placeholder="Your Account Number" />
                    </Form.Item>
                    <Form.Item
                      label="Routing Number"
                      name="routingNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your routing number!",
                        },
                      ]}
                    >
                      <Input placeholder="Your Routing Number" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Pay with Bank Transfer
                    </Button>
                  </Form>
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </div>

        {/* Right side - Order Summary */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <p>Product title name goes here</p>
            <p>$000.00</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Product title name goes here</p>
            <p>$000.00</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mb-2">
            <p>Discount</p>
            <p>-$00.00</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Giftcard</p>
            <p>-$00.00</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mb-2">
            <p>Subtotal</p>
            <p>$00.00</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Delivery</p>
            <p>--</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Taxes</p>
            <p>--</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center font-semibold">
            <p>Total</p>
            <p>$00.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTabs;
