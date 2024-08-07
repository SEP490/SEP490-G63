import { NotificationData } from '~/context/notiProvider.tsx'
import axiosInstance, { adminInstance, axiosInstanceFormData } from '../config/axiosConfig.ts'
interface LoginData {
  email: string
  password: string
}
interface RegisterData {
  company: string
  taxCode: string
  presenter: string
  email: string
  phone: string
  planpriceId: string
}
export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await axiosInstance.post('public/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updateProfile = async ({ id, formData }: any) => {
  const response = await axiosInstanceFormData.put(`user/${id}`, formData)
  return response.data
}
export const getUserDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`user/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const registerUser = async ({ company, taxCode, presenter, email, phone, planpriceId }: RegisterData) => {
  try {
    const response = await adminInstance.post('public/auth/register', {
      companyName: company,
      taxCode,
      presenter,
      email,
      phone,
      planpriceId
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
type UserList = {
  label: string
  value: string
}
export const getUserByPermission = async (permission: string): Promise<UserList[]> => {
  const response = await axiosInstance.get(`user/searchByPermission?permission=${permission}`)
  const result = response.data?.object?.content.map((d: any) => ({ label: d.email, value: d.email }))
  return result as UserList[]
}
export const getNotification = async (page: number) => {
  const response = await axiosInstance.get(`notification?page=${page}&size=10`)
  return response?.data
}
export const changePassword = async (data: any) => {
  const response = await axiosInstance.post('public/auth/change-password', data)
  return response.data
}
export const getUserToken = async () => {
  const response = await axiosInstance.post('user/get-user')
  return response.data
}
export const activeUser = async (email: string) => {
  const response = await axiosInstance.post(`user/active-user?mail=${email}`)
  return response.data
}
