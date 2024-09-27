import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";
import useDivision from "../../../../Components/Hooks/useDivision";
import useDistricts from "../../../../Components/Hooks/useDistricts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";

const ApplySeller = () => {
  const { user } = useAuth();
  console.log(user);

  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const usersDetails = users.filter((u) => u?.email === user?.email);

  const [division] = useDivision();
  const [districts] = useDistricts();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isChecked = watch("acceptTerms", false);

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
  };

  const filteredDistricts = districts.filter(
    (district) => district.division_id === selectedDivision
  );

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
      address: data.address,
      district: data.district,
      division: data.division,
    };

    try {
      const res = await axiosPublic.post("/applys", applyData);
      console.log("Response:", res.data);
      reset();
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
              {division?.map((divi, index) => (
                <option key={index} value={divi.id}>
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
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedDivision}
            >
              <option value="">Select District</option>
              {filteredDistricts?.map((district, index) => (
                <option key={index} value={district.id}>
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
          <button
            className="btn btn-primary text-white"
            disabled={!isChecked || Object.keys(errors).length > 0}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplySeller;
