import React from "react";
import { NavLink } from "react-router-dom";
import useProducts from "../../../Components/Hooks/useProducts";
import { FaBars } from "react-icons/fa";

const Navigation = () => {
  const [products, loading] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="border-t">
      <div className="flex justify-between items-center container mx-auto">
        <section className="flex justify-center items-center gap-2 bg-primary text-white px-5 py-2 rounded-3xl">
          <FaBars />
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
          <ul className="menu menu-horizontal">{navLinks}</ul>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
