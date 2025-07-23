import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UserNameMenu = () => {
    const { user, logout } = useAuth0();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
            <img 
                src={user?.picture} 
                alt="User profile" 
                className="w-8 h-8 rounded-full border-2 border-black"
            />
                <div className="flex flex-col items-start">
                    <span className="text-sm">{user?.name}</span>
                    <span className="text-xs text-gray-600">{user?.email}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2 shadow-lg">
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500 block px-4 py-2 border-b-2 border-b-orange-300 mb-2">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/manage-restaurant" className="font-bold hover:text-orange-500 block px-4 py-2 border-b-2 border-b-orange-300 mb-2">
                        My restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button className="w-full font-bold bg-orange-500 text-white " onClick={() => logout()}>
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNameMenu;
