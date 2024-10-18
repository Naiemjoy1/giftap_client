import React, { useEffect, useState } from "react";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const RecentBlog = () => {
  const [blog, setBlog] = useState([]);
  console.log(blog)
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const blogFetching = async () => {
      try {
        const response = await axiosPublic.get('/blogs')
        setBlog(response.data)
      }
      catch (error) {
        console.log('Internal Server Error', error)
      }
    }
    blogFetching()
  }, [axiosPublic])
  return (
    <>
      <HomeSectionHeading
        subTitle={"gain knowldges"}
        title={"our latest blog"}
      ></HomeSectionHeading>

      <section className="bg-white dark:bg-gray-100 dark:text-gray-800">
        <div className="container max-w-screen-xl p-6 mx-auto space-y-10 sm:space-y-16">
          {/* Featured Blog */}
          <Link
            to={`/BlogDetails/${blog[12]?._id}`}
            className="block max-w-sm gap-6 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-white dark:bg-gray-50 shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src={`${blog[12]?.blogImage}`}
              alt="Featured Blog"
              className="object-cover w-full h-64 rounded-t-lg sm:h-96 lg:rounded-t-none lg:rounded-l-lg lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-3 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-3xl font-semibold sm:text-4xl text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                {`${blog[12]?.blogTitle}`}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-600">
                {`${blog[12]?.blogPublishDate}`}
              </span>
              <p className="text-gray-700 dark:text-gray-700">
                {`${blog[12]?.blogDescription}`}
              </p>
            </div>
          </Link>



          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {
              blog.slice(19, 22).map(item => (
                <Link
                  to={`/BlogDetails/${item._id}`}
                  key={item._id}
                  className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-white dark:bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
                >
                  <img
                    role="presentation"
                    className="object-cover w-full h-44 dark:bg-gray-500"
                    src={item.blogImage}
                    alt={item.blogTitle}
                  />
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                      {item.blogTitle}
                    </h3>
                    <span className="text-sm dark:text-gray-600">
                      {item.blogPublishDate}
                    </span>
                    <p className="text-gray-700 dark:text-gray-700">
                      {item.blogDescription.slice(0, 99) + '...'}
                      <span className="block mt-3 text-primary hover:underline">See More</span>
                    </p>
                  </div>
                </Link>

              ))
            }
          </div>




          <div className="flex justify-center">
            <Link to='/blog'>
              <button
                className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-red-700 transition-all duration-500 ease-in-out"
                style={{ backgroundColor: "rgb(240, 72, 84)" }}
              >
                See All Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentBlog;
