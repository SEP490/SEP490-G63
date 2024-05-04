import axiosInstant from '../config/axiosConfig.ts'
export const SignIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstant.post('user/signin', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
