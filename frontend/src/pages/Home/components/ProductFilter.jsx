import React from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import ProductList from './ProductList'; // Vì cùng nằm trong thư mục components

const ProductFilter = () => {
    const [searchParams] = useSearchParams();
    // Lấy từ khóa search từ MainLayout truyền xuống
    const [searchTerm] = useOutletContext();

    // Lấy categoryId từ URL (?category=1)
    const categoryId = searchParams.get('category') || '0';

    return (
        <Container className="py-5" style={{ minHeight: '80vh' }}>
            <Row lg={9} md={8}>

                {/* DANH SÁCH SẢN PHẨM BÊN PHẢI */}
                <Col >
                    <div className="mb-4">
                        <h3 className="fw-bold">Kết quả tìm kiếm</h3>
                        <hr />
                    </div>
                    {/* Tái sử dụng ProductList đã viết */}
                    <ProductList filterCateId={categoryId} searchTerm={searchTerm} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductFilter;