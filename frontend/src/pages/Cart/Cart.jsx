import React, { useState } from 'react'
import { Col, Row, Card, Button, Flex, InputNumber, Input, Radio, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { HomeOutlined, EditOutlined, CheckCircleFilled } from '@ant-design/icons';
const { Text } = Typography;

const Cart = () => {

  const onChange = value => {
    console.log('changed', value);
  };

  const sharedProps = {
    mode: 'spinner',
    min: 1,
    max: 10,
    defaultValue: 3,
    onChange,
    style: { width: 120 },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // State quản lý địa chỉ giao hàng
  const [addressMode, setAddressMode] = useState('saved'); // 'saved' | 'custom'
  const [customAddress, setCustomAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(user?.address || '');

  const handleAddressConfirm = () => {
    if (addressMode === 'custom' && customAddress.trim()) {
      setSelectedAddress(customAddress.trim());
    } else if (addressMode === 'saved') {
      setSelectedAddress(user?.address || '');
    }
  };

  return (
    <>
      <Row justify="center" gutter={24} className='my-5' >
        <Col span={12} >
          <Card title={`Giỏ hàng của ${user.name}: `} bordered={true} >
            <Row className='mx-3'>
              <Col span={4}>
                <img src="../public/images/Banner1.jpg" alt="Ảnh Product1" style={{ width: '142px', height: '100px' }} />
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>Sản phẩm 1</p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>
                  <Flex vertical gap="middle">
                    <InputNumber {...sharedProps} variant="filled" placeholder="Filled" />
                  </Flex>
                </p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>330.000vnđ</p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>
                  <Button>X</Button>
                </p>
              </Col>
            </Row>

            <hr />

            <Row className='mx-3'>
              <Col span={4}>
                <img src="../public/images/Banner1.jpg" alt="Ảnh Product1" style={{ width: '142px', height: '100px' }} />
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>Sản phẩm 2</p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>
                  <Flex vertical gap="middle">
                    <InputNumber {...sharedProps} variant="filled" placeholder="Filled" />
                  </Flex>
                </p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>330.000vnđ</p>
              </Col>
              <Col span={5} className='d-flex align-items-center justify-content-center'>
                <p>
                  <Button>X</Button>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={6}>
          <Row gutter={24}>
            <Col span={24}>
              <Card title="Thanh toán" variant={true}>
                <Row gutter={24} className='mb-3'>
                  <Col span={12} >Sản phẩm 1</Col>
                  <Col span={12} >330.000 (vnđ)</Col>
                </Row>

                <Row gutter={24} >
                  <Col span={12} >Sản phẩm 2</Col>
                  <Col span={12} >330.000 (vnđ)</Col>
                </Row>

                <hr />

                <Row gutter={24} className='mb-2'>
                  <Col span={12}>
                    <Text strong> Tổng cộng:</Text>
                  </Col>
                  <Col>
                    <Text strong type="danger"> 660.000 (vnđ)</Text>
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
                      disabled={addressMode === 'custom' && !customAddress.trim()}
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