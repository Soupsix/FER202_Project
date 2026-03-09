import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const location = useLocation();

  // Lấy trạng thái authentication từ Redux store
  const { user, isAuthenticated, authChecked } = useSelector((state) => state.auth);

  //Fix bug loading khi redux chưa kịp give user
  if (!authChecked) {
    return <div>Loading...</div>; // đợi Redux load xong
  }

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

  if(user?.role?.toLowerCase() !== "admin"){
    return <Navigate
      to="/"
      replace
    />
  }

  // Đã login → render children
  return children;
};

export default AdminRoute;
