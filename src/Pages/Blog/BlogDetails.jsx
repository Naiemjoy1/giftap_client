import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";

const BlogDetails = () => {
  const { id } = useParams();
  const post = demoPosts.find((p) => p.id === parseInt(id));

  const [replyToComment, setReplyToComment] = useState(null);
  const [replies, setReplies] = useState({});
  const [reviewComments, setReviewComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleReplyClick = (index) => {
    setReplyToComment(index);
  };

  const handleReplySubmit = (index, replyText) => {
    setReplies({
      ...replies,
      [index]: [...(replies[index] || []), replyText],
    });
    setReplyToComment(null);
  };

  const handleModalSubmit = () => {
    setReviewComments([...reviewComments, reviewForm]);
    setIsModalOpen(false);
    setReviewForm({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row">
        {/* Main Blog Content */}
        <div className="md:w-3/4  text-black">
          {/* Blog Post Details */}
          <div className="mb-5 p-5  shadow-lg rounded-lg">
            <div className="flex flex-col">
              <div className="w-full mb-3 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-66 object-cover rounded"
                />
                {/* User Avatar */}
                <div className="absolute top-3 left-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="publisher avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>

              {/* Publisher & Date */}
              <div className="flex justify-start mb-4 text-black">
                <span className="text-black-300 mr-4">
                  <strong>Published by:</strong> {post.publisher}
                </span>
                <span className="text-black-300">
                  <strong>Published on:</strong> {post.date}
                </span>
              </div>

              <div className="w-full text-center">
                <h1 className="text-3xl font-bold mb-3 text-black-300">{post.title}</h1>

                {/* Tags */}
                <div className="text-sm mb-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-600 text-white px-2 py-1 rounded-full mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-black-300 mb-5">{post.description}</div>

               
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <ul className="space-y-4">
              {post.comments.map((comment, index) => (
                <li key={index} className="border-b pb-4 text-black">
                  <div className="flex items-start">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="user avatar"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <strong>{comment.user}</strong>
                        <span className="text-sm text-black-500">{comment.date}</span>
                      </div>
                      <p className="text-black">{comment.comment}</p>
                      <button
                        className="text-sm text-blue-500 mt-2"
                        onClick={() => handleReplyClick(index)}
                      >
                        Reply
                      </button>

                      {/* Reply input */}
                      {replyToComment === index && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Write your reply..."
                            className="w-full border p-2 rounded mb-2"
                          />
                          <button
                            onClick={(e) =>
                              handleReplySubmit(index, e.target.previousSibling.value)
                            }
                            className="text-sm bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Submit Reply
                          </button>
                        </div>
                      )}

                      {/* Display replies */}
                      {replies[index] && (
                        <ul className="ml-8 mt-4 space-y-2">
                          {replies[index].map((reply, replyIndex) => (
                            <li key={replyIndex} className="text-black-300">
                              <strong>{comment.user} (replied):</strong> {reply}
                            </li>
                          ))}
                        </ul>
                      )}
                       {/* Review Comments */}
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Review Comments</h2>
                  <ul className="space-y-4">
                    {reviewComments.map((review, index) => (
                      <li key={index} className="border-b pb-4 text-black-300">
                        <strong>{review.name}</strong> ({review.email})
                        <p className="text-black-300">{review.message}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button to Open Review Modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-5 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Leave a Review
                </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Posts Section */}
          <div className="mt-10 text-black-300 ">
            <h2 className="text-2xl font-semibold mb-3 text-black">Related Posts</h2>
            <div className="flex flex-wrap">
              {post.relatedPosts.map((relatedPost, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <div className=" p-4 rounded-lg shadow-lg">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover mb-3"
                    />
                    <h3 className="text-lg font-semibold">{relatedPost.title}</h3>
                    <p className="text-black-300">{relatedPost.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-5 shadow-lg rounded-lg mb-5 md:mr-5">
        {/* Search Input */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search in blog title..."
            className="w-full p-2 border border-gray-300 rounded pl-10"
          />
          <span className="absolute right-2 top-2 text-black-500">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="relative font-bold text-lg mb-2 border-b-2 border-black pl-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-500">Social</h3>
        <div className="flex space-x-3 mb-4">
          <a href="#" className="text-blue-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-pink-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-red-600">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" className="text-blue-600">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h2 className="relative font-bold text-lg mb-2 border-b-2 border-black pl-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-500">Categories</h2>
          <ul className="list-disc pl-5">
            <li>Food (06)</li>
            <li>Technology (04)</li>
            <li>Furniture (09)</li>
            <li>Makeup (07)</li>
          </ul>
        </div>

        {/* Recent Posts */}
        <div className="mb-4">
          <h2 className="relative font-bold text-lg mb-2 border-b-2 border-black pl-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-500">Recent Posts</h2>
          
          <ul>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/travel-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-wtih-trendy-hat-sunglass-smiling-blue-pastel-background-copy-space_1258-851.jpg?t=st=1727190363~exp=1727193963~hmac=b0c347093a246ffdfc9539ce8902b7d4b383d213c89b3eb0dc4ffa585d452180&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-black-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/technology-meets-nature-with-smart-phone-generative-ai_188544-19446.jpg?t=st=1727190407~exp=1727194007~hmac=4f737efc747856435e40d74a5c8bdf10556af66b832949cea0282a485f946863&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-black-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/technology-meets-nature-with-smart-phone-generative-ai_188544-19446.jpg?t=st=1727190407~exp=1727194007~hmac=4f737efc747856435e40d74a5c8bdf10556af66b832949cea0282a485f946863&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-black-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/finger-touching-smartwatch-s-screen_1134-388.jpg?t=st=1727190283~exp=1727193883~hmac=1541cd57bcfc096b4476733f3d50e4cc479cb78a11f9ab9b4d11a0f4ddc4ade3&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-black-500">oct 24 2021</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Tags Cloud */}
        <div className="mb-4">
  <h2 className="relative font-bold text-lg mb-2 border-b-2 border-black pl-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-500">
    Tags Cloud
  </h2>
  <div className="flex flex-wrap">
    <span className="border border-black text-black px-2 py-1 rounded m-1">airports</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">amazing</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">Bootstrap</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">business</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">Clean Design</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">electronic</span>
    <span className="border border-black text-black px-2 py-1 rounded m-1">iPad Pro</span>
  </div>
</div>


        {/* Newsletter */}
        <div>
        <h2 className="relative font-bold text-lg mb-2 border-b-2 border-black pl-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-500">
  Newsletter
</h2>





          <p className='mb-2'>Subscribe to our newsletter and get our newest updates right on your inbox.</p>
          <input
            type="email"
            placeholder="Your email..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">I agree to the terms and conditions</label>
          </div>
          <button className="w-full bg-black text-white p-2 rounded">Subscribe</button>
        </div>
      </aside>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, name: e.target.value })
              }
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={reviewForm.email}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, email: e.target.value })
              }
              className="w-full p-2 border mb-2 rounded"
            />
            <textarea
              placeholder="Your Message"
              value={reviewForm.message}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, message: e.target.value })
              }
              className="w-full p-2 border mb-2 rounded"
            ></textarea>
            <button
              onClick={handleModalSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Submit Review
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-500 mt-3 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
