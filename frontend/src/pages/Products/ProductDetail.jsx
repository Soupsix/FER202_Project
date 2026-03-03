import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Thêm State để lưu ảnh đang hiển thị
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [prodRes, cateRes, brandRes] = await Promise.all([
          axios.get(`http://localhost:9999/products/${id}`),
          axios.get("http://localhost:9999/categories"),
          axios.get("http://localhost:9999/brands"),
        ]);
        
        setProduct(prodRes.data);
        setCategories(cateRes.data);
        setBrands(brandRes.data);
        
        // 2. Thiết lập ảnh mặc định khi load xong
        setCurrentImage(prodRes.data.image); 
      } catch (err) {
        console.error("Lỗi fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const categoryMap = {};
  categories.forEach((c) => (categoryMap[c.id] = c.name));
  const brandMap = {};
  brands.forEach((b) => (brandMap[b.id] = b.name));

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => { if (quantity > 1) setQuantity(prev => prev - 1); };

  if (loading) return <div className="text-center mt-5">Đang tải sản phẩm...</div>;
  if (!product) return <div className="text-center mt-5">Không tìm thấy sản phẩm!</div>;

  return (
    <Container className='bg-white mt-5 p-4 rounded shadow-sm border'>
      <Row>
        <Col md={5}> 
          {/* 3. Hiển thị ảnh đang được chọn (Ảnh to) */}
          <Card.Img 
            src={currentImage} 
            style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "10px" }} 
            className="border"
          />

          {/* 4. Danh sách ảnh nhỏ (Thumbnails) */}
          {product.images && product.images.length > 0 && (
            <div className="d-flex mt-3 gap-2 overflow-auto pb-2">
              {/* Thêm ảnh chính vào danh sách thumbnails nếu muốn */}
              {[product.image, ...product.images].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`sub-${index}`}
                  onClick={() => setCurrentImage(img)} // Bấm vào đây để đổi ảnh to
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    objectFit: "cover", 
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: currentImage === img ? "2px solid #0d6efd" : "1px solid #ddd",
                    opacity: currentImage === img ? "1" : "0.7"
                  }}
                  className="thumbnail-img"
                />
              ))}
            </div>
          )}
        </Col>

        <Col md={7} className='ps-md-5 d-flex flex-column justify-content-center'>
          <div className="mb-2">
            <Badge bg="info" className="me-1 fw-normal">
              {categoryMap[product.categoryId] || "Chưa phân loại"}
            </Badge>
            <Badge bg="secondary" className="fw-normal">
              {brandMap[product.brandId] || "No Brand"}
            </Badge>
          </div>

          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.description}</p>

          <h3 className="text-danger fw-bold mb-4">
            {product.price?.toLocaleString("vi-VN")} đ
          </h3>

          <div className="d-flex align-items-center mb-4">
            <div className="input-group me-3" style={{ width: '130px' }}>
              <button className="btn btn-outline-secondary shadow-none" onClick={handleDecrease}>-</button>
              <input type="number" className="form-control text-center shadow-none" value={quantity} readOnly />
              <button className="btn btn-outline-secondary shadow-none" onClick={handleIncrease}>+</button>
            </div>

            <div onClick={() => setIsWishlisted(!isWishlisted)} style={{ cursor: 'pointer', fontSize: '28px' }}>
              {isWishlisted ? <AiFillHeart color="red" /> : <AiOutlineHeart color="gray" />}
            </div>
          </div>

          <div className="pt-3">
            <Button variant="dark" className="px-5 py-2 me-2 fw-bold" disabled={product.quantity <= 0}>
              {product.quantity <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
            </Button>
            <Button variant="outline-danger" className="px-5 py-2 fw-bold" disabled={product.quantity <= 0}>
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;