import { DeleteFilled, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import Edit from "../../../assets/icon/edit.svg"

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
  const dataSource = [
    {
      id: "1",
      name: "ปวเรศ  ทองมั่นคง",
      type_car: "BMW Model 2023",
      date: "18/02/2023 - 20/02/2023",
      status: "รอดำเนินการ",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      width: "300px",
    },
    {
      title: "รุ่นรถ",
      dataIndex: "type_car",
      key: "type_car",
      width: "300px",
    },
    {
      title: "ระยะเวลาเช่า",
      dataIndex: "date",
      key: "date",
      width: "220px",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "260px",
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
        <Table columns={columns} rowKey="id" dataSource={dataSource} />
      </div>
    </div>
  );
};
export default ManageCarList;
