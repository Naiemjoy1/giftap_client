import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between space-y-6 md:space-y-0">
          {/* Store Information Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">GifTap</h6>
            <p className="text-sm mb-2">We promise we’ll get back to you promptly– your gifting needs are always on our minds!</p>
            <p className="text-sm">Monday – Friday 8am – 6pm</p>

            <div className="flex mt-4 space-x-3">
              <a href="Facebook"><FaFacebook className='text-2xl cursor-pointer' /></a>
              <a href="Github"><FaGithub className='text-2xl cursor-pointer' /></a>
              <a href="Linkedin"><FaLinkedin className='text-2xl cursor-pointer' /></a>
              <a href="Instagram"><FaSquareInstagram className='text-2xl cursor-pointer' /></a>
            </div>
          </div>

          {/* Services Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Branding</a></li>
              <li><a href="#" className="hover:text-gray-400">Design</a></li>
              <li><a href="#" className="hover:text-gray-400">Marketing</a></li>
              <li><a href="#" className="hover:text-gray-400">Advertisement</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400">Cookie Policy</a></li>
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
                  className="input input-bordered lg:w-full md:w-20 w-full flex-grow rounded-l-md border-gray-300 bg-white text-base-content"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md border border-blue-600 transition lg:w-full md:w-20 w-auto">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">Enter your email address to get updates.</p>
            </form>
          </div>
        </div>
      </div>

      {/* Last Footer Section */}
      <div className="container mx-auto py-4 mt-10 flex flex-wrap justify-between items-center">
        <div>
          <h1> All Rights Reserved © {new Date().getFullYear()} GifTap Ltd.</h1>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0 mr-10">
          <img src={'https://i.ibb.co.com/QbMPCqm/visa-logo-2506831-1024x683.png'} alt="Visa" className="h-10 w-10" />
          <img src={'https://i.ibb.co.com/FmV7C2P/master-Card.jpg'} alt="MasterCard" className="h-10 w-10" />
          <img src={'https://i.ibb.co.com/YhZvJXx/Bkash.jpg'} alt="Bkash" className="h-10 w-10" />
          <img src={'https://i.ibb.co.com/G0WdccQ/Nagad.png'} alt="Nagad" className="h-10 w-10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
