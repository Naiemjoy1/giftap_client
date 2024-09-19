import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
    return (
        <div className='mx-2 hidden md:block lg:block'>
          <div className="navbar bg-base-100 ">
  <div className="flex-1  ">
    <p className='text-gray-400 '><MdLocationPin /></p>
    <p className='text-gray-400 '>Dhaka,Bangladeh</p>
  </div>
  <div className="flex-none hidden md:block lg:block">
    <ul className="menu menu-horizontal px-1">
      <li className='hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold '>
        <Link to={'/login'}>LogIn</Link>
      </li>
      <li className='hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold '>
        <Link to={'/register'}>Register</Link>
      </li>
      <li className='hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold '>
        <Link to={'/'}>Track Orders</Link>
      </li>
      <li className='hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold '>
        <Link to={'/'}>Faqs</Link>
      </li>
     
    </ul>
  </div>
</div>  
        </div>
    );
};

export default Navbar1;