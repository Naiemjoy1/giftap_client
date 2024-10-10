import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCommentDots } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    // Fetch blogs from your API (replace with your actual API call)
    fetch("https://your-api-endpoint")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading blogs from ${itemOffset} to ${endOffset}`);
  const currentItems = blogs?.slice(itemOffset, endOffset) || [];
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">
      <div className="">
        <h1 className="text-2xl font-bold mb-5 text-gray-400">Blogs</h1>

        {blogs.length > 0 && ( // Check if blogs exist before rendering content
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 ">
            {currentItems.map((blog) => (
              <div key={blog.id} className="">
                {/* Your blog content here */}
                <div className="relative overflow-hidden group ">
                  <Link to={`/BlogDetails/${blog._id}`}>
                    {/* Image */}
                    <img
                      src={blog.blogImage}
                      alt={blog.title}
                      className="w-full h-80 object-cover mb-2 transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />

                    {/* image Icon */}
                    <div className="absolute inset-0 flex items-end mb-6 mr-6 justify-end opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      <div className="bg-white p-4  rounded-full shadow-lg hover:text-primary">
                        <FaArrowRight className=" text-2xl" />
                      </div>
                    </div>
                  </Link>
                </div>

                <Link to={`/BlogDetails/${blog._id}`}>
                  <h2 className="font-bold text-3xl mt-4 hover:text-primary">
                    {blog.title}
                  </h2>
                </Link>

                <div className="flex justify-between  text-sm mb-2">
                  <span className="mt-2 text-xl font-semibold text-gray-500">
                    {blog.publishDate}
                  </span>
                  <span className="flex items-center text-gray-500">
                    <FaCommentDots className=" text-[17px] mt-2 mr-2" />
                    <p className="mt-2 text-[17px] font-semibold ">
                      {blog.comments.length} Comments
                    </p>
                  </span>
                </div>

                <p className="text-gray-400 font-medium text-xl text-start ">
                  {blog.description.split(" ").slice(0, 22).join(" ") + "..."}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination outside the conditional check */}
        <div className="text-center mb-6 mt-4 pagination">
          <ReactPaginate
            className={
              currentItems === pageCount
                ? `bg-blue-200  text-black hover:text-black ml-2`
                : ` 
                text-black hover:text-black ml-2`
            }
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
