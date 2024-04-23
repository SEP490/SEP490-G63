// import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
// import PropTypes from 'prop-types'
// import { Button, Space, notification } from 'antd'
// import { Server } from '../dataConfig'
// import * as signalR from '@microsoft/signalr'
// import { RecruitLogo } from '../components/Icons'
type MyContextValue = {
  token: string
}
interface Props {
  children: React.ReactNode
}
const AuthContext = createContext<MyContextValue>({ token: '' })

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken_] = useState<any>(localStorage.getItem('token'))
  const [accountId, setAccountID] = useState<any>(localStorage.getItem('accountId'))
  const [userName, setUsername] = useState<any>(localStorage.getItem('userName'))
  const [roleId, setRoleId] = useState<any>(localStorage.getItem('roleId'))
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

  const setToken = (newToken: string, newAccountID: string, newUsername: string, newRoleId: string) => {
    if (newToken !== null && newToken !== 'null') {
      // Giá trị newToken hợp lệ (không phải là null hoặc "null")
      setToken_(newToken)
      setAccountID(newAccountID)
      setUsername(newUsername)
      setRoleId(newRoleId)
      localStorage.setItem('token', newToken)
      localStorage.setItem('accountId', newAccountID)
      localStorage.setItem('userName', newUsername)
      localStorage.setItem('roleId', newRoleId)
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('accountId')
      localStorage.removeItem('userName')
      localStorage.removeItem('roleId')
      localStorage.removeItem('isExpert')
      setToken_(null)
      setAccountID(null)
      setUsername(null)
      setRoleId(null)
    }
  }

  const contextValue = useMemo(() => ({ token, accountId, userName, roleId }), [token, accountId])

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
