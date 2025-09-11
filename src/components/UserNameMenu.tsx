import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { User, Store, LogOut, ChevronDown } from "lucide-react";

const UserNameMenu = () => {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 hover:bg-orange-50 transition-colors duration-200"
                >
                    <img
                        src={user?.picture}
                        alt="User profile"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-orange-200 flex-shrink-0"
                    />
                    <div className="flex flex-col items-start min-w-0 hidden sm:block">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[120px] lg:max-w-[150px]">
                            {user?.name}
                        </span>
                        <span className="text-xs text-gray-600 truncate max-w-[120px] lg:max-w-[150px]">
                            {user?.email}
                        </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-white shadow-lg rounded-lg p-2 min-w-[200px] sm:min-w-[220px] border border-gray-200"
                sideOffset={8}
            >
                <DropdownMenuItem asChild>
                    <Link
                        to="/user-profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm"
                    >
                        <User className="w-4 h-4 text-gray-500" />
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        to="/manage-restaurant"
                        className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm"
                    >
                        <Store className="w-4 h-4 text-gray-500" />
                        My Restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 text-sm justify-start"
                        onClick={() => logout()}
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNameMenu;
