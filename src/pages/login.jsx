import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore  from "../store/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const Login = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const login = async (values) => {
    try {
      const response = await signIn({ username: values.username, password: values.password });
      console.log(response);
  
      if (response.status === 200) {
        Cookies.set("token", response.data.access);
        Cookies.set("refreshToken", response.data.refresh); 
        Cookies.set("id" , response.data.user.id)
        console.log(response.date?.user?.id);
        navigate("/"); 
      } else {
        console.error("Login failed: ", response);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "100px auto" }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          login(values);
          navigate("");
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Form.Item
              validateStatus={touched.username && errors.username ? "error" : ""}
              help={touched.username && errors.username ? errors.username : ""}
            >
              <Input
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              validateStatus={touched.password && errors.password ? "error" : ""}
              help={touched.password && errors.password ? errors.password : ""}
            >
              <Input.Password
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;