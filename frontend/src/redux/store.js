import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import brandReducer from './slices/brandSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        brand: brandReducer,
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
    },
});

export default store;
