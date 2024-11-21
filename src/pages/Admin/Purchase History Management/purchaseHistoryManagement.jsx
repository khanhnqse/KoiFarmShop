import { useState, useEffect } from "react";
import { Table, Typography, Input } from "antd";
import { fetchPurchaseHistoryData } from "../../../services/sevice";
import { purchaseHistoryColumns } from "../../../constant/menu-data";

const PurchaseHistoryManagement = () => {
  const [purchaseHistories, setPurchaseHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");

  useEffect(() => {
    loadPurchaseHistoryData();
  }, []);

  const loadPurchaseHistoryData = async () => {
    setLoading(true);
    const purchaseHistoryData = await fetchPurchaseHistoryData();
    setPurchaseHistories(purchaseHistoryData);
    setLoading(false);
  };

  const filteredPurchaseHistories = purchaseHistories.filter((history) => {
    return (
      (searchUsername
        ? history.username.toLowerCase().includes(searchUsername.toLowerCase())
        : true) &&
      (searchOrderId
        ? history.orderId.toString().includes(searchOrderId)
        : true)
    );
  });

  return (
    <div>
      <Typography.Title level={2}>Purchase History Management</Typography.Title>
      <Input
        className="mr-4"
        placeholder="Search by Username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        style={{ width: "30%", marginBottom: 20 }}
      />
      <Input
        className="mr-4"
        placeholder="Search by Order ID"
        value={searchOrderId}
        onChange={(e) => setSearchOrderId(e.target.value)}
        style={{ width: "30%", marginBottom: 20 }}
      />
      <Table
        columns={purchaseHistoryColumns(null)}
        dataSource={filteredPurchaseHistories}
        loading={loading}
        rowKey="orderId"
        scroll={{ x: 1500, y: 450 }}
      />
    </div>
  );
};

export default PurchaseHistoryManagement;
