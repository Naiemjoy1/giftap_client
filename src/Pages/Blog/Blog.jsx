import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { demoPosts } from './demoPosts';
import useBlogs from '../../Components/Hooks/useBlogs';
import { FaArrowRight, FaCommentDots } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';


const Blog = () => {
  // Pagination logic

  const [blogs] = useBlogs();

  // console.log(blogs)

  // const [currentPage, setCurrentPage] = useState(1);
  // const postsPerPage = 6;

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // const totalPages = Math.ceil(blogs.length / postsPerPage);

  // const handlePrevious = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };



  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading blogs from ${itemOffset} to ${endOffset}`);
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };



  // console.log(currentPosts)


  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">

      <div className="   ">
        <h1 className="text-2xl font-bold mb-5 text-gray-400">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 ">
          {
            blogs.map((blog) => (

              <div key={blog.id} className="">

                <div className='relative overflow-hidden group '>
                  <Link to={`/BlogDetails/${blog._id}`}>
                    {/* Image */}
                    <img src={blog.blogImage} alt={blog.title} className="w-full h-80 object-cover mb-2 transition-transform duration-700 ease-in-out group-hover:scale-105" />

                    {/* image Icon */}
                    <div className="absolute inset-0 flex items-end mb-6 mr-6 justify-end opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      <div className="bg-white p-4  rounded-full shadow-lg hover:text-primary">
                        <FaArrowRight className=' text-2xl' />
                      </div>
                    </div>
                  </Link>
                </div>

                <Link to={`/BlogDetails/${blog._id}`}>
                  <h2 className="font-bold text-3xl mt-4 hover:text-primary">{blog.title}</h2>
                </Link>

                <div className="flex justify-between  text-sm mb-2">
                  <span className='mt-2 text-xl font-semibold text-gray-500'>{blog.publishDate}</span>
                  <span className="flex items-center text-gray-500">
                    <FaCommentDots className=' text-[17px] mt-2 mr-2' />
                    <p className='mt-2 text-[17px] font-semibold '>{blog.comments.length} Comments</p>
                  </span>
                </div>


                {/* 
                <p className="text-gray-400 font-medium text-xl text-start ">
                  {blog.description.split(' ').slice(0, 22).join(' ') + (blog.description.split(' ').length > 15 ? '...' : '')}
                </p> */}

                <p className='text-gray-400 font-medium text-xl text-start '>
                  {blog.description.split(" ").slice(0, 22).join(" ") + "..."}
                </p>


              </div>

            ))
          }
        </div>











        {/* Blog Pagination */}
        {/* <div className="flex justify-center mt-5 items-center">
          <button
            onClick={handlePrevious}
            className={`bg-black text-white p-2 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`p-2 rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`bg-black text-white p-2 rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div> */}




        {/* ----------- Pagination Start ---------- */}
        <div className="text-center mb-6 mt-4 pagination">

          <div className="grid grid-cols-1 justify-center items-center p-4 space-x-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItems &&
              currentItems.map((item) => (
                <div key={item} >
                  {/* <AllCard allCaption={item}></AllCard> */}
                  <h3>{console.log(item)}</h3>
                </div>
              ))}
          </div>

          <ReactPaginate
            className={currentItems === pageCount ? `bg-blue-200  text-black hover:text-black ml-2` : ` 
                text-black hover:text-black ml-2`}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />


        </div>
        {/* ----------- Pagination End ---------- */}
      </div>
    </div>
  );
};

export default Blog;
