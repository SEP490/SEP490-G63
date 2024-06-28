import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'
import { useAuth } from './authProvider'
import { BASE_URL } from '~/common/const'
import { getNotification } from '~/services/user.service'
import { getNumberUnreadNotify, readNotify } from '~/services/notification.service'

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
  totalNotRead: number
  isReadNotify: (id: string) => void
  setNotifications: any
  setTotalNotRead: any
}
interface Props {
  children: React.ReactNode
}
const NotifyContext = createContext<MyContextValue>({
  notifications: [],
  totalNotRead: 0,
  isReadNotify: (id: string) => {},
  setNotifications: () => {},
  setTotalNotRead: () => {}
})

const NotifyProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[] | []>([])
  const [totalNotRead, setTotalNotRead] = useState<number | 0>(0)
  const { user } = useAuth()

  const isReadNotify = async (id: string) => {
    try {
      const result = await readNotify(id)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    const socket = new SockJS(`${BASE_URL}ws`)
    const fetchAPI = async () => {
      try {
        const notificationData = await getNotification()
        const total = await getNumberUnreadNotify()
        setTotalNotRead(total)
        setNotifications(notificationData)
      } catch (e) {
        console.log(e)
      }
    }

    fetchAPI()
    const stompClient = Stomp.over(socket)
    stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame)
      stompClient.subscribe(`/topic/notifications/${user?.email}`, (message) => {
        if (message.body) {
          setTotalNotRead((totalNotRead) => totalNotRead + 1)
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
  const contextValue = useMemo(
    () => ({ notifications, totalNotRead, isReadNotify, setTotalNotRead, setNotifications }),
    [notifications, totalNotRead]
  )

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
