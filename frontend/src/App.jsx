import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './redux/slices/authSlice';
import MainLayout from "./layout/MainLayout/MainLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout";

import HomePage from './pages/Home/HomePage'
import Product from "./pages/Products/Product";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile/Profile"
import { Toaster, toast } from 'sonner'
import About from "./pages/About/about";
import Blogs from "./pages/Blogs/blogs";
import ContactUs from "./pages/Contact/ContactUs";
import Wishlist from "./pages/Wishlist/WishlistUser";

function App() {
  const dispatch = useDispatch();

  // Load user từ localStorage khi app khởi động
  // Để user không cần login lại sau khi refresh page
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={5000}
      />
      <BrowserRouter>
        <Routes>
          {/* Layout chính */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Product />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <About />
              }
            />

            <Route
              path="/blogs"
              element={
                <Blogs />
              }
            />

            <Route
              path="/contact"
              element={
                <ContactUs />
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Auth layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
