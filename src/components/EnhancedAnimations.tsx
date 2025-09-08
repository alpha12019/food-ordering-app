import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Star, Heart, Zap, Crown, Gem } from 'lucide-react';

interface EnhancedAnimationsProps {
  className?: string;
}

const EnhancedAnimations: React.FC<EnhancedAnimationsProps> = ({ className = "" }) => {
  const [bubbles, setBubbles] = useState<Array<{ id: number, x: number, y: number, size: number, delay: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number, x: number, y: number, delay: number }>>([]);
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, timestamp: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Create floating bubbles
    const bubbleInterval = setInterval(() => {
      setBubbles(prev => {
        const newBubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: 100,
          size: Math.random() * 20 + 10,
          delay: Math.random() * 2
        };
        return [...prev.slice(-8), newBubble];
      });
    }, 2000);

    // Create sparkles
    const sparkleInterval = setInterval(() => {
      setSparkles(prev => {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2
        };
        return [...prev.slice(-6), newSparkle];
      });
    }, 1500);

    // Create ripples on click
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setRipples(prev => [...prev.slice(-3), {
          id: Date.now(),
          x,
          y,
          timestamp: Date.now()
        }]);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      clearInterval(bubbleInterval);
      clearInterval(sparkleInterval);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Clean up old ripples
  useEffect(() => {
    const cleanup = setInterval(() => {
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.timestamp < 1000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const floatingIcons = [
    { icon: Sparkles, delay: 0, color: 'text-yellow-400' },
    { icon: Star, delay: 1, color: 'text-orange-400' },
    { icon: Heart, delay: 2, color: 'text-red-400' },
    { icon: Zap, delay: 3, color: 'text-blue-400' },
    { icon: Crown, delay: 4, color: 'text-purple-400' },
    { icon: Gem, delay: 5, color: 'text-pink-400' }
  ];

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Floating Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="particle-bubble absolute opacity-60"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: '6s'
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="particle-sparkle absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        />
      ))}

      {/* Click Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="particle-ripple absolute"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: '20px',
            height: '20px'
          }}
        />
      ))}

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <item.icon
          key={index}
          className={`absolute w-4 h-4 sm:w-6 sm:h-6 animate-float opacity-30 ${item.color}`}
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + (index % 3) * 25}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: '4s'
          }}
        />
      ))}

      {/* Enhanced Morphing Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-orange-400/20 to-red-400/20 morphing-shape"></div>
      <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 morphing-shape-fast"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 morphing-shape-slow"></div>
      <div className="absolute bottom-10 right-10 w-14 h-14 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 morphing-shape"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-200/10 to-red-200/10 rounded-full animate-pulse-scale"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full animate-pulse-scale" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-r from-green-200/10 to-teal-200/10 rounded-full animate-pulse-scale" style={{ animationDelay: '2s' }}></div>

      {/* Rainbow Text Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-gradient-animated opacity-10 pointer-events-none">
        🍕
      </div>
    </div>
  );
};

export default EnhancedAnimations;
