import api from './api';
import { toast } from 'sonner';

export const getAllProductInCart = async (userId) => {
    try {
        const res = await api.get(`/cart?userId=${userId}`);
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi lấy sản phẩm trong giỏ hàng');
        throw error;
    }
}

export const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
        const res = await api.patch(`/cart/${cartItemId}`, { quantity })
        toast.success('Cập nhật số lượng sản phẩm trong giỏ hàng thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng');
        throw error;
    }
}

export const deleteCartItem = async (cartItemId) => {
    try {
        const res = await api.delete(`/cart/${cartItemId}`)
        toast.success('Xóa sản phẩm khỏi giỏ hàng thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng');
        throw error;
    }
}

export const createCartItem = async (userId, productId, quantity) => {
    try {
        const res = await api.post(`/cart`, { userId, productId, quantity })
        toast.success('Thêm sản phẩm vào giỏ hàng thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
        throw error;
    }
}