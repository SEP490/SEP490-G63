import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'
import NavBar from './NavBar'
import useViewport from '~/hooks/useViewport'
import { ADMIN_OFFICER } from '~/common/const/role'

function AdminOfficerLayout({ children }: any) {
  const location = useLocation()
  const { token, user } = useAuth()
  const { width } = useViewport()
  const isMobile = width <= 1024
  if (!token && user?.role !== ADMIN_OFFICER) {
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  }
  return (
    <div className='h-[100vh] overflow-hidden bg-[#e8eaed]'>
      <div className='fixed w-full z-30'>
        <NavBar />
      </div>

      <div
        className={`${isMobile ? 'mt-[50px] h-[calc(100vh-50px)]' : 'mt-[100px] h-[calc(100vh-100px)]'} overflow-auto`}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminOfficerLayout