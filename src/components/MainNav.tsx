import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {isAuthenticated ? (
                <>
                    <Link 
                        to="/order-status" 
                        className="font-bold text-white bg-orange-500 py-2 px-3 sm:px-4 md:px-6 rounded-md text-sm sm:text-base hover:bg-orange-600 transition-colors duration-200 whitespace-nowrap"
                    >
                        My Orders
                    </Link>
                    <UserNameMenu />
                </>
            ) : (
                <Button 
                    variant="ghost" 
                    className="font-bold text-sm sm:text-base hover:text-orange-500 hover:bg-white px-3 sm:px-4 md:px-6 py-2 transition-colors duration-200" 
                    onClick={async () => await loginWithRedirect()}
                >
                    Login
                </Button>
            )}
        </div>
    )
}

export default MainNav