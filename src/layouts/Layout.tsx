import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react"

type Props={
    children:React.ReactNode,
    showHero?:boolean
};

const Layout=({children,showHero=false}:Props)=>{
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            {showHero&&<Hero></Hero>}
            <div className="container mx-auto flex-1 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
              {children}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Layout;