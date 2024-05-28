import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './provider/authProvider.tsx'
import Routes from './routers/index.tsx'
import { GetTokenV2ContextProvider } from './context/GetTokenV2ContextProvider.tsx'
import Form from './components/BaseComponent/Form/index.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GetTokenV2ContextProvider>
          <DndProvider backend={HTML5Backend}>
            <Routes />
          </DndProvider>
        </GetTokenV2ContextProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
