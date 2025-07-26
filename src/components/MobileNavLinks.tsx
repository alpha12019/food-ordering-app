import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { User, Store, Package, LogOut } from "lucide-react"

const MobileNavlinks = () => {
    const { logout } = useAuth0();
    
    return (
        <div className="space-y-2 sm:space-y-3">
            <Link 
                to="/user-profile" 
                className="flex items-center gap-3 p-3 rounded-lg font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm sm:text-base"
            >
                <User className="w-5 h-5 text-gray-500" />
                User Profile
            </Link>
            
            <Link 
                to="/manage-restaurant" 
                className="flex items-center gap-3 p-3 rounded-lg font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm sm:text-base"
            >
                <Store className="w-5 h-5 text-gray-500" />
                My Restaurant
            </Link>
            
            <Link 
                to="/order-status" 
                className="flex items-center gap-3 p-3 rounded-lg font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm sm:text-base"
            >
                <Package className="w-5 h-5 text-gray-500" />
                My Orders
            </Link>
            
            <Button 
                variant="ghost"
                className="w-full flex items-center gap-3 p-3 rounded-lg font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 text-sm sm:text-base justify-start" 
                onClick={() => logout()}
            >
                <LogOut className="w-5 h-5" />
                Logout
            </Button>
        </div>
    )
}

export default MobileNavlinks