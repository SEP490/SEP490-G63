import { Zoom, toast } from 'react-toastify'

const useToast = () => {
  type Notification = {
    message: string
    type: string
  }
  const successNotification = (props: Notification) => {
    toast.success(props?.message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }
  const warningNotification = (props: Notification) => {
    toast.warning(props?.message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }
  const errorNotification = (props: Notification) => {
    toast.error(props?.message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }

  return { successNotification, warningNotification, errorNotification }
}

export default useToast
