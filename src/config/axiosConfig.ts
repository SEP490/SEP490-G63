import axios from 'axios'
import { BASE_URL, BASE_ADMIN_URL, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, BASE_PROVINCE_URL } from '~/common/const'
import { getAccessToken, removeAccessToken } from './accessToken'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
})
export const axiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
export const adminInstance = axios.create({
  baseURL: BASE_ADMIN_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
})
export const provinceInstance = axios.create({
  baseURL: BASE_PROVINCE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
})
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
      return config
    }
    return Promise.reject()
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    switch (error?.response?.status) {
      case UNAUTHORIZED:
        removeAccessToken()
        window.location.href = '/'
        break

      case NOT_FOUND:
        window.location.href = '/not-found'
        break
    }

    return Promise.reject(error)
  }
)

axiosInstanceFormData.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstanceFormData.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axiosInstance
