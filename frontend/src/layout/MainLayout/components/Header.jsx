import React from "react";
import { Row, Col, Input, Badge, Avatar, Space } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Header = () => {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "12px 0",
      }}
    >
      <Row
        align="middle"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* LOGO */}
        <Col xs={24} sm={6} md={5} lg={4}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            WoolGood
          </div>
        </Col>

        {/* SEARCH */}
        <Col xs={24} sm={12} md={13} lg={14}>
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            size="large"
            onSearch={(value) => console.log("Search:", value)}
          />
        </Col>

        {/* ICONS */}
        <Col xs={24} sm={6} md={6} lg={6} style={{ textAlign: "right" }}>
          <Space size="large">
            <Badge count={5} size="small">
              <HeartOutlined style={{ fontSize: 20, cursor: "pointer" }} />
            </Badge>

            <Badge count={2} size="small">
              <ShoppingCartOutlined style={{ fontSize: 20, cursor: "pointer" }} />
            </Badge>

            <Avatar
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Space>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
