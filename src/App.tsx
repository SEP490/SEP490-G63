import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './provider/authProvider.tsx'
import Routes from './routers/index.tsx'
import { GetTokenV2ContextProvider } from './context/GetTokenV2ContextProvider.tsx'
import Form from './components/BaseComponent/Form/index.tsx'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GetTokenV2ContextProvider>
          <Routes />
        </GetTokenV2ContextProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
