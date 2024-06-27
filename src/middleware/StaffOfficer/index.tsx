import { permissionObject } from '~/common/const/permissions'
import Error from '~/components/shared/Error/Error'
import { useAuth } from '~/context/authProvider'

const StaffOfficer = ({ children }: any) => {
  const { user } = useAuth()
  if (!user?.permissions.includes(permissionObject.OFFICE_STAFF)) return <Error />
  else {
    return <>{children}</>
  }
}
export default StaffOfficer
