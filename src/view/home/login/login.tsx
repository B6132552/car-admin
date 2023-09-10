import React from "react";
import Car from "../../../assets/icon/trip.png";
import { useForm } from "antd/es/form/Form";
import { Form, Input } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const login = async (value: any) => {

    await axios
      .post("http://localhost:3001/api/auth/login", {
        email: value.email,
        password: value.password,
      })
      .then(function (response) {
        if (response.status === 201) {
          // Swal.fire(
          //   "บันทึกข้อมูลสำเร็จ!",
          //   "You clicked the button!",
          //   "success"
          // );
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              role: response.data.role,
            })
          );

          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <img src={Car} alt="car" />
        </div>
      </div>
      <div className="flex w-1/2 h-full justify-center items-center bg-white">
        <Form
          className="bg-white"
          form={form}
          onFinish={login}
          layout="vertical"
        >
          <h1 className="text-gray-800 font-bold text-2xl ml-1 mb-2 text-center">
            Login
          </h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="w-72"
          >
            <Input.Password />
          </Form.Item>
          {/* <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="email"
              id=""
              placeholder="Email Address"
            />
          </div>
          <Form.Item label="">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="password"
                id=""
                placeholder="Password"
              />
            </div>
          </Form.Item> */}
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
