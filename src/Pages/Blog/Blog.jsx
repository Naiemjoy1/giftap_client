import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBlogs from '../../Components/Hooks/useBlogs';
import { FaArrowRight, FaCommentDots } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { GrNext, GrPrevious } from 'react-icons/gr';

const Blog = () => {
  const [search, setSearch] = useState('');
  const [blogs, refetch] = useBlogs(search);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(blogs)


  const itemsPerPage = 6;

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = blogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination Calculation
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Search Bar Handle
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSearch(data.search);
    refetch();
  };

  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">
      <div className="">
        {/*----------- Search Bar Start ------------*/}
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex relative justify-center lg:ml-96 rounded-md w-full px-4 max-w-xl lg:mt-0">
              <input
                type="text"
                placeholder="Search Caption..."
                className="w-full p-3 rounded-md mt-24 md:mt-4 md:ml-28 lg:mt-4 border-blue-300 input-bordered border"
                {...register('search')}
              />
              {errors.search}
              <button
                className="inline-flex items-center mt-24 md:mt-4 lg:mt-4 gap-2 bg-primary hover:bg-primary text-white text-lg font-semibold px-3 rounded-r-md"
              >
                <span>Search</span>
                <span className="hidden md:block">
                  <IoSearch />
                </span>
              </button>
            </div>
          </form>
        </div>
        {/*------------ Search Bar End ------------*/}

        {/*------------ Blogs Start ------------*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {currentProducts.map((blog) => (
            <div key={blog.id} className="">
              <div className="relative overflow-hidden group">
                <Link to={`/BlogDetails/${blog._id}`}>
                  {/* image */}
                  <img
                    src={blog.blogImage}
                    alt={blog.title}
                    className="w-full h-80 object-cover mb-2 transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-lg"
                  />
                  {/* image Icon */}
                  <div className="absolute inset-0 flex items-end mb-6 mr-6 justify-end opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <div className="bg-white p-4 rounded-full shadow-lg hover:text-primary">
                      <FaArrowRight className="text-2xl" />
                    </div>
                  </div>
                </Link>
              </div>
              <Link to={`/BlogDetails/${blog._id}`}>
                <h2 className="font-bold text-2xl mt-4 hover:text-primary">{blog.blogTitle}</h2>
              </Link>
              <div className="flex justify-between text-sm mb-2">
                <span className="mt-2 text-xl font-semibold text-gray-500">{blog.blogPublishDate}</span>
                <span className="flex items-center text-gray-500">
                  <FaCommentDots className="text-[17px] mt-2 mr-2" />
                  <p className="mt-2 text-[17px] font-semibold">{blog.blogComments.length} Comments</p>
                </span>
              </div>
              <p className="text-gray-400 font-medium text-[16px] text-start">
                {blog.blogDescription.split(' ').slice(0, 22).join(' ')}...
              </p>
            </div>
          ))}
        </div>

        {/* ------------ Pagination Start------------*/}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 text-white bg-primary rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </button>
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 rounded-full ${number === currentPage ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 text-white bg-primary rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            <GrNext />
          </button>
        </div>
      </div>
      {/* ------------ Pagination StarEnd------------*/}
    </div>
  );
};

export default Blog;
