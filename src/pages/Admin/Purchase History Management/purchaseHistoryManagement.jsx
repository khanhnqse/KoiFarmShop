import { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import { fetchPurchaseHistoryData } from "../../../services/sevice";
import { purchaseHistoryColumns } from "../../../constant/menu-data";

const PurchaseHistoryManagement = () => {
  const [purchaseHistories, setPurchaseHistories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPurchaseHistoryData();
  }, []);

  const loadPurchaseHistoryData = async () => {
    setLoading(true);
    const purchaseHistoryData = await fetchPurchaseHistoryData();
    setPurchaseHistories(purchaseHistoryData);
    setLoading(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Purchase History Management</Typography.Title>
      <Table
        columns={purchaseHistoryColumns(null)}
        dataSource={purchaseHistories}
        loading={loading}
        rowKey="orderId"
        scroll={{ x: 1500, y: 450 }}
      />
    </div>
  );
};

export default PurchaseHistoryManagement;
