import api from './api';
import { toast } from 'sonner';

export const getAllProducts = async () => {
    try {
        const res = await api.get('/products');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách sản phẩm');
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const res = await api.post('/products', productData);
        toast.success('Sản phẩm đã được tạo thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi tạo sản phẩm');
        throw error;
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const res = await api.put(`/products/${id}`, productData);
        toast.success('Sản phẩm đã được cập nhật thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi cập nhật sản phẩm');
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`);
        toast.success('Sản phẩm đã được xóa thành công');
        return res.data;
    } catch (error) {
        toast.error('Lỗi khi xóa sản phẩm');
        throw error;
    }
}