import { Table, Button, Popconfirm } from "antd";
import PropTypes from "prop-types";

const CustomerTable = ({ customers, handleOpenUpdateModal, handleDeleteCustomer }) => {
  const columns = [
    { title: "ID", dataIndex: "userId", key: "userId", sorter: (a, b) => a.userId - b.userId },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role", render: (role) => (
      <span style={{ color: role === "admin" ? "red" : "blue" }}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    )},
    { title: "Status", dataIndex: "status", key: "status", render: (status) => (
      <span style={{ color: status === "active" ? "green" : "red" }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )},
    { title: "Action", key: "action", render: (_, record) => (
      <>
        <Button onClick={() => handleOpenUpdateModal(record)} type="primary" style={{ marginRight: 8 }}>
          Update
        </Button>
        <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteCustomer(record.userId)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      </>
    )}
  ];

  return <Table columns={columns} dataSource={customers} scroll={{ x: 1500, y: 450 }} />;
};

// Add PropTypes for validation
CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  handleOpenUpdateModal: PropTypes.func.isRequired,
  handleDeleteCustomer: PropTypes.func.isRequired,
};

export default CustomerTable;
