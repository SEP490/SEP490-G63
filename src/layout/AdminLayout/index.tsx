import { Navigate, useLocation } from 'react-router-dom'

function AdminLayout({ children }: any) {
  // const location = useLocation()
  // return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  return children
}

export default AdminLayout
