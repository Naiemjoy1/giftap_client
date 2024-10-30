import React, { useEffect, useRef, useState } from "react";
import useDivision from "../../../../../Components/Hooks/useDivision";
import useDistricts from "../../../../../Components/Hooks/useDistricts";
import useISDcode from "../../../../../Components/Hooks/useISDcode";
import useAuth from "../../../../../Components/Hooks/useAuth";
import useUsers from "../../../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../../../Components/Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../Components/Hooks/useAxiosSecure";

const Shipping = ({ onClose }) => {
  const [division] = useDivision();
  const [districts] = useDistricts();
  const [ISDcode] = useISDcode();
  const { user } = useAuth();
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedISD, setSelectedISD] = useState("");

  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  const usersDetails = users.find((u) => u?.email === user?.email);
  const billingInfo = usersDetails?.address?.billing[0];
  const shippingInfo = usersDetails?.address?.shipping[0];

  const fromDivision = division.find((divi) => divi?.id === selectedDivision);

  const filteredDistricts = districts.filter(
    (district) => district.division_id === selectedDivision
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (shippingInfo) {
      reset({
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        companyName: shippingInfo.companyName,
        streetAddress: shippingInfo.streetAddress,
        zipCode: shippingInfo.zipCode,
        isdCode: shippingInfo.isdCode,
        phone: shippingInfo.phone,
        email: shippingInfo.email,
      });
      setSelectedDivision(shippingInfo.division);
      setSelectedDistrictName(shippingInfo.district);
    }
  }, [shippingInfo, reset]);

  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      companyName,
      streetAddress,
      zipCode,
      phone,
      email,
    } = data;

    const shipping = {
      name: usersDetails.name,
      displayName: usersDetails.displayName,
      type: usersDetails.type,
      image: usersDetails.image,
      address: {
        billing: [billingInfo],
        shipping: [
          {
            firstName,
            lastName,
            companyName,
            streetAddress,
            division: fromDivision?.name || "",
            district: selectedDistrictName,
            zipCode,
            isdCode: selectedISD,
            phone,
            email,
          },
        ],
      },
    };

    try {
      const updateResponse = await axiosSecure.patch(
        `/users/${usersDetails._id}`,
        shipping
      );

      if (updateResponse.status === 200) {
        refetch();
        onClose();
        window.location.reload();
        toast.success("Shipping info added successfully!");
      } else {
        toast.error("Failed to add user shipping info");
      }
    } catch (error) {
      console.error("Error updating shipping info:", error);
      toast.error("Failed to add user shipping info");
    }
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrictName("");
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (district) => district.id === selectedDistrictId
    );
    setSelectedDistrictName(selectedDistrict?.name || "");
  };

  const handleISDChange = (event) => {
    setSelectedISD(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          {errors.firstName && (
            <span className="text-red-500">First Name is required</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          {errors.lastName && (
            <span className="text-red-500">Last Name is required</span>
          )}
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Company Name (optional)</span>
        </label>
        <input
          type="text"
          {...register("companyName")}
          placeholder="Company Name"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Street Address</span>
        </label>
        <textarea
          {...register("streetAddress", { required: true })}
          placeholder="Street Address"
          className="textarea textarea-bordered"
        />
        {errors.streetAddress && (
          <span className="text-red-500">Street Address is required</span>
        )}
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Select Division</span>
          </label>
          <select
            {...register("division", { required: true })}
            className="input input-bordered w-full"
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
            <span className="text-red-500">Division is required</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Select District</span>
          </label>
          <select
            {...register("district", { required: true })}
            className="input input-bordered w-full"
            disabled={!selectedDivision}
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {filteredDistricts?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="text-red-500">District is required</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Zip Code</span>
          </label>
          <input
            type="text"
            {...register("zipCode", { required: true })}
            placeholder="Zip Code"
            className="input input-bordered w-full"
          />
          {errors.zipCode && (
            <span className="text-red-500">Zip Code is required</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">ISD Code</span>
          </label>
          <select
            className="input input-bordered w-full"
            {...register("isdCode", { required: true })}
            onChange={handleISDChange}
          >
            <option value="">Select ISD Code</option>
            {ISDcode?.map((ISD) => (
              <option key={ISD.id} value={ISD.dial_code}>
                {ISD.flag} {ISD.code} {ISD.dial_code}
              </option>
            ))}
          </select>
          {errors.isdCode && (
            <span className="text-red-500">ISD Code is required</span>
          )}
        </div>
        <div className="form-control w-8/12">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            placeholder="Phone"
            className="input input-bordered w-full"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Email"
          className="input input-bordered w-full"
          // disabled={!!shippingInfo?.email} // Disable if shippingInfo.email exists
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary mt-4 text-white btn-sm"
        >
          Add Shipping
        </button>
      </div>
    </form>
  );
};

export default Shipping;
