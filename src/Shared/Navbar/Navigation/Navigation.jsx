import { useLocation } from "react-router-dom"; // Import useLocation
import useProducts from "../../../Components/Hooks/useProducts";
import { FaBars } from "react-icons/fa";
import useChat from "../../../Components/Hooks/useChat";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import UserChat from "../../../Pages/Support/UserChat/UserChat";
import AdminChat from "../../../Pages/Support/AdminChat/AdminChat";

const Navigation = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const currentUsers = users.find((login) => login?.email === user?.email);

  const [products] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];

  const [chats] = useChat();

  const location = useLocation();

  const navLinks = (
    <>
      <li>
        <a
          href="/"
          className={`px-4 py-2 rounded-md text-sm ${
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
          className={`px-4 py-2 rounded-md text-sm ${
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
          className={`px-4 py-2 rounded-md text-sm ${
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
          className={`px-4 py-2 rounded-md text-sm ${
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
            className={`px-4 py-2 rounded-md text-sm ${
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
            className={`px-4 py-2 rounded-md text-sm ${
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
    <div className="border-t">
      <div className="flex justify-end items-center container mx-auto">
        {/* <section className="flex justify-center items-center gap-2 bg-primary text-white px-5 py-2 rounded-3xl">
          <FaBars />
          <select className="bg-primary text-white border-none outline-none">
            <option disabled>All Categories</option>
            {categories.map((category, index) => (
              <option key={index} className="bg-primary text-white">
                {category
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
              </option>
            ))}
          </select>
        </section> */}

        <section className="flex justify-center items-center gap-4 py-3">
          <ul className="flex gap-2 justify-center items-center">{navLinks}</ul>
          {/* <section className="flex justify-center gap-4">
            <UserChat />
            <AdminChat currentUsers={currentUsers} chats={chats} />
          </section> */}
        </section>
      </div>
    </div>
  );
};

export default Navigation;
