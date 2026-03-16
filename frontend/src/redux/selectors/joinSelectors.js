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

// Join products với brands và categories để lấy tên brand và category
export const selectProductsWithBrandsAndCategories = createSelector(
    (state) => state.product.products,
    (state) => state.brand.brands,
    (state) => state.category.categories,
    (products, brands, categories) => {
        console.log(products, brands, categories);
        if (!products) return [];

        return products.map((product) => {
            const brand = brands?.find((b) => b.id === product.brandId);
            const category = categories?.find((c) => c.id === product.categoryId);
            return {
                ...product,
                brandName: brand?.name || 'N/A',
                categoryName: category?.name || 'N/A',
            };
        });
    }
);

// Join wishlist items với products để lấy thông tin đầy đủ
export const selectWishlistWithProducts = createSelector(
    (state) => state.wishlist.items,
    (state) => state.product.products,
    (wishlistItems, allProducts) => {
        if (!wishlistItems || !allProducts) return [];

        return wishlistItems.map((item) => {
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

