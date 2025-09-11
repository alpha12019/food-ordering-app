import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, Zap, Crown, Gem } from 'lucide-react';

interface SpectacularLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'rainbow';
  text?: string;
  className?: string;
}

const SpectacularLoader: React.FC<SpectacularLoaderProps> = ({
  size = 'md',
  color = 'orange',
  text = 'Loading...',
  className = ""
}) => {
  const [rotation, setRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [sparkleIndex, setSparkleIndex] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colorClasses = {
    orange: 'from-orange-500 to-red-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    rainbow: 'from-orange-500 via-red-500 via-purple-500 to-blue-500'
  };

  const icons = [Sparkles, Star, Heart, Zap, Crown, Gem];

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 16); // 60 FPS

    const pulseInterval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.2 : 1);
    }, 1000);

    const sparkleInterval = setInterval(() => {
      setSparkleIndex(prev => (prev + 1) % icons.length);
    }, 500);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(pulseInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  const CurrentIcon = icons[sparkleIndex];

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Main Loading Spinner */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-transparent rounded-full animate-spin`}
          style={{
            borderTopColor: color === 'rainbow' ? '#f97316' : undefined,
            borderRightColor: color === 'rainbow' ? '#ef4444' : undefined,
            borderBottomColor: color === 'rainbow' ? '#8b5cf6' : undefined,
            borderLeftColor: color === 'rainbow' ? '#3b82f6' : undefined,
            background: color === 'rainbow' ? undefined : `linear-gradient(45deg, ${colorClasses[color].split(' ')[0].replace('from-', '#')}, ${colorClasses[color].split(' ')[2].replace('to-', '#')})`,
            WebkitMask: 'radial-gradient(circle, transparent 40%, black 40%)',
            mask: 'radial-gradient(circle, transparent 40%, black 40%)'
          }}
        />

        {/* Inner pulsing circle */}
        <div
          className={`absolute inset-2 rounded-full bg-gradient-to-r ${colorClasses[color]} animate-pulse-scale`}
          style={{
            transform: `scale(${pulseScale})`,
            transition: 'transform 0.5s ease-in-out'
          }}
        />

        {/* Rotating icon */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          <CurrentIcon 
            className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} text-white animate-sparkle`}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute -top-2 -right-2 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.6s' }}></div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className={`text-sm font-semibold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent animate-pulse`}>
            {text}
          </p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {/* Background glow effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses[color]} opacity-20 blur-xl animate-pulse-scale`}
        style={{
          transform: `scale(${pulseScale * 2})`,
          transition: 'transform 0.5s ease-in-out'
        }}
      />
    </div>
  );
};

export default SpectacularLoader;
import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, Zap, Crown, Gem } from 'lucide-react';

interface SpectacularLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'rainbow';
  text?: string;
  className?: string;
}

const SpectacularLoader: React.FC<SpectacularLoaderProps> = ({
  size = 'md',
  color = 'orange',
  text = 'Loading...',
  className = ""
}) => {
  const [rotation, setRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [sparkleIndex, setSparkleIndex] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colorClasses = {
    orange: 'from-orange-500 to-red-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    rainbow: 'from-orange-500 via-red-500 via-purple-500 to-blue-500'
  };

  const icons = [Sparkles, Star, Heart, Zap, Crown, Gem];

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 16); // 60 FPS

    const pulseInterval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.2 : 1);
    }, 1000);

    const sparkleInterval = setInterval(() => {
      setSparkleIndex(prev => (prev + 1) % icons.length);
    }, 500);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(pulseInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  const CurrentIcon = icons[sparkleIndex];

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Main Loading Spinner */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-transparent rounded-full animate-spin`}
          style={{
            borderTopColor: color === 'rainbow' ? '#f97316' : undefined,
            borderRightColor: color === 'rainbow' ? '#ef4444' : undefined,
            borderBottomColor: color === 'rainbow' ? '#8b5cf6' : undefined,
            borderLeftColor: color === 'rainbow' ? '#3b82f6' : undefined,
            background: color === 'rainbow' ? undefined : `linear-gradient(45deg, ${colorClasses[color].split(' ')[0].replace('from-', '#')}, ${colorClasses[color].split(' ')[2].replace('to-', '#')})`,
            WebkitMask: 'radial-gradient(circle, transparent 40%, black 40%)',
            mask: 'radial-gradient(circle, transparent 40%, black 40%)'
          }}
        />

        {/* Inner pulsing circle */}
        <div
          className={`absolute inset-2 rounded-full bg-gradient-to-r ${colorClasses[color]} animate-pulse-scale`}
          style={{
            transform: `scale(${pulseScale})`,
            transition: 'transform 0.5s ease-in-out'
          }}
        />

        {/* Rotating icon */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          <CurrentIcon 
            className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} text-white animate-sparkle`}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute -top-2 -right-2 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.6s' }}></div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className={`text-sm font-semibold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent animate-pulse`}>
            {text}
          </p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {/* Background glow effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses[color]} opacity-20 blur-xl animate-pulse-scale`}
        style={{
          transform: `scale(${pulseScale * 2})`,
          transition: 'transform 0.5s ease-in-out'
        }}
      />
    </div>
  );
};

export default SpectacularLoader;
