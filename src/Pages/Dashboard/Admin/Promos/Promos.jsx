import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import usePromo from "../../../../Components/Hooks/usePromo";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";

const Promos = () => {
  const [promo, refetch] = usePromo();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { text, promoCode, startDate, finishDate, status, discount } = data;
    const promoData = {
      text,
      promoCode,
      startDate,
      finishDate,
      status,
      discount,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post("/promos", promoData, finishDate);

      if (res.status >= 200 && res.status < 300) {
        toast.success("New promo added successfully");
        refetch(); // Refetch after adding promo
      } else {
        toast.error("Failed to add promo. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting promo:", error);
      toast.error(
        `Error: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const handleStatusChange = async (prom, status) => {
    try {
      const res = await axiosPublic.patch(`/promos/${prom._id}`, { status });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Promo status updated successfully");
        refetch();
      } else {
        toast.error("Failed to update promo status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating promo status:", error);
      toast.error(
        `Error: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosPublic.delete(`/promos/${id}`);

      if (res.status >= 200 && res.status < 300) {
        toast.success("Promo deleted successfully");
        refetch();
      } else {
        toast.error("Failed to delete promo. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting promo:", error);
      toast.error(
        `Error: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const sortedPromos = promo.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
          {/* Promo Text Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Promo Text</span>
            </label>
            <input
              type="text"
              placeholder="Enter promo text"
              className="input input-bordered"
              {...register("text", { required: "Promo text is required" })}
            />
            {errors.text && (
              <span className="label-text-alt text-red-500">
                {errors.text.message}
              </span>
            )}
          </div>

          {/* Promo Code Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Promo Code</span>
            </label>
            <input
              type="text"
              placeholder="Enter promo code"
              className="input input-bordered"
              {...register("promoCode", { required: "Promo code is required" })}
            />
            {errors.promoCode && (
              <span className="label-text-alt text-red-500">
                {errors.promoCode.message}
              </span>
            )}
          </div>

          {/* Start Date Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
            {errors.startDate && (
              <span className="label-text-alt text-red-500">
                {errors.startDate.message}
              </span>
            )}
          </div>

          {/* Finish Date Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Finish Date</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              {...register("finishDate", {
                required: "Finish date is required",
              })}
            />
            {errors.finishDate && (
              <span className="label-text-alt text-red-500">
                {errors.finishDate.message}
              </span>
            )}
          </div>

          {/* Status Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered"
              {...register("status", { required: "Status is required" })}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
            {errors.status && (
              <span className="label-text-alt text-red-500">
                {errors.status.message}
              </span>
            )}
          </div>

          {/* Discount Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Discount</span>
            </label>
            <input
              type="text"
              placeholder="Enter discount (e.g., 10%)"
              className="input input-bordered"
              {...register("discount", { required: "Discount is required" })}
            />
            {errors.discount && (
              <span className="label-text-alt text-red-500">
                {errors.discount.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-control mt-4">
          <button className="btn btn-primary text-white">Submit Promo</button>
        </div>
      </form>

      <p className="text-center font-bold uppercase">All Promos -</p>
      <div className="overflow-x-auto h-[450px] overflow-y-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Promo Text</th>
              <th>Promo Code</th>
              <th>Start Date</th>
              <th>Finish Date</th>
              <th>Status</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {sortedPromos.map((prom, index) => (
              <tr key={prom._id}>
                <th>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(prom._id)}
                  >
                    <ImCross />
                  </button>
                </th>
                <td>{prom.text}</td>
                <td>{prom.promoCode}</td>
                <td>{new Date(prom.startDate).toLocaleDateString()}</td>
                <td>{new Date(prom.finishDate).toLocaleDateString()}</td>
                <td>
                  <select
                    className="select select-bordered"
                    value={prom.status}
                    onChange={(e) => handleStatusChange(prom, e.target.value)}
                  >
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </select>
                </td>
                <td>{prom.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Promos;
