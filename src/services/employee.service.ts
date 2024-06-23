import axiosInstant, { adminInstance } from '../config/axiosConfig.ts'
interface EmployeeData {
  name: string
  email: string
  password: string
  phone: string
  position: string
  department: string
  permissions: string[]
}
interface RegisterData {
  company: string
  taxCode: string
  presenter: string
  email: string
  phone: string
}
interface QueryDataGet {
  name?: string
  email?: string
  password?: string
  phone?: string
  position?: string
  department?: string
  permissions?: string[]
  page?: number
  size?: number
}
export const createEmployee = async (data: EmployeeData) => {
  const response = await axiosInstant.post('user/register-for-user', { ...data, role: 'USER' })
  return response.data
}

export const getListEmployee = async ({ size, page, name }: QueryDataGet) => {
  const response = await axiosInstant.get(`user/search?page=${page}&size=${size}&name=${name}`)

  return response.data
}
export const deleteEmployee = async (id: string | undefined) => {
  const response = await axiosInstant.delete(`user/${id}`)
  return response.data
}

export const registerUser = async ({ company, taxCode, presenter, email, phone }: RegisterData) => {
  const response = await adminInstance.post('public/auth/register', {
    companyName: company,
    taxCode,
    presenter,
    email,
    phone
  })
  return response
}
