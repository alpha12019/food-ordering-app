import hero from "../assets/hero.png";
import { useState } from "react";

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://res.cloudinary.com/dqijfttks/image/upload/v1751310457/hero_bhvvnl.png"
  );

  return (
    <div>
      <img
        src={imgSrc}
        alt="Hero banner"
        onError={() => setImgSrc(hero)} // fallback to local image
        className="w-full max-h-[600px] object-cover"
      />
    </div>
  );
};

export default Hero;
