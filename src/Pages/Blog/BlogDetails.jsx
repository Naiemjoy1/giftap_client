import { Link, useLoaderData } from "react-router-dom";
import useBlogs from "../../Components/Hooks/useBlogs";
import useAuth from "../../Components/Hooks/useAuth";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const BlogDetails = () => {
  const { user } = useAuth();
  const [blogs, refetch] = useBlogs();
  const blogDetails = useLoaderData();
  // console.log(blogDetails)
  const axiosPublic = useAxiosPublic();

  const { blogTitle, publishDate, blogDescription, blogImage, blogTags, blogComments, blogCategories } = blogDetails;
  const recentBlogs = [...blogs].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const handleCopyLink = () => {
    const blogUrl = `${window.location.origin}/BlogDetails/${blogDetails._id}`;
    navigator.clipboard.writeText(blogUrl)
      .then(() => {
        toast.success('Linked Copy');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  refetch()

  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      commentName: user?.displayName || "Anonymous",
      comment,
      commentsUrl: user?.photoURL || "https://your-image-url.com",
      commentEmail: user?.email || "user.email@gmail.com",
    };

    // console.log(newComment)

    try {
      // Send a POST request to the backend to add the comment
      const response = await axiosPublic.post(`/blogs/${blogDetails._id}/comments`, newComment);

      if (response.status === 200) {
        alert("Comment added successfully!");
        setComment("");
        refetch()
      }
    } catch (error) {
      console.error("Failed to add comment", error);
      alert("Error 404 ...There was an issue adding your comment.");
    }
    refetch()
  };

  refetch()



  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        {/* BlogDetails Left Side */}
        <div className="w-full lg:w-3/4 lg:p-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-black my-4 mb-8">{blogTitle}</h1>

            <img src={blogImage} alt="GifTap has No Photo" className="w-full rounded-lg" />
            <p className="text-lg lg:text-xl font-semibold text-gray-500 mt-8">{blogDescription}</p>

            <h1 className="text-2xl lg:text-3xl font-bold text-black my-4 mb-4">Comments</h1>

            {/* input Comment */}
            <form onSubmit={handleSubmit}>
              {user ? (
                <div className="flex flex-col lg:flex-row">
                  <textarea value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required 
                    placeholder="Write Your Comment..." className="textarea textarea-bordered border-blue-400 textarea-sm lg:textarea-md w-full lg:max-w-xs mb-2 lg:mb-0"></textarea>
                  <button className="btn btn-primary text-sm lg:text-xl font-bold text-black mt-2 lg:mt-0 lg:ml-2" type="submit">Submit</button>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row">
                  <textarea placeholder="Write your comment..." className="textarea textarea-bordered border-blue-400 textarea-sm lg:textarea-md w-full lg:max-w-xs mb-2 lg:mb-0"></textarea>
                  <Link to="/login">
                    <button className="btn btn-primary text-sm lg:text-xl font-bold text-black mt-2 lg:mt-0 lg:ml-2">Login</button>
                  </Link>
                </div>
              )}

            </form>
            {/* Show Comment */}
            <div className="mt-10">
              {blogDetails.blogComments.map(comment => (
                <div key={comment._id} className="mb-4">
                  <div className="flex items-start">
                    <img src={comment.commentsUrl} alt="" className="h-8 w-8 lg:h-10 lg:w-10 object-cover rounded-full mr-2" />
                    <div>
                      <div className="bg-gray-300 rounded-2xl p-2">
                        <h1 className="text-[16px] lg:text-[18px] font-bold text-black">{comment.commentName}</h1>
                        <p className="ml-4 font-medium text-gray-700">{comment.comment}</p>
                      </div>
                      <div className="flex text-blue-600 ml-4 lg:ml-10 font-medium cursor-pointer">
                        <p className="ml-2">Like</p>
                        <p className="ml-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Reply</p>
                        <p className="ml-2" onClick={() => document.getElementById('my_modal_3').showModal()}>Share</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Open the modal in Comment Reply Button */}
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                    <input type="text" id="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Type Your Comment..." />
                    <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md sm:mx-2">Submit</button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              {/* Open the modal Share button copy Link */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box h-32">
                  <div className="flex items-center">
                    <input type="text" placeholder={`${window.location.origin}/BlogDetails/${blogDetails._id}`} className="block w-full rounded-tl-lg rounded-bl-lg placeholder-gray-400/70 dark:placeholder-gray-500 border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
                    <p className="py-2.5 px-3 rounded-tr-lg rounded-br-lg text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={handleCopyLink}><FaCopy className="text-2xl" /></p>
                  </div>
                  <form method="">
                    <button className="btn btn-sm btn-primary absolute mb-6 mt-4">Close</button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>

        {/* BlogDetails Right Side */}
        <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:p-4">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 lg:mt-8">
              <input type="text" className="grow" placeholder="Search" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </label>

            {/* Recent Blogs */}
            <div>
              <h1 className="text-gray-500 font-bold text-2xl">Recent Posts</h1>
              <hr className="text-gray-500 mt-2" />
              <div className="space-y-4 mt-6">
                {recentBlogs.slice(0, 4).map(blog => (
                  <div key={blog._id} className="flex items-start">
                    <Link to={`/BlogDetails/${blog._id}`}>
                      <img src={blog.blogImage} alt="" className="w-16 lg:w-20 h-16 lg:h-20 object-cover mr-4 rounded-lg" />
                    </Link>
                    <div>
                      <Link to={`/BlogDetails/${blog._id}`}>
                        <h1 className="font-bold text-sm lg:text-[17px] text-gray-600 hover:text-primary">{blog.blogTitle}</h1>
                      </Link>
                      <p className="text-gray-500 text-xs lg:text-sm">{blog.blogPublishDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blog Categories */}
            <div>
              <h1 className="text-gray-500 font-bold text-2xl">Categories</h1>
              <hr className="text-gray-500 mt-2" />
              <div className="mt-2 space-y-2">
                {blogCategories?.map((category, index) => (
                  <Link key={index}>
                    <div className="  hover:border-primary font-medium text-gray-600 p-2 rounded-lg hover:text-primary">
                      {category}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog  blogTags */}
            <div>
              <h1 className="text-gray-500 font-bold text-2xl">Tags</h1>
              <hr className="text-gray-500 mt-2" />
              <div className="mt-2 flex flex-wrap gap-2">
                {blogTags?.map((tag, index) => (
                  <Link key={index}>
                    <div className="border hover:border-primary font-medium text-gray-600 p-2 rounded-lg hover:text-primary">
                      {tag}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
