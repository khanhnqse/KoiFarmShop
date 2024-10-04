import { Form, Input, Button, Typography, message } from "antd";
import React from "react";

const ContactUsForm = () => {
  //   const onFinish = (values) => {
  //     console.log("Received values:", values);
  //     message.success("Your message has been sent successfully!");
  //     // Here you can add your form submission logic (e.g., API call)
  //   };

  const [result, setResult] = React.useState("");

  const onSubmit = async (values) => {
    setResult("Sending...");

    const formData = new FormData();
    formData.append("name", values.name.first + " " + values.name.last);
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("access_key", "08d6dceb-4e8d-44fd-941d-d8a6c301be34");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        message.success("Your message has been sent!");
      } else {
        console.log("Error", data);
        setResult(data.message);
        message.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred. Please try again later.");
      message.error("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="w-full md:w-1/2 md:pr-4">
        <img
          src="https://bbt.1cdn.vn/2023/02/10/467ed1b558d98287dbc8.jpg"
          alt="Contact Us"
          className="rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Name"
            name={["name", "first"]}
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input placeholder="First" />
          </Form.Item>

          <Form.Item
            name={["name", "last"]}
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input placeholder="Last" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input placeholder="Your Email" />
          </Form.Item>

          <Form.Item
            label="Leave us a few words"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Your Message" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text>{result}</Typography.Text>
      </div>
    </div>
  );
};

export default ContactUsForm;
