import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";

import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrders from "./pages/admin/ManageOrders";
import Navbar from "./components/Navbar/Navbar";
import Category from "./pages/Category";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Layout>
              <Header
                style={{
                  width: "100%",
                  height: "64px",
                  padding: "0",
                  background: "#fff",
                }}
              >
                <Navbar />
              </Header>
              <Layout style={{ width: "100%", height: "calc(100vh - 64px)" }}>
                <Sider
                  width={250}
                  style={{
                    background: "#fff",
                    padding: "24px 10px",
                  }}
                >
                  <Sidebar />
                </Sider>
                <Content
                  style={{
                    padding: "0 50px",
                    margin: "10px 0",
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/category/:name" element={<Category />} />
                    <Route
                      path="/cart"
                      element={
                        <PrivateRoute role="user">
                          <CartPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute role="user">
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/admin/products"
                      element={
                        <PrivateRoute role="admin">
                          <ManageProducts />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/admin/users"
                      element={
                        <PrivateRoute role="admin">
                          <ManageUsers />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/admin/orders"
                      element={
                        <PrivateRoute role="admin">
                          <ManageOrders />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
