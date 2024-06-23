import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data stays fresh for 60 seconds
      cacheTime: 0, // Data is cached for 5 minutes
      refetchOnWindowFocus: false, // Don't automatically refresh when the window regains focus
      retry: 0
    },
    mutations: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme='colored'
    />

    <ToastContainer />
  </QueryClientProvider>
)
