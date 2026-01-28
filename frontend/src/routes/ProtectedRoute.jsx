import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Lấy trạng thái authentication từ Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Chưa login → redirect về /login
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Đã login → render children
  return children;
};

export default ProtectedRoute;
