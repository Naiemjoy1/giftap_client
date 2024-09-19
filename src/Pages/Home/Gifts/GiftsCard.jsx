import React from "react";

const GiftsCard = () => {
  return (
    <div className="container mx-auto py-10">
    
      <div className="relative h-56 w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform duration-500 hover:scale-105">
       
        <div className="relative overflow-hidden">
          <img
            className="object-cover w-full h-56 transition-transform duration-500 hover:-translate-y-3"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Gift"
          />
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 py-3 bg-white dark:bg-gray-800 text-center">
          <a
            href="#"
            className="block text-xl font-bold text-gray-800 dark:text-white transition-transform duration-500 hover:-translate-y-1"
            role="link"
          >
            For Him
          </a>
          <span className="text-sm text-gray-400 dark:text-gray-300">
            6 Items
          </span>
        </div>
      </div>
    </div>
  );
};

export default GiftsCard;
