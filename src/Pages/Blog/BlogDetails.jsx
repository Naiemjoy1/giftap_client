import React from "react";
import { useParams } from "react-router-dom";
import {demoPosts} from "./demoPosts"; 

const BlogDetails = () => {
  const { id } = useParams();
  const post = demoPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-5" />
      <p className="text-gray-700">{post.description}</p>
      <div className="flex justify-between text-gray-500 mt-5">
        <span>{post.date}</span>
        <span>{post.comments} Comments</span>
      </div>
    </div>
  );
};

export default BlogDetails;
