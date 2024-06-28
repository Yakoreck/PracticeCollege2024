import React from "react";
import { Card, Button, Typography, message } from "antd";
import { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";

const { Title, Paragraph, Text } = Typography;

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const ProductCard: FC<Product> = ({ id, img, name, price }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price }));
    message.success(`${name} доданий до корзини!`);
  };

  return (
    <Card
      hoverable
      style={{ width: "300px", marginBottom: 40, minHeight: 500, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      cover={<img height={200} width={300} alt="img" src={img} />}
    >
      <Title level={4}>{name}</Title>
      <Paragraph>
        <Text style={{ fontSize: 24 }} strong>
          {price}₴
        </Text>
      </Paragraph>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={!user}
          style={{ width: "48%" }}
          type="primary"
          onClick={handleAddToCart}
        >
          Купити
        </Button>
        <Button
          onClick={() => navigate(`/product/${id}`)}
          style={{ width: "48%" }}
          type="default"
        >
          Детальніше
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
