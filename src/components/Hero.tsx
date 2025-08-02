import hero from "../assets/hero.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://res.cloudinary.com/dqijfttks/image/upload/v1751310457/hero_bhvvnl.png"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <img
        src={imgSrc}
        alt="Hero banner"
        onError={() => setImgSrc(hero)} // fallback to local image
        className={`w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover transition-all duration-1000 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      {/* Animated overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 animate-pulse"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-orange-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-200 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-300 rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default Hero;
