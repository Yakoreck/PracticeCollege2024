import React from "react";
import { Table, Typography, Card, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByUserId } from "../api/order";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
}

const orders: Order[] = [
  {
    id: "1",
    date: "2023-01-01",
    items: [
      { id: "1", name: "Ноутбук", price: 20100, quantity: 1 },
      { id: "2", name: "Миша", price: 150, quantity: 2 },
    ],
    totalPrice: 20400,
  },
  {
    id: "2",
    date: "2023-02-15",
    items: [
      { id: "3", name: "Клавіатура", price: 500, quantity: 1 },
      { id: "4", name: "Монітор", price: 3000, quantity: 1 },
    ],
    totalPrice: 3500,
  },
];

const columns = [
  {
    title: "ID Замовлення",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Загальна вартість",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
];

const Profile: React.FC = () => {
  const { user } = useAuth();
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`orders`],
    queryFn: () => getOrdersByUserId(user?.id || 0),
    enabled: !!user?.id,
  });

  const columns = [
    {
      title: "ID Замовлення",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Дата",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Загальна вартість",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `${totalPrice.toLocaleString()}₴`,
    },
  ];

  const expandedRowRender = (order: any) => {
    const itemColumns = [
      { title: "ID Продукту", dataIndex: "id", key: "id" },
      { title: "Назва", dataIndex: "name", key: "name" },
      {
        title: "Ціна",
        dataIndex: "price",
        key: "price",
        render: (price: number) => `${price.toLocaleString()}₴`,
      },
      { title: "Кількість", dataIndex: "quantity", key: "quantity" },
    ];

    return (
      <Table
        style={{ marginBottom: 20, marginLeft: 40 }}
        columns={itemColumns}
        dataSource={order.OrderItems.map((item: any) => ({
          id: item.Product.id,
          name: item.Product.name,
          price: item.Product.price,
          quantity: item.quantity,
        }))}
        rowKey="id"
        pagination={false}
      />
    );
  };

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col span={16}>
        <Card>
          <Title level={2}>Історія покупок</Title>
          <Table
            columns={columns}
            dataSource={
              orders
                ? orders?.map((order: any) => ({
                    id: order.id,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                    OrderItems: order.OrderItems,
                  }))
                : []
            }
            rowKey="id"
            expandable={{ expandedRowRender }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
