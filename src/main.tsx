import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import "./global.css"
import Auth0ProviderWithNavigator from './auth/auth0providerWithNavigator'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'
import ErrorBoundary from './components/ErrorBoundary'
import NetworkStatus from './components/NetworkStatus'
import PerformanceOptimizer from './components/PerformanceOptimizer'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PerformanceOptimizer>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Auth0ProviderWithNavigator>
              <NetworkStatus />
              <Toaster visibleToasts={1} position='top-right' richColors></Toaster>
              <AppRoutes></AppRoutes>
            </Auth0ProviderWithNavigator>
          </QueryClientProvider>
        </BrowserRouter>
      </PerformanceOptimizer>
    </ErrorBoundary>
  </React.StrictMode>,
)
