import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";

const PrivetRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    // Data Loading
    if (loading) {
        return <>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span></>
    }

    // User  Check
    if (user) {
        return children;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;