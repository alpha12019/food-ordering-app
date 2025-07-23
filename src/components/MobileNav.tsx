import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavlinks from "./MobileNavLinks";


const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500"></Menu>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? <span className="flex item-center font-bold gap-2 text-sm md:text-lg">
                        <img 
                                src={user?.picture} 
                                alt="User profile" 
                                className="w-8 h-8 rounded-full border-2 border-black"
                            />
                        <div className="flex flex-col items-start">
                            <span className="text-sm">{user?.name}</span>
                            <span className="text-xs text-gray-600">{user?.email}</span>
                        </div>

                    </span> :
                        <span>Welcome to MERNeats.com</span>}
                </SheetTitle>
                <Separator className="my-3 border-t border-gray-300" />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? <MobileNavlinks></MobileNavlinks> :
                        <Button className="flex-1 font-bold bg-orange-500" onClick={() => loginWithRedirect()}>Login</Button>}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}
export default MobileNav;