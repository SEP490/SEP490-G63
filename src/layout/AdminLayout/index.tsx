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
      <div className='h-[84vh] overflow-auto'>{children}</div>
    </div>
  )
}

export default AdminLayout
