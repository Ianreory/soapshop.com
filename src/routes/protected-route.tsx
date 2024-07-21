import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const token = Cookies.get("token");

  const authProtected = ["/login", "/register"];
  const protectedByToken = ["/profile", "/profile/edit", "/users/products", "/product/:product_id", "/create/product", "/carts", "/order/list"];


  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
