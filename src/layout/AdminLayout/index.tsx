import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'
import NavBar from './NavBar'

function AdminLayout({ children }: any) {
  const location = useLocation()
  const { token } = useAuth()
  if (!token) {
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  }
  return (
    <div className='h-[100vh] overflow-hidden relative'>
      <NavBar />
      <div className='h-[84vh] '>{children}</div>
      <div className='text-xs absolute bottom-1 left-1 bg-main-color text-white px-2 py-1 rounded-lg'>
        Liên hệ: ThangDepTrai
      </div>
    </div>
  )
}

export default AdminLayout
