import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken } from '~/config/accessToken'
import { useAuth } from '~/provider/authProvider'

const Logout = () => {
  const navigate = useNavigate()
  const { removeToken } = useAuth()
  useEffect(() => {
    removeToken()
    navigate('/login')
  }, [])
  return <div>Logout page</div>
}

export default Logout
