import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import OurStory from "../Pages/OurStory/OurStory";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import Faq from "../Pages/Faq/Faq";
import TrackOrders from "../Pages/TrackOrders/TrackOrders";

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
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
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
    ],
  },
]);
