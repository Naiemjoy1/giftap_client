import React, { useContext } from 'react';
import useNotice from '../../../../Components/Hooks/useNotice';
import useUsers from '../../../../Components/Hooks/useUsers';


const NoticeBoard = () => {
    const [notice,refetch] = useNotice();
   
    return (
        <div>
              <div>
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
             
             
                </div> 
            </div>
                </div> 
        </div>
    );
};

export default NoticeBoard;