import { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [resetSignIn, setResetSignIn] = useState(null);
  const [resetSignUp, setResetSignUp] = useState(null);

  const toggleForm = () => {
    // Reset both forms during the transition
    if (resetSignIn) resetSignIn();
    if (resetSignUp) resetSignUp();

    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-100px)] my-10 rounded-3xl shadow-xl relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          isSignUp ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute w-full h-full">
          <SignIn toggleForm={toggleForm} setReset={setResetSignIn} />
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          !isSignUp ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute w-full h-full">
          <SignUp toggleForm={toggleForm} setReset={setResetSignUp} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
