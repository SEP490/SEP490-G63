import { Zoom, toast } from 'react-toastify'

const useToast = () => {
  const successNotification = (message: string) => {
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }
  const warningNotification = (message: string) => {
    toast.warning(message, {
      position: 'bottom-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }
  const inforNotification = (message: string) => {
    toast.info(message, {
      position: 'bottom-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }
  const errorNotification = (message: string) => {
    toast.error(message, {
      position: 'bottom-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Zoom
    })
  }

  return { successNotification, warningNotification, errorNotification,inforNotification}
}

export default useToast
