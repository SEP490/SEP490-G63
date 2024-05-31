import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './provider/authProvider.tsx'
import Routes from './routers/index.tsx'
import { GetTokenV2ContextProvider } from './context/GetTokenV2ContextProvider.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'suneditor/dist/css/suneditor.min.css'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <GetTokenV2ContextProvider>
            <DndProvider backend={HTML5Backend}>
              <Routes />
            </DndProvider>
          </GetTokenV2ContextProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
