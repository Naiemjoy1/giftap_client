import useUsers from "../../../../Components/Hooks/useUsers";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";

const Users = () => {
  const [users, refetch, isLoading] = useUsers();

  const axiosSecure = useAxiosSecure();

  const handleRemove = (userId) => {
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
        axiosSecure.delete(`/users/${userId}`).then((res) => {
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

  const handleStatusChange = (user, newStatus) => {
    const userDetails = {
      ...user,
      status: newStatus,
    };
    axiosSecure.patch(`/users/${user._id}`, userDetails).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Status updated successfully.");
      } else {
        toast.error("Failed to update status.");
      }
    });
  };

  const handleTypeChange = (user, newType) => {
    const userDetails = {
      ...user,
      type: newType,
    };
    axiosSecure.patch(`/users/${user._id}`, userDetails).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User type updated successfully.");
      } else {
        toast.error("Failed to update user type.");
      }
    });
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
      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>User Details</th>
                <th>User Address</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th>
                    <button
                      className="text-xl text-primary"
                      onClick={() => handleRemove(user._id)}
                    >
                      <RxCross2 />
                    </button>
                  </th>
                  {/* User Details */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  {/* User Address */}
                  <td>
                    {user.address?.billing?.[0]?.streetAddress ? (
                      <div>
                        <span>{user.address.billing[0].streetAddress}</span>
                        <br />
                        <span>{user.address.billing[0].division}</span>
                      </div>
                    ) : (
                      <span>No address available</span>
                    )}
                  </td>
                  {/* Status */}
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  {/* Type */}
                  <td>
                    <select
                      value={user.type}
                      onChange={(e) => handleTypeChange(user, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
