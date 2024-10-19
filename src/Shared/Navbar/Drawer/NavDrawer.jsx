import { RxCrossCircled } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import useProducts from "../../../Components/Hooks/useProducts";
import { FaBars } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const NavDrawer = ({ toggleDrawer, user, handleLogOut }) => {
  const [products] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];

  const [users] = useUsers();
  const currentUsers = users.find((login) => login?.email === user?.email);

  const location = useLocation();

  const navLinks = (
    <>
      <li>
        <a
          href="/"
          className={`px-2 py-2 rounded-md text-sm ${
            location.pathname === "/"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/shop"
          className={`px-2 py-2 rounded-md text-sm ${
            location.pathname === "/shop"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Shop
        </a>
      </li>
      <li>
        <a
          href="/blog"
          className={`px-2 py-2 rounded-md text-sm ${
            location.pathname === "/blog"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Blog
        </a>
      </li>
      <li>
        <a
          href="/contact"
          className={`px-2 py-2 rounded-md text-sm ${
            location.pathname === "/contact"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Contact
        </a>
      </li>
      {currentUsers?.type === "admin" && (
        <li>
          <a
            href="/dashboard"
            className={`px-2 py-2 rounded-md text-sm ${
              location.pathname === "/dashboard"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            Dashboard
          </a>
        </li>
      )}
      {currentUsers?.type === "seller" && (
        <li>
          <a
            href="/sellerdashboard"
            className={`px-2 py-2 rounded-md text-sm ${
              location.pathname === "/sellerdashboard"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            Dashboard
          </a>
        </li>
      )}
    </>
  );

  return (
    <div className="flex flex-col justify-between h-full py-10">
      <div className=" space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center px-2">
          <Link to="/">
            <p className="text-2xl md:text-4xl font-extrabold font-poppins">
              Giftap
            </p>
          </Link>
          <button className="text-2xl text-primary" onClick={toggleDrawer}>
            <RxCrossCircled />
          </button>
        </div>
        <div className="flex justify-between items-center px-2 text-sm">
          <Link to="/profile">
            <p className=" hover:text-primary">My account</p>
          </Link>
          <Link to="/track">
            <p className=" hover:text-primary">Order Tracking</p>
          </Link>
        </div>
        {/* <div className="flex justify-between items-center px-2 text-sm">
          {user ? (
            <Link to="/support">
              <p className=" hover:text-primary">Support</p>
            </Link>
          ) : (
            ""
          )}
        </div> */}

        {/* Category and Links */}
        <div className="space-y-4">
          <section className="flex justify-center items-center gap-2 bg-primary text-white mx-4 px-10 py-2 rounded-md">
            <p>
              <FaBars />
            </p>
            <select className="bg-primary text-white border-none outline-none">
              <option disabled>All Categories</option>
              {categories.map((category, index) => (
                <option key={index} className="bg-primary text-white">
                  {category}
                </option>
              ))}
            </select>
          </section>
          <section>
            <ul className="flex flex-col gap-2 pl-4 ">{navLinks}</ul>
          </section>
        </div>
      </div>

      {/* Profile Section at the End */}
      <div className="space-y-2 flex flex-col justify-center items-center px-2">
        <section className="flex flex-col items-center gap-4">
          {user ? (
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <p className="w-10 h-10 rounded-full border flex items-center justify-center text-lg">
                <BiUser />
              </p>
            </Link>
          )}
        </section>
        <section>
          {user && (
            <div className="flex justify-center">
              <button
                onClick={handleLogOut}
                className="border rounded-lg px-2 py-2 bg-primary text-white hover:bg-red-600 btn-sm flex items-center justify-center text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NavDrawer;
