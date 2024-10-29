import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between space-y-6 md:space-y-0">
          {/* Store Information Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">GifTap</h6>
            <p className="text-sm mb-2">
              We promise we’ll get back to you promptly– your gifting needs are
              always on our minds!
            </p>
            <p className="text-sm">Monday – Friday 8am – 6pm</p>

            <div className="flex mt-4 space-x-3">
              <a href="Facebook">
                <FaFacebook className="text-2xl cursor-pointer" />
              </a>
              <a href="Github">
                <FaGithub className="text-2xl cursor-pointer" />
              </a>
              <a href="Linkedin">
                <FaLinkedin className="text-2xl cursor-pointer" />
              </a>
              <a href="Instagram">
                <FaSquareInstagram className="text-2xl cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul>
              <Link to={"/blog"}>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Blog
                  </a>
                </li>
              </Link>
              <Link to={"/contact"}>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Contact Us
                  </a>
                </li>
              </Link>
              <Link to={"/about"}>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    About us
                  </a>
                </li>
              </Link>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul>
              <Link to={"/terms"}>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Terms & Condition
                  </a>
                </li>
              </Link>
              <Link to={"/privacy"}>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
              </Link>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="border p-1 lg:w-full rounded-l-md md:w-20 w-full flex-grow  border-gray-300 bg-white text-base-content"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md border border-blue-600 transition lg:w-full md:w-20 w-auto ">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Enter your email address to get updates.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Last Footer Section */}
      <div className="container mx-auto mt-10 flex flex-wrap justify-between items-center">
        <img
          src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
          alt=""
        />
      </div>
      <h1 className=" text-sm text-center">
        All Rights Reserved © {new Date().getFullYear()} GifTap Ltd.
      </h1>
    </footer>
  );
};

export default Footer;
