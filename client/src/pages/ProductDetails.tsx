import { FC } from "react";
import ProductCard, { Product } from "../components/ProductCard/ProductCard";
import { Button, Flex, List, Typography, message } from "antd";
import Image from "../assets/computer.png";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { getByCategory, getProductById } from "../api/product";
import { useParams } from "react-router-dom";
import { getCommentsByProductId } from "../api/comment";

const ProductDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: product } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductById(id || ""),
  });

  const { data: comments } = useQuery({
    queryKey: [`comments`],
    queryFn: () => getCommentsByProductId(product?.id?.toString() || ""),
    enabled: !!product?.id,
  });

  const { data: productsByCategory } = useQuery({
    queryKey: [`products ${product?.category}`],
    queryFn: () => getByCategory(product?.category || ""),
    enabled: !!product?.category,
  });

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product?.id || 0,
        name: product?.name || "",
        price: product?.price || 0,
      })
    );
    message.success(`${product?.name} доданий до корзини!`);
  };

  return (
    <div>
      <Flex align="start">
        <img src={product?.imageUrl || ""} width={800} height={600} />
        <div style={{ flexDirection: "column", marginTop: 40, marginLeft: 60 }}>
          <Typography.Title level={1}>{product?.name}</Typography.Title>
          <Typography.Paragraph>{product?.description}</Typography.Paragraph>
          <Button onClick={handleAddToCart} type="primary">
            Купити
          </Button>
        </div>
      </Flex>

      <Typography.Title style={{ margin: "20px 0" }} level={3}>
        Рекомендовані товари
      </Typography.Title>
      <Flex justify="space-between">
        {productsByCategory?.slice(0, 4).map((product) => (
          <ProductCard
            id={product.id}
            img={product.imageUrl || ""}
            name={product.name}
            price={product.price}
            key={product.id}
          />
        ))}
      </Flex>
      <Typography.Title style={{ margin: "20px 0" }} level={3}>
        Коментарі
      </Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<span>{item?.name}</span>}
              description={<p>{item?.description}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductDetails;
