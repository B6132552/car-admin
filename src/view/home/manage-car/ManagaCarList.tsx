import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import Edit from "../../../assets/icon/edit.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface DataType {
  id: string;
  name: string;
  type_car: string;
  date: string;
  status: string;
}

const ManageCarList = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") as string;
  const [manageCars, setManageCars] = useState([]);
  useEffect(() => {
    getManageCar();
  }, [token]);

  const getManageCar = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/book?limit=10&page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setManageCars(res.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const dataSource = [
  //   {
  //     id: "1",
  //     name: "ปวเรศ  ทองมั่นคง",
  //     type_car: "BMW Model 2023",
  //     date: "18/02/2023 - 20/02/2023",
  //     status: "รอดำเนินการ",
  //   },
  // ];
  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      width: "300px",
      render: (_row,item:any) => {        
        return `${item.firstName} ${item.lastName}`;
      },
    },
    {
      title: "รุ่นรถ",
      dataIndex: "type_car",
      key: "type_car",
      width: "300px",
      render: (_row,item:any) => {
        console.log('row ==> ',item);
        
        return `${item.car.name} ${item.car.model ?? '-'} ${item.car.year
          ?? '-'}`
      }
    },
    {
      title: "ระยะเวลาเช่า",
      dataIndex: "date",
      key: "date",
      width: "220px",
      render: (_row,item:any) => {
        return `${dayjs(item.startDate).format('YYYY/MM/DD')} - ${dayjs(item.endDate).format('YYYY/MM/DD')}`
      }
    },
    // {
    //   title: "ยอดรวม",
    //   dataIndex: "price",
    //   key: "price",
    //   width: "260px",
    // },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "260px",
      render: (_row,item: any) => {
        return `${item.status === 'PENDING' ? 'รอดำเนินการ' : '-'}`
      }
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

  const onEdit = async (value: string) => {
    navigate("/managecar/edit", {
      state: {
        id: value,
      },
    });
  };
  const onSearch = () => {};
  const getUser = () => {};

  return (
    <div>
      <Row justify="space-between">
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#0B63F8" }}>
          จัดการการจองรถ
        </div>
      </Row>
      <div className="filter-tap">
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row className="grid grid-cols-12 gap-3">
            <Form.Item name="name" className="col-span-6">
              <Input className="w-full input-full" placeholder="วันที่เช่ารถ" />
            </Form.Item>

            <Form.Item name="name" className="col-span-4">
              <Input
                className="w-full input-full"
                placeholder="ค้นหา ชื่อ-นามสกุล"
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
        <Table columns={columns} rowKey="id" dataSource={manageCars} />
      </div>
    </div>
  );
};
export default ManageCarList;

