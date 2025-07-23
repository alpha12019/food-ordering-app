import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import "./global.css"
import Auth0ProviderWithNavigator from './auth/auth0providerWithNavigator'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigator>
          <Toaster visibleToasts={1} position='top-right' richColors></Toaster>
          <AppRoutes></AppRoutes>
        </Auth0ProviderWithNavigator>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
