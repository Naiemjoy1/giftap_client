import React, { useContext } from 'react';

import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hooks/useAuth';
import useAxiosPublic from '../../../../Components/Hooks/useAxiosPublic';
import useNotice from '../../../../Components/Hooks/useNotice';



const AddNotice = () => {
//     const axiosPublic = useAxiosPublic();
  
//     const [notice,,refetch] = useNotice();
    
//    const {user} = useAuth();
   
//     const handleNotice = (e)=>{
//  e.preventDefault();
//   const data = e.target.notice.value;
//   const date = new Date().toLocaleDateString();

//  const notice ={
//     notice:data,
//     date:date,
//    email:user?.email,
//  }
 
//   axiosPublic.post('/notice',notice)
//   .then(res=>{
//     console.log(res.data);
//     if(res.data){
//         Swal.fire({
//             title: 'success',
//             text: 'Notice Added Successfully',
//             icon: 'success',
//             confirmButtonText: 'Success'
         
//         })
//         refetch();
//     }
   


//   })
//   e.target.reset();
//     }
    return (
        <div className='border border-green-200 rounded-lg container mx-auto my-24 p-12'>
         {/* <div>
         <div className="divider"></div>
                <h1 className='text-2xl text-primary  flex justify-center items-center my-4'>------Add Notice For Seller-----</h1>
                <div className="divider "></div>
         </div>

         <div>
            <div className='my-10'>
                <h2 className='text-2xl flex justify-center items-center'>Your Notice</h2>
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
            <div className='flex flex-col justify-center items-center'>
           <form onSubmit={handleNotice} >

           <textarea name='notice' placeholder="Notice" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
           <div>
            <button className='btn btn-wide bg-primary text-white'>Add Notice</button>
           </div>
           </form>
            </div>
         </div>
             */}
        </div>
    );
};

export default AddNotice;