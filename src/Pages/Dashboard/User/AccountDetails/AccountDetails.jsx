import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import toast from "react-hot-toast";

const AccountDetails = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDisplayNameTaken, setIsDisplayNameTaken] = useState(false);
  const [users] = useUsers();
  const { user, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const usersDetails = users.find((u) => u?.email === user?.email);
  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const watchDisplayName = watch("displayName");

  useEffect(() => {
    if (usersDetails) {
      setValue("name", usersDetails.name || "");
      setValue("displayName", usersDetails.displayName || "");
    }
  }, [usersDetails, setValue]);

  useEffect(() => {
    if (watchDisplayName) {
      const nameTaken = users.some(
        (u) => u.displayName === watchDisplayName && u.email !== user?.email
      );
      setIsDisplayNameTaken(nameTaken);
    }
  }, [watchDisplayName, users, user?.email]);

  const onSubmit = async (data) => {
    try {
      const { displayName, name } = data;

      if (isDisplayNameTaken) {
        toast.error("Display Name is already taken");
        return;
      }

      let displayUrl = usersDetails?.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          displayUrl = result.data.display_url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      const userDetail = usersDetails;

      if (userDetail && userDetail._id) {
        const updateInfo = {
          name,
          displayName,
          image: displayUrl,
          type: userDetail.type,
        };

        const updateResponse = await axiosPublic.patch(
          `/users/${userDetail._id}`,
          updateInfo
        );

        if (updateResponse.status === 200) {
          await updateUserProfile(name, displayUrl);
          toast.success("User profile updated");
        } else {
          toast.error("Failed to update user info");
        }
      } else {
        toast.warning("User not found");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body w-1/2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            type="text"
            placeholder="Display Name"
            {...register("displayName", {
              required: "Display Name is required",
            })}
            className="input input-bordered w-full"
          />
          <span className="absolute top-4 right-5 h-full flex items-center cursor-pointer">
            {isDisplayNameTaken ? (
              <FaCircleXmark className="text-red-500" />
            ) : (
              <IoCheckmarkCircle className="text-green-500" />
            )}
          </span>
          {errors.displayName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className="mb-6 pt-4">
          <div className="mb-8">
            <input
              type="file"
              id="file"
              className="sr-only"
              accept="image/*"
              {...register("image")}
              onChange={handleImageUpload}
            />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop image here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">Save</button>
        </div>
      </form>

      <section className="w-1/2 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt="Uploaded Preview"
            className="rounded-lg shadow-md max-h-64"
          />
        ) : usersDetails?.image ? (
          <img
            src={usersDetails.image}
            alt="Current Profile"
            className="rounded-lg shadow-md max-h-64"
          />
        ) : (
          <div className="text-gray-500">No image uploaded</div>
        )}
      </section>
    </div>
  );
};

export default AccountDetails;
