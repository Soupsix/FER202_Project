import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Image, Tag, Space, Button, Tooltip, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { selectProductsWithBrandsAndCategories } from '../../../redux/selectors/joinSelectors';
import { fetchBrands } from '../../../redux/slices/brandSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { fetchProducts } from '../../../redux/slices/productSlice';
import { updateProduct, deleteProduct, createProduct } from '../../../services/productService';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const productsWithInfo = useSelector(selectProductsWithBrandsAndCategories);
  const brands = useSelector(state => state.brand.brands);
  const categories = useSelector(state => state.category.categories);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(productsWithInfo);

  const handleAddProduct = () => {
    setIsEditing(false);
    setEditingProductId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (productId) => {
    const product = productsWithInfo.find(p => p.id === productId);
    if (product) {
      setIsEditing(true);
      setEditingProductId(productId);
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
        brandId: product.brandId,
        image: product.image,
        status: product.status,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (productId) => {
    Modal.confirm({
      title: 'Xác Nhận Xóa',
      content: 'Bạn có chắc muốn xóa sản phẩm này?',
      okText: 'Xóa',
      cancelText: 'Huỷ',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          setLoading(true);
          await deleteProduct(productId);
          dispatch(fetchProducts());
        } catch (error) {
          console.error('Error deleting product:', error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (isEditing) {
        await updateProduct(editingProductId, values);
      } else {
        await createProduct(values);
      }
      
      dispatch(fetchProducts());
      setIsModalOpen(false);
      form.resetFields();
      setEditingProductId(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingProductId(null);
    setIsEditing(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image) => (
        <Image
          src={image}
          alt="product"
          style={{ width: 60, height: 60, objectFit: 'cover' }}
          preview={{ width: 200 }}
        />
      ),
    },
    {
      title: 'Danh Mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 120,
    },
    {
      title: 'Thương Hiệu',
      dataIndex: 'brandName',
      key: 'brandName',
      width: 120,
    },
    {
      title: 'Giá (đ)',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => price.toLocaleString('vi-VN'),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Hoạt Động' : 'Tắt'}
        </Tag>
      ),
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Hành Động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record.id)}
            />
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Quản Lý Sản Phẩm</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Thêm Sản Phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={productsWithInfo.map((product) => ({
          ...product,
          key: product.id,
        }))}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      <Modal
        title={isEditing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        okText={isEditing ? 'Cập Nhật' : 'Lưu'}
        cancelText="Huỷ"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Giá (đ)"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập giá sản phẩm"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập số lượng"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Danh Mục"
            name="categoryId"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories && categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Thương Hiệu"
            name="brandId"
            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {brands && brands.map(brand => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="URL Hình Ảnh"
            name="image"
            rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh' }]}
          >
            <Input placeholder="Nhập URL hình ảnh" />
          </Form.Item>

          <Form.Item
            label="Trạng Thái"
            name="status"
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value={true}>Hoạt Động</Select.Option>
              <Select.Option value={false}>Tắt</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductManagement;