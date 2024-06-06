import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'
import NavBar from './NavBar'
import useViewport from '~/hooks/useViewport'

function AdminLayout({ children }: any) {
  const location = useLocation()
  const { token } = useAuth()
  const { width } = useViewport()
  const isMobile = width <= 1024
  if (!token) {
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  }
  return (
    <div className='h-[100vh] overflow-hidden bg-[#e8eaed]'>
      <div className='fixed w-full z-30'>
        <NavBar />
      </div>

      <div
        className={`${isMobile ? 'mt-[60px] h-[calc(100vh-70px)]' : 'mt-[120px] h-[calc(100vh-140px)]'} overflow-auto`}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
