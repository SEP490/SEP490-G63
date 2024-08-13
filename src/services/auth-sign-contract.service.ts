import axios from 'axios'
import { BASE_URL } from '~/common/const'
import axiosInstant from '~/config/axiosConfig'

export const getOptMail = async (email: string, contractId: string | undefined, type: string) => {
  const response = await axios.get(`${BASE_URL}public/otp/${email}/${type}/${contractId}`)
  return response.data
}
export const verifyOtp = async (data: any) => {
  const response = await axios.post(`${BASE_URL}public/otp/get-contract`, data)
  return response.data
}
export const getSMSCode = async (phone: string) => {
  const response = await axios.get(`${BASE_URL}public/otp/${phone}`)
  return response.data
}
export const verifySMSCode = async (data: any) => {
  const response = await axios.post(`${BASE_URL}public/otp/verify-for-sign-with-sms`, data)
  return response.data
}
export const validatePhone = async (phone: any) => {
  const response = await axiosInstant.get(`contract/check-duplicate?tableName=party&columnName=phone&value=${phone}`)
  return response.data
}
export const validateMail = async (email: any) => {
  const response = await axiosInstant.get(`contract/check-duplicate?tableName=party&columnName=email&value=${email}`)
  return response.data
}
