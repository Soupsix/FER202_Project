import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout";

import HomePage from './pages/Home/HomePage'
import Product from "./pages/Products/Product";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chính */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Product />} />

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
        </Route>

        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
