import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignIn = ({ toggleForm, setReset }) => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const { email, password } = data;

    setLoading(true);

    try {
      const result = await signIn(email, password);
      const user = result.user;

      if (user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
      console.error(error.message);
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
      {/* Section 1: Small devices only */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white lg:hidden md:hidden">
        <p className="text-4xl font-black text-center">Hello, Friend</p>
        <p className="text-lg text-center">
          Enter your personal details to use all site features
        </p>
        <button
          className="btn btn-outline border-white text-white"
          onClick={toggleForm}
        >
          Sign Up
        </button>
      </section>

      {/* Section 2: Responsive for all devices */}
      <section className="flex-1 flex flex-col justify-center items-center space-y-4 p-4 md:p-10">
        <p className="text-4xl font-bold">Sign In</p>
        <SocialLogin />
        <p className="text-sm">Or use your email password</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <div className="form-control">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered"
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
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Sign In</button>
          </div>
        </form>
      </section>

      {/* Section 3: Medium and large devices only */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-r-[170px] flex-1 flex-col justify-center items-center space-y-4 p-4 md:p-10 text-white hidden lg:flex md:flex">
        <p className="text-4xl font-black">Welcome Back!</p>
        <p className="text-lg text-center">
          Enter your personal details to use all site features
        </p>
        <button
          className="btn btn-outline border-white text-white"
          onClick={toggleForm}
        >
          Sign Up
        </button>
      </section>
    </div>
  );
};

export default SignIn;
