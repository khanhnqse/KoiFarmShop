import {
  Tabs,
  Form,
  Input,
  Button,
  Select,
  notification,
  Spin,
  InputNumber,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const CheckoutTabs = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [form] = Form.useForm();
  const { user, setCart } = useAuth();
  const [paymentMethod] = useState("VN Pay");
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showNewAddressInput, setShowNewAddressInput] = useState(false);
  const location = useLocation();
  const { cart } = location.state;
  const navigate = useNavigate();

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
          paymentMethod: "VN Pay", // Set default payment method
        });
        setTotalPoints(userData.totalPoints); // Set total points
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

    const fetchAddresses = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7285/api/User/getAddressesByUserId/${user.userId}`
        );
        setAddresses(response.data);
      } catch (error) {
        notification.error({
          message: "Failed to fetch addresses",
          description: "There was an error fetching your addresses.",
        });
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchAddresses();
  }, [user, form]);

  const handleAddressChange = (value) => {
    if (value === "new") {
      setShowNewAddressInput(true);
    } else {
      setShowNewAddressInput(false);
      const selectedAddress = addresses.find(
        (address) => address.addressID === value
      );
      form.setFieldsValue({
        address: selectedAddress.address,
      });
    }
  };

  const handleAddNewAddress = () => {
    form.setFieldsValue({
      address: newAddress,
    });
    setShowNewAddressInput(false);
    setNewAddress("");
  };

  const handleSubmit = async (values) => {
    console.log("Form data:", values);

    if (activeTabKey === "1") {
      setActiveTabKey("2");
    } else if (activeTabKey === "2") {
      // Prepare the request body
      const orderFishes = cart
        .filter((item) => item.fishesId && item.quantity)
        .map((item) => ({
          fishesId: item.fishesId,
          quantity: item.quantity,
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
        usedPoints: usedPoints, // Add usedPoints to the request body
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
        // Clear the cart
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/orders"); // Redirect to the orders page
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = selectedPromotion
    ? (subtotal * selectedPromotion.discountRate) / 100
    : 0;
  const total = subtotal - discount;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const tabItems = [
    {
      key: "1",
      label: "1. Shipping",
      children: (
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            paymentMethod: "VN Pay", // Set default payment method
          }}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="youremail@gmail.com" />
          </Form.Item>
          <div className="flex space-x-4">
            <Form.Item
              label="Full Name"
              name="fullname"
              className="flex-1"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
          </div>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Street address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            {showNewAddressInput ? (
              <div>
                <Input
                  value={newAddress}
                  placeholder="Enter new address"
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <Button
                  type="primary"
                  onClick={handleAddNewAddress}
                  style={{ marginTop: "10px" }}
                >
                  Add Address
                </Button>
              </div>
            ) : (
              <Select
                placeholder="Select an address"
                onChange={handleAddressChange}
                style={{ width: "100%" }}
              >
                {addresses.map((address) => (
                  <Option key={address.addressID} value={address.addressID}>
                    {address.address}
                  </Option>
                ))}
                <Option className="bg-cyan-200" value="new">
                  Enter new address
                </Option>
              </Select>
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Continue to Payment
          </Button>
        </Form>
      ),
    },
    {
      key: "2",
      label: "2. Payment",
      children: (
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            paymentMethod: "VN Pay", // Set default payment method
          }}
        >
          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select a payment method!" },
            ]}
          >
            <Select placeholder="Select Payment Method" readOnly>
              <Option value="VN Pay">VN Pay</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Place Order
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <Spin spinning={loading}>
        <div className="flex justify-between">
          {/* Left side - Checkout Form */}
          <div className="w-2/4">
            <Tabs
              activeKey={activeTabKey}
              onChange={setActiveTabKey}
              items={tabItems}
            />
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
                <p>{formatPrice(item.price)}</p>
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
                {promotions
                  .filter((promo) => promo.status === true)
                  .map((promo) => (
                    <Option key={promo.promotionId} value={promo.promotionId}>
                      {promo.promotionName}
                    </Option>
                  ))}
              </Select>
            </div>

            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
            {selectedPromotion && (
              <div className="flex justify-between items-center mb-2">
                <p>Discount Rate</p>
                <p>{selectedPromotion.discountRate}%</p>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p>Total Points</p>
              <p>{totalPoints}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Use Points</p>
              <InputNumber
                min={0}
                max={totalPoints}
                value={usedPoints}
                onChange={(value) => setUsedPoints(value)}
              />
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p>{formatPrice(total)}</p>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CheckoutTabs;
