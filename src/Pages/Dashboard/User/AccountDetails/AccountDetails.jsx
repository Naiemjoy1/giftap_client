import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";

const AccountDetails = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [users] = useUsers();
  const { user, updateUserProfile } = useAuth();
  console.log(user);

  const axiosPublic = useAxiosPublic();

  const usersDetails = users.filter((u) => u?.email === user?.email);
  console.log(usersDetails);

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
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      if (!imageFile) {
        console.error("No image file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const displayUrl = result.data.display_url;

        console.log("Image uploaded successfully:", displayUrl);

        const { name, displayName } = data;

        const userDetail = usersDetails[0];

        if (userDetail && userDetail._id) {
          console.log(userDetail._id);
          console.log(userDetail.type);

          const updateInfo = {
            name: name,
            displayName: displayName,
            image: displayUrl,
            type: userDetail.type,
          };

          console.log("Form Data to Submit:", updateInfo);

          const updateResponse = await axiosPublic.patch(
            `/users/${userDetail._id}`,
            updateInfo
          );

          if (updateResponse.status === 200) {
            console.log("User info updated successfully", updateResponse.data);

            await updateUserProfile(name, displayUrl);
            console.log("User profile updated");
          } else {
            console.error("Failed to update user info", updateResponse.data);
          }
        } else {
          console.error("User not found");
        }
      } else {
        console.error("Image upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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
            className="input input-bordered"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            type="text"
            placeholder="Display Name"
            {...register("displayName", {
              required: "Display Name is required",
            })}
            className="input input-bordered"
          />
          {errors.displayName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            {...register("image", { required: "Profile Image is required" })}
            onChange={handleImageUpload}
          />
          {errors.image && (
            <span className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>

      <section className="w-1/2 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt="Uploaded Preview"
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
