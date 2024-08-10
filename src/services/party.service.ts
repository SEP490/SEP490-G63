import axiosInstance from '~/config/axiosConfig'

export const getParty = async () => {
  const response = await axiosInstance.get(`party`)
  return response.data
}
export const createParty = async (data: any) => {
  const response = await axiosInstance.post(`party`, data)
  return response.data
}
