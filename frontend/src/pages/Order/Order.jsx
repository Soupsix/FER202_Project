import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../redux/slices/orderSlice';
import { Table, Tag, Typography, Alert } from 'antd';

const { Title } = Typography;

const Order = () => {
  const dispatch = useDispatch();
  
  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const columns = [
    {
      title: 'Mã Đơn',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <b>#{text}</b>,
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        if (!text) return '';
        const d = new Date(text);
        return d.toLocaleDateString('vi-VN', {
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
    },
    {
      title: 'Địa Chỉ Giao Hàng',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `${price?.toLocaleString('vi-VN')} đ`,
    },
    {
      title: 'Trạng Thái',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'Pending' ? 'volcano' : 'green';
        return (
          <Tag color={color} key={status}>
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Sản Phẩm',
      key: 'items',
      render: (_, record) => (
        <ul>
          {record.items?.map((item, index) => (
            <li key={index}>
              {item.name} (x{item.quantity})
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Lịch Sử Mua Hàng</Title>
      {error && <Alert message="Lỗi" description={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Table 
        columns={columns} 
        dataSource={orders} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default Order;