import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  error?: Error | string | null;
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  showRetry = true,
  showHome = true,
  onRetry,
  className = ''
}) => {
  const navigate = useNavigate();

  const errorMessage = error instanceof Error ? error.message : error || message;

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            {errorMessage}
          </p>

          <div className="flex gap-2 justify-center">
            {showRetry && (
              <Button
                onClick={onRetry || (() => window.location.reload())}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}

            {showHome && (
              <Button
                onClick={() => navigate('/')}
                size="sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorDisplay; 