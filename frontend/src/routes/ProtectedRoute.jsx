import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // check login đơn giản
  const user = localStorage.getItem("user");

  if (!user) {
    // chưa login → đá về login
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // đã login → cho đi tiếp
  return children;
};

export default ProtectedRoute;
