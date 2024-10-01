import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import Faq from "../Pages/Faq/Faq";
import TrackOrders from "../Pages/TrackOrders/TrackOrders";
import BlogDetails from "../Pages/Blog/BlogDetails";
import AuthPage from "../Pages/SignIn&SignUp/AuthPage";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import About from "../Pages/About/About";
import ProductDeatails from "../Pages/Shop/ProductDetails/ProductDeatails"
import LiveChat from "../Pages/LiveChat/LiveChat";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/BlogDetails/:id", 
        element: <BlogDetails></BlogDetails>, 
        loader: ({params}) => fetch(`http://localhost:3000/blogs/${params.id}`)
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
        path: "/profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/support",
        element: <LiveChat></LiveChat>,
      },
      {
        path: "/Dashboard",
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path:'/productDetails/:id',
        element:<ProductDeatails></ProductDeatails>,
     
    },
    {
      path: "/Dashboard",
      element: <AdminDashboard></AdminDashboard>,
    },
    ],
  },
]);