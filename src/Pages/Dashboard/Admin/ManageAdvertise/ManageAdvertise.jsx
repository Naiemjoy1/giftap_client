import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const ManageAdvertise = () => {
  const axiosSecure = useAxiosSecure();

  // Fetching banners with useQuery (React Query automatically handles fetching)
  const { refetch, data: banners = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banner");
      return res.data;
    },
  });

  // Filter the banners by type
  const pendingBanners = banners.filter((banner) => banner.type === "pending");
  const runningBanners = banners.filter((banner) => banner.type === "running");

  // Confirm advertisement
  const confirmAdvertise = (bannerId) => {
    confirmAlert({
      title: "Confirm Advertisement",
      message: "Are you sure you want to confirm this advertisement?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosSecure.patch(`/banner/${bannerId}`)
              .then((response) => {
                const data = response.data;
                if (data.result.modifiedCount > 0) {
                  toast.success("Banner confirmed successfully!");
                  refetch(); // Refetch banners after confirming the banner
                }
              })
              .catch((error) => {
                console.error("Error confirming advertisement:", error);
                toast.error("Failed to confirm the banner.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Delete advertisement
  const deleteAdvertise = (bannerId) => {
    confirmAlert({
      title: "Delete Advertisement",
      message: "Are you sure you want to delete this advertisement?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosSecure.delete(`/banner/${bannerId}`)
              .then((response) => {
                if (response.data.success) {
                  toast.success("Banner deleted successfully!");
                  refetch(); // Refetch banners after deleting the banner
                }
              })
              .catch((error) => {
                console.error("Error deleting advertisement:", error);
                toast.error("Failed to delete the banner.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Banner Advertisements</h1>

      {/* Pending Banners Section */}
      <h2 className="text-xl font-semibold mb-4">Pending Banners</h2>
      {pendingBanners.length === 0 ? (
        <p>No pending banners available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {pendingBanners.map((banner) => (
            <div key={banner._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={banner.bannerUrl}
                alt="Banner Preview"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{banner.title}</h2>
              <p className="text-gray-600 mb-4">Requested by: {banner.sellerName}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => confirmAdvertise(banner._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                >
                  Confirm Advertise
                </button>
                <button
                  onClick={() => deleteAdvertise(banner._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                >
                  Delete Advertise
                </button>
              </div>
              <button
                onClick={() => window.open(banner.bannerUrl, "_blank")}
                className="mt-2 bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 w-full"
              >
                Preview Banner
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Running Banners Section */}
      <h2 className="text-xl font-semibold mb-4">Running Banners</h2>
      {runningBanners.length === 0 ? (
        <p>No running banners available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {runningBanners.map((banner) => (
            <div key={banner._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={banner.bannerUrl}
                alt="Banner Preview"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{banner.title}</h2>
              <p className="text-gray-600 mb-4">Seller: {banner.sellerName}</p>
              <button
                onClick={() => deleteAdvertise(banner._id)}
                className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 w-full"
              >
                Delete Banner
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAdvertise;
