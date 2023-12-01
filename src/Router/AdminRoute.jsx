import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                 <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={location.pathname} replace></Navigate>

};

export default AdminRoute;