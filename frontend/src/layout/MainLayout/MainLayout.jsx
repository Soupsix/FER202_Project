import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigationbar from './components/Navigationbar';

const MainLayout = () => {
    // 1. Đưa state searchTerm lên đây để dùng chung
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="main-layout">
            {/* 2. Truyền searchTerm và setSearchTerm vào Header gốc của Layout */}
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Navigationbar />
            
            <main>
                {/* 3. Dùng context của Outlet để truyền searchTerm xuống các page con (như HomePage) */}
                <Outlet context={[searchTerm, setSearchTerm]} />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;