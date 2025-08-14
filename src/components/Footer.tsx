import React from "react";

const Footer = () => {
    return (
        <div className="bg-orange-500 py-6 sm:py-8 md:py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                    <span className="text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight text-center sm:text-left">
                        MERNeats.com
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                        <span className="text-white font-semibold tracking-tight text-sm sm:text-base hover:text-orange-100 transition-colors duration-300 cursor-pointer">
                            Privacy Policy
                        </span>
                        <span className="text-white font-semibold tracking-tight text-sm sm:text-base hover:text-orange-100 transition-colors duration-300 cursor-pointer">
                            Terms of Services
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer