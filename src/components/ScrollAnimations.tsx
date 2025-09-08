import React, { useState, useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'rotate' | 'bounce';
  delay?: number;
  threshold?: number;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  className = "",
  animationType = 'fade-up',
  delay = 0,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'fade-up':
          return 'opacity-0 translate-y-8';
        case 'fade-left':
          return 'opacity-0 -translate-x-8';
        case 'fade-right':
          return 'opacity-0 translate-x-8';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'rotate':
          return 'opacity-0 rotate-12 scale-95';
        case 'bounce':
          return 'opacity-0 scale-75';
        default:
          return 'opacity-0 translate-y-8';
      }
    }

    switch (animationType) {
      case 'fade-up':
        return 'opacity-100 translate-y-0 animate-slide-up-fade';
      case 'fade-left':
        return 'opacity-100 translate-x-0 animate-slide-in-left';
      case 'fade-right':
        return 'opacity-100 translate-x-0 animate-slide-in-right';
      case 'scale':
        return 'opacity-100 scale-100 animate-scale-in';
      case 'rotate':
        return 'opacity-100 rotate-0 scale-100 animate-rotate-in';
      case 'bounce':
        return 'opacity-100 scale-100 animate-bounce-in-spring';
      default:
        return 'opacity-100 translate-y-0 animate-slide-up-fade';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimations;
