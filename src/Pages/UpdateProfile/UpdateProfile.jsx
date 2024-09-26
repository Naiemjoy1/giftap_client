import React from "react";
import useAuth from "../../Components/Hooks/useAuth";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="container mx-auto">
      <p>update</p>
    </div>
  );
};

export default UpdateProfile;
