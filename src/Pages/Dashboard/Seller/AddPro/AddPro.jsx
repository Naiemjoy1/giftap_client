import React, { useState } from "react";
import useSellers from "../../../../Components/Hooks/useSellers";
import useUsers from "../../../../Components/Hooks/useUsers";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCloudUploadSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const AddPro = () => {
  const [sellers] = useSellers();
  const { user } = useAuth();
  const [products] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];
  const axiosPublic = useAxiosPublic();

  const [users] = useUsers();

  const useDetails = users.find((userId) => userId.email === user.email);

  const storeDetails = sellers.find((store) => store.email === user.email);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceGroup",
  });

  const [isDigitalGift, setIsDigitalGift] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    cardImg1: null,
    cardImg2: null,
    cardImg3: null,
  });
  const [tierImages, setTierImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(false);

  const uploadImageToImgBB = async (imageFile) => {
    const image_hosting_key = import.meta.env.VITE_IMGBB_API;
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const generateSKU = (productName, category) => {
    const existingSKUs = new Set(products.map((product) => product.sku));

    let sku;
    let attempts = 0;
    const maxAttempts = 1000; // To prevent potential infinite loops

    do {
      const randomString = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const namePart = productName
        .split(" ")
        .slice(0, 2)
        .join("")
        .substring(0, 4)
        .toUpperCase();
      const categoryPart = category.substring(0, 3).toUpperCase();

      sku = `${namePart}-${categoryPart}-${randomString}-${randomNumber}`;
      attempts += 1;

      if (attempts > maxAttempts) {
        throw new Error(
          "Failed to generate a unique SKU after multiple attempts."
        );
      }
    } while (existingSKUs.has(sku));

    return sku;
  };

  const onSubmit = async (data) => {
    setLoadingImages(true);
    try {
      const uploadedImages = await Promise.all([
        uploadImageToImgBB(data.image.cardImg1[0]),
        uploadImageToImgBB(data.image.cardImg2[0]),
        uploadImageToImgBB(data.image.cardImg3[0]),
      ]);

      const uploadedTierImages = isDigitalGift
        ? await Promise.all(
            fields.map((_, index) => {
              const tierImageFile = tierImages[`tierImg${index}`];
              if (tierImageFile) {
                return uploadImageToImgBB(tierImageFile);
              }
              return Promise.resolve("");
            })
          )
        : [];

      const generatedSKU = generateSKU(data.name, data.category);

      const productData = {
        userId: useDetails?._id,
        name: data.name,
        seller_name: useDetails?.name,
        store_name: storeDetails?.shopName,
        description: data.description,
        sku: generatedSKU,
        image: {
          cardImg1: uploadedImages[0],
          cardImg2: uploadedImages[1],
          cardImg3: uploadedImages[2],
        },
        category: data.category,
        subCategory: data.subCategory,
        price: isDigitalGift ? undefined : parseFloat(data.price),
        mention: data.mention,
        quantity: isDigitalGift ? undefined : parseFloat(data.quantity),
        discount: parseFloat(data.discount),
      };

      if (isDigitalGift) {
        productData.priceGroup = data.priceGroup.map(
          (priceGroupItem, index) => ({
            ...priceGroupItem,
            price: {
              ...priceGroupItem.price,
              amount: parseFloat(priceGroupItem.price.amount),
            },
            quantity: parseFloat(priceGroupItem.quantity),
            image: uploadedTierImages[index],
          })
        );
      }

      // console.log(productData);
      const res = await axiosPublic.post("/products", productData);
      if (res.data.insertedId) {
        reset();
        toast.success("New Product Added");
      }
    } catch (error) {
      console.error("Error uploading images or generating SKU:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoadingImages(false);
    }
  };

  const categoryChangeHandler = (event) => {
    setIsDigitalGift(event.target.value.toLowerCase() === "digital gift");
  };

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      setTierImages((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2 py-2">
        {/* Product Name */}
        <div className="flex justify-between items-center gap-4">
          <div className="form-control w-1/3">
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600">Product name is required.</p>
            )}
          </div>

          {/* Seller Name */}
          <div className="form-control w-1/3">
            <input
              type="text"
              value={useDetails?.name || ""}
              placeholder="Seller Name"
              className="input input-bordered"
              {...register("seller_name", { required: true })}
              readOnly
            />
            {/* {errors.seller_name && (
              <p className="text-red-600">Seller name is required.</p>
            )} */}
          </div>

          {/* Store Name */}
          <div className="form-control w-1/3">
            <input
              type="text"
              value={storeDetails?.shopName || ""}
              placeholder="Store Name"
              className="input input-bordered"
              {...register("store_name", { required: true })}
              readOnly
            />
            {/* {errors.store_name && (
              <p className="text-red-600">Store name is required.</p>
            )} */}
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <textarea
            placeholder="Product Description"
            className="textarea textarea-bordered"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <p className="text-red-600">Description is required.</p>
          )}
        </div>

        {/* Images */}
        <div className="flex justify-center items-center gap-4">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="form-control w-1/3">
              <div>
                <label
                  htmlFor={`cardImg${idx}`}
                  className="border border-dashed p-2 text-2xl flex justify-center items-center text-primary cursor-pointer"
                >
                  {imagePreviews[`cardImg${idx}`] ? (
                    <img
                      src={imagePreviews[`cardImg${idx}`]}
                      alt="Preview"
                      className=" h-8"
                    />
                  ) : (
                    <IoCloudUploadSharp />
                  )}
                </label>
                <input
                  type="file"
                  id={`cardImg${idx}`}
                  className="sr-only"
                  accept="image/*"
                  {...register(`image.cardImg${idx}`, { required: true })}
                  onChange={(e) => handleImageChange(e, `cardImg${idx}`)}
                />
                {errors[`image.cardImg${idx}`] && (
                  <p className="text-red-600">Image is required.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`grid ${
            isDigitalGift ? "grid-cols-4" : "grid-cols-6"
          } gap-4`}
        >
          {/* Category */}
          <div className="form-control">
            <select
              className="select select-bordered"
              {...register("category", { required: true })}
              onChange={categoryChangeHandler}
            >
              <option value="">Select Category</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600">Category is required.</p>
            )}
          </div>

          {/* SubCategory */}
          <div className="form-control">
            <input
              type="text"
              placeholder="SubCategory"
              className="input input-bordered"
              {...register("subCategory", { required: true })}
            />
            {errors.subCategory && (
              <p className="text-red-600">SubCategory is required.</p>
            )}
          </div>

          {/* Mention */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Mention (e.g., For Baby, Men, Women)"
              className="input input-bordered"
              {...register("mention")}
            />
          </div>

          {/* Price for non-digital products */}
          {!isDigitalGift && (
            <>
              <div className="form-control">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="input input-bordered"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <p className="text-red-600">
                    Price is required for non-digital products.
                  </p>
                )}
              </div>
              {/* Quantity */}
              <div className="form-control">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered"
                  {...register("quantity", { required: true })}
                />
                {errors.quantity && (
                  <p className="text-red-600">Quantity is required.</p>
                )}
              </div>
            </>
          )}

          {/* Discount */}
          <div className="form-control">
            <input
              type="number"
              step="0.01"
              placeholder="Discount Percentage"
              className="input input-bordered"
              {...register("discount")}
            />
          </div>
        </div>

        {/* Price Group for Digital Gifts */}
        {isDigitalGift && (
          <div className="space-y-4">
            <p className="text-center text-lg font-bold">Add Tier</p>
            <div className="flex gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="e.g., Basic, Standard, Premium"
                        className="input input-bordered"
                        {...register(`priceGroup.${index}.tier`, {
                          required: true,
                        })}
                      />
                      {errors.priceGroup?.[index]?.tier && (
                        <p className="text-red-600">Tier name is required.</p>
                      )}
                    </div>
                    {/* Currency Dropdown */}
                    <div className="form-control">
                      <select
                        className="select select-bordered"
                        {...register(`priceGroup.${index}.price.currency`, {
                          required: true,
                        })}
                      >
                        <option value="">Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="BDT">BDT</option>
                        <option value="EUR">EUR</option>
                      </select>
                      {errors.priceGroup?.[index]?.price?.currency && (
                        <p className="text-red-600">Currency is required.</p>
                      )}
                    </div>
                    {/* Price Input */}
                    <div className="form-control">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        className="input input-bordered"
                        {...register(`priceGroup.${index}.price.amount`, {
                          required: true,
                        })}
                      />
                      {errors.priceGroup?.[index]?.price?.amount && (
                        <p className="text-red-600">Price is required.</p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="Duration (e.g., 1 month)"
                        className="input input-bordered"
                        {...register(`priceGroup.${index}.price.duration`, {
                          required: true,
                        })}
                      />
                      {errors.priceGroup?.[index]?.price?.duration && (
                        <p className="text-red-600">Duration is required.</p>
                      )}
                    </div>
                    {/* Image Upload Section */}
                    <div className="form-control">
                      <div className="flex justify-center items-center">
                        <label
                          htmlFor={`tierImg${index}`}
                          className="border border-dashed p-2 text-2xl flex justify-center items-center text-primary cursor-pointer w-full"
                        >
                          {imagePreviews[`tierImg${index}`] ? (
                            <img
                              src={imagePreviews[`tierImg${index}`]}
                              alt="Preview"
                              className="h-8"
                            />
                          ) : (
                            <IoCloudUploadSharp />
                          )}
                        </label>
                        <input
                          type="file"
                          id={`tierImg${index}`}
                          className="sr-only"
                          accept="image/*"
                          {...register(`priceGroup.${index}.image`, {
                            required: true,
                          })}
                          onChange={(e) =>
                            handleImageChange(e, `tierImg${index}`)
                          }
                        />
                      </div>
                      {errors.priceGroup?.[index]?.image && (
                        <p className="text-red-600">Image is required.</p>
                      )}
                    </div>
                    {/* Quantity for each price group */}
                    <div className="form-control">
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="input input-bordered"
                        {...register(`priceGroup.${index}.quantity`, {
                          required: true,
                          valueAsNumber: true, // This ensures quantity is treated as a number
                        })}
                      />
                      {errors.priceGroup?.[index]?.quantity && (
                        <p className="text-red-600">Quantity is required.</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-error btn-sm text-white mt-4"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-primary text-white btn-sm"
                onClick={() =>
                  append({
                    tier: "",
                    price: { amount: 0, duration: "" },
                    image: "", // Removed as we now handle it with file input
                    quantity: 1,
                  })
                }
              >
                Add New Tier
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-control">
          <button className="btn btn-primary text-white" type="submit">
            {loadingImages ? (
              <span className="loading loading-ring loading-sm"></span>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPro;
