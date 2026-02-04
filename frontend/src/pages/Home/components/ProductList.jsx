import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
} from "react-bootstrap";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:9999/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Lỗi khi fetch data:", err);
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <Container>
          <Row lg={4} xs={1} className="g-5">
            {products.map((item) => (
              <Col key={item.id}>
                <Card className="h-100 shadow-sm ">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>

                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {item.description}
                    </Card.Text>

                    <div className="mt-auto">
                      <h5 className="text-danger fw-bold">
                        {item.price.toLocaleString("vi-VN")} đ
                      </h5>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small>Kho: {item.quantity}</small>
                        <small
                          className={
                            item.status ? "text-success" : "text-danger"
                          }
                        >
                          {item.status ? "Còn hàng" : "Hết hàng"}
                        </small>
                      </div>

                      <Button variant="primary" className="w-50">
                        Chọn mua
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductList;
