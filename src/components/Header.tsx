import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import reactLogo from "../assets/react.svg";
import { useState, useEffect } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200' 
                : 'bg-white border-b-2 border-b-orange-500'
        }`}>
            <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 lg:py-6">
                    {/* Logo Section */}
                    <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                        <Link 
                            to="/" 
                            className="flex items-center gap-1 sm:gap-2 md:gap-3 group text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-orange-500 transition-all duration-300 hover:text-orange-600 hover:scale-105"
                        >
                            <img 
                                src={reactLogo} 
                                alt="Logo" 
                                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" 
                            />
                            <span className="hidden xs:inline animate-fade-in">MERNeats.com</span>
                            <span className="xs:hidden animate-fade-in">MERNeats</span>
                        </Link>
                    </div>
                    
                    {/* Navigation Section */}
                    <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-2 sm:gap-4">
                        {/* Mobile Navigation */}
                        <div className="sm:hidden animate-slide-in-right">
                            <MobileNav />
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden sm:block animate-slide-in-left">
                            <MainNav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;