import ImgPhone from "../assets/phone.png";
import ImgLaptop from "../assets/laptop.png";
import ImgComputer from "../assets/computer.png";
import ImgMonitor from "../assets/monitor.png";
import ProductCard, { Product } from "../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { Col, Flex, Grid, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getByCategory } from "../api/product";

const Category = () => {
  const { name } = useParams();

  const { data: products } = useQuery({
    queryKey: [`products ${name}`],
    queryFn: () => getByCategory(name || ""),
    refetchOnWindowFocus: true,
  });

  return (
    <Row gutter={16}>
      {products?.map((product) => (
        <Col className="gutter-row" span={6}>
          <ProductCard
            id={product.id}
            img={product.imageUrl || ""}
            name={product.name}
            price={product.price}
            key={product.id}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Category;
