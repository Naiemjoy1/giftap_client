import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useAuth from "../../../Components/Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn, githubLogin, twitterLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSocialLogin = (socialProvider) => {
    socialProvider()
      .then((result) => {
        console.log(result.user);

        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          createdDate: new Date().toISOString(),
          status: "active",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
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
        });
      })
      .catch((error) => {
        console.error("Social Sign-In Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong: ${error.message}. Please try again.`,
        });
      });
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
