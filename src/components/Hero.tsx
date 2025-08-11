import hero from "../assets/hero.png";
import { useState, useEffect } from "react";
import { Sparkles, Star, Heart, Zap } from "lucide-react";

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://res.cloudinary.com/dqijfttks/image/upload/v1751310457/hero_bhvvnl.png"
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, type: string, delay: number}>>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating elements
    const elements = [
      { id: 1, x: 10, y: 20, type: 'star', delay: 0 },
      { id: 2, x: 85, y: 15, type: 'heart', delay: 1 },
      { id: 3, x: 20, y: 80, type: 'zap', delay: 2 },
      { id: 4, x: 75, y: 70, type: 'star', delay: 3 },
      { id: 5, x: 50, y: 10, type: 'heart', delay: 1.5 },
      { id: 6, x: 15, y: 60, type: 'zap', delay: 2.5 },
    ];
    setFloatingElements(elements);

    // Show sparkles periodically
    const sparkleTimer = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1500);
    }, 4000);

    return () => clearInterval(sparkleTimer);
  }, []);

  const renderFloatingElement = (element: {id: number, x: number, y: number, type: string, delay: number}) => {
    const baseClasses = "absolute text-orange-300 animate-float opacity-60";
    const style = {
      left: `${element.x}%`,
      top: `${element.y}%`,
      animationDelay: `${element.delay}s`,
      animationDuration: '3s'
    };

    switch (element.type) {
      case 'star':
        return <Star key={element.id} className={`${baseClasses} w-4 h-4 sm:w-5 sm:h-5`} style={style} />;
      case 'heart':
        return <Heart key={element.id} className={`${baseClasses} w-3 h-3 sm:w-4 sm:h-4`} style={style} />;
      case 'zap':
        return <Zap key={element.id} className={`${baseClasses} w-4 h-4 sm:w-5 sm:h-5`} style={style} />;
      default:
        return null;
    }
  };

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
      
      {/* Enhanced animated overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-orange-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-200 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-300 rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/6 left-1/6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-300 rounded-full animate-float opacity-35" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Interactive floating icons */}
      {floatingElements.map(renderFloatingElement)}

      {/* Floating sparkles effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-300 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      )}

      {/* Morphing decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/20 rounded-full animate-morph"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-400/20 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-morph" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/3 right-1/6 w-8 h-8 bg-orange-300/20 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Hero;
