import { permissionObject } from '~/common/const/permissions'
import Error from '~/components/shared/Error/Error'
import { useAuth } from '~/context/authProvider'

const Sale = ({ children }: any) => {
  const { user } = useAuth()
  if (!user?.permissions.includes(permissionObject.SALE)) return <Error />
  else {
    return <>{children}</>
  }
}
export default Sale
