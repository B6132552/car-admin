import { Button, Col, Form, Input, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUser = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const initailValue: any = location?.state;

  useEffect(() => {
    if (initailValue?.id) {
      axios
        .get(
          `https://640abca965d3a01f9805f34b.mockapi.io/test01/users/${initailValue?.id}`
        )
        .then(function (response) {
          if (response.status == 200) {
            form.setFieldsValue({
              name: response.data.name,
              gender: response.data.gender,
              email: response.data.email,
              phone: response.data.phone,
            });
          }
        });
    }
  }, [form, initailValue?.id]);
  const onSave = async (value: any) => {
    if (initailValue?.id) {
      await axios
        .put(
          `https://640abca965d3a01f9805f34b.mockapi.io/test01/users/${initailValue?.id}`,
          {
            name: value.name,
            email: value.email,
            gender: value.gender,
            phone: value.phone,
          }
        )
        .then(function (response) {
          if (response.status == 200) {
            Swal.fire(
              "แก้ไขข้อมูลสำเร็จ!",
              "You clicked the button!",
              "success"
            );
            navigate("/usermanagement");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await axios
        .post("https://640abca965d3a01f9805f34b.mockapi.io/test01/users", {
          name: value.name,
          email: value.email,
          gender: value.gender,
          phone: value.phone,
        })
        .then(function (response) {
          if (response.status == 201) {
            Swal.fire(
              "บันทึกข้อมูลสำเร็จ!",
              "You clicked the button!",
              "success"
            );
            navigate("/usermanagement");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
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
            User Management
          </Col>
          <Col xl={12} md={12} lg={12}>
            <Row justify="end" gutter={12}>
              <Col xl={5} lg={5} md={5}>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#f1f3f0",
                    border: "none",
                    color: "black",
                    borderRadius: 10,
                  }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  กลับ
                </Button>
              </Col>
              <Col xl={5} lg={5} md={5}>
                <Button
                  htmlType="submit"
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#053938",
                    border: "none",
                    color: "white",
                    borderRadius: 10,
                  }}
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="filter-tap">
          <Row justify="space-between" gutter={24}>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="name" label="ชื่อ-นามสกุล">
                <Input
                  style={{
                    borderRadius: 10,
                    height: 40,
                    border: "none",
                    backgroundColor: "#f1f3f0",
                  }}
                  placeholder="ชื่อ-นามสกุล"
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="phone" label="เบอร์โทรศัพท์">
                <Input
                  style={{
                    borderRadius: 10,
                    height: 40,
                    border: "none",
                    backgroundColor: "#f1f3f0",
                  }}
                  placeholder="เบอร์โทรศัพท์"
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="email" label="อีเมล์">
                <Input
                  style={{
                    borderRadius: 10,
                    height: 40,
                    border: "none",
                    backgroundColor: "#f1f3f0",
                  }}
                  placeholder="อีเมล์"
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="gender" label="เพศ">
                <Select
                  placeholder="เลือกเพศ"
                  style={{
                    width: "100%",
                  }}
                  options={[
                    { value: "ชาย", label: "ชาย" },
                    { value: "หญิง", label: "หญิง" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ManageUser;
