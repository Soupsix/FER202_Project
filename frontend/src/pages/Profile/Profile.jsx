import React from 'react';
import { Card, Col, Row, Avatar, Descriptions, Tag, Divider, Tabs, Empty } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  CalendarOutlined,
  IdcardOutlined,
  SettingOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (!isAuthenticated || !user) return <div className="text-center mt-5">Vui lòng đăng nhập</div>;

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row gutter={[24, 24]} justify="center">
          {/* CỘT BÊN TRÁI: AVATAR & INFO CƠ BẢN */}
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              className="shadow-sm text-center"
              style={{ borderRadius: '15px' }}
            >
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src={user.avatar} 
                style={{ backgroundColor: '#1890ff', marginBottom: '20px' }}
              />
              <h2 style={{ marginBottom: '5px' }}>{user.name}</h2>
              <Tag color="blue" className="mb-3">Thành viên WoolGood</Tag>
              <Divider />
              <div style={{ textAlign: 'left' }}>
                <p><MailOutlined className="me-2" /> {user.email}</p>
                <p><PhoneOutlined className="me-2" /> {user.phone_number || 'Chưa cập nhật'}</p>
              </div>
            </Card>
          </Col>

          {/* CỘT BÊN PHẢI: CHI TIẾT & HOẠT ĐỘNG */}
          <Col xs={24} md={14}>
            <Card 
              bordered={false} 
              className="shadow-sm" 
              style={{ borderRadius: '15px', minHeight: '450px' }}
            >
              <Tabs defaultActiveKey="1" items={[
                {
                  key: '1',
                  label: (<span><IdcardOutlined /> Thông tin chi tiết</span>),
                  children: (
                    <Descriptions column={1} bordered size="small" className="mt-2">
                      <Descriptions.Item label="Họ và tên">{user.name}</Descriptions.Item>
                      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                      <Descriptions.Item label="Số điện thoại">{user.phone_number || 'N/A'}</Descriptions.Item>
                      <Descriptions.Item label="Tuổi">{user.age || 'N/A'}</Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ">{user.address || 'N/A'}</Descriptions.Item>
                      <Descriptions.Item label="Ngày tham gia">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                      </Descriptions.Item>
                    </Descriptions>
                  ),
                },
                {
                  key: '2',
                  label: (<span><ShoppingOutlined /> Đơn hàng gần đây</span>),
                  children: <Empty description="Bạn chưa có đơn hàng nào" className="mt-5" />,
                },
                {
                  key: '3',
                  label: (<span><SettingOutlined /> Thiết lập</span>),
                  children: <p className="mt-4 text-muted">Chức năng cập nhật thông tin đang được phát triển...</p>,
                }
              ]} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Component giả lập Container để căn giữa giống Bootstrap
const Container = ({ children }) => (
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
    {children}
  </div>
);

export default Profile;