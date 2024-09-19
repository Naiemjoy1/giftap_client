import React from 'react';
import { Link } from 'react-router-dom';

const Navbar3 = () => {
  return (
    <div className=''>
      <div className="navbar bg-base-100">
        {/* Items 1, 2, 3 for both mobile and desktop view */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
             <li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/'}>Home</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/shop'}>SHOP</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/story'}>OUR STORY</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/blog'}>BLOG</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/contact'}>CONTACT</Link>
</li>
            </ul>
          </div>

          {/* Items 1, 2, 3 for desktop view */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-3 px-1">
            <li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/'}>Home</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/shop'}>SHOP</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/story'}>OUR STORY</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/blog'}>BLOG</Link>
</li>
<li className="hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-bold">
  <Link to={'/contact'}>CONTACT</Link>
</li>

           
             
          
           
             
            </ul>
          </div>
        </div>

        {/* Search bar at the end */}
        <div className="navbar-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar3;
