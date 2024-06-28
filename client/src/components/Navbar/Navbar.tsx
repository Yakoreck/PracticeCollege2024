// src/components/Navbar.tsx
import React, { useState } from "react";
import { Input, Button, Avatar, Badge, Modal, Typography } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import styles from "./Navbar.module.scss";
import { useAuth } from "../../context/AuthContext";
import Search from "../Search";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const Navbar = () => {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogin = (values: any) => {
    login(values);
    setIsLoginModalVisible(false);
  };

  const handleRegister = (values: any) => {
    register(values);
    setIsRegisterModalVisible(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Typography.Title
          onClick={() => navigate("/")}
          level={2}
          style={{ marginRight: 40, cursor: "pointer" }}
        >
          TeleShop
        </Typography.Title>
        <Search />
      </div>
      <div className={styles.navbarRight}>
        {user ? (
          <>
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile`)}
              size={"large"}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
            <Badge count={cartItems.length} offset={[0, 5]}>
              <Button
                type="link"
                icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}
                onClick={handleCartClick}
              />
            </Badge>
          </>
        ) : (
          <>
            <Button onClick={() => setIsLoginModalVisible(true)} type="primary">
              Увійти
            </Button>
            <Button
              onClick={() => setIsRegisterModalVisible(true)}
              type="default"
            >
              Реєстрація
            </Button>
          </>
        )}
      </div>

      <Modal
        title="Увійти"
        visible={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        footer={null}
      >
        <LoginForm onFinish={handleLogin} />
      </Modal>

      <Modal
        title="Реєстрація"
        visible={isRegisterModalVisible}
        onCancel={() => setIsRegisterModalVisible(false)}
        footer={null}
      >
        <RegisterForm onFinish={handleRegister} />
      </Modal>
    </nav>
  );
};

export default Navbar;
