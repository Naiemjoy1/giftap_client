import { useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn, githubLogin, twitterLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSocialLogin = (socialProvider) => {
    socialProvider()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          provider: user.providerId, // Add provider information
          createdDate: new Date().toISOString(),
          status: "active",
          type: "admin",
        };

        // Send user info to your back-end
        axiosSecure.post("/users", userInfo).then((res) => {
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
