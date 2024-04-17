import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { supabase } from "../config/supabaseClient";
import Sidebar from "../components/Sidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          setError(error.message);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 100,
    },
    {
      title: "Register Number",
      dataIndex: "register_num",
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
    },
    {
      title: "Edit",
      dataIndex: "id", // Assuming 'id' is the unique identifier
      fixed: "right",
      width: 90,
      render: (id) => <a>Edit</a>,
    },
    {
      title: "Remove",
      dataIndex: "id", // Assuming 'id' is the unique identifier
      width: 90,
      render: (id) => <a>Remove</a>,
    },
  ];

  return (
    <>
      <Sidebar>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            scroll={{ x: 1300 }}
            pagination={false}
            bordered
          />
        )}
      </Sidebar>
    </>
  );
};

export default UsersPage;
