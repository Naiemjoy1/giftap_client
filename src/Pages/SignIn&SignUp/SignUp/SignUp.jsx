import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = ({ toggleForm, setReset }) => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
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
    setLoading(true);
    try {
      const { name, email, password } = data;

      // Create the user using the correct function name
      const userResult = await createUser(email, password);
      console.log("User created:", userResult);

      // Update user profile with the name
      await updateUserProfile(name);
      console.log("User profile updated");

      // Save the user in the database
      const userInfo = {
        name,
        email,
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-l-3xl rounded-r-[170px] w-1/2 flex flex-col justify-center items-center space-y-4 px-32 text-white">
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
      <section className="w-1/2 flex flex-col justify-center items-center space-y-4">
        <p className="text-4xl font-bold">Sign Up</p>
        <section className="space-x-4">
          <button className="bg-white border p-3 rounded-lg">
            <FaGoogle />
          </button>
          <button className="bg-white border p-3 rounded-lg">
            <FaFacebookF />
          </button>
          <button className="bg-white border p-3 rounded-lg">
            <FaGithub />
          </button>
          <button className="bg-white border p-3 rounded-lg">
            <FaLinkedin />
          </button>
        </section>
        <p className="text-sm">Or use your email password for registration</p>
        <section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="form-control">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered w-[400px]"
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
                className="input input-bordered w-[400px]"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Sign Up</button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default SignUp;
