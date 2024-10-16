import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";
import useDivision from "../../../../Components/Hooks/useDivision";
import useDistricts from "../../../../Components/Hooks/useDistricts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useProducts from "../../../../Components/Hooks/useProducts";

const ApplySeller = ({ setIsModalOpen }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [products, loading] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];

  const usersDetails = users.filter((u) => u?.email === user?.email);

  const [division] = useDivision();
  const [districts] = useDistricts();

  const [selectedDivision, setSelectedDivision] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isChecked = watch("acceptTerms", false);

  const handleDivisionChange = (event) => {
    const selectedDivisionId = event.target.value;
    const selectedDivisionObj = division.find(
      (divi) => divi.id === selectedDivisionId
    );

    setSelectedDivision({
      id: selectedDivisionObj?.id || "",
      name: selectedDivisionObj?.name || "",
    });

    setSelectedDistrict({ id: "", name: "" });
  };

  const filteredDistricts = districts.filter(
    (district) => district.division_id === selectedDivision.id
  );

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrictObj = districts.find(
      (district) => district.id === selectedDistrictId
    );

    setSelectedDistrict({
      id: selectedDistrictObj?.id || "",
      name: selectedDistrictObj?.name || "",
    });
  };

  const onSubmit = async (data) => {
    const userDetail = usersDetails[0];
    if (!userDetail) {
      console.error("User details not found!");
      return;
    }

    const applyData = {
      userID: userDetail._id,
      name: user.displayName,
      email: user.email,
      mobile: data.mobile,
      shopName: data.shopName,
      shopCategory: data.shopCategory,
      address: data.address,
      district: selectedDistrict.name,
      division: selectedDivision.name,
    };

    try {
      const res = await axiosPublic.post("/applys", applyData);
      toast.success("Seller Application Submitted");
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shop Name</span>
          </label>
          <input
            type="text"
            placeholder="Shop Name"
            {...register("shopName", { required: true })}
            className="input input-bordered"
          />
          {errors.shopName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Shop Category Section */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shop Category</span>
          </label>
          <select
            {...register("shopCategory", { required: true })}
            className="input input-bordered"
          >
            <option value="">Select Category</option>
            {categories?.map((category, index) => (
              <option key={index} value={category}>
                {category
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
              </option>
            ))}
          </select>
          {errors.shopCategory && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile</span>
          </label>
          <input
            type="number"
            placeholder="Mobile"
            {...register("mobile", { required: true })}
            className="input input-bordered"
          />
          {errors.mobile && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Shop Address</span>
          </label>
          <textarea
            placeholder="Shop Address"
            {...register("address", { required: true })}
            className="textarea textarea-bordered"
          />
          {errors.address && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Division</span>
            </label>
            <select
              {...register("division", { required: true })}
              className="input input-bordered"
              onChange={handleDivisionChange}
            >
              <option value="">Select Division</option>
              {division?.map((divi) => (
                <option key={divi.id} value={divi.id}>
                  {divi.name}
                </option>
              ))}
            </select>
            {errors.division && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Select District</span>
            </label>
            <select
              {...register("district", { required: true })}
              className="input input-bordered"
              value={selectedDistrict.id}
              onChange={handleDistrictChange}
              disabled={!selectedDivision.id}
            >
              <option value="">Select District</option>
              {filteredDistricts?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Accept T&C</span>
            <input
              type="checkbox"
              {...register("acceptTerms", { required: true })}
              className="checkbox checkbox-primary checkbox-sm"
            />
          </label>
          {errors.acceptTerms && (
            <span className="text-red-500">You must accept the terms</span>
          )}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary text-white" disabled={!isChecked}>
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplySeller;
