import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.js";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterFormik = () => {
  const {signUp} = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const singup = async (values) => {
    try {
      const response = await signUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Registration failed: ", response);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: "100px auto" }}>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={singup}
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
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email ? errors.email : ""}
            >
              <Input
                name="email"
                placeholder="Email"
                value={values.email}
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
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default RegisterFormik;
