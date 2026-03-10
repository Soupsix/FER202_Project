import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import brandService from '../../services/brandService';

const initialState = {
    brands: [],
    loading: false,
    error: null,
};

export const fetchBrands = createAsyncThunk(
    'brand/fetchBrands',
    async (_, { rejectWithValue }) => {
        try {
            const res = await brandService.brandList();
            return res;
        } catch (error) {
            console.log(`Lỗi khi loading Brand: ${error}`);
            return rejectWithValue(error);
        }
    }
)

const brandSlice = createSlice(
    {
        name: 'brand',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchBrands.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchBrands.fulfilled, (state, action) => {
                    state.loading = false;
                    state.brands = action.payload;
                })
                .addCase(fetchBrands.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)

export default brandSlice.reducer;
