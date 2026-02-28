import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import icon trái tim

const ProductDetail = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quality, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quality > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(""); // Cho phép xóa trống để nhập lại
    }
  };
  return (
    <Container className='bg-light mt-5 rounded shadow-sm'>
      <Row>
        <Col md={5} className='p-5'> 
          <Card.Img 
            src='https://gamek.mediacdn.vn/...' // Link ảnh của bạn
            style={{ 
              height: "500px", 
              maxHeight: "600px", 
              objectFit: "cover",
              borderRadius: "10px"
            }} 
          />
        </Col>

        <Col md={7} className='p-5 d-flex flex-column justify-content-center'>
          <div className="mb-2">
            <Badge bg="danger">Hot Girl</Badge>
          </div>

          <h2 className="fw-bold mb-3">Tran Ha Linh</h2>
          <div className="input-group" style={{ width: '130px' }}>
  <button 
    className="btn btn-outline-secondary shadow-none" 
    type="button" 
    onClick={handleDecrease}
  >
    <i className="bi bi-dash-lg">-</i>
  </button>
  
  <input 
    type="number" 
    className="form-control text-center border-secondary shadow-none" 
    value={quality} 
    onChange={handleInputChange}
    min="1"
  />

  <button 
    className="btn btn-outline-secondary shadow-none" 
    type="button" 
    onClick={handleIncrease}
  >
    <i className="bi bi-plus-lg">+</i>
  </button>
</div>
          
          <p className="text-muted">
            Mô tả linh tinh về sản phẩm hoặc thông tin cá nhân ở đây. 
          </p>

          <div className="mt-4 d-flex align-items-center">
            <h4 className="text-primary mb-0 me-4">1.000.000đ</h4>
            {/* Nút Trái tim */}
            <div 
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={{ cursor: 'pointer', fontSize: '28px' }}
              className="transition-all"
            >
              {isWishlisted ? (
                <AiFillHeart color="red" /> // Tim đầy màu đỏ
              ) : (
                <AiOutlineHeart color="gray" /> // Tim rỗng màu xám
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button variant="dark" className="px-4 py-2 me-2">Thêm vào giỏ</Button>
            <Button variant="outline-danger" className="px-4 py-2 me-2">Mua ngay</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;