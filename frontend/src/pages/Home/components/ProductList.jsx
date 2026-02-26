import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const ProductList = ({ filterCateId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 1. Tạo Map tra cứu (để hiện tên thay vì ID)
  const categoryMap = {};
  categories.forEach(c => categoryMap[c.id] = c.name);
  const brandMap = {};
  brands.forEach(b => brandMap[b.id] = b.name);

  // 2. Logic LỌC: Quan trọng nhất ở đây
  const filteredProducts = products.filter((item) => {
    if (filterCateId === '0' || !filterCateId) return true; // Hiện tất cả
    return String(item.categoryId) === String(filterCateId); // So sánh ID dạng chuỗi
  });

  if (loading) return <div className="text-center mt-5">Đang tải sản phẩm...</div>;

  return (
    <Container className="mb-5">
      <Row lg={4} md={3} sm={2} xs={1} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img 
                  variant="top" 
                  src={item.image} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="info" className="me-1 fw-normal">
                      {categoryMap[item.categoryId] || "K Có gì"}
                    </Badge>
                    <Badge bg="secondary" className="fw-normal">
                      {brandMap[item.brandId] || "K Có gì"}
                    </Badge>
                  </div>
                  
                  <Card.Title className="fs-6 fw-bold">{item.name}</Card.Title>
                  
                  <Card.Text className="text-muted small" style={{ flexGrow: 1 }}>
                    {item.description}
                  </Card.Text>

                  <div className="mt-auto">
                    <h5 className="text-danger fw-bold">
                      {item.price?.toLocaleString("vi-VN")} đ
                    </h5>
                    <Button variant="primary" className="w-100 mt-2">
                      Chọn mua
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p className="text-muted">Không có sản phẩm nào thuộc danh mục này.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;