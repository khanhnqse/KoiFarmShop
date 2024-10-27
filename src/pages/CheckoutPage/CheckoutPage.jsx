import { Tabs, Form, Input, Button, Select, notification, Spin } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

const CheckoutTabs = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { cart } = location.state;

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7285/api/Promotion"
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7285/api/User/${user.userId}`
        );
        const userData = response.data;
        form.setFieldsValue({
          email: userData.email,
          fullname: userData.userName,
          phone: userData.phoneNumber || "",
          address: userData.address || "",
        });
      } catch (error) {
        notification.error({
          message: "Failed to fetch user data",
          description: "There was an error fetching your user data.",
        });
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, form]);

  const handleSubmit = async (values) => {
    console.log("Form data:", values);

    if (activeTabKey === "1") {
      setActiveTabKey("2");
    } else if (activeTabKey === "2") {
      setActiveTabKey("3");
    } else if (activeTabKey === "3") {
      // Prepare the request body
      const orderFishes = cart
        .filter((item) => item.fishesId && item.fishesQuantity)
        .map((item) => ({
          fishesId: item.fishesId,
          quantity: item.fishesQuantity,
        }));
      console.log("orderFishes", orderFishes);

      const orderKois = cart
        .filter((item) => item.KoiId && item.quantity)
        .map((item) => ({
          koiId: item.KoiId,
          quantity: item.quantity,
        }));
      console.log("orderKois", orderKois);
      const requestBody = {
        userId: user.userId,
        paymentMethod: paymentMethod,
        promotionId: selectedPromotion?.promotionId,
        ...(orderFishes.length > 0 && { orderFishes }),
        ...(orderKois.length > 0 && { orderKois }),
      };

      try {
        // Send the request to the API endpoint
        const response = await axios.post(
          "https://localhost:7285/api/Order",
          requestBody
        );
        console.log("Order created:", response.data);
        notification.success({
          message: "Order Created",
          description: "Your order has been created successfully!",
        });
      } catch (error) {
        console.error("Failed to create order:", error);
        notification.error({
          message: "Order Creation Failed",
          description:
            "There was an error creating your order. Please try again.",
        });
      }
    }
  };

  const delivery = 0.0; // Free shipping

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = selectedPromotion
    ? (subtotal * selectedPromotion.discountRate) / 100
    : 0;
  const total = subtotal - discount + delivery;

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <Spin spinning={loading}>
        <div className="flex justify-between">
          {/* Left side - Checkout Form */}
          <div className="w-2/4">
            <Tabs activeKey={activeTabKey} onChange={setActiveTabKey}>
              {/* Shipping Tab */}
              <TabPane tab="1. Shipping" key="1">
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
                      label="Full Name"
                      name="fullname"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your full name!",
                        },
                      ]}
                    >
                      <Input placeholder="Full name" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                  <Form.Item
                    label="Street address"
                    name="address"
                    rules={[
                      { required: true, message: "Please input your address!" },
                    ]}
                  >
                    <Input placeholder="Street Address" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Continue to Delivery
                  </Button>
                </Form>
              </TabPane>

              {/* Delivery Tab */}
              <TabPane tab="2. Delivery" key="2">
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
                      <Option value="express">
                        Express Delivery (1-2 days)
                      </Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Continue to Payment
                  </Button>
                </Form>
              </TabPane>

              {/* Payment Tab */}
              <TabPane tab="3. Payment" key="3">
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                  <Form.Item
                    label="Payment Method"
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: "Please select a payment method!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Payment Method"
                      onChange={(value) => setPaymentMethod(value)}
                    >
                      <Option value="VN Pay">VN Pay</Option>
                      <Option value="Credit Card">Credit Card</Option>
                      <Option value="Bank Transfer">Bank Transfer</Option>
                    </Select>
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Pay with {paymentMethod}
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </div>

          {/* Right side - Order Summary */}
          <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md ">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {cart.map((item, index) => (
              <div
                className="flex justify-between items-center mb-2"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mr-4"
                  />
                  <p>{item.name}</p>
                </div>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p>Promotion</p>
              <Select
                placeholder="Select Promotion"
                onChange={(value) =>
                  setSelectedPromotion(
                    promotions.find((promo) => promo.promotionId === value) ||
                      null
                  )
                }
                style={{ width: "200px" }}
              >
                <Option value={null}>None</Option>
                {promotions.map((promo) => (
                  <Option key={promo.promotionId} value={promo.promotionId}>
                    {promo.promotionName}
                  </Option>
                ))}
              </Select>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Delivery</p>
              <p>${delivery.toFixed(2)}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CheckoutTabs;
