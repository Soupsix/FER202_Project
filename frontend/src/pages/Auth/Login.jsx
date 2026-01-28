import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Form, Input, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { loginUser, clearError } from '../../redux/slices/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy state từ Redux
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Auto redirect nếu đã login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear error khi component unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle form submit
  const onFinish = async (values) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password }));

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ArrowLeftOutlined
            onClick={() => navigate("/")}
            style={{ cursor: 'pointer', fontSize: '18px' }}
          />
          <span>Đăng nhập</span>
        </div>
      }
      variant="borderless"
      style={{ width: 800 }}
    >
      {/* Hiển thị error nếu có */}
      {error && (
        <Alert
          message={error}
          type="error"
          closable
          onClose={() => dispatch(clearError())}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="user@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="123456" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div>
            Chưa có tài khoản?{' '}
            <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
              Đăng ký ngay
            </a>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
