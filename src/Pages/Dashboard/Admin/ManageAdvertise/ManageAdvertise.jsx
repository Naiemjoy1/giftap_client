import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";

const ManageAdvertise = () => {
  const [banners, setBanners] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    // Fetch banners from your API or database
    const fetchBanners = async () => {
      try {
        const response = await axiosSecure.get("/banner");
        const data = await response.data;
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const confirmAdvertise = (bannerId) => {
    // Call API to confirm the advertisement
    confirmAlert({
      title: "Confirm Advertisement",
      message: "Are you sure you want to confirm this advertisement?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // API call to confirm banner
            fetch(`/api/confirmBanner/${bannerId}`, { method: "POST" })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  setBanners(banners.map(banner => 
                    banner._id === bannerId ? { ...banner, confirmed: true } : banner
                  ));
                }
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteAdvertise = (bannerId) => {
    // Call API to delete the advertisement
    confirmAlert({
      title: "Delete Advertisement",
      message: "Are you sure you want to delete this advertisement?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/api/deleteBanner/${bannerId}`, { method: "DELETE" })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  setBanners(banners.filter((banner) => banner._id !== bannerId));
                }
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
      {banners.length === 0 ? (
        <p>No banners available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={banner.bannerUrl}
                alt="Banner Preview"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{banner.title}</h2>
              <p className="text-gray-600 mb-4">Requested by: {banner.sellerName}</p>
              <div className="flex justify-between">
                {!banner.confirmed && (
                  <button
                    onClick={() => confirmAdvertise(banner._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  >
                    Confirm Advertise
                  </button>
                )}
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
    </div>
  );
};

export default ManageAdvertise;
