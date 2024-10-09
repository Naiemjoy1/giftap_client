import { ImCross } from "react-icons/im";
import useApplys from "../../../../Components/Hooks/useApplys";
import useUsers from "../../../../Components/Hooks/useUsers";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { LuStore } from "react-icons/lu";

const SellerRequest = () => {
  const [applys, refetch, isLoading] = useApplys();
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();

  const getUserByApply = (applyUserID) =>
    users.find((user) => user._id === applyUserID);

  const handleApprove = async (user, apply) => {
    const sellerData = {
      ...user,
      type: "seller",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.patch(
            `/users/${user._id}`,
            sellerData
          );
          if (response.data.modifiedCount > 0) {
            await handleSeller(apply);
            refetch();
            toast.success("User updated to Seller.");
          } else {
            toast.error("User update failed.");
          }
        } catch (error) {
          console.error("Error updating user type:", error);
          toast.error("An error occurred while updating user type.");
        }
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
              toast.success("Seller Application Deleted.");
              refetch();
            } else {
              toast.error("Error deleting the application.");
            }
          })
          .catch((error) => {
            console.error("Error deleting the application:", error);
          });
      }
    });
  };

  const handleSeller = async (apply) => {
    const sellerData = {
      userID: apply.userID,
      name: apply.name,
      email: apply.email,
      mobile: apply.mobile,
      shopName: apply.shopName,
      address: apply.address,
      division: apply.division,
      district: apply.district,
    };

    try {
      const response = await axiosPublic.post("/sellers", sellerData);

      if (response.data.success) {
        toast.success("Seller details successfully saved.");
      } else {
        toast.error(response.data.message || "Failed to save seller details.");
      }
    } catch (error) {
      console.error("Error saving seller details:", error);
      toast.error("An error occurred while saving seller details.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {applys.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Seller Details</th>
                <th>Shop Details</th>
                <th>Shop Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applys.map((apply) => {
                const user = getUserByApply(apply.userID);
                return (
                  <tr key={apply._id}>
                    <th>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(apply)}
                      >
                        <ImCross />
                      </button>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                user?.image ||
                                "https://img.daisyui.com/images/profile/demo/2@94.webp"
                              } // Use user image if available
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {apply.name
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </div>
                          <div className="text-sm opacity-50">
                            <p>{apply.mobile}</p>
                            <p>{apply.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-bold">{apply.shopName}</p>
                      <p className="text-sm opacity-50">{apply.address}</p>
                      <p className="text-sm opacity-50">
                        {apply.district}, {apply.division}
                      </p>
                    </td>
                    <td>{apply.shopCategory}</td>
                    <th>
                      <button
                        onClick={() => handleApprove(user, apply)}
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
      ) : (
        <div className="flex flex-col items-center justify-center h-[500px] text-center space-y-4">
          <p className="text-primary text-5xl">
            <LuStore />
          </p>
          <p>No Seller Application Available</p>
        </div>
      )}
    </div>
  );
};

export default SellerRequest;
