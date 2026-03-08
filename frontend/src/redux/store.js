import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        cart: cartReducer,
        product: productReducer,
    },
});

export default store;
