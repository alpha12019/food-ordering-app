// API utility functions for better error handling and request management

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiException extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

export const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    // If we can't parse JSON, use the default error message
  }

  throw new ApiException(errorMessage, response.status);
};

export const createApiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

export const createAuthenticatedRequest = async <T>(
  url: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<T> => {
  return createApiRequest<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof ApiException && error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof TypeError) {
    return error.message.includes('fetch') || error.message.includes('network');
  }
  return false;
};

export const isApiError = (error: unknown): error is ApiException => {
  return error instanceof ApiException;
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  
  if (isNetworkError(error)) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}; 