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
  const token = localStorage.getItem('accessToken') as string;

  useEffect(() => {
    if (initailValue?.id) {
      console.log(222);
      axios
        .get(`http://localhost:3001/api/user/${initailValue?.id}`, {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            form.setFieldsValue({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              password: response.data.password,
              phoneNumber: response.data.phoneNumber,
              roleId: response.data.roleId,
            });
          }
        });
    }
  }, [form, initailValue?.id,token]);
  const onSave = async (value: any) => {
    if (initailValue?.id) {
      await axios
        .patch(
          `http://localhost:3001/api/user/${initailValue?.id}`,
          {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            password: value.password,
            phoneNumber: value.phoneNumber,
            roleId: value.roleId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
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
        .post("http://localhost:3001/api/user", {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          phoneNumber: value.phoneNumber,
          roleId: value.roleId,
        })
        .then(function (response) {
          if (response.status === 201) {
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
        <Row justify="space-between">
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#0B63F8" }}>
            ผู้ใช้งาน
          </div>
          <div className="flex gap-2 w-64">
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
                <Input className="input-full" placeholder="ชื่อ" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="lastName" label="นามสกุล">
                <Input className="input-full" placeholder="ชื่อ-นามสกุล" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="password" label="รหัสผ่าน">
                <Input className="input-full" placeholder="รหัสผ่าน" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
                <Input className="input-full" placeholder="เบอร์โทรศัพท์" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="email" label="อีเมล์">
                <Input className="input-full" placeholder="อีเมล์" />
              </Form.Item>
            </Col>
            {/* <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="gender" label="เพศ">
                <Select
                  placeholder="เลือกเพศ"
                  className="input-full"
                  options={[
                    { value: "ชาย", label: "ชาย" },
                    { value: "หญิง", label: "หญิง" },
                  ]}
                />
              </Form.Item>
            </Col> */}
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={12}
              lg={12}
              md={12}
            >
              <Form.Item name="roleId" label="บทบาท">
                <Select
                  placeholder="เลือกบทบาท"
                  className="input-full"
                  options={[
                    { value: 1, label: "ADMIN" },
                    { value: 2, label: "USER" },
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
