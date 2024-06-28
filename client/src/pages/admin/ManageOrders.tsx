import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOrder, getAllOrders } from "../../api/order";

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  id: number;
  quantity: number;
  Product: Product;
}

interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  createdAt: string;
  User: User;
  OrderItems: OrderItem[];
}

const ManageOrders: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ["get all orders"],
    queryFn: () => getAllOrders(),
    refetchOnWindowFocus: true,
  });

  const { mutate: deleteOrderMutate } = useMutation({
    mutationFn: (id: number) => deleteOrder(id),
    onSuccess: () => {
      message.success("видалено");
      window.location.reload();
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletetingId, setDeletetingId] = useState(0);

  const [form] = Form.useForm();

  const handleDeleteOrder = (id: number) => {
    setDeletetingId(id);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    deleteOrderMutate(deletetingId);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID замовлення",
      dataIndex: "id",
      key: "orderId",
    },
    {
      title: "Ім'я клієнта",
      dataIndex: ["User", "name"],
      key: "customerName",
    },
    {
      title: "Загальна вартість",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()}₴`,
    },
    {
      title: "Дата",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Дії",
      key: "actions",
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteOrder(record.id)}
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
              <Title level={2}>Управління замовленнями</Title>
            </Col>
          </Row>
          <Table columns={columns} dataSource={orders} rowKey="id" />
        </Card>
      </Col>
      <Modal
        title="Видалити замовлення"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        okText="Видалити"
      >
        <Form form={form} layout="vertical">
          <p>Ви впевнені, що хочете видалити це замовлення?</p>
        </Form>
      </Modal>
    </Row>
  );
};

export default ManageOrders;
