// Authentication Service - Real API Integration
// Gọi API từ json-server: http://localhost:9999/users
import api from './api';
import { toast } from 'sonner';

// ============================================
// HELPER FUNCTIONS
// ============================================

// Lưu user vào localStorage
const saveUserToStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

// Xóa user khỏi localStorage
const clearUserFromStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

// Lấy user từ localStorage
const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user ? { user: JSON.parse(user), token } : null;
};

// ============================================
// API CALLS
// ============================================

/**
 * LOGIN
 * Step 1: GET all users từ API
 * Step 2: Client-side check email/password (vì json-server không support authentication)
 * Step 3: Nếu match → lưu localStorage và return user data
 */
const login = async (email, password) => {
    try {
        // STEP 1: Fetch all users từ json-server
        const response = await api.get('/users');
        const users = response.data;

        // STEP 2: Tìm user có email và password khớp
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            throw new Error('Email hoặc mật khẩu không đúng!');
        }

        // STEP 3: Tạo token (mock - trong production sẽ nhận từ backend)
        const token = `jwt-token-${user.id}-${Date.now()}`;

        // STEP 4: Lưu vào localStorage
        saveUserToStorage(user, token);

        // STEP 5: Return user data (loại bỏ password)
        const { password: _, ...userWithoutPassword } = user;

        toast.success(`Xin chào ${user.name}`);
        return {
            user: userWithoutPassword,
            token,
        };
    } catch (error) {
        throw new Error(error.message || 'Đăng nhập thất bại!');
    }
};

/**
 * REGISTER
 * Step 1: Check email đã tồn tại chưa
 * Step 2: POST user mới lên json-server
 * Step 3: Lưu localStorage và return
 */
const register = async (userData) => {
    try {
        // STEP 1: Check email đã tồn tại
        const response = await api.get('/users');
        const users = response.data;

        const existingUser = users.find((u) => u.email === userData.email);
        if (existingUser) {
            throw new Error('Email đã được sử dụng!');
        }

        // STEP 2: Tạo user object mới
        const newUser = {
            email: userData.email,
            password: userData.password,
            name: userData.name || '',
            phone_number: userData.phone_number || '',
            age: userData.age || null,
            address: userData.address || '',
            role: 'customer', // Default role
        };

        // STEP 3: POST lên json-server (json-server tự generate ID)
        const createResponse = await api.post('/users', newUser);
        const createdUser = createResponse.data;

        // STEP 4: Tạo token
        const token = `jwt-token-${createdUser.id}-${Date.now()}`;

        // STEP 5: Lưu localStorage
        saveUserToStorage(createdUser, token);

        // STEP 6: Return (loại bỏ password)
        const { password: _, ...userWithoutPassword } = createdUser;

        return {
            user: userWithoutPassword,
            token,
        };
    } catch (error) {
        throw new Error(error.message || 'Đăng ký thất bại!');
    }
};

/**
 * LOGOUT
 * Clear localStorage
 */
const logout = () => {
    clearUserFromStorage();
};

/**
 * GET CURRENT USER
 * Lấy từ localStorage (dùng khi reload page)
 */
const getCurrentUser = () => {
    return getUserFromStorage();
};

/**
 * UPDATE USER PROFILE (Optional - để mở rộng tương lai)
 * PUT /users/:id
 */
const updateProfile = async (userId, userData) => {
    try {
        const response = await api.put(`/users/${userId}`, userData);
        const updatedUser = response.data;

        // Update localStorage
        const currentData = getUserFromStorage();
        if (currentData) {
            saveUserToStorage(updatedUser, currentData.token);
        }

        return updatedUser;
    } catch (error) {
        throw new Error(error.message || 'Cập nhật thất bại!');
    }
};

// ============================================
// EXPORT
// ============================================
const authService = {
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
};

export default authService;
