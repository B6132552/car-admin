import { DeleteFilled, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
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
  const dataSource = [
    {
      id: "1",
      name: "Mike",
      email: "aaaaa@gmail.com",
      gender: "ชาย",
      phone: "10 Downing Street",
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
                  //   onEdit(_row.id);
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
              navigate("/managecarlist/add");
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
              <Input
                className="w-full input-full"
                placeholder="ค้นหารถรุ่น"
              />
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
        <Table columns={columns} rowKey="id" dataSource={dataSource} />
      </div>
    </div>
  );
};
export default CarList;
