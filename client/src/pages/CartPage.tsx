import React from "react";
import { Table, Button, InputNumber, Row, Col, Card, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addItem,
  clearCart,
  removeItem,
  updateQuantity,
} from "../store/cartSlice";
import { useMutation } from "@tanstack/react-query";
import { CartData, createOrder } from "../api/order";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const { mutate: createOrderMutate } = useMutation({
    mutationFn: () =>
      createOrder({
        userId: user?.id || 0,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    onSuccess: () => {
      dispatch(clearCart());
      navigate("/profile");
    },
  });

  const handleAddItem = (item: { id: number; name: string; price: number }) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const columns = [
    {
      title: "Продукт",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toFixed(2)}₴`,
    },
    {
      title: "Кількість",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record.id, value || 0)}
        />
      ),
    },
    {
      title: "Всього",
      key: "total",
      render: (_: any, record: any) =>
        `${(record.price * record.quantity).toFixed(2)}₴`,
    },
    {
      title: "Дія",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          danger
          onClick={() => handleRemoveItem(record.id)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col span={16}>
        <Card>
          <Title level={2}>Кошик</Title>
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="id"
            pagination={false}
          />
          <Row justify="end" style={{ marginTop: 20 }}>
            <Col>
              <Text strong>Всього:</Text>{" "}
              <Text>{calculateTotal().toFixed(0)}₴</Text>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 20 }}>
            <Col>
              <Button
                disabled={cartItems.length === 0}
                onClick={() => createOrderMutate()}
                type="primary"
              >
                Оформити замовлення
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
