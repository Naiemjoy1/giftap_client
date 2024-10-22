import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useComplain from "../../../../Components/Hooks/useComplain";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useUsers from "../../../../Components/Hooks/useUsers";
import toast from "react-hot-toast";

const AllComplain = () => {
    const [activeComplain, setActiveComplain] = useState(null); 
    const [complains, refetch] = useComplain();
    // const [user] = useUsers();
    const axiosPublic = useAxiosPublic();


    // Delate Complain
    const handleRemove = (complainId) => {
        // console.log(complainId)

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
            // console.log(result)
          if (result.isConfirmed) {
            axiosPublic.delete(`/complain/${complainId}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                toast.success("User has been deleted.");
              } else {
                toast.error("There was an issue deleting the user.");
              }
            });
          }
        });
        
      };

      

    refetch()
    return (
        <div>
            <div className="overflow-x-auto">
                <div className="overflow-y-auto max-h-[750px]">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Details</th>
                                <th>Shop Name</th>
                                <th>details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {complains.map(complain => (
                                <tr key={complain._id}>
                                    <th>
                                        <button
                                            className="text-xl text-primary border p-2 rounded-2xl hover:bg-primary hover:text-black"
                                        onClick={() => handleRemove(complain._id)}
                                        >
                                            <RxCross2 className=""/>
                                        </button>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={complain.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{complain.customerName}</div>
                                                <div className="text-sm opacity-50">{complain.customerEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{complain.storeName}</td>
                                    <th>
                                        <button className="btn btn-ghost border border-black hover:bg-primary" onClick={() => setActiveComplain(complain)}>details</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {activeComplain && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm animate-fadeIn"></div>
                    <div className="relative w-[900px] bg-[#1F1F24] text-white rounded-2xl border-none shadow-lg z-20 animate-fadeIn">

                        <div className="text-3xl mt-4 text-center font-bold">Complain Details</div>

                        <div className="p-6">
                            <p className="mb-4">Dear Admin,</p>
                            <p>{activeComplain.complainDescription}</p>
                            <div className="mt-6">
                                <h1>{activeComplain.customerName}</h1>
                                <p>{activeComplain.customerEmail}</p>
                                <h1>Date: {activeComplain.submitDate}</h1>
                                <h2>Time: {activeComplain.submitTime}</h2>
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveComplain(null)}
                            aria-label="close"
                            className="absolute top-5 text-xl right-5 border p-2 rounded-2xl  hover:text-black text-gray-500   transition-transform transform hover:scale-110"
                        >
                            ❌
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllComplain;
