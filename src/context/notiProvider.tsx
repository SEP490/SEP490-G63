import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'
import { useAuth } from './authProvider'
import { BASE_URL } from '~/common/const'
import { getNotification } from '~/services/user.service'

export type NotificationData = {
  id: string
  title: string
  message: string
  sender: string
  receivers: string[]
  typeNotification: string
  markRead: boolean
  markedDeleted: boolean
  createdDate: string
  idType: string
}
type MyContextValue = {
  notifications: NotificationData[] | []
}
interface Props {
  children: React.ReactNode
}
const NotifyContext = createContext<MyContextValue>({
  notifications: []
})

const NotifyProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[] | []>([])
  const [totalNotRead, setTotalNotRead] = useState<number | 0>(0)
  const { user } = useAuth()

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const notificationData = await getNotification()
        setNotifications(notificationData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchAPI()
  }, [user])
  useEffect(() => {
    const socket = new SockJS(`${BASE_URL}ws`)
    const stompClient = Stomp.over(socket)
    stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame)
      stompClient.subscribe(`/topic/notifications/${user?.email}`, (message) => {
        if (message.body) {
          setNotifications((prevNotifications) => [JSON.parse(message.body), ...prevNotifications])
        }
      })
    })

    return () => {
      if (stompClient) {
        stompClient.disconnect()
      }
    }
  }, [user])
  const contextValue = useMemo(() => ({ notifications }), [notifications])

  return (
    <>
      <NotifyContext.Provider value={contextValue}>{children}</NotifyContext.Provider>
    </>
  )
}

export const useNotification = () => {
  return useContext(NotifyContext)
}

export default NotifyProvider
