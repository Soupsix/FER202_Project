import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Có thể thêm các reducer khác
        // cart: cartReducer,
        // product: productReducer,
        // order: orderReducer,
    },
});

export default store;
