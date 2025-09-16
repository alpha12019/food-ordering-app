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
                        className="font-bold text-white bg-orange-500 py-2 px-3 sm:px-4 md:px-6 rounded-md text-sm sm:text-base hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 whitespace-nowrap"
                    >
                        My Orders
                    </Link>
                    <div className="animate-fade-in">
                        <UserNameMenu />
                    </div>
                </>
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold text-sm sm:text-base hover:text-orange-500 hover:bg-orange-50 px-3 sm:px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 transform active:scale-95"
                    onClick={async () => await loginWithRedirect()}
                >
                    Login
                </Button>
            )}
        </div>
    )
}

export default MainNav
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
                        className="font-bold text-white bg-orange-500 py-2 px-3 sm:px-4 md:px-6 rounded-md text-sm sm:text-base hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 whitespace-nowrap"
                    >
                        My Orders
                    </Link>
                    <div className="animate-fade-in">
                        <UserNameMenu />
                    </div>
                </>
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold text-sm sm:text-base hover:text-orange-500 hover:bg-orange-50 px-3 sm:px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 transform active:scale-95"
                    onClick={async () => await loginWithRedirect()}
                >
                    Login
                </Button>
            )}
        </div>
    )
}

export default MainNav