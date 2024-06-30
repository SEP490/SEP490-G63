import axiosInstant from '../config/axiosConfig.ts'
export const getNumberUnreadNotify = async () => {
  const response = await axiosInstant.get(`notification/unread`)
  return response.data
}
export const readNotify = async (id: string) => {
  const response = await axiosInstant.put(`notification/${id}/true`)
  return response.data
}
