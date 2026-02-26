import React, { useState } from 'react';
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

const HomePage = () => {
  // State lưu ID danh mục đang chọn (mặc định '0' là tất cả)
  const [selectedCateId, setSelectedCateId] = useState('0');

  return (
    <>
      <Banner />
      {/* Truyền hàm setSelectedCateId xuống cho CategoryList */}
      <CategoryList onSelectCategory={setSelectedCateId} />
      
      {/* Truyền giá trị selectedCateId xuống cho ProductList lọc */}
      <ProductList filterCateId={selectedCateId} />
    </>
  );
};

export default HomePage;