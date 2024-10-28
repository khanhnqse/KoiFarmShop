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
    label: "Products",
    key: PATHS.PRODUCTS.INDEX,
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
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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

// Customer management Table columns

const handleCustomerMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeleteCustomer
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteCustomer(record.userId);
  }
};

const customerMenu = (record, handleOpenModal, handleDeleteCustomer) => (
  <Menu
    onClick={(e) =>
      handleCustomerMenuClick(e, record, handleOpenModal, handleDeleteCustomer)
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

export const customerColumns = (handleOpenModal, handleDeleteCustomer) => [
  {
    title: "User ID",
    dataIndex: "userId",
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
  },
  {
    title: "Total Points",
    dataIndex: "totalPoints",
    key: "totalPoints",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={customerMenu(record, handleOpenModal, handleDeleteCustomer)}
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
  handleDeleteStaff
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteStaff(record.userId);
  }
};

const staffMenu = (record, handleOpenModal, handleDeleteStaff) => (
  <Menu
    onClick={(e) =>
      handleStaffMenuClick(e, record, handleOpenModal, handleDeleteStaff)
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

export const staffColumns = (handleOpenModal, handleDeleteStaff) => [
  {
    title: "User ID",
    dataIndex: "userId",
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
    title: "Role",
    dataIndex: "role",
    key: "role",
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
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={staffMenu(record, handleOpenModal, handleDeleteStaff)}
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
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
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
  },
  {
    title: "Action",
    key: "action",
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
export const purchaseHistoryMenu = (
  record,
  handleOpenModal,
  handleDeletePurchaseHistory
) => (
  <Menu
    onClick={(e) =>
      handleMenuClick(e, record, handleOpenModal, handleDeletePurchaseHistory)
    }
  >
    <Menu.Item key="edit">Edit</Menu.Item>
    <Menu.Item key="delete">Delete</Menu.Item>
  </Menu>
);

export const purchaseHistoryColumns = (
  handleOpenModal,
  handleDeletePurchaseHistory
) => [
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
    render: (money) => (money !== undefined ? `$${money.toFixed(2)}` : "$0.00"), // Format money with fallback
  },
  {
    title: "Discount Money",
    dataIndex: "discountMoney",
    key: "discountMoney",
    render: (money) => (money !== undefined ? `$${money.toFixed(2)}` : "$0.00"), // Format money with fallback
  },
  {
    title: "Final Money",
    dataIndex: "finalMoney",
    key: "finalMoney",
    render: (money) => (money !== undefined ? `$${money.toFixed(2)}` : "$0.00"), // Format money with fallback
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
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    key: "deliveryStatus",
  },
  {
    title: "Promotion ID",
    dataIndex: "promotionId",
    key: "promotionId",
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
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={purchaseHistoryMenu(
          record,
          handleOpenModal,
          handleDeletePurchaseHistory
        )}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

// Order management Table columns

const handleOrderMenuClick = (
  e,
  record,
  handleOpenModal,
  handleDeleteOrder,
  handleShowDetails
) => {
  if (e.key === "edit") {
    handleOpenModal(record);
  } else if (e.key === "delete") {
    handleDeleteOrder(record.orderId);
  } else if (e.key === "details") {
    handleShowDetails(record);
  }
};

const orderMenu = (
  record,
  handleOpenModal,
  handleDeleteOrder,
  handleShowDetails
) => (
  <Menu
    onClick={(e) =>
      handleOrderMenuClick(
        e,
        record,
        handleOpenModal,
        handleDeleteOrder,
        handleShowDetails
      )
    }
  >
    <Menu.Item key="edit" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
    <Menu.Item key="details" icon={<EyeOutlined />}>
      View Details
    </Menu.Item>
  </Menu>
);

export const orderColumns = (
  handleOpenModal,
  handleDeleteOrder,
  handleShowDetails
) => [
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
  },
  {
    title: "Total Money",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (money) => `$${money.toFixed(2)}`,
  },
  {
    title: "Final Money",
    dataIndex: "finalMoney",
    key: "finalMoney",
    render: (money) => `$${money.toFixed(2)}`,
  },
  {
    title: "Discount Money",
    dataIndex: "discountMoney",
    key: "discountMoney",
    render: (money) => `$${money.toFixed(2)}`,
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
    render: (status) => (
      <Tag color={status === "completed" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    key: "deliveryStatus",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={orderMenu(
          record,
          handleOpenModal,
          handleDeleteOrder,
          handleShowDetails
        )}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];
