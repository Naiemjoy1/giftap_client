import { useLocation } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import AdminChat from "../../../Pages/Support/AdminChat/AdminChat";
import useType from "../../../Components/Hooks/useType";

const Navigation = () => {
  const { user } = useAuth();

  const [userType] = user ? useType() : [];

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
      {userType === "admin" && (
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
      {userType === "seller" && (
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
        <section className="flex justify-center items-center gap-4 py-3">
          <ul className="flex gap-2 justify-center items-center">{navLinks}</ul>
          <section className="flex justify-center gap-4">
            {user && <AdminChat />}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
