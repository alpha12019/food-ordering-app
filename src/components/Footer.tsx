import React from "react";

const Footer = () => {
    return (
        <div className="bg-orange-500 py-4 sm:py-6 md:py-8 lg:py-10">
            <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold tracking-tight text-center sm:text-left">
                        MERNeats.com
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 md:gap-4 text-center sm:text-left">
                        <span className="text-white font-semibold tracking-tight text-xs sm:text-sm md:text-base hover:text-orange-100 transition-colors duration-300 cursor-pointer touch-manipulation">
                            Privacy Policy
                        </span>
                        <span className="text-white font-semibold tracking-tight text-xs sm:text-sm md:text-base hover:text-orange-100 transition-colors duration-300 cursor-pointer touch-manipulation">
                            Terms of Services
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer