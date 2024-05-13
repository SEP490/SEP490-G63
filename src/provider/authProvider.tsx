import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAccessToken, removeAccessToken, setAccessToken } from '~/config/accessToken'
type MyContextValue = {
  token: string | undefined
  setToken: (token: string) => void | undefined
  removeToken: () => void | undefined
}
interface Props {
  children: React.ReactNode
}
const AuthContext = createContext<MyContextValue>({ token: '', setToken: () => {}, removeToken: () => {} })

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken_] = useState<string | undefined>(getAccessToken())
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
  }

  const contextValue = useMemo(() => ({ token, setToken, removeToken }), [token])

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
