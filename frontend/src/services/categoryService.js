import api from './api';
import { toast } from 'sonner';

const categoryList = async () => {
    try {
        const res = await api.get(`/categories`);
        return res.data;
    } catch (error) {
        console.log(`Lỗi khi loading Category: ${error}`);
    }
}

const categoryService = {
    categoryList
};

export default categoryService;