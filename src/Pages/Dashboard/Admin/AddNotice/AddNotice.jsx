import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hooks/useAuth';
import useAxiosPublic from '../../../../Components/Hooks/useAxiosPublic';
import useNotice from '../../../../Components/Hooks/useNotice';

const AddNotice = () => {
  const axiosPublic = useAxiosPublic();
  const [notice, refetch] = useNotice();
  const { user } = useAuth();
 const mynotice = notice?.filter(n=>n.email==user?.email);
 console.log(mynotice)
  const sortedNotice = mynotice?.sort(
    (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
  );

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
      .then((res) => {
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
    <div className="container mx-auto  ">
    
      <div className="flex flex-col sm:gap-4 lg:flex-row ">
        
      
        <div className="flex flex-col w-1/2  justify-center items-center ">
          <div>
            <div className="divider"></div>
            <h1 className="text-2xl text-primary  ">
              ------Add Notice-----
            </h1>
            <div className="divider"></div>
          </div>
         <div className=' '>
         <form onSubmit={handleNotice}>
            <textarea name='notice' placeholder="Notice" className="textarea textarea-bordered textarea-md w-full max-w-xs mb-4"></textarea>
            <div>
              <button className='btn btn-wide bg-primary text-white'>
                Add Notice
              </button>
            </div>
          </form>
         </div>
        </div>

       
        <div className='flex-1 w-1/2 border border-primary rounded-lg'>
          <div>
            <div className="divider"></div>
            <h1 className="text-2xl text-primary flex justify-center items-center">
              ------Your Added Notice-----
            </h1>
            <div className="divider"></div>
          </div>

         <div className='max-h-[500px] overflow-y-auto'>
         {sortedNotice.map((n, index) => (
            <div className="my-6 p-4 border-b border-gray-300" key={n._id}>
              <h3 className="text-lg font-semibold text-secondary mb-2 flex justify-center items-center underline">
                Notice: {index + 1}.
              </h3>
              <p className="text-gray-800 text-base mb-2">
                Dear Seller,
              </p>
              <p className="text-gray-800 text-base mb-2">
                {n.message}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Published Date & Time:</span> {n.date} & {n.time}
              </p>
            </div>
          ))}
         </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
