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
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 sm:p-2 hover:bg-orange-50 transition-all duration-300 hover:scale-110 transform active:scale-95 touch-manipulation"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300 group-hover:rotate-90" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] md:w-[360px] p-3 sm:p-4 md:p-6 bg-white/95 backdrop-blur-md">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-slide-in-right">
                    <SheetTitle className="text-left">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
                                <img
                                    src={user?.picture}
                                    alt="User profile"
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-200 flex-shrink-0 transition-transform duration-300 hover:scale-110"
                                />
                                <div className="flex flex-col items-start min-w-0 flex-1">
                                    <span className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                                        {user?.name}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-600 truncate">
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-base sm:text-lg md:text-xl font-bold text-orange-600 animate-fade-in">
                                Welcome to MERNeats
                            </div>
                        )}
                    </SheetTitle>

                    <Separator className="border-t border-gray-200" />

                    <SheetDescription className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                        {isAuthenticated ? (
                            <MobileNavlinks />
                        ) : (
                            <Button
                                className="w-full font-bold bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:scale-105 transform active:scale-95 touch-manipulation"
                                onClick={() => loginWithRedirect()}
                            >
                                Login
                            </Button>
                        )}
                    </SheetDescription>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;