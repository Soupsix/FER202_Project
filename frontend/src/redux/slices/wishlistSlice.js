import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserWishlist } from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { user } = getState().auth;
            if (!user) return rejectWithValue('Người dùng chưa đăng nhập');
            const data = await getUserWishlist(user.id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
