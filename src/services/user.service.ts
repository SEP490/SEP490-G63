import { UserData } from '~/pages/Profile.tsx'
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
}
export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await axiosInstant.post('public/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updateProfile = async (id: string, formData: any) => {
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
export const registerUser = async ({ company, taxCode, presenter, email, phone }: RegisterData) => {
  try {
    const response = await adminInstance.post('public/auth/register', {
      companyName: company,
      taxCode,
      presenter,
      email,
      phone
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
