import React, { useState, useEffect } from 'react'
import { Col, Row, Card, Button, Flex, InputNumber, Input, Radio, Space, Empty, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Typography } from 'antd';
import { HomeOutlined, EditOutlined, CheckCircleFilled } from '@ant-design/icons';
import { fetchCartProducts } from '../../redux/slices/cartSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { selectCartWithProducts } from '../../redux/selectors/joinSelectors';
import { updateCartItemQuantity, deleteCartItem } from '../../services/cartService';
const { Text } = Typography;

const Cart = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const products = useSelector(selectCartWithProducts);

  // State quản lý địa chỉ giao hàng
  const [addressMode, setAddressMode] = useState('saved'); // 'saved' | 'custom'
  const [customAddress, setCustomAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(user?.address || '');
  const [quantities, setQuantities] = useState({}); //State quản lý quantity

  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach(product => {
        initialQuantities[product.id] = product.quantity || 1; // dùng product.id (json-server)
      });
      setQuantities(initialQuantities);
    }
  }, [products]);


  useEffect(() => {
    dispatch(fetchCartProducts());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddressConfirm = () => {
    if (addressMode === 'custom' && customAddress.trim()) {
      setSelectedAddress(customAddress.trim());
    } else if (addressMode === 'saved') {
      setSelectedAddress(user?.address || '');
    }
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      dispatch(fetchCartProducts());
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const sharedProps = {
    mode: 'spinner',
    min: 1,
    style: { width: 120 },
  };

  const totalPrice = products.reduce((sum, product) => {
    const qty = quantities[product.id] ?? product.quantity ?? 1;
    return sum + ((product?.price ?? 0) * qty);
  }, 0);

  return (
    <>
      <Row justify="center" gutter={24} className='my-5' >
        <Col span={12} >
          <Card title={`Giỏ hàng của ${user?.name || 'User'}: `} bordered={true} >
            {cartLoading ? (
              <Spin tip="Đang tải..." />
            ) : products.length === 0 ? (
              <Empty description="Giỏ hàng trống" />
            ) : (
              products.map((product, index) => (
                <div key={product?._id || index}>
                  <Row className='mx-3'>
                    <Col span={4}>
                      <img src={product?.image || '../public/images/Banner1.jpg'} alt={product?.name} style={{ width: '142px', height: '100px', objectFit: 'cover' }} />
                    </Col>
                    <Col span={5} className='d-flex align-items-center justify-content-center'>
                      <p>{product?.name}</p>
                    </Col>
                    <Col span={5} className='d-flex align-items-center justify-content-center'>
                      <p>
                        <Flex vertical gap="middle">
                          <InputNumber
                            {...sharedProps}
                            variant="filled"
                            value={quantities[product.id] ?? product.quantity ?? 1}
                            max={product?.stock ?? 99}
                            onChange={(val) => {
                              // Cập nhật UI ngay lập tức
                              setQuantities(prev => ({ ...prev, [product.id]: val }));
                              // Lưu vào data.json qua API
                              updateCartItemQuantity(product.id, val);
                            }}
                          />
                        </Flex>
                      </p>
                    </Col>
                    <Col span={5} className='d-flex align-items-center justify-content-center'>
                      <p>{((product?.price ?? 0) * (quantities[product.id] ?? 1)).toLocaleString('vi-VN')}đ</p>
                    </Col>
                    <Col span={5} className='d-flex align-items-center justify-content-center'>
                      <p>
                        <Button onClick={() => handleDeleteCartItem(product.id)}>X</Button>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))
            )}
          </Card>
        </Col>

        <Col span={6}>
          <Row gutter={24}>
            <Col span={24}>
              <Card title="Thanh toán" variant={true}>
                {products.map((product, index) => (
                  <div key={product?._id || index}>
                    <Row gutter={24} className='mb-3'>
                      <Col span={12}>{product?.name}</Col>
                      <Col span={12}>{((product?.price ?? 0) * (quantities[product.id] ?? 1)).toLocaleString('vi-VN')} (vnđ)</Col>
                    </Row>
                  </div>
                ))}

                <hr />

                <Row gutter={24} className='mb-2'>
                  <Col span={12}>
                    <Text strong> Tổng cộng:</Text>
                  </Col>
                  <Col>
                    <Text strong type="danger"> {totalPrice.toLocaleString('vi-VN')} (vnđ)</Text>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Button
                      type="primary"
                      color='cyan'
                      variant='solid'
                      block
                      style={{ marginTop: 12 }}
                      disabled={addressMode === 'custom' && !customAddress.trim() || products.length === 0}
                      onClick={handleAddressConfirm}
                    >
                      Thanh Toán
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={24} className='my-3'>
              <Card
                title={
                  <Space>
                    <HomeOutlined />
                    <span>Địa chỉ giao hàng</span>
                  </Space>
                }
              >
                {/* Chọn kiểu địa chỉ */}
                <Radio.Group
                  value={addressMode}
                  onChange={(e) => setAddressMode(e.target.value)}
                  style={{ width: '100%', marginBottom: 12 }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {/* Option 1: Dùng địa chỉ đã lưu */}
                    <Radio value="saved">
                      <Text strong>Địa chỉ đã lưu</Text>
                    </Radio>
                    {addressMode === 'saved' && (
                      <div style={{
                        background: '#f5f5f5',
                        border: '1px solid #d9d9d9',
                        borderRadius: 6,
                        padding: '8px 12px',
                        marginLeft: 24,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                        <Text>{user?.address || 'Chưa có địa chỉ lưu'}</Text>
                      </div>
                    )}

                    {/* Option 2: Nhập địa chỉ mới */}
                    <Radio value="custom" color='cyan'>
                      <Text strong>Nhập địa chỉ khác</Text>
                    </Radio>
                    {addressMode === 'custom' && (
                      <div style={{ marginLeft: 24 }}>
                        <Input.TextArea
                          rows={2}
                          placeholder="Nhập địa chỉ giao hàng..."
                          value={customAddress}
                          onChange={(e) => setCustomAddress(e.target.value)}
                          style={{ marginBottom: 8 }}
                        />
                      </div>
                    )}
                  </Space>
                </Radio.Group>

                {/* Địa chỉ đang được chọn */}
                {selectedAddress && (
                  <>
                    <hr style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <EditOutlined style={{ marginTop: 3, color: 'cyan' }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Giao đến:</Text>
                        <br />
                        <Text strong>{selectedAddress}</Text>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="primary"
                  color='cyan'
                  variant='solid'
                  block
                  style={{ marginTop: 12 }}
                  disabled={addressMode === 'custom' && !customAddress.trim()}
                  onClick={handleAddressConfirm}
                >
                  Xác nhận địa chỉ
                </Button>
              </Card>
            </Col>
          </Row>

        </Col>
      </Row >

    </>
  )
}

export default Cart