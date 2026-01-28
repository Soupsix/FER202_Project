import React from "react";
import { Row, Col, Input, Badge, Avatar, Space, Dropdown, Button } from "antd";

import {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined,
    ShoppingOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../../../redux/slices/authSlice";
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const { Search } = Input;

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);


    const items = [
        {
            key: "profile",
            icon: <ProfileOutlined />,
            label: "Thông tin cá nhân",
            onClick: () => navigate("/profile"),
        },
        {
            key: "order",
            icon: <ShoppingOutlined />,
            label: "Đơn hàng đã mua",
            onClick: () => navigate("/orders"),
        }
        ,
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            danger: true,
            onClick: () => {
                dispatch(logout());
                toast.success("Đăng xuất thành công");
            },
        }
    ];


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
                        onClick={() => navigate("/")}
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

                        {isAuthenticated ? (
                            <Dropdown
                                menu={{ items }}
                                trigger={["click"]}
                                placement="bottomRight"
                            >
                                <Space style={{ cursor: "pointer" }}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                    />
                                </Space>
                            </Dropdown>
                        ) : (
                            <Space>
                                <Button
                                    type="dashed"
                                    onClick={() => navigate("/login")}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    type="default"
                                    onClick={() => navigate("/register")}
                                >
                                    Đăng ký
                                </Button>
                            </Space>
                        )}
                    </Space>
                </Col>
            </Row>
        </header>
    );
};

export default Header;
