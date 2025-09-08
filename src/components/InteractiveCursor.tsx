import React, { useState, useEffect } from 'react';

interface InteractiveCursorProps {
  children: React.ReactNode;
  className?: string;
}

const InteractiveCursor: React.FC<InteractiveCursorProps> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Custom Cursor Trail */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="w-5 h-5 bg-orange-500 rounded-full opacity-60 animate-pulse"></div>
      </div>

      {/* Cursor Ripple Effect */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
          }}
        >
          <div className="w-10 h-10 border-2 border-orange-400 rounded-full animate-ripple opacity-40"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCursor;
