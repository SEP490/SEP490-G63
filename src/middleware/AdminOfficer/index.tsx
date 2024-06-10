import { Navigate, useLocation } from 'react-router-dom'
import { permissionObject } from '~/common/const/permissions'
import { useAuth } from '~/provider/authProvider'

const AdminOfficer = ({ children }: any) => {
  const { user } = useAuth()
  const location = useLocation()
  console.log(user?.permissions.includes(permissionObject.OFFICE_ADMIN))

  if (!user?.permissions.includes(permissionObject.OFFICE_ADMIN))
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>

  return <>{children}</>
}
export default AdminOfficer
