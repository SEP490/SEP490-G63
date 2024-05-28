import { Zoom, toast } from 'react-toastify'

const useToast = () => {
  const successNotification = (message: string) => {
    toast.success(message, {
      position: 'bottom-right',
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
  const warningNotification = (message: string) => {
    toast.warning(message, {
      position: 'bottom-right',
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
  const errorNotification = (message: string) => {
    toast.error(message, {
      position: 'bottom-right',
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
