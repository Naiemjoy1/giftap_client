import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
           {/* Store Information Section */}
           <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Our Store</h6>
            <p className="text-sm mb-2">We promise we’ll get back to you promptly– your gifting needs are always on our minds!</p>
            <p className="text-sm">Monday – Friday 8am – 6pm</p>
          </div>
          {/* Services Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Branding</a></li>
              <li><a href="#" className="hover:text-gray-400">Design</a></li>
              <li><a href="#" className="hover:text-gray-400">Marketing</a></li>
              <li><a href="#" className="hover:text-gray-400">Advertisement</a></li>
            </ul>
          </div>

          
          {/* Legal Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-1/4">
            <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="input input-bordered flex-grow rounded-l-md border-gray-300 bg-white text-base-content"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md border border-blue-600 transition">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">Enter your email address to get updates.</p>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-base-300 py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GiftTap. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
