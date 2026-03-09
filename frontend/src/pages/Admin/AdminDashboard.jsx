import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Image,
  Layers
} from "lucide-react";

import ProductManagement from "./components/ProductManagement";
import AccountManagement from "./components/AccountManagement";
import OrderManagement from "./components/OrderManagement";
import BannerManagement from "./components/BannerManagement";
import CatAndBrandManagement from "./components/CatAndBrandManagement";
import { useSelector } from "react-redux";
import "./AdminDashboard.css";

const { Sider, Content } = Layout;

const adminModules = [
  {
    key: "products",
    label: "Sản phẩm",
    icon: <ShoppingCart size={18} />,
    component: <ProductManagement />
  },
  {
    key: "accounts",
    label: "Quản lý tài khoản",
    icon: <Users size={18} />,
    component: <AccountManagement />
  },
  {
    key: "orders",
    label: "Order",
    icon: <FileText size={18} />,
    component: <OrderManagement />
  },
  {
    key: "banner",
    label: "Banner",
    icon: <Image size={18} />,
    component: <BannerManagement />
  },
  {
    key: "category",
    label: "Quản lý Category & Brand",
    icon: <Layers size={18} />,
    component: <CatAndBrandManagement />
  },
  {
    key: "settings",
    label: "Thiết lập",
    icon: <Settings size={18} />,
    component: <div className="admin-settings"><h2>Thiết lập</h2></div>
  }
];

const AdminDashboard = () => {

  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  console.log("USER:", user);
  console.log("AUTH:", isAuthenticated);

  const [selectedKey, setSelectedKey] = useState("products");

  const currentModule = adminModules.find(
    (item) => item.key === selectedKey
  );

  return (
    <Layout className="admin-dashboard-layout">
      <Sider
        width={250}
        className="admin-sider"
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0"
        }}
      >
        <div
          className="admin-logo"
          style={{
            padding: "20px",
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
            marginBottom: "20px"
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            Admin Panel
          </h2>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={adminModules.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label
          }))}
          style={{ border: "none" }}
        />
      </Sider>

      <Content
        className="admin-content"
        style={{
          padding: "24px",
          background: "#f5f5f5",
          minHeight: "100vh"
        }}
      >
        {currentModule?.component}
      </Content>
    </Layout>
  );
};

export default AdminDashboard;