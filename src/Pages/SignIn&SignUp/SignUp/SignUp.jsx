import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const SignUp = ({ toggleForm, setReset }) => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setReset(() => reset);
  }, [setReset, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password } = data;

      const userResult = await createUser(email, password);
      console.log("User created:", userResult);

      await updateUserProfile(name);
      console.log("User profile updated");

      const userInfo = {
        name,
        email,
        password,
        createdDate: new Date().toISOString(),
        status: "active",
      };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);

      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email already in use",
          text: "This email is already associated with an account. Please sign in or use a different email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)]">
      {/* mobile  */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex-1 flex flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white lg:hidden md:hidden">
        <p className="text-4xl font-black text-center">Welcome Back!</p>
        <p className="text-lg text-center">
          Enter your personal details to use all site features
        </p>
        <button
          className="btn btn-outline border-white text-white"
          onClick={toggleForm}
        >
          Sign In
        </button>
      </section>
      {/* large medium  */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-l-3xl rounded-r-[170px] flex-1 flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white hidden lg:flex md:flex">
        <p className="text-4xl font-black">Welcome Back!</p>
        <p className="text-lg text-center">
          Enter your personal details to use all site features
        </p>
        <button
          className="btn btn-outline border-white text-white"
          onClick={toggleForm}
        >
          Sign In
        </button>
      </section>

      <section className="flex-1 flex flex-col justify-center items-center space-y-4 p-4 md:p-10">
        <p className="text-4xl font-bold">Sign Up</p>
        <section>
          <SocialLogin />
        </section>
        <p className="text-sm">Or use your email password for registration</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <div className="form-control">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered "
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="form-control relative">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered"
            />
            <span
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Sign Up</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;