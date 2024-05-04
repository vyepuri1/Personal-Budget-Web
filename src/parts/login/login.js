import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import Helper from "../../utility/helper";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { signIn, resetOperationType } from "../../redux/login/reducer";
import { useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import "./style.css";

function Login() {
  const loginSlice = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onFinish(values) {
    dispatch(signIn(values));
  }
  function onFinishFailed(errorInfo) {
    Helper.sendNotification("error", "Please fill all the details");
  }

  useEffect(() => {
    if (loginSlice.operationType === "SIGN_SUCCESS") {
      navigate("/");
      dispatch(resetOperationType());
    }
  }, [loginSlice.operationType]);

  return (
    <spin spinning={loginSlice.isLoading} >
      <div className="mainDiv">
        <div className="formDiv">
          <Form
            name="basic"
            layout={"vertical"}
            labelCol={{
              span: 8,
              style: { color: "white", fontWeight: "bold" },
            }}
            wrapperCol={{
              span: 28,
            }}
            style={{
              background: "beige",
              padding: "80px",
              borderRadius: "15px"
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "bold" }}>
                  Email
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Enter email"
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "bold" }}>
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter password"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </spin>
  );
}

export default Login;
