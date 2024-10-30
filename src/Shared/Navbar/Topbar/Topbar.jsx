import { MdHealthAndSafety } from "react-icons/md";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="py-2 border-y text-xs font-opensans">
      <div className="container mx-auto flex justify-between items-center">
        <section className="flex gap-4">
          <Link to="/about">
            <p className=" hover:text-primary">About Us</p>
          </Link>
          <Link to="/profile">
            <p className=" hover:text-primary">My account</p>
          </Link>
          <Link to="/track">
            <p className=" hover:text-primary">Order Tracking</p>
          </Link>
        </section>
        <section className="flex justify-between items-center">
          <section className="flex justify-center items-center gap-1">
            <MdHealthAndSafety />
            <p>100% Secure delivery without contacting the courier</p>
          </section>
          <div class="divider divider-horizontal"></div>
          <section>
            <p>
              Need help? Call Us:{" "}
              <span className=" text-primary">+88 09341234567</span>
            </p>
          </section>
          <div class="divider divider-horizontal"></div>
          <section>
            <select>
              <option>USD</option>
              <option>BDT</option>
              <option>GBP</option>
            </select>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Topbar;
