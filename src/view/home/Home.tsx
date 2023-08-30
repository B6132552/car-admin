import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { DeleteFilled, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Home = () => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      width: "300px",
      render: (_:any,_row:any) => `${_row.firstName} ${_row.lastName}`
    },
    {
      title: "อีเมล์",
      dataIndex: "email",
      key: "email",
      width: "300px",
    },
    // {
    //   title: "เพศ",
    //   dataIndex: "gender",
    //   key: "gender",
    //   width: "220px",
    // },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "260px",
    },
    {
      title: "บทบาท",
      dataIndex: "roleId",
      key: "roleId",
      width: "260px",
      render: (column: any, _row: any) => {
        return _row.roleId === 1 ? "ADMIN" : "USER";
      },
    },
    {
      title: "จัดการ",
      key: "action",
      width: "100px",
      className: "justify-end",
      render: (column: any, _row: any) => {
        return (
          <Row gutter={12}>
            <Col>
              <Button
                className="btn-edit-table"
                icon={<FormOutlined className="text-red" />}
                size="middle"
                onClick={() => {
                  onEdit(_row.id);
                }}
              />
            </Col>
            {/* <Button
              className="btn-delete-table"
              icon={<DeleteFilled />}
              size="middle"
              onClick={() => {
                onDelete(_row.id);
              }}
            ></Button> */}
          </Row>
        );
      },
    },
  ];

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/user?limit=10&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFzb3NpZDE1QGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY5MzMwNzQ5MiwiZXhwIjoxNjkzOTEyMjkyfQ.62P1vonapNEnBRckVPEPZdBBPuTJ3hz4LIw1nOWJjoQ",
          },
        }
      );

      if (res.status === 200) {
        setUsers(res.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = async (value: any) => {
    console.log('value ==> ',value);
    
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user?limit=10&page=1&roleId=${value.roleId}&email=${value.email}&name=${value.name}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFzb3NpZDE1QGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY5MzMwNzQ5MiwiZXhwIjoxNjkzOTEyMjkyfQ.62P1vonapNEnBRckVPEPZdBBPuTJ3hz4LIw1nOWJjoQ",
          },
        }
      );

      if (res.status === 200) {
        setUsers(res.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onDelete = async (id: string) => {
  //   axios
  //     .delete(`http://localhost:3001/api/user/${id}`,{
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFzb3NpZDE1QGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY5MzMwNzQ5MiwiZXhwIjoxNjkzOTEyMjkyfQ.62P1vonapNEnBRckVPEPZdBBPuTJ3hz4LIw1nOWJjoQ",
  //       },
  //     })
  //     .then(function (response) {
  //       if (response.status === 200) {
  //         getUser();
  //         Swal.fire("ลบข้อมูลสำเร็จ!", "You clicked the button!", "success");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const onEdit = async (value: string) => {
    navigate("/usermanagement/edit", {
      state: {
        id: value,
      },
    });
  };
  return (
    <div>
      <Row justify="space-between">
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#0B63F8" }}>
          ผู้ใช้งาน
        </div>
        <div>
          <Button
            size="large"
            style={{
              width: "100%",
              backgroundColor: "#0B63F8",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={() => {
              navigate("/usermanagement/add");
            }}
          >
            <Row justify="center" align="middle" gutter={15}>
              <Col span={4}>
                <PlusOutlined />
              </Col>
              <Col style={{ color: "#FFFFFF" }}>เพิ่มผู้ใช้งาน</Col>
            </Row>
          </Button>
        </div>
      </Row>
      <div className="filter-tap">
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row className="grid grid-cols-12 gap-3">
            <Form.Item name="name" className="col-span-4">
              <Input
                className="w-full input-full"
                placeholder="ค้นหา ชื่อ-นามสกุล"
              />
            </Form.Item>

            <Form.Item name="email" className="col-span-3">
              <Input className="w-full input-full" placeholder="ค้นหาอีเมล์" />
            </Form.Item>
            <Form.Item name="roleId" className="col-span-3">
              <Select
                placeholder="เลือกบาท"
                className="input-full"
                options={[
                  { value: 1, label: "ADMIN" },
                  { value: 2, label: "USER" },
                ]}
              />
            </Form.Item>
            <Button
              className="col-span-1"
              style={{
                width: "100%",
                height: 42,
                borderRadius: 10,
                backgroundColor: "#FFFFFF",
                border: "1px solid rgb(221, 220, 220)",
                color: "#053938",
              }}
              onClick={() => {
                form.resetFields();
                getUser();
              }}
            >
              ล้างข้อมูล
            </Button>
            <Button
              className="col-span-1"
              style={{
                width: "100%",
                height: 42,
                borderRadius: 10,
                backgroundColor: "#B7B7B8",
                border: "none",
                color: "#f1f3f0",
              }}
              htmlType="submit"
            >
              ค้นหา
            </Button>
          </Row>
        </Form>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} rowKey="id" dataSource={users} />
      </div>
    </div>
  );
};

export default Home;
