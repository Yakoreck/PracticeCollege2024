import MainCarousel from "../components/MainCarousel/MainCarousel";
import ProductCard, { Product } from "../components/ProductCard/ProductCard";
import Img from "../assets/laptop.png";
import { Flex, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getLatest, getMostPopular } from "../api/product";

const Home = () => {
  const { data: LatestProducts } = useQuery({
    queryKey: ["latest products"],
    queryFn: getLatest,
  });
  const { data: PopularProducts } = useQuery({
    queryKey: ["popular products"],
    queryFn: getMostPopular,
  });

  return (
    <div>
      <MainCarousel />

      <Typography.Title style={{ margin: "20px 0" }} level={3}>
        Найновіші товари
      </Typography.Title>
      <Flex justify="space-between">
        {LatestProducts?.slice(0, 4).map((product) => (
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
        Найпопулярніші товари
      </Typography.Title>
      <Flex justify="space-between">
        {PopularProducts?.slice(0, 4).map((product) => (
          <ProductCard
            id={product.id}
            img={product.imageUrl || ""}
            name={product.name}
            price={product.price}
            key={product.id}
          />
        ))}
      </Flex>
    </div>
  );
};

export default Home;
