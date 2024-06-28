import { Carousel, Image } from "antd";
import styles from "./MainCarousel.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import ImgComputer from "../../assets/computer.png";
import ImgPhone from "../../assets/phone.png";
import ImgLaptop from "../../assets/laptop.png";
import ImgMonitor from "../../assets/monitor.png";
import { useNavigate } from "react-router-dom";

const MainCarousel = () => {
  const navigate = useNavigate();
  return (
    <Carousel className={styles.carousel} infinite autoplay arrows>
      <div
        onClick={() => navigate("/category/monitors")}
        className={styles.item}
      >
        <Image preview={false} height={300} src={ImgMonitor} />
      </div>
      <div
        onClick={() => navigate("/category/computers")}
        className={styles.item}
      >
        <Image preview={false} height={300} src={ImgLaptop} />
      </div>
      <div
        onClick={() => navigate("/category/computers")}
        className={styles.item}
      >
        <Image preview={false} height={300} src={ImgComputer} />
      </div>
      <div onClick={() => navigate("/category/phones")} className={styles.item}>
        <Image preview={false} height={300} src={ImgPhone} />
      </div>
    </Carousel>
  );
};

export default MainCarousel;
