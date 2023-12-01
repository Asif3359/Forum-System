import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (user) {
        return children;
    }
    return <Navigate to="/joinUs" state={location.pathname} ></Navigate>
};

export default PrivateRoute;