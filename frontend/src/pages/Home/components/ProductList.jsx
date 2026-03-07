import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// PHẢI CÓ searchTerm ở đây thì mới dùng bên dưới được cu nhé!
const ProductList = ({ filterCateId, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, cateRes, brandRes] = await Promise.all([
          axios.get("http://localhost:9999/products"),
          axios.get("http://localhost:9999/categories"),
          axios.get("http://localhost:9999/brands"),
        ]);
        setProducts(prodRes.data);
        setCategories(cateRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error("Lỗi fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map tra cứu tên
  const categoryMap = {};
  categories.forEach((c) => (categoryMap[c.id] = c.name));
  const brandMap = {};
  brands.forEach((b) => (brandMap[b.id] = b.name));

  // LOGIC LỌC TỔNG HỢP: Category + Search
  const filteredProducts = products.filter((item) => {
    // 1. Lọc theo Category
    const matchesCategory =
      filterCateId === "0" || !filterCateId
        ? true
        : String(item.categoryId) === String(filterCateId);

    // 2. Lọc theo Search Term (Thêm kiểm tra tồn tại để tránh lỗi trắng trang)
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  if (loading)
    return <div className="text-center mt-5">Đang tải sản phẩm...</div>;

  return (
    <Container className="mb-5">
      <Row lg={4} md={3} sm={2} xs={1} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Col key={item.id}>
              <Card
                className="h-100 shadow-sm border-0"
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="info" className="me-1 fw-normal">
                      {categoryMap[item.categoryId] || "Chưa phân loại"}
                    </Badge>
                    <Badge bg="secondary" className="fw-normal">
                      {brandMap[item.brandId] || "No Brand"}
                    </Badge>
                  </div>

                  <Card.Title className="fs-6 fw-bold">{item.name}</Card.Title>

                  <Card.Text className="text-muted small" style={{ flexGrow: 1 }}>
                    {item.description}
                  </Card.Text>
                  
                  <Card.Text className="text-muted small">
                    Số lượng: {item.quantity}
                  </Card.Text>

                  <div className="mt-auto">
                    <h5 className="text-danger fw-bold">
                      {item.price?.toLocaleString("vi-VN")} đ
                    </h5>
                    <Button
                      variant={item.quantity <= 0 ? "secondary" : "primary"}
                      className="w-100 mt-2 shadow-none"
                      disabled={item.quantity <= 0}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.quantity <= 0 ? "Hết hàng" : "Chọn mua"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center mt-5">
            <p className="text-muted">Không tìm thấy sản phẩm nào phù hợp.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;