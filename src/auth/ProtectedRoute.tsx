import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProtectedRoute=()=>{
    const {isAuthenticated,isLoading,error}=useAuth0();
    
    // For development, if Auth0 is not configured, allow access
    if (!import.meta.env.VITE_AUTH0_DOMAIN || !import.meta.env.VITE_AUTH0_CLIENT_ID) {
        return <Outlet />;
    }
    
    // Handle Auth0 errors
    if (error) {
        console.error('Auth0 error:', error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
                    <p className="text-gray-600 mb-4">There was a problem with authentication. Please try refreshing the page.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }
    
    if(isLoading){
        return <LoadingSpinner fullScreen text="Authenticating..." />;
    }
    
    if(isAuthenticated){
        return <Outlet></Outlet>
    }

    return <Navigate to='/' replace></Navigate>
}

export default ProtectedRoute;
