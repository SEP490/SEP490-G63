import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './context/authProvider.tsx'
import Routes from './routers/index.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'suneditor/dist/css/suneditor.min.css'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
