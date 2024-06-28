import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const RegisterForm: React.FC<{ onFinish: (values: any) => void }> = ({
  onFinish,
}) => {
  return (
    <Form name="register" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Будь ласка, введіть свій Email!" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Будь ласка, введіть своє ім'я!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Ім'я" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Будь ласка, введіть свій пароль!" },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Будь ласка, підтвердіть свій пароль!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Паролі не співпадають!"));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Підтвердіть пароль"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зареєструватися
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
