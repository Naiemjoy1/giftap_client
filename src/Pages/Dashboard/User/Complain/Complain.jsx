import { useForm } from "react-hook-form";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import useUsers from "../../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";


const Complain = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [products, loading, refetch] = useProducts();
    const categories = [...new Set(products.map((item) => item.store_name))];
    // console.log(user)

    // const [users] = useUsers();
    // const uniqueTypes = [...new Set(users.map(user => user.type))];
    // console.log(users)


    const { displayName, email, photoURL } = user;
    // console.log(photoURL)

    const specificDateTime = new Date();
    // Date
    const submitDate = specificDateTime.toLocaleDateString('en-GB');
    // Time
    const submitTime = specificDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    // console.log(submitTime)
    // console.log(submitDate)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        data.customerName = displayName;
        data.customerEmail = email;
        data.photoURL = photoURL;
        data.submitTime = submitTime;
        data.submitDate = submitDate;

        axiosPublic.post(`/complain`, data)
            .then(res => {
                // console.log(res.data)
                toast.success("Complain Submitted Successfully.");
                refetch()

            })
            .catch(error => {
                // alert(error, "NOOOOOOOOOOOOOOO")
                toast.error("Complain Submitted Failed.");
            })

        // console.log(data)
    }

    refetch()


    return (
        <div>

            <div className="overflow-x-auto lg:flex lg:justify-between lg:space-y-0 space-y-6 lg:gap-6 p-4">

                {/* Complaint Form */}
                <div className="lg:w-[60%] w-full">
                    <h1 className="text-center text-3xl font-bold">Complain Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Customer Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user.displayName}
                                    className="input input-bordered w-full"
                                    disabled
                                />
                            </div>

                            {/* Customer Email */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer Email</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user.email}
                                    className="input input-bordered w-full"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Complaint Form Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Subject */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Related Problem..."
                                    className="input input-bordered w-full"
                                    {...register("subject", { required: true })}
                                />
                                {errors.subject && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>

                            {/* Store Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Store Name</span>
                                </label>
                                <select
                                    className="input input-bordered w-full"
                                    {...register("storeName", { required: true })}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category
                                                .toLowerCase()
                                                .split(" ")
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ")}
                                        </option>
                                    ))}
                                    <option value={"others"}>others</option>
                                </select>
                                {errors.storeName && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>

                        {/* Complaint Description */}
                        <div className="form-control w-full mt-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Description of Quality Issue..."
                                {...register("complainDescription", { required: true })}
                            ></textarea>
                            {errors.complainDescription && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white w-full">
                                {loading ? (
                                    <span className="loading loading-ring loading-sm"></span>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Terms of Use for Giftap */}
                <div className="lg:w-[40%] w-full p-4 border border-primary rounded-md">
                    <h2 className="text-xl font-semibold text-center">Terms of Use for Giftap</h2>
                    <p className="my-4 font-opensans  leading-loose">
                        Welcome to <span className="text-primary">GiftTap</span>! If you have any concerns or issues while using GiftTap as a user, seller, or admin, please feel free to contact us. We value your experience on our platform and take every complaint with the utmost seriousness. Our dedicated customer support team will promptly review your concern and take the necessary steps to resolve the issue as quickly as possible. Your feedback plays a crucial role in helping us enhance the quality of our services, and we are truly grateful for your input. Thank you for being a valued member of the GiftTap community, and we look forward to continuing to serve you!
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Complain;