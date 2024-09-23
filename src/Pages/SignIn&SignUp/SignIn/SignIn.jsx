import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const SignIn = ({ toggleForm, setReset }) => {
  const { signIn } = useAuth();
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
    const { email, password } = data;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log(user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <section className="w-1/2 flex flex-col justify-center items-center space-y-4">
        <p className="text-4xl font-bold">Sign In</p>
        <section>
          <SocialLogin></SocialLogin>
        </section>
        <p className="text-sm">Or use your email password</p>
        <section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="form-control">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered w-[400px]"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control relative">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
              />
              <span
                className=" absolute top-4 right-4"
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
      </section>
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-r-3xl rounded-l-[170px] w-1/2 flex flex-col justify-center items-center space-y-4 px-32 text-white">
        <p className="text-4xl font-black">Hello, Friend</p>
        <p className="text-lg text-center">
          Register with your personal details to use all site features
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
