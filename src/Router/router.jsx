import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";


import ErrorPage from "../Pages/ErrorPage/ErrorPage";

import Login from "../Pages/UserAuthentication/Login";
import Register from "../Pages/UserAuthentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
