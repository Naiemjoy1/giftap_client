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

            <div className="overflow-x-auto  lg:flex justify-between space-y-4 gap-4  ">

                {/* Complaint Form */}

                <div className=" lg:w-[60%] p-4">
                    <h1 className="text-center text-3xl font-bold">Complaint Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="lg:flex justify-around mt-6">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Customer Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user.displayName}
                                    className="input input-bordered w-80 lg:w-96 "
                                    disabled
                                />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Customer Email</span>
                                </label>

                                <input
                                    type="text"
                                    defaultValue={user.email}
                                    className="input input-bordered w-80 lg:w-96"
                                    disabled
                                />


                            </div>
                        </div>

                        {/* Complaint Form Section */}
                        <div className="lg:flex justify-around mt-2">

                            {/* Subject */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Related Problem..."
                                    className="input input-bordered w-80 lg:w-96"
                                    {...register("subject", { required: true })}

                                />

                                {errors.subject && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>


                            {/* Shop Category Section */}
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Store Name</span>
                                </label>
                                <select
                                    className="input input-bordered w-80 lg:w-96 "
                                    {...register("storeName", { required: true })}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category
                                                .toLowerCase()
                                                .split(" ")
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ")}{" "}
                                        </option>
                                    ))}
                                    <option value={"others"}>others</option>
                                </select>
                                {errors.storeName && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>

                        </div>

                        {/* Shop Category Section */}
                        <div className="form-control lg:ml-6 mt-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered lg:w-[820px] " placeholder="Description of Quality Issue..."
                                {...register("complainDescription", { required: true })}
                            ></textarea>
                            {errors.complainDescription && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white">
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
                <div className=" items-center p-4 border m-2 rounded-md border-primary h-60 lg:w-[40%] ">
                    <h2 className="flex justify-center items-center text-xl font-semibold mr-4">
                        Terms of Use for Giftap
                    </h2>
                    <p className="items-center my-4">
                        Welcome to <span className="text-primary">GiftTap</span>! If you would like to submit a complaint as a user, seller, or admin of GiftTap, please do not hesitate to reach out to us. Your experience is extremely important to us, and we take your complaints seriously.

                        Our customer service team will promptly review your complaint and take necessary actions. Your feedback is valuable in helping us improve our services, so we appreciate your input.

                        Thank you for being a part of the GiftTap family!
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Complain;