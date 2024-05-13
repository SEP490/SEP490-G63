import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'

function AdminLayout({ children }: any) {
  const location = useLocation()
  const { token } = useAuth()
  if (!token) {
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  }
  return children
}

export default AdminLayout
