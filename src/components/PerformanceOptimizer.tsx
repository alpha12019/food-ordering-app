import React, { useEffect, useCallback } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  // Monitor and log performance metrics
  const logPerformanceMetrics = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        console.log('Performance Metrics:', {
          pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        });
      }
    }
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload critical images
    const criticalImages = [
      '/src/assets/hero.png',
      '/src/assets/landing.png',
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize images
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" to images that are not in viewport
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      
      // Add error handling
      img.onerror = () => {
        img.style.display = 'none';
        console.warn(`Failed to load image: ${img.src}`);
      };
    });
  }, []);

  // Monitor memory usage
  const monitorMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      
      if (usedMB > totalMB * 0.8) {
        console.warn('High memory usage detected:', { usedMB, totalMB });
      }
    }
  }, []);

  useEffect(() => {
    // Log performance metrics after page load
    if (document.readyState === 'complete') {
      logPerformanceMetrics();
    } else {
      window.addEventListener('load', logPerformanceMetrics);
    }

    // Preload critical resources
    preloadCriticalResources();

    // Optimize images after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }

    // Monitor memory usage periodically
    const memoryInterval = setInterval(monitorMemoryUsage, 30000); // Every 30 seconds

    // Cleanup
    return () => {
      window.removeEventListener('load', logPerformanceMetrics);
      document.removeEventListener('DOMContentLoaded', optimizeImages);
      clearInterval(memoryInterval);
    };
  }, [logPerformanceMetrics, preloadCriticalResources, optimizeImages, monitorMemoryUsage]);

  return <>{children}</>;
};

export default PerformanceOptimizer; 