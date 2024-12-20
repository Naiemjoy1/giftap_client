import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn, githubLogin, twitterLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSocialLogin = async (socialProvider) => {
    try {
      const result = await socialProvider();
      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        createdDate: new Date().toISOString(),
        status: "active",
        type: "user",
        provider: "social", // Add provider field to user data
      };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.message === "User already exists") {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Welcome Back!",
          text: "You are already registered.",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Social Sign-In Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong: ${
          error.response?.data?.message || error.message
        }. Please try again.`,
      });
    }
  };

  return (
    <div className="space-x-4">
      <button
        onClick={() => handleSocialLogin(googleSignIn)}
        className="bg-white border p-3 rounded-lg"
      >
        <FaGoogle />
      </button>
      <button
        onClick={() => handleSocialLogin(twitterLogin)}
        className="bg-white border p-3 rounded-lg"
      >
        <FaTwitter />
      </button>
      <button
        onClick={() => handleSocialLogin(githubLogin)}
        className="bg-white border p-3 rounded-lg"
      >
        <FaGithub />
      </button>
    </div>
  );
};

export default SocialLogin;
