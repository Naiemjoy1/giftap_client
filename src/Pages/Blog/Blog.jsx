import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Blog = () => {
  return (
    <div className="container mx-auto my-5 flex flex-col md:flex-row">
       {/* Left Sidebar  */}
      <aside className="w-full md:w-1/4 bg-white p-5 shadow-lg rounded-lg mb-5 md:mr-5">
        {/* Search Input */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search in blog title..."
            className="w-full p-2 border border-gray-300 rounded pl-10"
          />
          <span className="absolute right-2 top-2 text-gray-500">
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
                <p className="text-gray-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/technology-meets-nature-with-smart-phone-generative-ai_188544-19446.jpg?t=st=1727190407~exp=1727194007~hmac=4f737efc747856435e40d74a5c8bdf10556af66b832949cea0282a485f946863&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-gray-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/technology-meets-nature-with-smart-phone-generative-ai_188544-19446.jpg?t=st=1727190407~exp=1727194007~hmac=4f737efc747856435e40d74a5c8bdf10556af66b832949cea0282a485f946863&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-gray-500">oct 24 2021</p>
              </div>
            </li>
            <li className="flex mb-2">
              <img src="https://img.freepik.com/free-photo/finger-touching-smartwatch-s-screen_1134-388.jpg?t=st=1727190283~exp=1727193883~hmac=1541cd57bcfc096b4476733f3d50e4cc479cb78a11f9ab9b4d11a0f4ddc4ade3&w=996"  className="w-16 h-16 rounded-full mr-2" />
              <div>
                <p className="font-semibold">Post Title</p>
                <p className="text-gray-500">oct 24 2021</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Tags Cloud */}
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Tags Cloud</h2>
          <div className="flex flex-wrap">
            <span className="border-1px-solid border-red-700  text-black p-1 rounded m-1">Tag1</span>
            <span className=" text-black p-1 rounded m-1">Tag2</span>
            {/* Repeat for more tags */}
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

      {/* Right Side - Blog Content */}
      <main className="w-full md:w-3/4 bg-white p-5 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-5">Blog Posts</h1>

        {/* Blog Cards */}
        <div className="space-y-4">
          {/* Example Blog Card */}
          <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src="image-url" alt="Blog" className="w-full h-40 object-cover rounded" />
            <h2 className="font-semibold text-xl my-2">Blog Title</h2>
            <p className="text-gray-500">Published on: Date | Comments: 5</p>
            <p className="text-gray-700">Some description about the blog goes here...</p>
            <button className="mt-2 bg-black text-white p-2 rounded">Read More</button>
          </div>
          {/* Repeat for more blog cards */}
        </div>

        {/* Blog Pagination */}
        <div className="flex justify-between mt-5">
          <button className="bg-black text-white p-2 rounded">Previous</button>
          <button className="bg-black text-white p-2 rounded">Next</button>
        </div>
      </main>
    </div>
  );
};

export default Blog;
