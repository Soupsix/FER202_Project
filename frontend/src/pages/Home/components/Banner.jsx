import React from 'react';
import { Carousel } from 'antd';
import { Row, Col } from 'antd';
import { Image } from 'antd';

const contentStyle = {
  margin: 0,
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  marginTop: '50px',
};
const Banner = () => (
  <>
    <Row align="middle">
      <Col span={16} offset={4}>
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>
              <Image src="../public/images/Banner1.jpg" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Image src="../public/images/Banner2.jpg" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Image src="../public/images/Banner3.jpg" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Image src="../public/images/Banner4.jpg" />
            </h3>
          </div>
        </Carousel>
      </Col>
    </Row>
  </>
);
export default Banner;