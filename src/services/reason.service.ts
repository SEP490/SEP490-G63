import axiosInstance from '~/config/axiosConfig'

export const getListReason = async (page: number, size: number) => {
  const response = await axiosInstance.get(`reason/public?${page}/${size}`)
  return response.data
}
export const createReason = async (data: any) => {
  const response = await axiosInstance.post(`reason`, data)
  return response.data
}
export const updateReason = async (data: any) => {
  const response = await axiosInstance.put(`reason`, data)
  return response.data
}
export const deleteReason = async (id: string) => {
  const response = await axiosInstance.delete(`reason/${id}`)
  return response.data
}
