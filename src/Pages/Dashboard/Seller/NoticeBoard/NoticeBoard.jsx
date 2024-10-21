import React from 'react';
import useNotice from '../../../../Components/Hooks/useNotice';

const NoticeBoard = () => {
  const [notice] = useNotice();
  const sortedNotice = notice?.sort(
    (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
  );

  return (
    <div>
     

      <div className="flex justify-center">
     
        <div className="flex-1">
          <img
            src="https://i.ibb.co/GP5FcbH/notice-free-vector-734448-5.jpg"
            alt=""
          />
        </div>

        <div className="border border-primary p-4 rounded-lg flex-1">
          <h2 className="text-2xl flex justify-center items-center text-secondary underline">
            Your Notice
          </h2>

   
          <div className="max-h-[500px] overflow-y-auto">
            {sortedNotice.map((n, index) => (
              <div
                className="my-8 p-8 border-b border-gray-300 justify-center items-center"
                key={n._id}
              >
                <h3 className="text-lg font-semibold text-secondary mb-2 flex justify-center items-center underline">
                  Notice: {index + 1}.
                </h3>
                <p className="text-gray-800 text-base mb-2 text-start">
                  Dear Seller,
                </p>
                <p className="text-gray-800 text-base mb-2">{n.message}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Published Date:</span> {n.date} {n.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
