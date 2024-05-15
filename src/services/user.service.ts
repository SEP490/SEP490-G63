import axiosInstant, { adminInstance } from '../config/axiosConfig.ts'
interface LoginData {
  email: string
  password: string
}
interface RegisterData {
  company: string
  taxCode: string
  firstName: string
  lastName: string
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
export const register = async ({ company, taxCode, firstName, lastName, email, phone }: RegisterData) => {
  try {
    const response = await adminInstance.post('', { company, taxCode, firstName, lastName, email, phone })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
