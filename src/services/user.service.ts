import { NotificationData } from '~/context/notiProvider.tsx'
import axiosInstant, { adminInstance, axiosInstanceFormData } from '../config/axiosConfig.ts'
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
    const response = await axiosInstant.post('public/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updateProfile = async (id: any, formData: any) => {
  try {
    const response = await axiosInstanceFormData.put(`user/${id}`, formData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getUserDetail = async (id: string) => {
  try {
    const response = await axiosInstant.get(`user/${id}`)
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
  const response = await axiosInstant.get(`user/searchByPermission?permission=${permission}`)
  const result = response.data?.object?.content.map((d: any) => ({ label: d.email, value: d.email }))
  return result as UserList[]
}
export const getNotification = async (): Promise<NotificationData[]> => {
  const response = await axiosInstant.get('notification')
  return response?.data?.content
}
