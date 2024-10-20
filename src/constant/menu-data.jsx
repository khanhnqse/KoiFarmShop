import { PATHS } from "./path";
import { Tag, Image, Button, Dropdown, Menu } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
