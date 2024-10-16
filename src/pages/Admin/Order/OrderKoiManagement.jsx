import {
    Button,
    Form,
    InputNumber,
    message,
    Modal,
    Row,
    Col,
    Table,
    Typography,
    Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

function OrderKoiManagement() {
    const [orders, setOrders] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form] = useForm();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const api = "http://localhost:5090/api/Order";

    const fetchOrders = async () => {
        const response = await axios.get(api);
        setOrders(response.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Koi ID",
            dataIndex: "koiId",
            key: "koiId",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            dataIndex: "orderId",
            key: "orderId",
            render: (orderId, record) => (
                <>
                    <Button type="primary" onClick={() => handleOpenUpdateModal(record)}>
                        Update
                    </Button>
                </>
            ),
        },
    ];

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmitOrder = async (order) => {
        try {
            setSubmitting(true);
            await axios.post(api, order);
            message.success("Order created successfully");
            setOpenModal(false);
            fetchOrders();
            form.resetFields();
        } catch (error) {
            message.error("Failed to create order");
            console.error("Create order error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateOrder = async (order) => {
        try {
            setSubmitting(true);
            await axios.put(`${api}/${selectedOrder.orderId}`, order);
            message.success("Order updated successfully");
            setUpdateModalOpen(false);
            fetchOrders();
            form.resetFields();
        } catch (error) {
            message.error("Failed to update order");
            console.error("Delete order error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleOpenUpdateModal = (order) => {
        setSelectedOrder(order);
        setUpdateModalOpen(true);
        form.setFieldsValue(order);
    };

    return (
        <div>
            <Typography.Title level={2}>Order Management</Typography.Title>
            <Button onClick={handleOpenModal}>Create New Order</Button>
            <Table columns={columns} dataSource={orders} />

            {/* Create Order Modal */}
            <Modal
                confirmLoading={submitting}
                title="Create Order"
                open={openModal}
                onCancel={handleCloseModal}
                onOk={() => form.submit()}
            >
                <Form onFinish={handleSubmitOrder} form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Order ID" name="orderId" rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Koi ID" name="koiId" rules={[{ required: true }]}>
                                <Select>
                                    {/* Populate options with available Koi */}
                                    <Select.Option value={1}>Koi 1</Select.Option>
                                    <Select.Option value={2}>Koi 2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Update Order Modal */}
            <Modal
                confirmLoading={submitting}
                title="Update Order"
                open={updateModalOpen}
                onCancel={() => setUpdateModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form onFinish={handleUpdateOrder} form={form} layout="vertical">
                    {/* Similar to Create Form */}
                </Form>
            </Modal>
        </div>
    );
}

export default OrderKoiManagement;
