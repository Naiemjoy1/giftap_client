import React, { useContext } from 'react';
import useNotice from '../../../../Components/Hooks/useNotice';
import useUsers from '../../../../Components/Hooks/useUsers';


const NoticeBoard = () => {
    // const [notice,refetch] = useNotice();
   
    return (
        <div>
              {/* <div>
         <div className="divider"></div>
                <h1 className='text-2xl text-primary  flex justify-center items-center my-4'>------Notice Board-----</h1>
                <div className="divider "></div>
         </div>

         <div className='border border-green-100 rounded-lg my-14 p-6 '>
        
             <div className='flex '>
             <div className=' flex-1 '>
             <img src="https://i.ibb.co/GP5FcbH/notice-free-vector-734448-5.jpg" alt="" />
            </div>
            <div className='border-dotted border-primary p-10 rounded-lg flex-1'>
                <h2 className='text-2xl flex justify-center items-center text-secondary'>Your Notice</h2>
             
                {
  notice.map((n, index) => (
    <div className="my-6 p-4 border-b border-gray-300" key={n._id}>
      <h3 className="text-lg font-semibold text-green-600 mb-2 flex justify-center items-center">
         Notice:{index + 1}.
      </h3>
      <p className="text-gray-800 text-base mb-2 text-start">
        Dear Seller, 
      </p>
      <p className="text-gray-800 text-base mb-2 ">
        {n.notice} 
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Published Date:</span> {n.date}
      </p>
    </div>
  ))
}
                </div> 
            </div>
                </div>  */}
        </div>
    );
};

export default NoticeBoard;