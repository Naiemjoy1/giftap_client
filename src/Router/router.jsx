import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import OurStory from "../Pages/OurStory/OurStory";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import Faq from "../Pages/Faq/Faq";
import TrackOrders from "../Pages/TrackOrders/TrackOrders";
import AuthPage from "../Pages/SignIn&SignUp/AuthPage";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import ProductDeatails from "../Pages/Shop/ProductDetails/ProductDeatails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <AuthPage></AuthPage>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/story",
        element: <OurStory></OurStory>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/track",
        element: <TrackOrders></TrackOrders>,
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path:'/productDetails/:id',
        element:<ProductDeatails></ProductDeatails>,
     
    },
    ],
  },
]);
