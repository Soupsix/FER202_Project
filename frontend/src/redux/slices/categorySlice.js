import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

const initialState = {
    categories: [],
    loading: false,          // true khi đang call API
    error: null,
};

// asycn thunk
export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const res = await categoryService.categoryList();
            return res; // res lúc này đã là data rồi (từ res.data trong service)
        } catch (error) {
            console.log(`Lỗi khi loading Category: ${error}`);
            return rejectWithValue(error);
        }
    }
)

//Tạo slice
const categorySlice = createSlice(
    {
        name: 'category',
        initialState,

        reducers: {},

        extraReducers: (builder) => {
            builder
                .addCase(fetchCategories.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchCategories.fulfilled, (state, action) => {
                    state.loading = false;
                    state.categories = action.payload;
                })
                .addCase(fetchCategories.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)


// Export actions
export const { } = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;