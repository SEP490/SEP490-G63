import AuthProvider from './context/authProvider.tsx'
import Routes from './routers/index.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'suneditor/dist/css/suneditor.min.css'
import NotifyProvider from './context/notiProvider.tsx'
import { Suspense } from 'react'
import LoadingPage from './components/shared/LoadingPage/LoadingPage.tsx'

function App() {
  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<LoadingPage />}>
          <Routes />
        </Suspense>
      </DndProvider>
    </AuthProvider>
  )
}

export default App
