import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // Thêm dòng này
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

const HomePage = () => {
    const [selectedCateId, setSelectedCateId] = useState('0');
    
    // 1. Lấy searchTerm từ MainLayout truyền xuống qua Outlet
    const [searchTerm] = useOutletContext(); 

    return (
        <>
            {/* XÓA Header ở đây đi, vì Layout đã có rồi */}
            <Banner />
            <CategoryList onSelectCategory={setSelectedCateId} />
            {/* 2. Truyền searchTerm vào ProductList để lọc */}
            <ProductList filterCateId={selectedCateId} searchTerm={searchTerm} />
        </>
    );
};

export default HomePage;