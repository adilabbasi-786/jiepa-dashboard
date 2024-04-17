import React, { useState } from "react";
import { Table, Tag } from "antd";
import Sidebar from "../components/Sidebar";

const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    fixed: "left",
  },
  {
    title: "Column 2",
    dataIndex: "address",
  },
  {
    title: "Column 3",
    dataIndex: "address",
  },
  {
    title: "Column 4",
    dataIndex: "address",
  },
  {
    title: "Column 5",
    dataIndex: "address",
  },
  {
    title: "Column 6",
    dataIndex: "address",
  },
  {
    title: "Column 7",
    dataIndex: "address",
  },
  {
    title: "Column 8",
    dataIndex: "address",
  },
  {
    title: "Accept",
    fixed: "right",
    width: 90,
    render: (_, record) => (
      <Tag color={record.action === "accept" ? "green" : "default"}>
        {record.action === "accept" ? "Accepted" : "Accept"}
      </Tag>
    ),
  },
  {
    title: "Decline",
    width: 90,
    render: (_, record) => (
      <Tag color={record.action === "decline" ? "red" : "default"}>
        {record.action === "decline" ? "Declined" : "Decline"}
      </Tag>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Japa",
    age: 23,
    address: "Ulaanbaatar",
    action: "", // Initialize action as an empty string
  },
];

const Notification = () => {
  const [dataSource, setDataSource] = useState(data);

  const handleAction = (key, action) => {
    // Update the action for the corresponding record
    setDataSource((prevData) =>
      prevData.map((record) =>
        record.key === key ? { ...record, action } : record
      )
    );
  };

  return (
    <>
      <Sidebar>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{
            x: 1300,
          }}
          pagination={false}
          bordered
          onRow={(record) => ({
            onClick: () =>
              handleAction(
                record.key,
                record.action === "accept" ? "decline" : "accept"
              ),
          })}
        />
      </Sidebar>
    </>
  );
};

export default Notification;
