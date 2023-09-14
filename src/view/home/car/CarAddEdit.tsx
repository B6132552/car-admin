import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CarAddEdit = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const initailValue: any = location?.state;
  const [previewImage, setPreviewImage] = useState("");
  const token = localStorage.getItem("accessToken") as string;
  const [fileList, setFileList] = useState<any[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps["onChange"] = (fileList: any) => {
    if (fileList.file.status === "uploading") {
      fileList.file.status = "done";
    }
    if (fileList.file.status === "done") {
      setFileList(fileList.fileList);
    }
    if (fileList.file.status === "removed") {
      setFileList(fileList.fileList);
    }

    // setFileList(fileList.fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    console.log("initailValue ==> ", initailValue);

    if (initailValue?.id) {
      axios
        .get(`http://localhost:3001/api/car/${initailValue?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            form.setFieldsValue({
              name: response.data.name,
              type: response.data.type,
              color: response.data.color,
              year: response.data.year,
              vehicleRegistration: response.data.vehicleRegistration,
              price: response.data.price,
              status: response.data.status,
              detail: response.data.detail,
              ...response.data
            });
          }
        });
    }
  }, [form, initailValue, initailValue?.id, token]);
  const onSave = async (value: any) => {
    const formData = new FormData();    
    formData.append("name", value.name);
    formData.append("type", value.type);
    formData.append("color", value.color);
    formData.append("model", value.model);
    formData.append("seat", value.seat);
    formData.append("seatType", value.seatType);
    formData.append("fuelType", value.fuelType);
    formData.append("year", value.year);
    formData.append("status", value.status);
    formData.append("vehicleRegistration", value.vehicleRegistration);
    formData.append("price", value.price);
    formData.append("detail", value.detail);
      fileList.map((item:any) => {
       return formData.append("image", item.originFileObj);
      })
    if (initailValue?.id) {
      await axios
        .patch(`http://localhost:3001/api/user/${initailValue?.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire(
              "แก้ไขข้อมูลสำเร็จ!",
              "You clicked the button!",
              "success"
            );
            navigate("/car");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await axios
        .post("http://localhost:3001/api/car", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (response.status === 201) {
            Swal.fire(
              "บันทึกข้อมูลสำเร็จ!",
              "You clicked the button!",
              "success"
            );
            navigate("/car");
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
            รถเช่า
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
              xl={24}
              lg={24}
              md={24}
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "8px",
              }}
            >
              <Upload
                customRequest={() => {}}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                // onRemove={hanldeRemove}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="name" label="ยี่ห้อรถ">
                <Input className="input-full" placeholder="กรอกยี่ห้อรถ" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="model" label="ชื่อรุ่นรถ">
                <Input className="input-full" placeholder="กรอกชื่อรุ่นรถ" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="year" label="ปี">
                <Input className="input-full" placeholder="กรอกปี" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="color" label="สี">
                <Input className="input-full" placeholder="กรอกสี" />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="type" label="ประเภทรถ">
                <Select
                  placeholder="เลือกประเภทรถ"
                  className="input-full"
                  options={[
                    { value: "รถเก๋ง 2 ประตู", label: "รถเก๋ง 2 ประตู" },
                    { value: "รถเก๋ง 4 ประ", label: "รถเก๋ง 4 ประตู" },
                    { value: "รถเก๋ง 5 ประตู", label: "รถเก๋ง 5 ประตู" },
                    { value: "รถตู้", label: "รถตู้" },
                    { value: "รถสปอร์ต", label: "รถสปอร์ต" },
                    { value: "crossover", label: "crossover" },
                    { value: "รถเอสยูวี", label: "รถเอสยูวี" },
                    { value: "รถบรรทุก", label: "รถบรรทุก" },
                  ]}
                  // options={[
                  //   { value: "car_2_door", label: "รถเก๋ง 2 ประตู" },
                  //   { value: "car_4_door", label: "รถเก๋ง 4 ประตู" },
                  //   { value: "car_5_door", label: "รถเก๋ง 5 ประตู" },
                  //   { value: "van", label: "รถตู้" },
                  //   { value: "sports", label: "รถสปอร์ต" },
                  //   { value: "crossover", label: "crossover" },
                  //   { value: "suv", label: "รถเอสยูวี" },
                  //   { value: "truck", label: "รถบรรทุก" },
                  // ]}
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="fuelType" label="ระบบเชื้อเพลิง">
                <Select
                  placeholder="เลือกระบบเชื้อเพลิง"
                  className="input-full"
                  options={[
                    { value: "น้ำมัน", label: "น้ำมัน" },
                    { value: "ไฟฟ้า", label: "ไฟฟ้า" },
                    { value: "ก๊าซ", label: "ก๊าซ" },
                    { value: "ไฮบริด", label: "ไฮบริด" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="seat" label="จำนวนที่นั่ง">
                <Input className="input-full" placeholder="จำนวน" />
              </Form.Item>
            </Col>

            <Col
              style={{ fontSize: 20, fontWeight: "bold", color: "#053938" }}
              xl={6}
              lg={6}
              md={6}
            >
              <Form.Item name="seatType" label="ประเภทเบาะ">
                <Select
                  placeholder="เลือกประเภทเบาะ"
                  className="input-full"
                  options={[
                    { value: "leather_seats", label: "เบาะหนัง" },
                    { value: "cloth_cushin", label: "เบาะผ้า" },
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
              <Form.Item name="price" label="ราคาเช่า/วัน">
                <Input className="input-full" placeholder="ราคาเช่า/วัน" />
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
              <Form.Item name="detail" label="รายละเอียด">
                <TextArea rows={4} placeholder="รายละเอียด" maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default CarAddEdit;
