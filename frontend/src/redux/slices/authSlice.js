import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// ============================================
// INITIAL STATE
// ============================================
const initialState = {
    user: null,              // { id, email, name, role, phone_number, age, address }
    token: null,             // JWT token string (Hiện tại đang là fake sau cho be)
    isAuthenticated: false,  // true nếu đã login
    loading: false,          // true khi đang call API
    error: null,             // Error message string
};

// ============================================
// ASYNC THUNKS (API Calls)
// ============================================

/**
 * LOGIN USER
 * Call: authService.login(email, password)
 * Return: { user, token }
 * 
 * // Redux tự động generate:
'auth/login/pending'    // Khi bắt đầu call API
'auth/login/fulfilled'  // Khi thành công
'auth/login/rejected'   // Khi thất bại
 */
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await authService.login(email, password);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * REGISTER USER
 * Call: authService.register(userData)
 * Return: { user, token }
 */
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await authService.register(userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * UPDATE USER PROFILE
 * Call: authService.updateProfile(userId, userData)
 * Return: updatedUser
 */
export const updateUserProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const updatedUser = await authService.updateProfile(userId, userData);
            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ============================================
// SLICE
// ============================================
const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        /**
         * LOGOUT
         * Clear state và localStorage
         */
        logout: (state) => {
            authService.logout();
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        /**
         * LOAD USER FROM STORAGE
         * Restore từ localStorage khi app reload
         */
        loadUserFromStorage: (state) => {
            const userData = authService.getCurrentUser();
            if (userData) {
                state.user = userData.user;
                state.token = userData.token;
                state.isAuthenticated = true;
            }
        },

        /**
         * CLEAR ERROR
         * Reset error state
         */
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        // ============================================
        // LOGIN CASES
        // ============================================
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // ============================================
            // REGISTER CASES
            // ============================================
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // ============================================
            // UPDATE PROFILE CASES
            // ============================================
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { logout, loadUserFromStorage, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
