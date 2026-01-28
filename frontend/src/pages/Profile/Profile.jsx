import React from 'react'
import { Card, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {

  const dispatch = useDispatch();

  // ✅ Lấy user và isAuthenticated từ Redux state
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Hiển thị loading state
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Kiểm tra nếu chưa đăng nhập hoặc không có user
  if (!isAuthenticated || !user) {
    return <div>Vui lòng đăng nhập</div>;
  }

  return (
    <>
      <Row gutter={[16, 16]} >
        <Col span={24} className='bg-white my-4 d-flex align-items-center justify-content-center'>
          <Card
            title={`${user.name}`}
            variant="borderless"
            style={{ width: 900 }}

          >
            <p>Email: {user.email}</p>
            <p>Số điện thoại: {user.phone_number || 'Chưa cập nhật'}</p>
            <p>Tuổi: {user.age || 'Chưa cập nhật'}</p>
            <p>Địa chỉ: {user.address || 'Chưa cập nhật'}</p>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Profile