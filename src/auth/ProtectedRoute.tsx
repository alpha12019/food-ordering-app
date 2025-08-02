import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
    const {isAuthenticated,isLoading}=useAuth0();
    
    // For development, if Auth0 is not configured, allow access
    if (!import.meta.env.VITE_AUTH0_DOMAIN || !import.meta.env.VITE_AUTH0_CLIENT_ID) {
        return <Outlet />;
    }
    
    if(isLoading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }
    if(isAuthenticated){
        return <Outlet></Outlet>
    }

    return <Navigate to='/' replace></Navigate>
}

export default ProtectedRoute;
