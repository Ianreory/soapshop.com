import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "@/pages/not-found";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/auth/login";

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
          path: "/login",
          loader: () => "Soap shop | Login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
