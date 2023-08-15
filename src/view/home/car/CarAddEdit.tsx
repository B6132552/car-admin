import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const CarAddEdit = () => {
    const [form] = useForm()
    const navigate = useNavigate();
    const onSave = () => {

    }
    return (<div>
        <Form layout="vertical" onFinish={onSave} form={form}>
        <Row justify="space-between">
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#0B63F8" }}>
            รถเช่า
          </div>
          <div className="flex gap-2 w-64" >
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
              <Form.Item name="name" label="ชื่อรุ่นรถ">
                <Input className="input-full" placeholder="กรอกชื่อรุ่นรถ" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="phone" label="ทะเบียนรถ">
                <Input className="input-full" placeholder="กรอกทะเบียนรถ" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="email" label="ราคาเช่า/วัน">
                <Input className="input-full" placeholder="ราคาเช่า/วัน" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="gender" label="สถานะ">
                <Select
                  placeholder="สถานะ"
                  className="input-full"
                  options={[
                    { value: true, label: "พร้อมใช้งาน" },
                    { value: false, label: "ไม่พร้อมใช้งาน" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={24}
              lg={24}
              md={24}
            >
              <Form.Item name="gender" label="รายละเอียด">
              <TextArea rows={4} placeholder="รายละเอียด" maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
      </div>);
}

export default CarAddEdit;