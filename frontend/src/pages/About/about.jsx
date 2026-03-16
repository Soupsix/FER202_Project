import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about">
            {/* Banner */}
            <div className="about-banner">
                <div className="banner-content">
                    <h1>About WoolGood</h1>
                    <p>Handmade products made with love 🧶</p>
                </div>
            </div>

            {/* Intro */}
            <div className="about-intro">
                <p>
                    <span>WoolGood</span> là cửa hàng chuyên cung cấp các sản phẩm handmade từ len
                    và các món quà trang trí dễ thương dành cho những người yêu thích
                    đồ thủ công.
                </p>
            </div>

            {/* Section Cards */}
            <div className="about-section">
                <div className="about-card">
                    <div className="icon">🌸</div>
                    <h3>Câu chuyện của chúng tôi</h3>
                    <p>
                        WoolGood được tạo ra với mong muốn mang đến những sản phẩm thủ công
                        độc đáo, được làm hoàn toàn bằng tay với sự tỉ mỉ và tình yêu dành
                        cho nghệ thuật handmade.
                    </p>
                </div>

                <div className="about-card">
                    <div className="icon">🧶</div>
                    <h3>Sản phẩm của chúng tôi</h3>
                    <p>
                        Chúng tôi cung cấp nhiều sản phẩm như hoa len, thú móc, đồ trang trí
                        và các món quà nhỏ xinh phù hợp cho nhiều dịp khác nhau.
                    </p>
                </div>

                <div className="about-card">
                    <div className="icon">🎯</div>
                    <h3>Sứ mệnh</h3>
                    <p>
                        Mang đến niềm vui và sự ấm áp thông qua những sản phẩm handmade
                        chất lượng giúp khách hàng tìm được món quà ý nghĩa.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;