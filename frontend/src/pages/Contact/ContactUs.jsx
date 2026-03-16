import React from 'react'
import './Contact.css';
const ContactUs = () => {
    return (
        <div className="contact-body">

            <div className="contact-container">

                {/* LEFT */}
                <div className="contact-left">

                    <h2>NƠI GIẢI ĐÁP TOÀN BỘ MỌI THẮC MẮC CỦA BẠN?</h2>

                    <div className="contact-info">
                        <p><b>Hotline:</b> 0977508430 | 0338000308</p>
                        <p><b>Email:</b> woolgoodshop@gmail.com</p>
                    </div>

                    <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>

                    <form className="contact-form">

                        <div className="form-row">
                            <input type="text" placeholder="Họ và tên" />
                            <input type="email" placeholder="Email" />
                        </div>

                        <input type="text" placeholder="Điện thoại" />

                        <textarea placeholder="Nội dung"></textarea>

                        <button type="submit">Gửi thông tin</button>

                    </form>

                    {/* MAP */}
                    <div className="contact-map">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps?q=Hà Nội&output=embed"
                            width="100%"
                            height="250"
                            style={{ border: 0 }}
                        ></iframe>
                    </div>

                </div>


                {/* RIGHT */}
                <div className="contact-right">

                    <h2>HỆ THỐNG CỬA HÀNG</h2>

                    <div className="store">

                        <div className="store-item">
                            <b>1. WoolGood Hà Nội</b>
                            <p>Hoà Lạc, Hà Nội</p>
                        </div>

                        <div className="store-item">
                            <b>2. WoolGood Quận 1</b>
                            <p>Nguyễn Huệ, TP.HCM</p>
                        </div>

                        <div className="store-item">
                            <b>3. WoolGood Quận 3</b>
                            <p>Lý Thái Tổ, TP.HCM</p>
                        </div>

                        <div className="store-item">
                            <b>4. WoolGood Đà Nẵng</b>
                            <p>Nguyễn Văn Linh, Đà Nẵng</p>
                        </div>

                        <div className="store-item">
                            <b>5. WoolGood Hải Phòng</b>
                            <p>Lạch Tray, Hải Phòng</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ContactUs