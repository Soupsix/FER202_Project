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
