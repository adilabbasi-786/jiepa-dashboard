"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { supabase } from "../config/supabaseClient";
import Sidebar from "../components/Sidebar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      let { data: appointments, error } = await supabase
        .from("appointments")
        .select("*");
      if (error) {
        setError(error.message);
      } else {
        console.log("appointments", appointments);
        setAppointments(appointments);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (record) => {
    console.log("delete", fetchAppointments);
    try {
      await supabase.from("appointments").delete().eq("id", record.id);
      await fetchAppointments();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEdit = (record) => {
    setEditFormData(record);
    setEditModalVisible(true);
  };
  const handleEditOk = async () => {
    try {
      await supabase
        .from("appointments")
        .update(editFormData)
        .eq("id", editFormData.id);
      setEditModalVisible(false);
      fetchAppointments();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "av_day",
      dataIndex: "av_day",
      key: "av_day",
      width: "20%",
    },
    {
      title: "days",
      dataIndex: "days",
      key: "days",
      width: "20%",
    },
    {
      title: "canceled_reason",
      dataIndex: "canceled_reason",
      key: "canceled_reason",
      width: "20%",
    },
    {
      title: "canceled_at",
      dataIndex: "canceled_at",
      key: "canceled_at",
      width: "20%",
    },

    {
      title: "updated_at",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "20%",
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      key: "created_at",
      width: "20%",
    },
    {
      title: "user_id",
      dataIndex: "user_id",
      key: "user_id",
      width: "20%",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
    {
      title: "cenceled_user",
      dataIndex: "cenceled_user",
      key: "cenceled_user",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => handleDelete(record)} type="link">
            Delete
          </Button>
          <Button onClick={() => handleEdit(record)} type="link">
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Sidebar>
        <Table columns={columns} dataSource={appointments} />;
        <Modal
          title="Edit Appointment"
          open={editModalVisible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={editFormData}
            onValuesChange={(changedValues, allValues) =>
              setEditFormData(allValues)
            }
          >
            <Form.Item
              name="av_day"
              label="Available Day"
              rules={[
                { required: true, message: "Please enter available day" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="canceled_reason"
              label="canceled_reason"
              rules={[
                { required: true, message: "Please enter canceled_reason" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="days"
              label="days"
              rules={[{ required: true, message: "Please enter days" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Sidebar>
    </>
  );
};

export default Appointments;
