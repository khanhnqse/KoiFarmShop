import { PATHS } from "./path";
import { Tag, Image, Button, Dropdown, Menu } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export const MenuItems = [
  {
    label: "Home",
    key: PATHS.HOME,
  },
  {
    label: "About Us",
    key: PATHS.ABOUT_US.INDEX,
  },
  {
    label: "Product",
    key: "SubMenu",
    children: [
      {
        label: "Koi",
        key: PATHS.PRODUCTS.INDEX,
      },
      {
        label: "Fish",
        key: PATHS.FISH.INDEX,
      },
    ],
  },
  {
    label: "Contact",
    key: PATHS.CONTACT.INDEX,
  },
  {
    label: "News",
    key: PATHS.NEWS.INDEX,
  },
  {
    label: "Consignment",
    key: PATHS.CONSIGNMENT.INDEX,
  },
];

// Fish management Table columns

const handleMenuClick = (e, record, handleOpenModal, handleDeleteFish) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteFish(record.koiId);
  }
};

const menu = (record, handleOpenModal, handleDeleteFish) => (
  <Menu
    onClick={(e) =>
      handleMenuClick(e, record, handleOpenModal, handleDeleteFish)
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

export const generalColumns = (handleOpenModal, handleDeleteFish) => [
  {
    title: "ID",
    dataIndex: "koiId",
    key: "koiId",
    sorter: {
      compare: (a, b) => a.koiId - b.koiId,
    },
    defaultSortOrder: "ascend",
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Consign",
    dataIndex: "isConsigned",
    key: "isConsigned",
    render: (isConsigned) => (
      <Tag color={isConsigned ? "green" : "blue"}>
        {isConsigned ? "Consign" : "None"}
      </Tag>
    ),
  },
  {
    title: "Origin",
    dataIndex: "origin",
    key: "origin",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
  },
  {
    title: "Personality",
    dataIndex: "personality",
    key: "personality",
  },
  {
    title: "Feeding Amount",
    dataIndex: "feedingAmount",
    key: "feedingAmount",
  },
  {
    title: "Filter Rate",
    dataIndex: "filterRate",
    key: "filterRate",
  },
  {
    title: "Health Status",
    dataIndex: "healthStatus",
    key: "healthStatus",
  },
  {
    title: "Award Certificates",
    dataIndex: "awardCertificates",
    key: "awardCertificates",
  },
  {
    title: "In stock",
    dataIndex: "quantityInStock",
    key: "quantityInStock",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "available" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={menu(record, handleOpenModal, handleDeleteFish)}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
    fixed: "right",
  },
];

export const detailColumns = [
  {
    title: "ID",
    dataIndex: "koiId",
    key: "koiId",
    sorter: {
      compare: (a, b) => a.koiId - b.koiId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "Image Koi",
    dataIndex: "imageKoi",
    key: "imageKoi",
    render: (imageKoi) => <Image src={imageKoi} width={50} height={50} />,
  },
  {
    title: "Image Certificate",
    dataIndex: "imageCertificate",
    key: "imageCertificate",
    render: (imageCertificate) => (
      <Image src={imageCertificate} width={50} height={50} />
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Detail Description",
    dataIndex: "detailDescription",
    key: "detailDescription",
    render: (detailDescription) =>
      detailDescription
        ? detailDescription.length > 100
          ? `${detailDescription.substring(0, 100)}...`
          : detailDescription
        : "No details available",
  },
];
// Koi management Table columns
const handleMenuKoiClick = (e, record, handleOpenModal, handleDeleteKoi) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteKoi(record.fishesId);
  }
};

const koiMenu = (record, handleOpenModal, handleDeleteKoi) => (
  <Menu
    onClick={(e) =>
      handleMenuKoiClick(e, record, handleOpenModal, handleDeleteKoi)
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

export const koiColumns = (handleOpenModal, handleDeleteKoi) => [
  {
    title: "Fishes ID",
    dataIndex: "fishesId",
    key: "fishesId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Koi Type ID",
    dataIndex: "koiTypeId",
    key: "koiTypeId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Quantity In Stock",
    dataIndex: "quantityInStock",
    key: "quantityInStock",
  },
  {
    title: "Image",
    dataIndex: "imageFishes",
    key: "imageFishes",
    render: (text) => <Image width={100} src={text} />,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Detail Description",
    dataIndex: "detailDescription",
    key: "detailDescription",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={koiMenu(record, handleOpenModal, handleDeleteKoi)}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];
// Customer management Table columns

const handleCustomerMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeleteCustomer,
  handleUpdateCustomerStatus
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteCustomer(record.userId);
  } else if (e.key === "updateStatus") {
    handleUpdateCustomerStatus(record.userId);
  }
};

const customerMenu = (
  record,
  handleOpenModal,
  handleDeleteCustomer,
  handleUpdateCustomerStatus
) => (
  <Menu
    onClick={(e) =>
      handleCustomerMenuClick(
        e,
        record,
        handleOpenModal,
        handleDeleteCustomer,
        handleUpdateCustomerStatus
      )
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Inactive
    </Menu.Item>
    <Menu.Item key="updateStatus" icon={<EyeOutlined />}>
      Active
    </Menu.Item>
  </Menu>
);

export const customerColumns = (
  handleOpenModal,
  handleDeleteCustomer,
  handleUpdateCustomerStatus
) => [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    sorter: {
      compare: (a, b) => a.userId - b.userId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Register Date",
    dataIndex: "registerDate",
    key: "registerDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "Total Points",
    dataIndex: "totalPoints",
    key: "totalPoints",
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (text, record) => (
      <Dropdown
        overlay={customerMenu(
          record,
          handleOpenModal,
          handleDeleteCustomer,
          handleUpdateCustomerStatus
        )}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Staff management Table columns

const handleStaffMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeleteStaff,
  handleUpdateStaffStatus
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteStaff(record.userId);
  } else if (e.key === "updateStatus") {
    handleUpdateStaffStatus(record.userId);
  }
};

const staffMenu = (
  record,
  handleOpenModal,
  handleDeleteStaff,
  handleUpdateStaffStatus
) => (
  <Menu
    onClick={(e) =>
      handleStaffMenuClick(
        e,
        record,
        handleOpenModal,
        handleDeleteStaff,
        handleUpdateStaffStatus
      )
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Inactive
    </Menu.Item>
    <Menu.Item key="updateStatus" icon={<EyeOutlined />}>
      Active
    </Menu.Item>
  </Menu>
);

export const staffColumns = (
  handleOpenModal,
  handleDeleteStaff,
  handleUpdateStaffStatus
) => [
  {
    title: "User ID",
    dataIndex: "userId",
    fixed: "left",
    key: "userId",
    sorter: {
      compare: (a, b) => a.userId - b.userId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role) => (
      <Tag color={role === "manager" ? "red" : "blue"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Tag>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (text, record) => (
      <Dropdown
        overlay={staffMenu(
          record,
          handleOpenModal,
          handleDeleteStaff,
          handleUpdateStaffStatus
        )}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Promotion management Table columns

const handlePromotionMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeletePromotion
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeletePromotion(record.promotionId);
  }
};

const promotionMenu = (record, handleOpenModal, handleDeletePromotion) => (
  <Menu
    onClick={(e) =>
      handlePromotionMenuClick(
        e,
        record,
        handleOpenModal,
        handleDeletePromotion
      )
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

export const promotionColumns = (handleOpenModal, handleDeletePromotion) => [
  {
    title: "Promotion ID",
    dataIndex: "promotionId",
    key: "promotionId",
    sorter: {
      compare: (a, b) => a.promotionId - b.promotionId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "Promotion Name",
    dataIndex: "promotionName",
    key: "promotionName",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Discount Rate",
    dataIndex: "discountRate",
    key: "discountRate",
    render: (text) => `${text}%`, // Render discount rate as a percentage
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status ? "green" : "red"}>
        {status ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={promotionMenu(record, handleOpenModal, handleDeletePromotion)}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Feedback management Table columns
const handleFeedbackMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeleteFeedback
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteFeedback(record.feedbackId);
  }
};

// Feedback Action Menu
const feedbackMenu = (record, handleOpenModal, handleDeleteFeedback) => (
  <Menu
    onClick={(e) =>
      handleFeedbackMenuClick(e, record, handleOpenModal, handleDeleteFeedback)
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

// Feedback Table Columns
export const feedbackColumns = (handleOpenModal, handleDeleteFeedback) => [
  {
    title: "Feedback ID",
    dataIndex: "feedbackId",
    key: "feedbackId",
    fixed: "left",
    sorter: {
      compare: (a, b) => a.feedbackId - b.feedbackId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "User name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Koi name",
    dataIndex: "koiName",
    key: "koiName",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating) => (
      <Tag color={rating >= 4 ? "green" : rating >= 2 ? "orange" : "red"}>
        {rating}
      </Tag>
    ),
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    render: (text) => (
      <span>{text.length > 50 ? text.substring(0, 50) + "..." : text}</span>
    ),
  },
  {
    title: "Feedback Date",
    dataIndex: "feedbackDate",
    key: "feedbackDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (text, record) => (
      <Dropdown
        overlay={feedbackMenu(record, handleOpenModal, handleDeleteFeedback)}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Purchase History Table Columns
export const purchaseHistoryColumns = () => [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    sorter: {
      compare: (a, b) => a.orderId - b.orderId,
    },
    defaultSortOrder: "ascend",
    fixed: "left",
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Purchase Date",
    dataIndex: "purchaseDate",
    key: "purchaseDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "Total Money",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Discount Money",
    dataIndex: "discountMoney",
    key: "discountMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Final Money",
    dataIndex: "finalMoney",
    key: "finalMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (status) => (
      <Tag
        color={
          status === "completed"
            ? "green"
            : status === "pending"
            ? "orange"
            : "red"
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Shipping Date",
    dataIndex: "shippingDate",
    key: "shippingDate",
    render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
  },
  {
    title: "Promotion Name",
    dataIndex: "promotionName",
    key: "promotionName",
  },
  {
    title: "Earned Points",
    dataIndex: "earnedPoints",
    key: "earnedPoints",
  },
  {
    title: "Used Points",
    dataIndex: "usedPoints",
    key: "usedPoints",
  },
];

// Order management Table columns

const handleOrderMenuClick = (
  e,
  record,
  handleUpdateOrderStatus,
  handleShowDetails
) => {
  if (e.key === "updateStatus") {
    handleUpdateOrderStatus(record);
  } else if (e.key === "details") {
    handleShowDetails(record);
  }
};

const orderMenu = (record, handleUpdateOrderStatus, handleShowDetails) => (
  <Menu
    onClick={(e) =>
      handleOrderMenuClick(
        e,
        record,
        handleUpdateOrderStatus,
        handleShowDetails
      )
    }
  >
    <Menu.Item key="updateStatus">Update Status</Menu.Item>
    <Menu.Item key="details" icon={<EyeOutlined />}>
      View Details
    </Menu.Item>
  </Menu>
);

export const orderColumns = (handleUpdateOrderStatus, handleShowDetails) => [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    sorter: {
      compare: (a, b) => a.orderId - b.orderId,
    },
    defaultSortOrder: "ascend",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
    render: (date) => new Date(date).toLocaleDateString(), // Format date
  },
  {
    title: "Total Money",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Final Money",
    dataIndex: "finalMoney",
    key: "finalMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Discount Money",
    dataIndex: "discountMoney",
    key: "discountMoney",
    render: (money) =>
      `${money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
  },
  {
    title: "Earned Points",
    dataIndex: "earnedPoints",
    key: "earnedPoints",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    filters: [
      { text: "Processing", value: "processing" },
      { text: "Canceled", value: "canceled" },
      { text: "Remittance", value: "remittance" },
      { text: "Delivering", value: "delivering" },
    ],
    onFilter: (value, record) => record.orderStatus === value,
    render: (orderStatus) => {
      let color;
      switch (orderStatus) {
        case "completed":
          color = "green";
          break;
        case "processing":
          color = "orange";
          break;
        case "canceled":
          color = "red";
          break;
        case "remittance":
          color = "blue";
          break;
        case "delivering":
          color = "purple";
          break;
        default:
          color = "gray";
      }
      return <Tag color={color}>{orderStatus}</Tag>;
    },
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={orderMenu(record, handleUpdateOrderStatus, handleShowDetails)}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];
