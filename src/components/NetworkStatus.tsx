import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface NetworkStatusProps {
  showToast?: boolean;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ showToast = true }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasShownOfflineToast, setHasShownOfflineToast] = useState(false);
  const [hasShownOnlineToast, setHasShownOnlineToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (showToast && hasShownOfflineToast) {
        toast.success('You are back online!');
        setHasShownOnlineToast(true);
        setHasShownOfflineToast(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (showToast && !hasShownOfflineToast) {
        toast.error('You are offline. Some features may not work properly.');
        setHasShownOfflineToast(true);
        setHasShownOnlineToast(false);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast, hasShownOfflineToast, hasShownOnlineToast]);

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
      <WifiOff className="w-4 h-4" />
      <span className="text-sm font-medium">You are offline</span>
    </div>
  );
};

export default NetworkStatus; 