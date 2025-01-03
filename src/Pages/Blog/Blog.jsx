import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useBlogs from "../../Components/Hooks/useBlogs";
import { FaArrowRight, FaCommentDots } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CgCalendarDates } from "react-icons/cg";
import ScrollNav from "../../Shared/Navbar/ScrollNav/ScrollNav";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [blogs, refetch] = useBlogs(search);
  const [currentPage, setCurrentPage] = useState(1);

  const navbarRef = useRef(null);
  const [showScrollNav, setShowScrollNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.getBoundingClientRect().top;
        setShowScrollNav(navbarTop < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = blogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSearch(data.search);
    refetch();
  };

  document.title = "GifTap || Blogs";

  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">
      {/* ScrollNav implementation */}
      <div ref={navbarRef}></div>
      {showScrollNav && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ScrollNav />
        </div>
      )}
      <div className="">
        {/*----------- Search Bar Start ------------*/}
        <div className="flex justify-center w-full px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
            <div className="flex relative w-full">
              <input
                type="text"
                placeholder="Search Blog Title ..."
                className="w-full p-3 rounded-md border border-blue-300 input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("search")}
              />
              {errors.search && (
                <span className="text-red-500">{errors.search.message}</span>
              )}
              <button
                type="submit"
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white text-lg font-semibold px-3 rounded-r-md"
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
                <h2 className="font-poppins text-lg font-semibold mt-3 hover:text-primary">
                  {blog.blogTitle}
                </h2>
              </Link>

              <div className="flex justify-between text-sm mb-2">
                <span className="mt-2 flex text-xl font-semibold text-gray-500">
                  <CgCalendarDates className="text-[17px] mt-2 mr-1" />
                  <p className="text-[17px] font-semibold">
                    {blog.blogPublishDate}
                  </p>
                </span>
                <span className="flex items-center text-gray-500">
                  <FaCommentDots className="text-[17px] mt-2 mr-2" />
                  <p className="mt-2 text-[17px] font-semibold">
                    {blog.blogComments.length} Comments
                  </p>
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-700 font-opensans">
                {blog.blogDescription.slice(0, 110)}...
                <Link to={`/BlogDetails/${blog._id}`} className="text-primary">
                  Read More
                </Link>
              </p>
            </div>
          ))}
        </div>

        {/* ------------ Pagination Start------------*/}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 text-white bg-primary rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </button>
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 rounded-full ${
                number === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 text-white bg-primary rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <GrNext />
          </button>
        </div>
        {/* ------------ Pagination End ------------*/}
      </div>
    </div>
  );
};

export default Blog;
