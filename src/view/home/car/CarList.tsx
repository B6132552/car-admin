import { DeleteFilled, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface DataType {
  id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
}

const CarList = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getCar();
  }, []);

  const getCar = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/car?limit=10&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFzb3NpZDE1QGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY5MzMwNzQ5MiwiZXhwIjoxNjkzOTEyMjkyfQ.62P1vonapNEnBRckVPEPZdBBPuTJ3hz4LIw1nOWJjoQ",
          },
        }
      );

      if (res.status === 200) {
        setCars(res.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อรถ",
      dataIndex: "name",
      key: "name",
      width: "300px",
    },
    {
      title: "ประเภทรถ",
      dataIndex: "type",
      key: "type",
      width: "300px",
    },
    {
      title: "ราคา/วัน",
      dataIndex: "price",
      key: "price",
      width: "220px",
    },
    {
      title: "สี",
      dataIndex: "color",
      key: "color",
      width: "260px",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "260px",
      render: (_: any, _row: any) =>
        _row.status ? "พร้อมใช้งาน" : "ไม่พร้อมใช้งาน",
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
                // onDelete(_row.id);
              }}
            ></Button>
          </Row>
        );
      },
    },
  ];
  const getUser = () => {};
  const onEdit = async (value: string) => {
    navigate("/car/edit", {
      state: {
        id: value,
      },
    });
  };
  const onSearch = () => {};

  return (
    <div>
      <Row justify="space-between">
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#0B63F8" }}>
          รถเช่า
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
              navigate("/car/add");
            }}
          >
            <Row justify="center" align="middle" gutter={15}>
              <Col span={4}>
                <PlusOutlined />
              </Col>
              <Col style={{ color: "#FFFFFF" }}>เพิ่มรถเช่า</Col>
            </Row>
          </Button>
        </div>
      </Row>
      <div className="filter-tap">
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row className="grid grid-cols-12 gap-3">
            <Form.Item name="name" className="col-span-6">
              <Input className="w-full input-full" placeholder="ค้นหารถรุ่น" />
            </Form.Item>
            <Form.Item name="gender" className="col-span-4">
              <Select
                placeholder="เลือกสถานะ"
                className="input-full"
                options={[
                  { value: "พร้อมใช้งาน", label: "พร้อมใช้งาน" },
                  { value: "ไม่พร้อมใช้งาน", label: "ไม่พร้อมใช้งาน" },
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
        <Table columns={columns} rowKey="id" dataSource={cars} />
      </div>
    </div>
  );
};
export default CarList;
