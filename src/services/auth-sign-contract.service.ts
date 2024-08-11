import axiosInstant from '~/config/axiosConfig'

export const getOptMail = async (email: string, contractId: string | undefined, type: string) => {
  const response = await axiosInstant.get(`/public/otp/${email}/${type}/${contractId}`)
  return response.data
}
export const verifyOtp = async (data: any) => {
  const response = await axiosInstant.post(`/public/otp/get-contract`, data)
  return response.data
}
export const getSMSCode = async (phone: string) => {
  const response = await axiosInstant.get(`public/otp/${phone}`)
  return response
}
export const verifySMSCode = async (data: any) => {
  const response = await axiosInstant.post(`public/otp/verify-for-sign-with-sms`, data)
  return response
}
