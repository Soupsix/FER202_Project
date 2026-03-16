import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Empty, Spin, Typography, Space, Tooltip } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchWishlist } from '../../redux/slices/wishlistSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { selectWishlistWithProducts } from '../../redux/selectors/joinSelectors';
import { removeFromWishlist } from '../../services/wishlistService';
import { createCartItem } from '../../services/cartService';
import { toast } from 'sonner';

const { Text, Title } = Typography;

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { loading: wishlistLoading } = useSelector((state) => state.wishlist);
    const wishlistItems = useSelector(selectWishlistWithProducts);

    useEffect(() => {
        dispatch(fetchWishlist());
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleRemoveFromWishlist = async (wishlistId) => {
        try {
            await removeFromWishlist(wishlistId);
            dispatch(fetchWishlist());
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            toast.warning("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            navigate('/login');
            return;
        }
        if (user.role !== 'customer') {
            toast.error("Chỉ khách hàng mới có thể thêm sản phẩm vào giỏ hàng!");
            return;
        }

        try {
            await createCartItem(user.id, product.productId, 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="container py-5">
            <Title level={2} className="mb-4">
                <Space>
                    <HeartFilled style={{ color: '#ff4d4f' }} />
                    Danh sách yêu thích của {user?.name || 'bạn'}
                </Space>
            </Title>
            
            <Card bordered={true} className="shadow-sm">
                {wishlistLoading ? (
                    <div className="d-flex justify-content-center p-5">
                        <Spin tip="Đang tải danh sách..." size="large" />
                    </div>
                ) : wishlistItems.length === 0 ? (
                    <Empty
                        description="Danh sách yêu thích của bạn đang trống."
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                        <Button type="primary" onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
                    </Empty>
                ) : (
                    <div>
                        <Row className="fw-bold mb-3 d-none d-md-flex pb-2 border-bottom">
                            <Col span={8}>Sản phẩm</Col>
                            <Col span={6} className="text-center">Đơn giá</Col>
                            <Col span={6} className="text-center">Tình trạng</Col>
                            <Col span={4} className="text-center">Thao tác</Col>
                        </Row>
                        
                        {wishlistItems.map((item, index) => (
                            <div key={item.id || index} className="border-bottom py-3">
                                <Row align="middle">
                                    <Col xs={24} md={8}>
                                        <div className="d-flex align-items-center mb-3 mb-md-0 cursor-pointer" onClick={() => navigate(`/product/${item.productId}`)}>
                                            <img
                                                src={item.image || 'https://via.placeholder.com/100'}
                                                alt={item.name}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                                className="me-3 border"
                                            />
                                            <Text strong className="product-name">{item.name}</Text>
                                        </div>
                                    </Col>
                                    
                                    <Col xs={12} md={6} className="text-md-center mb-2 mb-md-0">
                                        <Text type="danger" strong>
                                            {item.price?.toLocaleString('vi-VN')} đ
                                        </Text>
                                    </Col>
                                    
                                    <Col xs={12} md={6} className="text-md-center mb-3 mb-md-0">
                                        {item.stock > 0 ? (
                                            <Text type="success">Còn hàng</Text>
                                        ) : (
                                            <Text type="secondary">Hết hàng</Text>
                                        )}
                                    </Col>
                                    
                                    <Col xs={24} md={4} className="d-flex justify-content-md-center justify-content-end gap-2">
                                        <Tooltip title="Thêm vào giỏ hàng">
                                            <Button 
                                                type="primary" 
                                                icon={<ShoppingCartOutlined />} 
                                                disabled={item.stock <= 0}
                                                onClick={() => handleAddToCart(item)}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Xóa khỏi danh sách">
                                            <Button 
                                                danger 
                                                icon={<DeleteOutlined />} 
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                            />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Wishlist;