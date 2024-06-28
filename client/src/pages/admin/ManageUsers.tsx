import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UserUpdateData,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../api/user";
import { useAuth } from "../../context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

const ManageUsers: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: users, refetch } = useQuery<UserResponse[]>({
    queryKey: ["all users"],
    queryFn: getAllUsers,
  });

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      message.success("Видалено");
      refetch();
    },
  });

  const { mutate: updateUserMutate } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdateData }) =>
      updateUser(id, data),
    onSuccess: () => {
      message.success("Оновлено");
      refetch();
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
  const [form] = Form.useForm();

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user: UserResponse) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (id: number) => {
    if (id === user?.id) {
      deleteUserMutate(id);
      logout();
      window.location.reload();
    } else {
      deleteUserMutate(id);
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        if (editingUser) {
          updateUserMutate({ id: editingUser.id, data: values });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Помилка валідації:", info);
      });
  };

  const columns = [
    {
      title: "Ім'я",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Електронна пошта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Створено",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Дії",
      key: "actions",
      render: (_: any, record: UserResponse) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col span={16}>
        <Card>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 20 }}
          >
            <Col>
              <Title level={2}>Управління користувачами</Title>
            </Col>
          </Row>
          <Table columns={columns} dataSource={users} rowKey="id" />
        </Card>
      </Col>
      <Modal
        title={editingUser ? "Редагувати користувача" : "Додати користувача"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        okText={editingUser ? "Зберегти" : "Додати"}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || { role: "user" }}
        >
          <Form.Item
            name="name"
            label="Ім'я"
            rules={[{ required: false, message: "Будь ласка, введіть ім'я!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Електронна пошта"
            rules={[
              {
                required: false,
                message: "Будь ласка, введіть електронну пошту!",
              },
              {
                type: "email",
                message: "Будь ласка, введіть правильну електронну пошту!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: false, message: "Будь ласка, виберіть роль!" }]}
          >
            <Select>
              <Option value="user">Користувач</Option>
              <Option value="admin">Адміністратор</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default ManageUsers;
