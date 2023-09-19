import { Button, Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "antd";
import dayjs from "dayjs";

const ManageCar = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const initailValue: any = location?.state;
  const token = localStorage.getItem("accessToken") as string;
  const onSave = () => {};

  useEffect(() => {
    if (initailValue?.id) {
      axios
        .get(`http://localhost:3001/api/book/${initailValue?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            form.setFieldsValue({
              ...response.data,
              price: response.data.slip[0].price,
              status: response.data.status,
              car: `${response.data.car.name} ${response.data.car.model} ${response.data.car.year}`,
              date: `${dayjs(response.data.startDate).format('YYYY-MM-DD')} - ${dayjs(response.data.endDate).format('YYYY-MM-DD')}`,
            });
          }
        });
    }
  }, [form, initailValue, initailValue?.id, token]);

  return (
    <div>
      <Form layout="vertical" onFinish={onSave} form={form}>
        <Row justify="space-between" align="middle" id="fade">
          <Col
            style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
            xl={12}
            lg={12}
            md={12}
          >
            จัดการการจองรถ
          </Col>
          <div className="flex gap-2 w-[300px]">
            <Button
              size="large"
              style={{
                width: "100%",
                height: 42,
                borderRadius: 10,
                backgroundColor: "#B7B7B8",
                border: "none",
                color: "#f1f3f0",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              กลับ
            </Button>
            
            <Button
              htmlType="submit"
              size="large"
              style={{
                width: "100%",

                backgroundColor: "#0B63F8",
                border: "none",
                color: "white",
                borderRadius: 10,
              }}
            >
              บันทึก
            </Button>
          </div>
        </Row>
        <div className="filter-tap">
          <Row justify="space-between" gutter={24}>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="firstName" label="ชื่อ">
                <Input className="input-full" placeholder="ชื่อ" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="lastName" label="นามสกุล">
                <Input className="input-full" placeholder="นามสกุล" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="email" label="อีเมล์">
                <Input className="input-full" placeholder="อีเมล์" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
                <Input
                  className="input-full"
                  placeholder="เบอร์โทรศัพท์"
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="car" label="รุ่นรถ">
                <Input className="input-full" placeholder="รุ่นรถ" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="date" label="ระยะเวลาการจอง">
                <Input className="input-full" placeholder="รุ่นรถ" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="price" label="ยอดรวม">
                <Input className="input-full" placeholder="รุ่นรถ" readOnly />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="status" label="สถานะ">
                <Select
                  placeholder="สถานะ"
                  className="input-full"
                  options={[
                    { value: 'UNSUCCESS', label: "ไม่สำเร็จ" },
                    { value: 'PENDING', label: "รอดำเนินการ" },
                    { value: 'PAYMENT', label: "จองสำเร็จ" },
                    { value: 'USE', label: "กำลังใช้งาน" },
                    { value: 'SUCCESS', label: "คืนรถสำเร็จ" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="slip" label="สลิปโอนเงิน">
               <div className="rounded-2xl border-2 border-solid w-[350px] h-[350px]">
               <img
                  className="rounded-2xl"
                  alt="img"
                  src={require('../../../assets/icon/slip.jpg')}
                />
               </div>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ManageCar;
