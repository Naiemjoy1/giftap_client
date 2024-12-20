import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";

const SignUp = ({ toggleForm, setReset }) => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setReset(() => reset);
  }, [setReset, reset]);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password } = data;

      const userResult = await createUser(email, password);
      console.log("User created:", userResult);

      const token = userResult.user.accessToken;
      if (token) {
        localStorage.setItem("access-token", token);
      }

      await updateUserProfile(name);

      const userInfo = {
        name,
        email,
        password,
        createdDate: new Date().toISOString(),
        status: "active",
        type: "user",
      };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        reset();
        toast.success("User Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Error in onSubmit");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)]">
      {/* Mobile view */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex-1 flex flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white lg:hidden md:hidden">
        <p className="text-4xl font-black text-center">Hello, Friend</p>
        <p className="text-lg text-center">
          Register with your personal details to use all site features
        </p>
        <button
          className="btn btn-outline border-white text-white"
          onClick={toggleForm}
        >
          Sign In
        </button>
      </section>
      {/* Large and medium view */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-l-3xl rounded-r-[170px] flex-1 flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white hidden lg:flex md:flex">
        <p className="text-4xl font-black">Hello, Friend</p>
        <p className="text-lg text-center">
          Register with your personal details to use all site features
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

          <div className="form-control relative">
            <input
              {...register("confirmPassword", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered"
            />
            <span
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
            {errors.confirmPassword && (
              <span className="text-red-500">Confirm Password is required</span>
            )}
            {!passwordMatch && (
              <span className="text-red-500">Passwords do not match</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              className="btn btn-primary text-white"
              disabled={!passwordMatch}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
