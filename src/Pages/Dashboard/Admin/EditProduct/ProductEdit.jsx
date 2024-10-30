import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import useProducts from "../../../../Components/Hooks/useProducts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ProductEdit = ({ handleBackClick, productId }) => {
  const [products, isLoading, refetch] = useProducts(); // Destructure to include isLoading
  const categories = [...new Set(products.map((item) => item.category))];
  const axiosPublic = useAxiosPublic();
  const product = products.find((product) => product?._id === productId);
  const [loading, setLoading] = useState(false);
  const [isDigitalGift, setIsDigitalGift] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceGroup",
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    setIsDigitalGift(selectedCategory === "digital gift");
  }, [selectedCategory]);

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
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Prepare priceGroup data
      const formattedPriceGroup = data.priceGroup.map((tier) => ({
        tier: tier.tier,
        price: {
          currency: tier.price.currency,
          amount: parseFloat(tier.price.amount),
          duration: tier.price.duration,
        },
        quantity: parseFloat(tier.quantity),
      }));

      const formattedData = {
        ...data,
        priceGroup: formattedPriceGroup,
      };

      // Convert other fields to float
      formattedData.price = parseFloat(data.price);
      formattedData.quantity = parseFloat(data.quantity);
      formattedData.discount = parseFloat(data.discount) || 0;

      // Use PUT method instead of POST for updating the product
      const res = await axiosPublic.put(
        `/products/${productId}`,
        formattedData
      );

      // Check for modifiedCount in the response
      if (res.data.modifiedCount > 0) {
        await refetch(); // Refetch updated products after a successful update
        toast.success("Product updated successfully");
      }
      handleBackClick();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleBackClick} className="">
        <IoArrowBack />
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="space-y-4">
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

          {/* <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-full">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register(`cardImages.${num - 1}`)} // Make this optional
                  onChange={(event) => handleImageChange(num - 1, event)} // No required validation
                />
                {imagePreviews[`cardImg${num}`] && (
                  <img
                    src={imagePreviews[`cardImg${num}`]}
                    alt={`Preview ${num}`}
                    className="mt-2 w-10 h-10 rounded"
                  />
                )}
              </div>
            ))}
          </div> */}

          <div
            className={`grid ${
              isDigitalGift
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 lg:grid-cols-3"
            } gap-4`}
          >
            {/* Category */}
            <div className="form-control">
              <select
                className="select select-bordered"
                {...register("category", { required: true })}
              >
                <option value="">Select Category</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
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
                    {...register("price", { required: !isDigitalGift })}
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
                        <p className="text-red-600">Tier is required.</p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
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
                      <select
                        className="select select-bordered"
                        {...register(`priceGroup.${index}.price.currency`, {
                          required: true,
                        })}
                      >
                        <option value="">Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="BDT">BDT</option>
                      </select>
                      {errors.priceGroup?.[index]?.price?.currency && (
                        <p className="text-red-600">Currency is required.</p>
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
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="input input-bordered"
                        {...register(`priceGroup.${index}.quantity`, {
                          required: true,
                        })}
                      />
                      {errors.priceGroup?.[index]?.quantity && (
                        <p className="text-red-600">Quantity is required.</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="btn btn-outline btn-error"
                      onClick={() => remove(index)}
                    >
                      Remove Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary text-white btn-sm"
              onClick={() => append({})}
            >
              Add Tier
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-control">
          <button className="btn btn-primary text-white" type="submit">
            {loading ? (
              <span className="loading loading-ring loading-sm"></span>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
