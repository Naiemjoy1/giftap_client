import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { GrDeliver } from 'react-icons/gr';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
    return (
        <div className='flex flex-1 justify-between md:mx-4 lg:mx-4 lg:y-8 md:my-8'>
            <div>
                <h1 className='font-extrabold text-4xl'>
                    <span className='text-rose-400'>Gift</span>Taps
                </h1>
            </div>
            <div className='hidden lg:flex flex-1 justify-around items-center'>
                <div className='flex items-center'>
                    <div className='mr-4'>
                        <p className='text-5xl hover:text-rose-400 hover:shadow-lg transition duration-300'>
                            <GrDeliver aria-label="Free standard shipping" />
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Free standard shipping</p>
                        <p className='text-xl font-semibold'>on all orders over $99</p>
                    </div>
                </div>
               
                <div className='flex items-center mx-4'>
                    <div className='mr-4'>
                        <p className='text-5xl'>
                            <BiSupport aria-label="Customer support" />
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-400'>GiftTaps@gmail.com</p>
                        <p className='text-xl font-semibold'>012 - 345 - 6789</p>
                    </div>
                </div>
              
                <div className='flex items-center ml-4'>
                    <div className='mr-4'>
                        <p className='text-5xl'>
                            <HiOutlineShoppingCart aria-label="Shopping cart" />
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Cart: <span>0</span> items</p>
                        <p className='text-xl font-semibold'>0$</p>
                    </div>
                </div>
            </div>
            <div className="navbar-start lg:hidden">
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        role="button"
                        aria-label="Toggle navigation menu"
                        className="btn btn-ghost"
                    >
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
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li className='hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-semibold'>
                            <Link to='/login'>Log In</Link>
                        </li>
                        <li className='hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-semibold'>
                            <Link to='/register'>Register</Link>
                        </li>
                        <li className='hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-semibold'>
                            <Link to='/'>Track Orders</Link>
                        </li>
                        <li className='hover:bg-rose-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300 font-semibold'>
                            <Link to='/'>FAQs</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar2;
