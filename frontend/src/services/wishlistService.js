import api from './api';
import { toast } from 'sonner';

export const getUserWishlist = async (userId) => {
    try {
        const res = await api.get(`/wishlist?userId=${userId}`);
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách yêu thích');
        throw error;
    }
}

export const addToWishlist = async (userId, productId) => {
    try {
        const res = await api.post(`/wishlist`, { userId, productId })
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi thêm vào danh sách yêu thích');
        throw error;
    }
}

export const removeFromWishlist = async (wishlistId) => {
    try {
        const res = await api.delete(`/wishlist/${wishlistId}`)
        toast.success('Xóa sản phẩm khỏi danh sách yêu thích thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi xóa khỏi danh sách yêu thích');
        throw error;
    }
}
