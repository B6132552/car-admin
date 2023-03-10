import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Table } from "antd";
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
    },
    {
      title: "อีเมล์",
      dataIndex: "email",
      key: "email",
      width: "300px",
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      key: "gender",
      width: "220px",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
      width: "260px",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (column: any, _row: any) => {
        return (
          <Row gutter={12}>
            <Col>
              <Button
                className="btn-delete-table"
                icon={<FormOutlined />}
                size="middle"
                onClick={() => {
                  onEdit(_row.id);
                }}
              />
            </Col>
            <Button
              className="btn-delete-table"
              icon={<DeleteFilled />}
              size="middle"
              onClick={() => {
                onDelete(_row.id);
              }}
            ></Button>
          </Row>
        );
      },
    },
  ];

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://640abca965d3a01f9805f34b.mockapi.io/test01/users"
      );
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = async (value: any) => {
    try {
      const url = new URL(
        "https://640abca965d3a01f9805f34b.mockapi.io/test01/users"
      );
      url.searchParams.append("name", value.name);
      const res = await axios.get(url.toString());
      console.log("value ==> ", res);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: string) => {
    axios
      .delete(`https://640abca965d3a01f9805f34b.mockapi.io/test01/users/${id}`)
      .then(function (response) {
        if (response.status == 200) {
          getUser();
          Swal.fire("ลบข้อมูลสำเร็จ!", 'You clicked the button!',"success" , );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onEdit = async (value: string) => {
    navigate("/usermanagement/edit", {
      state: {
        id: value,
      },
    });
  };
  return (
    <div>
      <Row justify="space-between" align="middle" id="fade">
        <Col
          style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
          xl={12}
          lg={12}
          md={12}
        >
          User Management
        </Col>
        <Col xl={4} lg={4} md={4}>
          <Button
            size="large"
            style={{
              width: "100%",
              backgroundColor: "#f1f3f0",
              border: "none",
              color: "black",
            }}
            onClick={() => {
              navigate("/usermanagement/add");
            }}
          >
            <Row justify="center" align="middle" gutter={15}>
              <Col span={4}>
                <PlusOutlined />
              </Col>
              <Col style={{ color: "#053938" }}>Add User</Col>
            </Row>
          </Button>
        </Col>
      </Row>
      <div className="filter-tap">
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row justify="space-between" gutter={12}>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={16}
              lg={16}
              md={16}
            >
              <Form.Item name="name">
                <Input
                  style={{
                    borderRadius: 10,
                    height: 40,
                    border: "none",
                    backgroundColor: "#f1f3f0",
                  }}
                  placeholder="ค้นหา ชื่อ-นามสกุล"
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Row gutter={12}>
                <Col md={12}>
                  <Button
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#f1f3f0",
                      border: "none",
                      color: "#053938",
                    }}
                    onClick={() => {
                      form.resetFields();
                      getUser();
                    }}
                  >
                    ล้างข้อมูล
                  </Button>
                </Col>
                <Col md={12}>
                  <Button
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#053938",
                      border: "none",
                      color: "#f1f3f0",
                    }}
                    htmlType="submit"
                  >
                    ค้นหา
                  </Button>
                </Col>
              </Row>
            </Col>
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
