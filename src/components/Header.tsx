import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import reactLogo from "../assets/react.svg";

const Header = () => {
    return (
        <div className="border-b-2 border-b-orange-500 py-3 sm:py-4 md:py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-4">
                    {/* Logo Section */}
                    <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 sm:gap-3 group text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-orange-500 transition-colors duration-200 hover:text-orange-600"
                        >
                            <img 
                                src={reactLogo} 
                                alt="Logo" 
                                className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-200 group-hover:scale-110" 
                            />
                            <span className="hidden xs:inline">MERNeats.com</span>
                            <span className="xs:hidden">MERNeats</span>
                        </Link>
                    </div>
                    
                    {/* Navigation Section */}
                    <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-4">
                        {/* Mobile Navigation */}
                        <div className="sm:hidden">
                            <MobileNav />
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden sm:block">
                            <MainNav />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;