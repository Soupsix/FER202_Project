import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from 'react-router-dom';

const Navigationbar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:9999/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Lỗi fetch categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Hàm xử lý khi bấm vào một danh mục cụ thể
  const handleCategoryClick = (id) => {
    // Nhảy sang trang filter và đẩy categoryId lên URL
    navigate(`/filter?category=${id}`);
};

    if (loading) return null; // Để thanh điều hướng ẩn đi khi đang tải, tránh giật giao diện

    return (
        <Navbar className="bg-body-tertiary border-bottom" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-center"
                >
                    <Nav className="fw-bold">
                        <Nav.Link onClick={() => navigate("/")}>Trang chủ</Nav.Link>
                        
                        <NavDropdown title="Sản Phẩm" id="basic-nav-dropdown">
                            {/* Hiển thị mục "Tất cả" trước */}
                            <NavDropdown.Item onClick={() => handleCategoryClick("0")}>
                                Tất cả sản phẩm
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            
                            {/* MAPPING dữ liệu categories từ API ở đây */}
                            {categories.map((cat) => (
                                <NavDropdown.Item 
                                    key={cat.id} 
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    {cat.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <Nav.Link onClick={() => navigate("/about")}>Giới Thiệu</Nav.Link>
                        <Nav.Link onClick={() => navigate("/blogs")}>Tin Tức</Nav.Link>
                        <Nav.Link onClick={() => navigate("/contact")}>Liên hệ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;