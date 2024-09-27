import useApplys from "../../../../Components/Hooks/useApplys";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useUsers from "../../../../Components/Hooks/useUsers";

const SellerRequest = () => {
  const [applys, refetch] = useApplys();
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();

  const handleApprove = (userID, apply) => {
    axiosPublic
      .patch(`/users/${userID}`, { type: "seller" })
      .then((response) => {
        console.log("User updated:", response.data);
        handleDelete(apply);
      })
      .catch((error) => {
        console.error("Error updating user type:", error);
      });
  };

  const handleDelete = (apply) => {
    axiosPublic
      .delete(`/applys/${apply._id}`)
      .then((response) => {
        console.log("Apply Deleted:", response.data);
        refetch();
      })
      .catch((error) => {
        console.error("Error Apply Deleted:", error);
      });
  };

  return (
    <div>
      <p>Total requests: {applys?.length}</p>
      {applys?.map((apply) => {
        const applyUser = users.find((user) => user?._id === apply?.userID);

        return (
          <div key={apply._id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shop Name: {apply.shopName}</h2>
              <p>User Name: {applyUser?.name}</p>
              <p>Email: {apply.email}</p>
              <p>Mobile: {apply.mobile}</p>
              <div className="card-actions justify-between">
                <button
                  className="btn btn-error text-white"
                  onClick={() => handleDelete(apply)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success text-white"
                  onClick={() => handleApprove(apply.userID, apply)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SellerRequest;
