import axios from 'axios'
import { BASE_URL } from '~/common/const'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setAccessToken = (accessToken: string) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
}
export const clearAuthToken = (): void => {
  delete axiosInstance.defaults.headers.common['Authorization']
}
export default axiosInstance
