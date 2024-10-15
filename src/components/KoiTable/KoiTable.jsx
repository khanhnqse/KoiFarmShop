import { Table, Image, Button } from "antd";
import Popup from "../Popup/Popup";

// eslint-disable-next-line react/prop-types
const KoiTable = ({ kois, handleDeleteKoi, handleOpenUpdateModal }) => {
  const columns = [
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
      title: "Image",
      dataIndex: "imageKoi",
      key: "imageKoi",
      render: (imageKoi) => {
        return <Image src={imageKoi} width={50} height={50} />;
      },
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
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image Certificate",
      dataIndex: "imageCertificate",
      key: "imageCertificate",
      render: (imageCertificate) => {
        return <Image src={imageCertificate} width={50} height={50} />;
      },
    },
    {
      title: "Action",
      dataIndex: "koiId",
      key: "koiId",
      fixed: "right",
      render: (koiId, record) => {
        return (
          <>
            <Popup
              title="Unactive Koi"
              description="Are you sure to unactive this koi?"
              onConfirm={() => handleDeleteKoi(koiId)}
            >
              <Button type="primary" danger>
                Unactive
              </Button>
            </Popup>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={() => handleOpenUpdateModal(record)}
            >
              Update
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Table columns={columns} dataSource={kois} scroll={{ x: 1500, y: 450 }} />
  );
};

export default KoiTable;
