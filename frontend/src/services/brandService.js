import api from './api';
import { toast } from 'sonner';

const brandList = async () => {
    try {
        const res = await api.get(`/brands`);
        return res.data;
    } catch (error) {
        console.log(`Lỗi khi loading Brand: ${error}`);
    }
}

const brandService = {
    brandList
};

export default brandService;
