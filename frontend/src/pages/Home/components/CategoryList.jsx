import React, { useState } from 'react'
import { Segmented, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { useEffect } from 'react';

const onChange = key => {
  console.log(key);
};



const CategoryList = () => {

  const [alignValue, setAlignValue] = useState('center');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Gọi API khi component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Lấy data từ Redux store
  const { categories, loading, error } = useSelector((state) => state.category);

  const items = [
    { key: '0', label: 'Tất cả', children: 'Tất cả các thú vui bạn muốn' },
    ...categories.map(cat => ({
      key: cat.id.toString(),
      label: cat.name,
      children: cat.description
    }))
  ];

  // Loading state
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải...</div>;
  }
  // Error state
  if (error) {
    return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  return (

    <>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: origin => origin - 20, align: alignValue }}
        className='d-flex align-items-center fw-bold my-2'
      />
    </>
  )
}

export default CategoryList