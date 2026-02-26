import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/categorySlice';

const CategoryList = ({ onSelectCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // --- TÁCH HÀM XỬ LÝ RIÊNG Ở ĐÂY ---
  const handleTabChange = (e) => {
    // console.log("Category ID được chọn:", key); // Bạn có thể console log để check
    onSelectCategory(e); 
  };

  // Tạo danh sách các Tab
  const items = [
    { 
      key: '0', 
      label: 'Tất cả' 
    },
    ...categories.map(cat => ({
      key: cat.id.toString(),
      label: cat.name
    }))
  ];

  if (loading) return <div className="text-center p-3">Đang tải danh mục...</div>;
  if (error) return <div className="text-center text-danger p-3">Lỗi: {error}</div>;

  return (
    <div className="container">
      <Tabs
        defaultActiveKey="0"
        items={items}
        // Gọi hàm đã tách ra ở trên
        onChange={handleTabChange}
        className='d-flex align-items-center fw-bold my-2'
        centered
      />
    </div>
  );
};

export default CategoryList;