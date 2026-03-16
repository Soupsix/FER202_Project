import React, { useEffect, useState } from 'react';
import './Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:9999/blogs')
            .then(res => {
                if (!res.ok) throw new Error("Lỗi 404 rồi!");
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setLoading(false); // Cần có cái này để tắt màn hình chờ
            })
            .catch(err => {
                console.error("Lỗi fetch:", err);
                setLoading(false); // Tắt loading kể cả khi lỗi để không bị treo trang
            });
    }, []);

    // Nếu vẫn đang loading, hiển thị thông báo
    if (loading) return <div className="loading">Đang tải tin tức len...</div>;

    return (
        <div className="blogs-page">
            <header className="blogs-header">
                <h2>Góc Chia Sẻ WoolGood</h2>
                <p>Khám phá thế giới len handmade đầy màu sắc</p>
            </header>

            <div className="blogs-container">
                {/* Kiểm tra blogs có phải là mảng không trước khi map */}
                {Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map(blog => (
                        <article className="blog-card" key={blog.id}>
                            <div className="blog-image">
                                <img src={blog.image} alt={blog.title} />
                                <span className="category-tag">Handmade</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span>📅 {blog.date}</span>
                                    <span>👤 {blog.author}</span>
                                </div>
                                <h3>{blog.title}</h3>
                                <p>{blog.summary}</p>
                                <button className="read-more-btn">
                                    Xem chi tiết
                                    <i className="arrow-icon">→</i>
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="no-data">Hiện chưa có bài viết nào.</div>
                )}
            </div>
        </div>
    );
};

export default Blogs;