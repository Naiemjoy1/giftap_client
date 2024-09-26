import React from "react";
import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts"; 

const BlogDetails = () => {
  const { id } = useParams();
  const post = demoPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-5">
      {/* Left side: Image, Date, Publisher Name, Title */}
      <div className="flex flex-col lg:flex-row">
      
        <div className="lg:w-2/3">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover mb-5"
          />
        </div>

      
        <div className="lg:w-1/3 lg:pl-10">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-500 mb-2">
            <span className="block">
              <strong>Publisher:</strong> {post.publisher}
            </span>
            <span className="block">
              <strong>Published on:</strong> {post.date}
            </span>
          </div>
          <div className="text-gray-700 mb-5">{post.description}</div>
        </div>
      </div>

     

      {/* Show Review Comment */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Comments</h2>
        <ul className="list-disc list-inside">
          {post.comments.map((comment, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {comment.user}
              {comment.comment}
            </li>
            
          ))}
        </ul>
      </div>

      {/* Related Posts by Tag */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Related Posts</h2>
        <div className="flex flex-wrap">
          {post.relatedPosts.map((relatedPost, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 p-2"
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-40 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">{relatedPost.title}</h3>
                <p className="text-gray-500">{relatedPost.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
