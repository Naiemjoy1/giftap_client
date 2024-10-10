import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBlogs from "../../Components/Hooks/useBlogs";
import { FaArrowRight, FaCommentDots } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const Blog = () => {
  const [blogs] = useBlogs(); // Fetching blogs from custom hook
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  // Calculate pagination
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs?.slice(itemOffset, endOffset) || [];
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">
      {/* Search Bar */}
      <div className="ml-auto mb-7">
        <label className="input input-bordered flex items-center gap-2 lg:mt-4 w-96">
          <input
            type="text"
            className="grow"
            placeholder="Search Blog Title ..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {currentItems.length > 0 ? (
          currentItems.map((blog) => (
            <div key={blog.id} className="relative overflow-hidden group">
              <Link to={`/BlogDetails/${blog._id}`}>
                {/* Blog Image */}
                <img
                  src={blog.blogImage}
                  alt={blog.title}
                  className="w-full h-80 object-cover mb-2 transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-lg"
                />

                {/* Image Icon */}
                <div className="absolute inset-0 flex items-end mb-6 mr-6 justify-end opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <div className="bg-white p-4 rounded-full shadow-lg hover:text-primary">
                    <FaArrowRight className="text-2xl" />
                  </div>
                </div>
              </Link>
              <Link to={`/BlogDetails/${blog._id}`}>
                <h2 className="font-bold text-2xl mt-4 hover:text-primary">
                  {blog.blogTitle}
                </h2>
              </Link>

              <div className="flex justify-between text-sm mb-2">
                <span className="mt-2 text-xl font-semibold text-gray-500">
                  {blog.blogPublishDate}
                </span>
                <span className="flex items-center text-gray-500">
                  <FaCommentDots className="text-[17px] mt-2 mr-2" />
                  <p className="mt-2 text-[17px] font-semibold">
                    {blog.blogComments.length} Comments
                  </p>
                </span>
              </div>

              <p className="text-gray-400 font-medium text-xl text-start">
                {blog.blogDescription.split(" ").slice(0, 22).join(" ") + "..."}
              </p>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="text-center mb-6 mt-4 pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          containerClassName="pagination-container"
          activeClassName="active-page"
          previousClassName="previous-page"
          nextClassName="next-page"
        />
      </div>
    </div>
  );
};

export default Blog;
