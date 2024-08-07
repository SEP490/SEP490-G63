import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken } from '~/config/accessToken'
import { useAuth } from '~/context/authProvider'

const Logout = () => {
  const navigate = useNavigate()
  const { removeToken } = useAuth()
  useEffect(() => {
    removeToken()
    navigate('/')
  }, [])
  return <div>Logout page</div>
}

export default Logout
