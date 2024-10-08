import { RxCross2 } from "react-icons/rx";
import useApplys from "../../../../Components/Hooks/useApplys";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useUsers from "../../../../Components/Hooks/useUsers";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SellerRequest = () => {
  const [applys, refetch] = useApplys();

  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();

  const handleApprove = (userID, apply) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/users/${userID}`, { type: "seller" })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              toast.success("User updated to Seller.");
              console.log("User updated:", response.data);
              handleDelete(apply);
            } else {
              toast.error("User update failed.");
            }
          })
          .catch((error) => {
            console.error("Error updating user type:", error);
            toast.error("An error occurred while updating user type.");
          });
      }
    });
  };

  const handleDelete = (apply) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/applys/${apply._id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              console.log("Apply Deleted:", response.data);
              toast.success("Seller Aplication Deleted.");
              refetch();
            } else {
              toast.error("Error Apply Deleted.");
            }
          })
          .catch((error) => {
            console.error("Error Apply Deleted:", error);
          });
      }
    });
  };

  return (
    <div>
      <p>Total requests: {applys?.length}</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>User Details</th>
              <th>Store Details</th>
              <th>Category</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applys?.map((apply) => {
              const applyUser = users.find(
                (user) => user?._id === apply?.userID
              );

              return (
                <tr>
                  <th>
                    <button
                      onClick={() => handleDelete(apply)}
                      className=" text-xl text-red-600"
                    >
                      <RxCross2 />
                    </button>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={applyUser?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{apply.name}</div>
                        <div className="text-xs opacity-50">
                          <p>Email: {apply.email}</p>
                          <p>Mobile: {apply.mobile}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className=" font-semibold">
                    {apply.shopName}
                    <br />
                    <p className="text-sm font-light opacity-50">
                      {apply.address} <br />
                      {apply.district},{apply.division}
                    </p>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button
                      onClick={() => handleApprove(apply.userID, apply)}
                      className="text-xl text-green-600"
                    >
                      <IoMdCheckmarkCircleOutline />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerRequest;
