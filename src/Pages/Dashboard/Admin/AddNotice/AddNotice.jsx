import React, { useContext } from 'react';

import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hooks/useAuth';
import useAxiosPublic from '../../../../Components/Hooks/useAxiosPublic';
import useNotice from '../../../../Components/Hooks/useNotice';



const AddNotice = () => {
    const axiosPublic = useAxiosPublic();
  
    const [notice,refetch] = useNotice();
    console.log(notice)
   const {user} = useAuth();
   const sortedNotice =   notice?.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
   const handleNotice = (e) => {
    e.preventDefault();
    const data = e.target.notice.value;
    
    const date = new Date().toLocaleDateString();  
    const time = new Date().toLocaleTimeString();   
  
    const notice = {
      message: data,
      date: date,
      time: time,
      email: user?.email,
    };
  
    axiosPublic.post('/notice', notice)
      .then(res => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            title: 'Success',
            text: 'Notice Added Successfully',
            icon: 'success',
            confirmButtonText: 'Success'
          });
          refetch();
        }
      });
  
    e.target.reset();
  };
    return (
        <div className='rounded-lg container mx-auto  p-12'>
        

         <div>
            <div className='my-10 border border-primary p-16 rounded-lg'>
              <div>
            <div className="divider"></div>
                <h1 className='text-2xl text-primary  flex justify-center items-center my-2'>------Your Added Notice-----</h1>
                <div className="divider "></div>
         </div>
                {
  sortedNotice.map((n, index) => (
    <div className="my-12 p-16 border-b border-gray-300 justify-center items-center" key={n._id}>
      <h3 className="text-lg font-semibold text-secondary mb-2 flex justify-center items-center underline">
         Notice:{index + 1}.
      </h3>
      <p className="text-gray-800 text-base mb-2 text-start">
        Dear Seller, 
      </p>
      <p className="text-gray-800 text-base mb-2 ">
        {n.message} 
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Published Date:</span> {n.date}
      </p>
    </div>
  ))
}

                </div> 
            <div className='flex flex-col justify-center items-center'>
            <div>
         <div className="divider"></div>
                <h1 className='text-2xl text-primary  flex justify-center items-center my-4'>------Add Notice For Seller-----</h1>
                <div className="divider "></div>
         </div>
           <form onSubmit={handleNotice} >

           <textarea name='notice' placeholder="Notice" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
           <div>
            <button className='btn btn-wide bg-primary text-white'>Add Notice</button>
           </div>
           </form>
            </div>
         </div>
         </div>
            
       
    );
};

export default AddNotice;