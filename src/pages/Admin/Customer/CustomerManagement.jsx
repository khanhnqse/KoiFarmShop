import { useEffect, useState } from "react";
import { Button, Typography, message, Form } from "antd";
import axios from "axios";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import CustomerModal from "../../../components/Modals/customerModal";
import CustomerTable from "../../../components/Tables/customerTable";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();
  const api = "http://localhost:5090/api/User";

  const fetchCustomers = async () => {
    const response = await axios.get(api);
    setCustomers(response.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

 const handleOpenCreateModal = () => {
    form.resetFields();  // Clear form fields
    setOpenModal(true);  // Open the modal for creating a new customer
  };

  const handleSubmitCustomer = async (customer) => {
    customer.registerDate = customer.registerDate
      ? customer.registerDate.format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    try {
      setSubmitting(true);
      await axios.post(api, customer);
      message.success("Customer created successfully");
      setOpenModal(false);
      fetchCustomers();
      form.resetFields();
    } catch (error) {
      message.error("Failed to create customer");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

 

  const handleUpdateCustomer = async (customer) => {
    try {
      setSubmitting(true);
      await axios.put(`${api}/${selectedCustomer.userId}`, customer);
      message.success("Customer updated successfully");
      setUpdateModalOpen(false);
      fetchCustomers();
      form.resetFields();
    } catch (error) {
      message.error("Failed to update customer");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCustomer = async (userId) => {
    try {
      await axios.delete(`${api}/${userId}`);
      message.success("Customer deleted successfully");
      fetchCustomers();
    } catch (error) {
      message.error("Failed to delete customer");
      console.error(error);
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Customer Management</Typography.Title>
      <Button onClick={handleOpenCreateModal}>
        <PlusOutlined /> Add New Customer
      </Button>

      <CustomerTable
        customers={customers.filter((c) => c.role === "customer")}
        handleOpenUpdateModal={(customer) => {
          setSelectedCustomer(customer);
          setUpdateModalOpen(true);
          form.setFieldsValue({
            ...customer,
            registerDate: moment(customer.registerDate),
          });
        }}
        handleDeleteCustomer={handleDeleteCustomer}
      />

      <CustomerModal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSubmitCustomer}
        form={form}
        submitting={submitting}
        title="Add New Customer"
      />

      <CustomerModal
        visible={updateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
        onOk={handleUpdateCustomer}
        form={form}
        submitting={submitting}
        title="Update Customer"
      />
    </div>
  );
};

export default CustomerManagement;
