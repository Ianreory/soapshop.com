import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "@/pages/not-found";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/registrasi";
import Home from "@/pages/home/home";
import Users from "@/pages/users/users";
import EditProfile from "@/pages/users/edit-profile";
import TableProduct from "@/pages/product/table-product";
import AddProduct from "@/pages/product/add-product";
import DetailProduct from "@/pages/product/detail-product";
import Carts from "@/pages/carts/carts";
import ListOrder from "@/pages/order/list-order";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "*",
          loader: () => "Not Found | Soap shop",
          element: <NotFound />,
        },
        {
          path: "/",
          loader: () => "Soap shop | Home",
          element: <Home />,
        },
        {
          path: "/login",
          loader: () => "Soap shop | Login",
          element: <Login />,
        },
        {
          path: "/register",
          loader: () => "Soap shop | Register",
          element: <Register />,
        },
        {
          path: "/profile",
          loader: () => "Soap shop | Users",
          element: <Users />,
        },
        {
          path: "/profile/edit",
          loader: () => "Soap shop | Edit Users",
          element: <EditProfile />,
        },
        {
          path: "/users/products",
          loader: () => "Soap shop | Table Product",
          element: <TableProduct />,
        },
        {
          path: "/create/product",
          loader: () => "Soap shop | Create Product",
          element: <AddProduct />,
        },
        {
          path: "/product/:product_id",
          loader: () => "Soap shop | Detail product",
          element: <DetailProduct />,
        },
        {
          path: "/carts",
          loader: () => "Soap shop | Shooping Cart",
          element: <Carts />,
        },
        {
          path: "/order/list",
          loader: () => "Not Found | List Order",
          element: <ListOrder />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
