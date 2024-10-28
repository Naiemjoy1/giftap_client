import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProducts from "../../../../Components/Hooks/useProducts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";

const AddProducts = () => {
  const [products] = useProducts();
  const categories = [...new Set(products.map((item) => item.category))];
  const axiosPublic = useAxiosPublic();

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

  const [isDigitalGift, setIsDigitalGift] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCategory = watch("category");

  useEffect(() => {
    setIsDigitalGift(selectedCategory === "digital gift");
  }, [selectedCategory]);

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
    const maxAttempts = 1000;

    do {
      const randomString = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
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
    setLoading(true);
    try {
      const images = {
        cardImg1: data.cardImages[0]
          ? await uploadImageToImgBB(data.cardImages[0][0])
          : null,
        cardImg2: data.cardImages[1]
          ? await uploadImageToImgBB(data.cardImages[1][0])
          : null,
        cardImg3: data.cardImages[2]
          ? await uploadImageToImgBB(data.cardImages[2][0])
          : null,
      };

      const formattedPriceGroup = await Promise.all(
        data.priceGroup.map(async (tier) => ({
          tier: tier.tier,
          price: {
            currency: tier.price.currency,
            amount: parseFloat(tier.price.amount), // Convert to float
            duration: tier.price.duration,
          },
          image: tier.tierImage
            ? await uploadImageToImgBB(tier.tierImage[0])
            : null,
          quantity: parseFloat(tier.quantity), // Convert to float
        }))
      );

      const generatedSKU = generateSKU(data.name, data.category);

      const formattedData = {
        ...data,
        image: images, // Keep the uploaded images
        priceGroup: formattedPriceGroup,
        sku: generatedSKU,
        // Exclude cardImages from the data sent to the server
      };

      // Remove cardImages from formattedData
      delete formattedData.cardImages;

      // Convert other fields to float
      formattedData.price = parseFloat(data.price); // Convert price to float
      formattedData.quantity = parseFloat(data.quantity); // Convert quantity to float
      formattedData.discount = parseFloat(data.discount) || 0; // Convert discount to float

      const res = await axiosPublic.post("/products", formattedData);
      if (res.data.insertedId) {
        reset();
        toast.success("New Product Added");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-full">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register(`cardImages.${num - 1}`, {
                    required: num === 1, // Require at least one image
                  })}
                />
                {errors.cardImages?.[num - 1] && (
                  <p className="text-red-600">
                    Product Image {num} is required.
                  </p>
                )}
              </div>
            ))}
          </div>

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
                        className="input input-bordered input-sm"
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
                        className="input input-bordered input-sm"
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
                        className="select select-bordered select-sm"
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
                        className="input input-bordered input-sm"
                        {...register(`priceGroup.${index}.quantity`, {
                          required: true,
                        })}
                      />
                      {errors.priceGroup?.[index]?.quantity && (
                        <p className="text-red-600">Quantity is required.</p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs file-input-sm"
                        {...register(`priceGroup.${index}.tierImage`)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="btn btn-outline btn-primary btn-sm"
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
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
