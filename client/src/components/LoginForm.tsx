import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm: React.FC<{ onFinish: (values: any) => void }> = ({
  onFinish,
}) => {
  return (
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Будь ласка, введіть свій Email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Будь ласка, введіть свій пароль!" },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Увійти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
