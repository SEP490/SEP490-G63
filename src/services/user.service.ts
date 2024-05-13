import axiosInstant from '../config/axiosConfig.ts'
interface LoginData {
  email: string
  password: string
}
export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await axiosInstant.post('public/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
