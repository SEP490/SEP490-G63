import axios from 'axios'
import { BASE_URL } from '~/common/const'
import axiosInstance from '~/config/axiosConfig'

export const getListReason = async (page: number, size: number) => {
  const response = await axios.get(`${BASE_URL}reason/public?page=${page}&size=${size}`)
  return response.data
}
export const createReason = async (data: any) => {
  const response = await axiosInstance.post(`reason`, data)
  return response.data
}
export const updateReason = async ({ id, formData }: any) => {
  const response = await axiosInstance.put(`reason/${id}`, formData)
  return response.data
}
export const deleteReason = async (id: string) => {
  const response = await axiosInstance.delete(`reason/${id}`)
  return response.data
}
