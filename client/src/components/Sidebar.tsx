import {
  AppleOutlined,
  DesktopOutlined,
  EditOutlined,
  HomeFilled,
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuDivider from "antd/es/menu/MenuDivider";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      theme="light"
      style={{ height: "100%", borderRight: 0 }}
    >
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        Категорії
      </Typography.Title>
      <Menu.Item key="1" onClick={() => navigate("/category/phones")}>
        <AppleOutlined />
        <span>Смартфони</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/category/computers")}>
        <WindowsOutlined />
        <span>Комп'ютери і ноутбуки</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => navigate("/category/monitors")}>
        <DesktopOutlined />
        <span>Монітори</span>
      </Menu.Item>
      <Menu.Divider />
      {user?.role === "admin" && (
        <Menu.SubMenu icon={<SettingOutlined />} title={"Адміністрування"}>
          <Menu.Item key="4" onClick={() => navigate("/admin/orders")}>
            <ShoppingOutlined />
            <span>Замовлення</span>
          </Menu.Item>
          <Menu.Item key="5" onClick={() => navigate("/admin/users")}>
            <UserOutlined />
            <span>Користувачі</span>
          </Menu.Item>
          <Menu.Item key="6" onClick={() => navigate("/admin/products")}>
            <EditOutlined />
            <span>Товари</span>
          </Menu.Item>
        </Menu.SubMenu>
      )}
      <MenuDivider />
      {user?.id && (
        <Menu.Item key="7" onClick={logout}>
          <LogoutOutlined />
          <span>Вийти</span>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Sidebar;
