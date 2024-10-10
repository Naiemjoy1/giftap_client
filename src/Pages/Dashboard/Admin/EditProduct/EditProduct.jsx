import React, { useState, useEffect } from "react";
import useProducts from "../../../../Components/Hooks/useProducts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoArrowBack, IoCloudUploadSharp } from "react-icons/io5";

const EditProduct = ({ handleBackClick, productId }) => {
  const [products, isLoading, refetch] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];
  const axiosPublic = useAxiosPublic();
  const [imagePreviews, setImagePreviews] = useState({});
  const [priceGroup, setPriceGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  const product = products.find((product) => product?._id === productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const selectedCategory = watch("category");

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        seller_name: product.seller_name,
        store_name: product.store_name,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory,
        mention: product.mention,
        price: product.price,
        quantity: product.quantity,
        discount: product.discount,
        priceGroup: product.priceGroup || [],
      });
      setImagePreviews({
        cardImg1: product.image?.cardImg1,
        cardImg2: product.image?.cardImg2,
        cardImg3: product.image?.cardImg3,
      });
      setPriceGroup(product.priceGroup || []);
    }
  }, [product, reset]);

  // Handle Image Change
  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const newImgURL = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [imageKey]: newImgURL }));
    }
  };

  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const images = {};
      const imageKeys = ["cardImg1", "cardImg2", "cardImg3"];

      const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.data.url;
      };

      for (const imgKey of imageKeys) {
        if (imagePreviews[imgKey]) {
          const file = await fetch(imagePreviews[imgKey]).then((res) =>
            res.blob()
          );
          const imageUrl = await uploadImage(file);
          images[imgKey] = imageUrl;
        }
      }

      data.priceGroup = await Promise.all(
        priceGroup.map(async (tier, index) => {
          const newImageKey = `tierImg${index}`;
          let imageUrl = tier.image;

          if (imagePreviews[newImageKey]) {
            const file = await fetch(imagePreviews[newImageKey]).then((res) =>
              res.blob()
            );
            imageUrl = await uploadImage(file);
          }

          return {
            ...tier,
            image: imageUrl,
          };
        })
      );

      const response = await axiosPublic.put(`/products/${productId}`, {
        ...data,
        image: { ...data.image, ...images },
      });
      if (response.data.modifiedCount > 0) {
        await refetch();
        toast.success("Product updated successfully");
      }
      handleBackClick();
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <button onClick={handleBackClick} className="">
        <IoArrowBack />
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2 py-2">
        <div className="flex justify-between items-center gap-4">
          {/* Product Name */}
          <div className="form-control w-1/3">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Seller Name */}
          <div className="form-control w-1/3">
            <input
              type="text"
              placeholder="Seller Name"
              className="input input-bordered"
              {...register("seller_name", { required: true })}
            />
            {errors.seller_name && (
              <p className="text-red-600">Seller name is required.</p>
            )}
          </div>

          {/* Store Name */}
          <div className="form-control w-1/3">
            <input
              type="text"
              placeholder="Store Name"
              className="input input-bordered"
              {...register("store_name", { required: true })}
            />
            {errors.store_name && (
              <p className="text-red-600">Store name is required.</p>
            )}
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

        {/* Image Upload Section */}
        <div className="form-control">
          <label>Current Images</label>
          <div className="grid grid-cols-3 gap-4">
            {["cardImg1", "cardImg2", "cardImg3"].map((imgKey, idx) => (
              <div key={idx}>
                <label
                  htmlFor={imgKey}
                  className="border border-dashed p-2 text-2xl flex justify-center items-center text-primary cursor-pointer"
                >
                  {imagePreviews[imgKey] ? (
                    <img
                      src={imagePreviews[imgKey]}
                      alt="Preview"
                      className="h-8"
                    />
                  ) : (
                    <IoCloudUploadSharp />
                  )}
                </label>
                <input
                  type="file"
                  id={imgKey}
                  className="sr-only"
                  accept="image/*"
                  {...register(`image.${imgKey}`)}
                  onChange={(e) => handleImageChange(e, imgKey)}
                />
                {errors[`image.${imgKey}`] && (
                  <p className="text-red-600">Image is required.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`grid ${
            selectedCategory === "digital gift" ? "grid-cols-4" : "grid-cols-6"
          } gap-4`}
        >
          {/* Category */}
          <div className="form-control">
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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

          {/* Conditionally render Price and Quantity */}
          {selectedCategory !== "digital gift" && (
            <>
              {/* Price */}
              <div className="form-control">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="input input-bordered"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <p className="text-red-600">Price is required.</p>
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

        {/* Price Group Section */}
        <div className="flex justify-between gap-4">
          {priceGroup.map((tier, index) => (
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control" key={index}>
                <input
                  type="text"
                  placeholder="Tier Name"
                  className="input input-bordered"
                  value={tier.tier}
                  onChange={(e) => {
                    const newTier = { ...tier, tier: e.target.value };
                    setPriceGroup((prev) => {
                      const newPriceGroup = [...prev];
                      newPriceGroup[index] = newTier;
                      return newPriceGroup;
                    });
                  }}
                />
                {errors.priceGroup?.[index]?.tier && (
                  <p className="text-red-600">Tier name is required.</p>
                )}
              </div>
              {/* Currency Dropdown */}
              <div className="form-control">
                <select
                  className="select select-bordered"
                  value={tier.price?.currency || ""}
                  onChange={(e) => {
                    const newTier = {
                      ...tier,
                      price: { ...tier.price, currency: e.target.value },
                    };
                    setPriceGroup((prev) => {
                      const newPriceGroup = [...prev];
                      newPriceGroup[index] = newTier;
                      return newPriceGroup;
                    });
                  }}
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                  <option value="EUR">EUR</option>
                </select>
                {errors[`priceGroup.${index}.price.currency`] && (
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
                  value={tier.price?.amount || ""}
                  onChange={(e) => {
                    const newTier = {
                      ...tier,
                      price: { ...tier.price, amount: e.target.value },
                    };
                    setPriceGroup((prev) => {
                      const newPriceGroup = [...prev];
                      newPriceGroup[index] = newTier;
                      return newPriceGroup;
                    });
                  }}
                />
                {errors[`priceGroup.${index}.price.amount`] && (
                  <p className="text-red-600">Price is required.</p>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Duration (e.g., 1 month)"
                  className="input input-bordered"
                  value={tier.price?.duration || ""}
                  onChange={(e) => {
                    const newTier = {
                      ...tier,
                      price: { ...tier.price, duration: e.target.value },
                    };
                    setPriceGroup((prev) => {
                      const newPriceGroup = [...prev];
                      newPriceGroup[index] = newTier;
                      return newPriceGroup;
                    });
                  }}
                />
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
                    ) : product.priceGroup[index]?.image ? (
                      <img
                        src={product.priceGroup[index].image}
                        alt="Existing Preview"
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
                    {...register(`priceGroup.${index}.image`)}
                    onChange={(e) => handleImageChange(e, `tierImg${index}`)}
                  />
                </div>
                {errors[`priceGroup.${index}.image`] && (
                  <p className="text-red-600">Image is required.</p>
                )}
              </div>
              <div className="form-control">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered"
                  value={tier.quantity || ""}
                  onChange={(e) => {
                    const newTier = { ...tier, quantity: e.target.value };
                    setPriceGroup((prev) => {
                      const newPriceGroup = [...prev];
                      newPriceGroup[index] = newTier;
                      return newPriceGroup;
                    });
                  }}
                />
                {errors[`priceGroup.${index}.quantity`] && (
                  <p className="text-red-600">Quantity is required.</p>
                )}
              </div>
              <button
                type="button"
                className="btn btn-error btn-sm text-white"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={() =>
              setPriceGroup([
                ...priceGroup,
                { tier: "", price: {}, image: "", quantity: 1 },
              ])
            }
          >
            Add Price Group
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-full text-white">
          {loading ? (
            <span className="loading loading-ring loading-sm"></span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
