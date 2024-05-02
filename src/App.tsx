import { BrowserRouter, Route } from 'react-router-dom'
import { routers } from './common/const/router.ts'
import { RouteType } from './common/const/type.ts'
import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './provider/authProvider.tsx'
import Routes from './routers/index.tsx'
import { GetTokenV2ContextProvider } from './context/GetTokenV2ContextProvider.tsx'

const antdThemeConfig = {
  token: {
    colorPrimary: '#735AD8',
    borderRadius: 16,
    colorBorder: '#D0D5DD',
    colorBorderSecondary: '#D0D5DD'
  }
}

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
