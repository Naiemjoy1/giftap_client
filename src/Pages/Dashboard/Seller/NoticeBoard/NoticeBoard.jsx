import React from 'react';
import useNotice from '../../../../Components/Hooks/useNotice';

const NoticeBoard = () => {
  const [notice] = useNotice();
  const sortedNotice = notice?.sort(
    (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
  );

  return (
    <div className="container mx-auto">
     
      <div className="divider"></div>
      <h1 className="text-2xl text-primary text-center">------Notice Board-----</h1>
      <div className="divider"></div>

      
      <div className="flex flex-col lg:flex-row  items-start justify-center h-full">
   
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center items-start">
          <img
            src="https://i.ibb.co/GP5FcbH/notice-free-vector-734448-5.jpg"
            alt="Notice Board"
            className="w-full max-w-sm h-auto"
          />
        </div>

       
        <div className="w-full lg:w-1/2 border border-primary p-4 rounded-lg max-h-[500px] overflow-y-auto">
          <h2 className="text-2xl text-center text-secondary underline mb-4">
            Your Notice
          </h2>

       
          {sortedNotice?.map((n, index) => (
            <div className="my-8 p-4 border-b border-gray-300" key={n._id}>
              <h3 className="text-lg font-semibold text-secondary mb-2 text-center underline">
                Notice: {index + 1}.
              </h3>
              <p className="text-gray-800 text-base mb-2">
                Dear Seller,
              </p>
              <p className="text-gray-800 text-base mb-2">
                {n.message}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Published Date:</span> {n.date} {n.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
