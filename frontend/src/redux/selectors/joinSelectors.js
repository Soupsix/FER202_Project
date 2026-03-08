import { createSelector } from '@reduxjs/toolkit';

// Join cart items với products để lấy thông tin đầy đủ
export const selectCartWithProducts = createSelector(
    (state) => state.cart.products,
    (state) => state.product.products,
    (cartItems, allProducts) => {
        if (!cartItems || !allProducts) return [];

        return cartItems.map((item) => {
            const product = allProducts.find((p) => String(p.id) === String(item.productId));
            return {
                ...item,
                name: product?.name,
                image: product?.image,
                price: product?.price,
                description: product?.description,
                stock: product?.quantity,
            };
        });
    }
);
