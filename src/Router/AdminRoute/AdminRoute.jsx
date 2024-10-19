import useAuth from "../../Components/Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useType from "../../Components/Hooks/useType";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userType, isLoading] = useType();

  const location = useLocation();

  const adminLoading = loading || isLoading;

  if (adminLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="loading loading-spinner text-4xl text-primary"></span>
        </div>
      </div>
    );
  }

  if (user && userType === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
