import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductInCart } from "../../services/cartService";

export const fetchCartProducts = createAsyncThunk(
    'cart/fetchCartProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { user } = getState().auth;
            if (!user) return rejectWithValue('Người dùng chưa đăng nhập');
            const data = await getAllProductInCart(user.id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
