import React from 'react'
import { Col, Row, Card, Button, Flex, InputNumber } from 'antd';

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

  return (
    <>
      <Row justify="center" gutter={24} className='my-5' >
        <Col span={12} >
          <Card title={`Giỏ hàng của bạn: `} bordered={true} >
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
          <Card title="Thanh toán" bordered={true}>
            Cart
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Cart