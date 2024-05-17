import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { GUESS } from '~/common/const/role'
import { getAccessToken, removeAccessToken, setAccessToken } from '~/config/accessToken'
import { getRoleW, removeRoleW, setRoleW } from '~/config/role'
type MyContextValue = {
  token: string | undefined
  role: string | undefined
  setToken: (token: string) => void | undefined
  setRole: (token: string) => void | undefined
  removeToken: () => void | undefined
}
interface Props {
  children: React.ReactNode
}
const AuthContext = createContext<MyContextValue>({
  token: '',
  role: '',
  setToken: () => {},
  setRole: () => {},
  removeToken: () => {}
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken_] = useState<string | undefined>(getAccessToken())
  const [role, setRole_] = useState<string | undefined>(getRoleW())
  // const [isExpert, setIsExpert] = useState(localStorage.getItem('isExpert'))
  // const [connection, setConnection] = useState(null)
  // const [api, contextHolder] = notification.useNotification()
  // const [message, setMessage] = useState('')
  // const [title, setTitle] = useState('Thông báo')
  // const [description, setDescription] = useState('Bạn có thông báo mới')

  // const close = () => {
  //   console.log('Notification was closed. Either the close button was clicked or duration time elapsed.')
  // }
  // useEffect(() => {
  //   const newConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(`${Server}/JobApplicationStatusHub`)
  //     .configureLogging(signalR.LogLevel.Information)
  //     .build()

  //   if (newConnection) {
  //     setConnection(newConnection)
  //     newConnection
  //       .start()
  //       .then(() => {})
  //       .catch((error: any) => {})

  //     newConnection.on('StatusChanged', (jobApplicationId, newStatus, title, description) => {
  //       setTitle(title)
  //       setDescription(description)
  //       setMessage(newStatus)

  //       // Thông báo cho người dùng khi có thay đổi
  //       // alert(message);
  //     })
  //   }

  //   return () => {
  //     if (newConnection) {
  //       newConnection.off('StatusChanged')
  //       newConnection.stop()
  //     }
  //   }
  // }, [])
  // useEffect(() => {
  //   // Tự động mở thông báo khi có thay đổi status
  //   if (roleId == 2 && title != 'Thông báo' && description != 'Bạn có thông báo mới') {
  //     openNotification()
  //   }
  //   console.log('here')
  // }, [message]) // Trigger when the 'message' state changes

  // const openNotification = () => {
  //   const key = `open${Date.now()}`
  //   const btn = (
  //     <Space>
  //       <Button type='link' size='small' onClick={() => api.destroy()}>
  //         Đã đọc tất cả
  //       </Button>
  //       <Button type='primary' size='medium' onClick={() => api.destroy(key)}>
  //         Xác nhận
  //       </Button>
  //     </Space>
  //   )

  //   api.open({
  //     message: `${title}`,
  //     description: `${description}`,
  //     btn,
  //     key,
  //     icon: (
  //       <RecruitLogo
  //         style={{
  //           color: '#108ee9'
  //         }}
  //       />
  //     ),
  //     onClose: close,
  //     duration: null,
  //     closeIcon: null // Hoặc duration: 0
  //   })
  // }

  const setToken = (newToken: string) => {
    setToken_(newToken)
    setAccessToken(newToken)
  }
  const removeToken = () => {
    setToken_(undefined)
    removeAccessToken()
    removeRoleW()
  }
  const setRole = (role: string) => {
    setRole_(role)
    setRoleW(role)
  }

  const contextValue = useMemo(() => ({ token, role, setToken, setRole, removeToken }), [token, role])

  return (
    <>
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    </>
  )
}

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired
// }

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
