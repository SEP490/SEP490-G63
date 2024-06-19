import { createContext, useContext, useMemo, useState } from 'react'
import { getAccessToken, removeAccessToken, setAccessToken } from '~/config/accessToken'
import { getUserW, removeUserW, setUserW } from '~/config/user'
export type UserInformation = {
  id: string
  name: string
  role: string
  email: string
  permissions: string[]
  avatar: string
}
type MyContextValue = {
  token: string | undefined
  user: UserInformation | null
  setToken: (token: string) => void | undefined
  setUser: (user: UserInformation) => void | undefined
  removeToken: () => void | undefined
}
interface Props {
  children: React.ReactNode
}
const AuthContext = createContext<MyContextValue>({
  token: '',
  user: null,
  setToken: () => {},
  setUser: () => {},
  removeToken: () => {}
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken_] = useState<string | undefined>(getAccessToken())
  const [user, setUser_] = useState<UserInformation | null>(getUserW())

  const setToken = (newToken: string) => {
    setToken_(newToken)
    setAccessToken(newToken)
  }
  const removeToken = () => {
    setToken_(undefined)
    setUser_(null)
    removeAccessToken()
    removeUserW()
  }
  const setUser = (user: UserInformation) => {
    setUser_(user)
    setUserW(user)
  }

  const contextValue = useMemo(() => ({ token, user, setToken, setUser, removeToken }), [token, user])

  return (
    <>
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    </>
  )
}

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired
// }
//connection.on("send-mesage",(user,message) => {
//connection.emit("send-mesage",user1,"Code đi")
//connection.emit("send-mesage",user1,"Code đi")
//connection.emit("send-mesage",user1,"Code đi")

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
