import React from "react";
import { AiFillDelete } from "react-icons/ai"; // Import the delete icon
import useWishs from "../../../../Components/Hooks/useWishs";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { BsCartPlus } from "react-icons/bs";

const WishList = () => {
  const [wishlists, refetchWish, isLoading] = useWishs();
  const [products, loading] = useProducts();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
 
  const myWishlist = wishlists.filter(item => item?.email === user?.email);
  const productIds = myWishlist.map(item => item?.productId);
console.log(productIds)
 
  const wishlistProducts = products?.filter(product => productIds?.includes(product._id));

 

  const handleRemove = async (wishlistId) => {
    // console.log(wishlistId)
    const deleteId = productIds?.find(item=>item?.includes(wishlistId))
    console.log(deleteId);
    try {
      const res = await axiosPublic.delete(`/wishlists/product/${deleteId}`);
      if (res.data.acknowledged && res.data.deletedCount > 0) {
        refetchWish();
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      toast.error("Error removing product from wishlist");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead className="bg-primary text-white">
          <tr>
           
            <th>Image</th>
            <th>Product Name</th>
           
            <th>Category</th>
            <th>Store</th>
           
           
            <th>Remove</th> 
          </tr>
        </thead>
        <tbody>
        
          {wishlistProducts.map((product) => (
            <tr key={product._id}>
             
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={product?.image?.cardImg} 
                        alt={product?.name}
                      />
                    </div>
                  </div>
                 
                </div>
              </td>
              
              <td>{product?.name}</td>
              <td>{product?.category}</td>
              <td>{product?.store_name}</td>
             
             
              <th>
                <button className="btn btn-ghost btn-xs" onClick={() => handleRemove(product._id)}>
                  <AiFillDelete className="text-primary text-xl" /> 
                </button>
              </th>
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
  );
};

export default WishList;
